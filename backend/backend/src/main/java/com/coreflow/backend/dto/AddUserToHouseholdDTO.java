package com.coreflow.backend.dto;

public class AddUserToHouseholdDTO {

    private Long userId;

    private Long householdId;

    public AddUserToHouseholdDTO() {
    }

    public AddUserToHouseholdDTO(
            Long userId,
            Long householdId
    ) {

        this.userId = userId;
        this.householdId = householdId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getHouseholdId() {
        return householdId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setHouseholdId(Long householdId) {
        this.householdId = householdId;
    }
}