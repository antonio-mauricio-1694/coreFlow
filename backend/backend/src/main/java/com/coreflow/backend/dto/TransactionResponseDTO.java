package com.coreflow.backend.dto;

import com.coreflow.backend.domain.TransactionCategory;
import com.coreflow.backend.domain.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TransactionResponseDTO {

    private Long id;
    private String description;
    private BigDecimal amount;
    private TransactionType type;
    private TransactionCategory category;
    private LocalDate date;
    private String createdBy;
    private Long householdId;

    public TransactionResponseDTO(Long id, String description, BigDecimal amount,
                                  TransactionType type, TransactionCategory category,
                                  LocalDate date, String createdBy, Long householdId) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.type = type;
        this.category = category;
        this.date = date;
        this.createdBy = createdBy;
        this.householdId = householdId;
    }

    public Long getId() { return id; }
    public String getDescription() { return description; }
    public BigDecimal getAmount() { return amount; }
    public TransactionType getType() { return type; }
    public TransactionCategory getCategory() { return category; }
    public LocalDate getDate() { return date; }
    public String getCreatedBy() { return createdBy; }
    public Long getHouseholdId() { return householdId; }
}