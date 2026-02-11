package com.sebastianriedel.lifechievement.task.dto;

public class TaskUpdateDTO {

    private String description;
    private int points;
    private boolean status;

    // Getter + Setter

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
}
