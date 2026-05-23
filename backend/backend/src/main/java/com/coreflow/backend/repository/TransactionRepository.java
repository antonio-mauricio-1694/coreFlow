package com.coreflow.backend.repository;

import com.coreflow.backend.domain.Transaction;
import com.coreflow.backend.domain.TransactionCategory;
import com.coreflow.backend.domain.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByHouseholdId(Long householdId);

    List<Transaction> findByHouseholdIdAndType(Long householdId, TransactionType type);

    List<Transaction> findByHouseholdIdAndCategory(Long householdId, TransactionCategory category);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t " +
            "WHERE t.household.id = :householdId AND t.type = :type")
    BigDecimal sumByHouseholdAndType(@Param("householdId") Long householdId,
                                     @Param("type") TransactionType type);

    @Query("SELECT t.category, COALESCE(SUM(t.amount), 0) FROM Transaction t " +
            "WHERE t.household.id = :householdId AND t.type = :type " +
            "GROUP BY t.category")
    List<Object[]> sumByCategoryAndType(@Param("householdId") Long householdId,
                                        @Param("type") TransactionType type);

    @Query("SELECT YEAR(t.date), MONTH(t.date), t.type, COALESCE(SUM(t.amount), 0) " +
            "FROM Transaction t " +
            "WHERE t.household.id = :householdId " +
            "GROUP BY YEAR(t.date), MONTH(t.date), t.type " +
            "ORDER BY YEAR(t.date), MONTH(t.date)")
    List<Object[]> monthlySummaryByHousehold(@Param("householdId") Long householdId);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t " +
            "WHERE t.household.id = :householdId " +
            "AND t.type = :type " +
            "AND YEAR(t.date) = :year " +
            "AND MONTH(t.date) = :month")
    BigDecimal sumByHouseholdTypeAndMonth(@Param("householdId") Long householdId,
                                          @Param("type") TransactionType type,
                                          @Param("year") int year,
                                          @Param("month") int month);
}