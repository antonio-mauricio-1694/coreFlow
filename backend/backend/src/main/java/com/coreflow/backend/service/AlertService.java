package com.coreflow.backend.service;

import com.coreflow.backend.domain.AlertLevel;
import com.coreflow.backend.domain.TransactionType;
import com.coreflow.backend.dto.AlertDTO;
import com.coreflow.backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;

@Service
public class AlertService {

    private static final BigDecimal WARNING_THRESHOLD  = new BigDecimal("70");
    private static final BigDecimal DANGER_THRESHOLD   = new BigDecimal("90");
    private static final BigDecimal CRITICAL_THRESHOLD = new BigDecimal("100");

    private final TransactionRepository transactionRepository;

    public AlertService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public AlertDTO getAlertForCurrentMonth(Long householdId) {
        LocalDate now = LocalDate.now();
        return buildAlert(householdId, now.getYear(), now.getMonthValue());
    }

    public AlertDTO getAlertForMonth(Long householdId, int year, int month) {
        return buildAlert(householdId, year, month);
    }

    private AlertDTO buildAlert(Long householdId, int year, int month) {
        BigDecimal totalIncome = transactionRepository.sumByHouseholdTypeAndMonth(
                householdId, TransactionType.INCOME, year, month
        );

        BigDecimal totalExpense = transactionRepository.sumByHouseholdTypeAndMonth(
                householdId, TransactionType.EXPENSE, year, month
        );

        if (totalIncome == null) totalIncome = BigDecimal.ZERO;
        if (totalExpense == null) totalExpense = BigDecimal.ZERO;

        if (totalIncome.compareTo(BigDecimal.ZERO) == 0) {
            return new AlertDTO(
                    householdId, year, month,
                    BigDecimal.ZERO, totalExpense,
                    new BigDecimal("100"),
                    AlertLevel.CRITICAL,
                    "Nenhuma receita registrada neste mês. " +
                            "Despesas de R$ " + totalExpense + " sem cobertura."
            );
        }

        BigDecimal usagePercent = totalExpense
                .multiply(new BigDecimal("100"))
                .divide(totalIncome, 2, RoundingMode.HALF_UP);

        AlertLevel level = resolveLevel(usagePercent);
        String message = buildMessage(level, usagePercent, totalIncome, totalExpense);

        return new AlertDTO(
                householdId, year, month,
                totalIncome, totalExpense,
                usagePercent, level, message
        );
    }

    private AlertLevel resolveLevel(BigDecimal usagePercent) {
        if (usagePercent.compareTo(CRITICAL_THRESHOLD) >= 0) return AlertLevel.CRITICAL;
        if (usagePercent.compareTo(DANGER_THRESHOLD) >= 0)   return AlertLevel.DANGER;
        if (usagePercent.compareTo(WARNING_THRESHOLD) >= 0)  return AlertLevel.WARNING;
        return AlertLevel.OK;
    }

    private String buildMessage(AlertLevel level,
                                BigDecimal usagePercent,
                                BigDecimal totalIncome,
                                BigDecimal totalExpense) {
        BigDecimal remaining = totalIncome.subtract(totalExpense);

        return switch (level) {
            case OK -> String.format(
                    "Financeiro saudável. Você usou %.2f%% da receita. " +
                            "Saldo disponível: R$ %.2f.",
                    usagePercent, remaining
            );
            case WARNING -> String.format(
                    "Atenção: %.2f%% da receita já foi comprometida. " +
                            "Restam R$ %.2f. Monitore os gastos.",
                    usagePercent, remaining
            );
            case DANGER -> String.format(
                    "Perigo: %.2f%% da receita consumida. " +
                            "Apenas R$ %.2f disponível. Corte despesas não essenciais.",
                    usagePercent, remaining
            );
            case CRITICAL -> String.format(
                    "Crítico: despesas (R$ %.2f) superaram a receita (R$ %.2f). " +
                            "Déficit de R$ %.2f.",
                    totalExpense, totalIncome, remaining.abs()
            );
        };
    }
}