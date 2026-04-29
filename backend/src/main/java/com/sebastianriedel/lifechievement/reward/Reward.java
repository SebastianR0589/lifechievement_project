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
    private boolean redeemed;
    private boolean archived;
    private boolean repeatable;

    //Constructor
    public Reward() {
    }

    public Reward(String description, int cost, boolean repeatable) {
        this.description = description;
        this.cost = cost;
        this.gotten = 0;
        this.redeemed = false;
        this.archived = false;
        this.repeatable = repeatable;
    }

    //Getter & Setter

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

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }

    public boolean isRepeatable() {
        return repeatable;
    }

    public void setRepeatable(boolean repeatable) {
        this.repeatable = repeatable;
    }

}
