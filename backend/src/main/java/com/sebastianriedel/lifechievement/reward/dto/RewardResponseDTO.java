package com.sebastianriedel.lifechievement.reward.dto;

public class RewardResponseDTO {

    private Long id;
    private String description;
    private int cost;
    private boolean redeemed;
    private boolean state;

    //Constructor
    public RewardResponseDTO(Long id, String description, int cost, boolean redeemed, boolean state) {
        this.id = id;
        this.description = description;
        this.cost = cost;
        this.redeemed = redeemed;
        this.state = state;
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

    public boolean isRedeemed() {
        return redeemed;
    }

    public boolean isState() {return state;}


}
