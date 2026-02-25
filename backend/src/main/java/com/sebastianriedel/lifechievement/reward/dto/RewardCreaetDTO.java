package com.sebastianriedel.lifechievement.reward.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class RewardCreaetDTO {

    @NotBlank
    private String description;
    @Min(1)
    private int cost;
    private boolean redeemed;


    //Getter & Setter

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    public boolean isRedeemed() {
        return redeemed;
    }

    public void setRedeemed(boolean redeemed) {
        this.redeemed = redeemed;
    }
}
