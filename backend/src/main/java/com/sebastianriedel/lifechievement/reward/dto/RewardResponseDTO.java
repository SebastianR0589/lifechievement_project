package com.sebastianriedel.lifechievement.reward.dto;

public class RewardResponseDTO {

    private Long id;
    private String description;
    private int cost;
    private int gotten;
    private boolean redeemed;
    private boolean state;
    private boolean repeatable;

    //Constructor
    public RewardResponseDTO(Long id, String description, int cost, int gotten, boolean redeemed, boolean state, boolean repeatable) {
        this.id = id;
        this.description = description;
        this.cost = cost;
        this.gotten = gotten;
        this.redeemed = redeemed;
        this.state = state;
        this.repeatable = repeatable;
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

    public int getGotten() {
        return gotten;
    }

    public boolean isRedeemed() {
        return redeemed;
    }

    public boolean isState() {
        return state;
    }

    public boolean isRepeatable() {
        return repeatable;
    }


}
