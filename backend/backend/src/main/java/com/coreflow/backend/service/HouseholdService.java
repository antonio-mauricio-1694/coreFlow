package com.coreflow.backend.service;

import com.coreflow.backend.domain.Household;
import com.coreflow.backend.domain.User;
import com.coreflow.backend.dto.AddUserToHouseholdDTO;
import com.coreflow.backend.dto.HouseholdResponseDTO;
import com.coreflow.backend.repository.HouseholdRepository;
import com.coreflow.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HouseholdService {

    private final HouseholdRepository householdRepository;
    private final UserRepository userRepository;

    public HouseholdService(HouseholdRepository householdRepository,
                            UserRepository userRepository) {
        this.householdRepository = householdRepository;
        this.userRepository = userRepository;
    }

    public HouseholdResponseDTO create(String name) {
        Household household = new Household(name);
        Household saved = householdRepository.save(household);
        return toDTO(saved);
    }

    public HouseholdResponseDTO addUser(AddUserToHouseholdDTO dto) {
        Household household = householdRepository.findById(dto.getHouseholdId())
                .orElseThrow(() -> new RuntimeException("Household não encontrado: " + dto.getHouseholdId()));

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado: " + dto.getUserId()));

        household.addMember(user);
        Household saved = householdRepository.save(household);
        return toDTO(saved);
    }

    public List<HouseholdResponseDTO> findAll() {
        return householdRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public HouseholdResponseDTO findById(Long id) {
        return householdRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Household não encontrado: " + id));
    }

    private HouseholdResponseDTO toDTO(Household household) {
        List<String> memberNames = household.getMembers()
                .stream()
                .map(User::getName)
                .toList();
        return new HouseholdResponseDTO(household.getId(), household.getName(), memberNames);
    }
}