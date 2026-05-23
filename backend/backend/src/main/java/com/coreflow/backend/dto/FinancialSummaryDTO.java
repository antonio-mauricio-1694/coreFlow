package com.coreflow.backend.dto;

import java.math.BigDecimal;
import java.util.Map;

public class FinancialSummaryDTO {

    private Long householdId;
    private BigDecimal totalIncome;
    private BigDecimal totalExpense;
    private BigDecimal balance;
    private Map<String, BigDecimal> expenseByCategory;
    private Map<String, BigDecimal> incomeByCategory;

    public FinancialSummaryDTO(Long householdId,
                               BigDecimal totalIncome,
                               BigDecimal totalExpense,
                               BigDecimal balance,
                               Map<String, BigDecimal> expenseByCategory,
                               Map<String, BigDecimal> incomeByCategory) {
        this.householdId = householdId;
        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
        this.balance = balance;
        this.expenseByCategory = expenseByCategory;
        this.incomeByCategory = incomeByCategory;
    }

    public Long getHouseholdId() { return householdId; }
    public BigDecimal getTotalIncome() { return totalIncome; }
    public BigDecimal getTotalExpense() { return totalExpense; }
    public BigDecimal getBalance() { return balance; }
    public Map<String, BigDecimal> getExpenseByCategory() { return expenseByCategory; }
    public Map<String, BigDecimal> getIncomeByCategory() { return incomeByCategory; }
}