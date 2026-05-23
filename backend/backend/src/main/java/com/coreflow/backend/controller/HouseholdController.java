package com.coreflow.backend.controller;

import com.coreflow.backend.dto.AddUserToHouseholdDTO;
import com.coreflow.backend.dto.HouseholdResponseDTO;
import com.coreflow.backend.service.HouseholdService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/households")
public class HouseholdController {

    private final HouseholdService householdService;

    public HouseholdController(HouseholdService householdService) {
        this.householdService = householdService;
    }

    @PostMapping
    public ResponseEntity<HouseholdResponseDTO> create(@RequestParam String name) {
        return ResponseEntity.ok(householdService.create(name));
    }

    @PostMapping("/add-user")
    public ResponseEntity<HouseholdResponseDTO> addUser(@RequestBody AddUserToHouseholdDTO dto) {
        return ResponseEntity.ok(householdService.addUser(dto));
    }

    @GetMapping
    public ResponseEntity<List<HouseholdResponseDTO>> findAll() {
        return ResponseEntity.ok(householdService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HouseholdResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(householdService.findById(id));
    }
}