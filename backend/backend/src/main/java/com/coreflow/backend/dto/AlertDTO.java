package com.coreflow.backend.dto;

import com.coreflow.backend.domain.AlertLevel;
import java.math.BigDecimal;

public class AlertDTO {

    private Long householdId;
    private int year;
    private int month;
    private BigDecimal totalIncome;
    private BigDecimal totalExpense;
    private BigDecimal usagePercent;
    private AlertLevel level;
    private String message;

    public AlertDTO(Long householdId,
                    int year,
                    int month,
                    BigDecimal totalIncome,
                    BigDecimal totalExpense,
                    BigDecimal usagePercent,
                    AlertLevel level,
                    String message) {
        this.householdId = householdId;
        this.year = year;
        this.month = month;
        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
        this.usagePercent = usagePercent;
        this.level = level;
        this.message = message;
    }

    public Long getHouseholdId() { return householdId; }
    public int getYear() { return year; }
    public int getMonth() { return month; }
    public BigDecimal getTotalIncome() { return totalIncome; }
    public BigDecimal getTotalExpense() { return totalExpense; }
    public BigDecimal getUsagePercent() { return usagePercent; }
    public AlertLevel getLevel() { return level; }
    public String getMessage() { return message; }
}