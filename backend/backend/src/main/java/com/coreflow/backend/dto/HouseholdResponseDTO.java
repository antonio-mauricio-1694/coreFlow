package com.coreflow.backend.dto;

import java.util.List;

public class HouseholdResponseDTO {

    private Long id;
    private String name;
    private List<String> members;

    public HouseholdResponseDTO(Long id, String name, List<String> members) {
        this.id = id;
        this.name = name;
        this.members = members;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public List<String> getMembers() { return members; }
}