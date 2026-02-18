package com.sebastianriedel.lifechievement.reward;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Reward {
    @Id
    @GeneratedValue
    private Long id;
    private String description;
    private int cost;
    private boolean redeemed;

    //Constructor
    public Reward() {
    }

    public Reward(String description, int cost, boolean redeemed) {
        this.description = description;
        this.cost = cost;
        this.redeemed = redeemed;
    }

    //Getter 6 Setter

    public Long getId() {
        return id;
    }


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

    public boolean getRedeemed() {
        return redeemed;
    }

    public void setRedeemed(boolean redeemed) {
        this.redeemed = redeemed;
    }


}
