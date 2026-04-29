package com.sebastianriedel.lifechievement.reward.dto;

public record RewardResponseDTO(Long id, String description, int cost, int gotten, boolean redeemed, boolean archived,
                                boolean repeatable) {



}
