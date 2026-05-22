package com.coreflow.backend.controller;

import com.coreflow.backend.domain.Household;
import com.coreflow.backend.service.HouseholdService;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/households")
public class HouseholdController {

    private final HouseholdService householdService;

    public HouseholdController(
            HouseholdService householdService
    ) {

        this.householdService = householdService;
    }

    @PostMapping
    public ResponseEntity<Household> create(
            @RequestBody Household household
    ) {

        return ResponseEntity.ok(
                householdService.create(household)
        );
    }
}