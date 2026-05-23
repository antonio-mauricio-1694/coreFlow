package com.coreflow.backend.controller;

import com.coreflow.backend.domain.TransactionCategory;
import com.coreflow.backend.domain.TransactionType;
import com.coreflow.backend.dto.TransactionRequestDTO;
import com.coreflow.backend.dto.TransactionResponseDTO;
import com.coreflow.backend.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public ResponseEntity<TransactionResponseDTO> create(@RequestBody TransactionRequestDTO dto) {
        return ResponseEntity.ok(transactionService.create(dto));
    }

    @GetMapping("/household/{householdId}")
    public ResponseEntity<List<TransactionResponseDTO>> findByHousehold(@PathVariable Long householdId) {
        return ResponseEntity.ok(transactionService.findByHousehold(householdId));
    }

    @GetMapping("/household/{householdId}/type/{type}")
    public ResponseEntity<List<TransactionResponseDTO>> findByType(
            @PathVariable Long householdId,
            @PathVariable TransactionType type) {
        return ResponseEntity.ok(transactionService.findByHouseholdAndType(householdId, type));
    }

    @GetMapping("/household/{householdId}/category/{category}")
    public ResponseEntity<List<TransactionResponseDTO>> findByCategory(
            @PathVariable Long householdId,
            @PathVariable TransactionCategory category) {
        return ResponseEntity.ok(transactionService.findByHouseholdAndCategory(householdId, category));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        transactionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}