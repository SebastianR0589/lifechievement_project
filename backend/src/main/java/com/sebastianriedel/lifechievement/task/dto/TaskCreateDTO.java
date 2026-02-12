package com.sebastianriedel.lifechievement.task.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class TaskCreateDTO {

    @NotBlank(message = "Description can't be empty")
    private String description;
    @Min(value = 1, message = "Points need to be over 1")
    @Max(value = 1000, message = "Points need to be under 1000")
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
