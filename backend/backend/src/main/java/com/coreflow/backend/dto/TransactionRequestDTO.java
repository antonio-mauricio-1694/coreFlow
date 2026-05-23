package com.coreflow.backend.dto;

import com.coreflow.backend.domain.TransactionCategory;
import com.coreflow.backend.domain.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TransactionRequestDTO {

    private String description;
    private BigDecimal amount;
    private TransactionType type;
    private TransactionCategory category;
    private LocalDate date;
    private Long householdId;
    private Long userId;

    public String getDescription() { return description; }
    public BigDecimal getAmount() { return amount; }
    public TransactionType getType() { return type; }
    public TransactionCategory getCategory() { return category; }
    public LocalDate getDate() { return date; }
    public Long getHouseholdId() { return householdId; }
    public Long getUserId() { return userId; }

    public void setDescription(String description) { this.description = description; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public void setType(TransactionType type) { this.type = type; }
    public void setCategory(TransactionCategory category) { this.category = category; }
    public void setDate(LocalDate date) { this.date = date; }
    public void setHouseholdId(Long householdId) { this.householdId = householdId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
