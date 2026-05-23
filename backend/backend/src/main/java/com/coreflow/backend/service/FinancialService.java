package com.coreflow.backend.service;

import com.coreflow.backend.domain.TransactionCategory;
import com.coreflow.backend.domain.TransactionType;
import com.coreflow.backend.dto.FinancialSummaryDTO;
import com.coreflow.backend.dto.MonthlySummaryDTO;
import com.coreflow.backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FinancialService {

    private final TransactionRepository transactionRepository;

    public FinancialService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public FinancialSummaryDTO getSummary(Long householdId) {
        BigDecimal totalIncome = transactionRepository
                .sumByHouseholdAndType(householdId, TransactionType.INCOME);

        BigDecimal totalExpense = transactionRepository
                .sumByHouseholdAndType(householdId, TransactionType.EXPENSE);

        BigDecimal balance = totalIncome.subtract(totalExpense);

        Map<String, BigDecimal> expenseByCategory = buildCategoryMap(householdId, TransactionType.EXPENSE);
        Map<String, BigDecimal> incomeByCategory = buildCategoryMap(householdId, TransactionType.INCOME);

        return new FinancialSummaryDTO(
                householdId,
                totalIncome,
                totalExpense,
                balance,
                expenseByCategory,
                incomeByCategory
        );
    }

    public List<MonthlySummaryDTO> getMonthlySummary(Long householdId) {
        List<Object[]> rows = transactionRepository.monthlySummaryByHousehold(householdId);

        Map<String, MonthlySummaryDTO> map = new HashMap<>();

        for (Object[] row : rows) {
            int year = (int) row[0];
            int month = (int) row[1];
            TransactionType type = (TransactionType) row[2];
            BigDecimal amount = (BigDecimal) row[3];

            String key = year + "-" + month;

            map.putIfAbsent(key, new MonthlySummaryDTO(year, month, BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO));

            MonthlySummaryDTO existing = map.get(key);

            if (type == TransactionType.INCOME) {
                map.put(key, new MonthlySummaryDTO(
                        year, month,
                        amount,
                        existing.getTotalExpense(),
                        amount.subtract(existing.getTotalExpense())
                ));
            } else {
                map.put(key, new MonthlySummaryDTO(
                        year, month,
                        existing.getTotalIncome(),
                        amount,
                        existing.getTotalIncome().subtract(amount)
                ));
            }
        }

        return new ArrayList<>(map.values());
    }

    public MonthlySummaryDTO getSummaryByMonth(Long householdId, int year, int month) {
        BigDecimal totalIncome = transactionRepository
                .sumByHouseholdTypeAndMonth(householdId, TransactionType.INCOME, year, month);

        BigDecimal totalExpense = transactionRepository
                .sumByHouseholdTypeAndMonth(householdId, TransactionType.EXPENSE, year, month);

        BigDecimal balance = totalIncome.subtract(totalExpense);

        return new MonthlySummaryDTO(year, month, totalIncome, totalExpense, balance);
    }

    private Map<String, BigDecimal> buildCategoryMap(Long householdId, TransactionType type) {
        List<Object[]> rows = transactionRepository.sumByCategoryAndType(householdId, type);
        Map<String, BigDecimal> result = new HashMap<>();

        for (Object[] row : rows) {
            TransactionCategory category = (TransactionCategory) row[0];
            BigDecimal total = (BigDecimal) row[1];
            result.put(category.name(), total);
        }

        return result;
    }
}