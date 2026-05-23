package com.coreflow.backend.domain;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    @Enumerated(EnumType.STRING)
    private TransactionCategory category;

    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User createdBy;

    @ManyToOne
    @JoinColumn(name = "household_id", nullable = false)
    private Household household;

    public Transaction() {}

    public Long getId() { return id; }
    public String getDescription() { return description; }
    public BigDecimal getAmount() { return amount; }
    public TransactionType getType() { return type; }
    public TransactionCategory getCategory() { return category; }
    public LocalDate getDate() { return date; }
    public User getCreatedBy() { return createdBy; }
    public Household getHousehold() { return household; }

    public void setId(Long id) { this.id = id; }
    public void setDescription(String description) { this.description = description; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public void setType(TransactionType type) { this.type = type; }
    public void setCategory(TransactionCategory category) { this.category = category; }
    public void setDate(LocalDate date) { this.date = date; }
    public void setCreatedBy(User createdBy) { this.createdBy = createdBy; }
    public void setHousehold(Household household) { this.household = household; }
}