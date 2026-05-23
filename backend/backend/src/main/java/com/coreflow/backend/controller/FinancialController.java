package com.coreflow.backend.controller;

import com.coreflow.backend.dto.FinancialSummaryDTO;
import com.coreflow.backend.dto.MonthlySummaryDTO;
import com.coreflow.backend.service.FinancialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/financial")
public class FinancialController {

    private final FinancialService financialService;

    public FinancialController(FinancialService financialService) {
        this.financialService = financialService;
    }

    @GetMapping("/summary/{householdId}")
    public ResponseEntity<FinancialSummaryDTO> getSummary(@PathVariable Long householdId) {
        return ResponseEntity.ok(financialService.getSummary(householdId));
    }

    @GetMapping("/summary/{householdId}/monthly")
    public ResponseEntity<List<MonthlySummaryDTO>> getMonthlySummary(@PathVariable Long householdId) {
        return ResponseEntity.ok(financialService.getMonthlySummary(householdId));
    }

    @GetMapping("/summary/{householdId}/monthly/{year}/{month}")
    public ResponseEntity<MonthlySummaryDTO> getSummaryByMonth(
            @PathVariable Long householdId,
            @PathVariable int year,
            @PathVariable int month) {
        return ResponseEntity.ok(financialService.getSummaryByMonth(householdId, year, month));
    }
}