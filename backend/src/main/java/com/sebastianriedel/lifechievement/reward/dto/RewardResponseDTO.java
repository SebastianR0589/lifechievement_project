package com.sebastianriedel.lifechievement.reward.dto;

public class RewardResponseDTO {

    private Long id;
    private String description;
    private int cost;
    private boolean redeemed;

    //Constructor
    public RewardResponseDTO(Long id, String description, int cost, boolean redeemed) {
        this.id = id;
        this.description = description;
        this.cost = cost;
        this.redeemed = redeemed;
    }

    //Getter
    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public int getCost() {
        return cost;
    }

    public boolean getRedeemed() {
        return redeemed;
    }


}
