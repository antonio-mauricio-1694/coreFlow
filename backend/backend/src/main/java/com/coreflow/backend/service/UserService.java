package com.coreflow.backend.service;


import com.coreflow.backend.domain.User;
import com.coreflow.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import com.coreflow.backend.dto.UserResponseDTO;
@Service
public class UserService {




    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponseDTO> findAll() {

        return userRepository.findAll()
                .stream()
                .map(user -> new UserResponseDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail()
                ))
                .toList();
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public UserResponseDTO findById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }
}
