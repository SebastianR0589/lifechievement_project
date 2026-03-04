package com.sebastianriedel.lifechievement.task;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Task {
    @Id
    @GeneratedValue
    private Long id;
    private String description;
    private int points;
    private boolean status;
    private boolean state;


    //Constructor
    public Task() {
    }

    public Task(String description, int points, boolean status, boolean state) {
        this.description = description;
        this.points = points;
        this.status = status;
        this.state = state;
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

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public boolean isState() {return state;}

    public void setState(boolean state) {this.state = state;}

}
