package com.coreflow.backend.repository;

import com.coreflow.backend.domain.Household;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HouseholdRepository
        extends JpaRepository<Household, Long> {

}