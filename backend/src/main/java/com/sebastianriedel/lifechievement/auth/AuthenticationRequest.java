package com.sebastianriedel.lifechievement.auth;

public record AuthenticationRequest(
        String email,
        String password
) {}