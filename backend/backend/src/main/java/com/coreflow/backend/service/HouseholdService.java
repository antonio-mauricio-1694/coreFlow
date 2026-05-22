package com.coreflow.backend.service;

import com.coreflow.backend.domain.Household;
import com.coreflow.backend.repository.HouseholdRepository;

import org.springframework.stereotype.Service;

@Service
public class HouseholdService {

    private final HouseholdRepository householdRepository;

    public HouseholdService(
            HouseholdRepository householdRepository
    ) {

        this.householdRepository = householdRepository;
    }

    public Household create(
            Household household
    ) {

        return householdRepository.save(household);
    }
}