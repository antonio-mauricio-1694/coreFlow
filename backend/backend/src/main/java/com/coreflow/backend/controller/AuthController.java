package com.coreflow.backend.controller;

import com.coreflow.backend.dto.LoginRequestDTO;
import com.coreflow.backend.dto.LoginResponseDTO;
import com.coreflow.backend.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody LoginRequestDTO dto
    ) {

        return ResponseEntity.ok(
                authService.login(dto)
        );
    }
}