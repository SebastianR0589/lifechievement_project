package com.sebastianriedel.lifechievement.auth;

public record RegisterRequest(
        String email,
        String password
) {}