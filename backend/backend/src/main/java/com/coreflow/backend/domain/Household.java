package com.coreflow.backend.domain;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "households")
public class Household {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany
    @JoinTable(
            name = "household_users",
            joinColumns = @JoinColumn(name = "household_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> members = new HashSet<>();

    public Household() {}

    public Household(String name) {
        this.name = name;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public Set<User> getMembers() { return members; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setMembers(Set<User> members) { this.members = members; }

    public void addMember(User user) {
        this.members.add(user);
    }
}