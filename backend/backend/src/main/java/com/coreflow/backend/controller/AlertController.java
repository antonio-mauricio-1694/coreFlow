package com.coreflow.backend.controller;

import com.coreflow.backend.dto.AlertDTO;
import com.coreflow.backend.service.AlertService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/alerts")
public class AlertController {

    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    @GetMapping("/{householdId}")
    public ResponseEntity<AlertDTO> getCurrentMonthAlert(@PathVariable Long householdId) {
        return ResponseEntity.ok(alertService.getAlertForCurrentMonth(householdId));
    }

    @GetMapping("/{householdId}/{year}/{month}")
    public ResponseEntity<AlertDTO> getAlertForMonth(
            @PathVariable Long householdId,
            @PathVariable int year,
            @PathVariable int month) {
        return ResponseEntity.ok(alertService.getAlertForMonth(householdId, year, month));
    }
}