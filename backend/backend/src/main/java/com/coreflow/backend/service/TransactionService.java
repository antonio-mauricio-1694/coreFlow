package com.coreflow.backend.service;

import com.coreflow.backend.domain.Household;
import com.coreflow.backend.domain.Transaction;
import com.coreflow.backend.domain.TransactionCategory;
import com.coreflow.backend.domain.TransactionType;
import com.coreflow.backend.domain.User;
import com.coreflow.backend.dto.TransactionRequestDTO;
import com.coreflow.backend.dto.TransactionResponseDTO;
import com.coreflow.backend.repository.HouseholdRepository;
import com.coreflow.backend.repository.TransactionRepository;
import com.coreflow.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final HouseholdRepository householdRepository;
    private final UserRepository userRepository;

    public TransactionService(TransactionRepository transactionRepository,
                              HouseholdRepository householdRepository,
                              UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.householdRepository = householdRepository;
        this.userRepository = userRepository;
    }

    public TransactionResponseDTO create(TransactionRequestDTO dto) {
        Household household = householdRepository.findById(dto.getHouseholdId())
                .orElseThrow(() -> new RuntimeException("Household não encontrado: " + dto.getHouseholdId()));

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado: " + dto.getUserId()));

        Transaction transaction = new Transaction();
        transaction.setDescription(dto.getDescription());
        transaction.setAmount(dto.getAmount());
        transaction.setType(dto.getType());
        transaction.setCategory(dto.getCategory());
        transaction.setDate(dto.getDate());
        transaction.setHousehold(household);
        transaction.setCreatedBy(user);

        Transaction saved = transactionRepository.save(transaction);
        return toDTO(saved);
    }

    public List<TransactionResponseDTO> findByHousehold(Long householdId) {
        return transactionRepository.findByHouseholdId(householdId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public List<TransactionResponseDTO> findByHouseholdAndType(Long householdId, TransactionType type) {
        return transactionRepository.findByHouseholdIdAndType(householdId, type)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public List<TransactionResponseDTO> findByHouseholdAndCategory(Long householdId, TransactionCategory category) {
        return transactionRepository.findByHouseholdIdAndCategory(householdId, category)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public void delete(Long id) {
        transactionRepository.deleteById(id);
    }

    private TransactionResponseDTO toDTO(Transaction t) {
        return new TransactionResponseDTO(
                t.getId(),
                t.getDescription(),
                t.getAmount(),
                t.getType(),
                t.getCategory(),
                t.getDate(),
                t.getCreatedBy().getName(),
                t.getHousehold().getId()
        );
    }
}