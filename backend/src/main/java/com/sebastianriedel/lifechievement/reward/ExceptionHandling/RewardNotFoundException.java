package com.sebastianriedel.lifechievement.reward.ExceptionHandling;

public class RewardNotFoundException extends RuntimeException {
    public RewardNotFoundException(Long id) {
        super("Reward with ID" + id + "not found");
    }
}
