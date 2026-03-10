package com.sebastianriedel.lifechievement.reward.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class RewardUpdateDTO {

    @NotBlank
    private String description;
    @Min(1)
    private int cost;
    private int gotten;
    private boolean redeemed;
    private boolean state;
    private boolean repeatable;

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

    public int getGotten() {
        return gotten;
    }

    public void setGotten(int gotten) {
        this.gotten = gotten;
    }

    public boolean isRedeemed() {
        return redeemed;
    }

    public void setRedeemed(boolean redeemed) {
        this.redeemed = redeemed;
    }

    public boolean isState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
    }

    public boolean isRepeatable() {
        return repeatable;
    }

    public void setRepeatable(boolean repeatable) {
        this.repeatable = repeatable;
    }

}
