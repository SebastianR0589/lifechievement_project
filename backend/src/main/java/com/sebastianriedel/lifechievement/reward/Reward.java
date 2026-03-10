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
    private int gotten;
    //status false = not redeemed; status true = redeemed
    private boolean redeemed;
    //state false = active; state true = archive
    private boolean state;
    private boolean repeatable;

    //Constructor
    public Reward() {
    }

    public Reward(String description, int cost, int gotten, boolean redeemed, boolean state, boolean repeatable) {
        this.description = description;
        this.cost = cost;
        this.gotten = gotten;
        this.redeemed = redeemed;
        this.state = state;
        this.repeatable = repeatable;
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
