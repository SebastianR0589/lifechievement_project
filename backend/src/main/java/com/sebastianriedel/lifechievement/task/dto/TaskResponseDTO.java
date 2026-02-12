package com.sebastianriedel.lifechievement.task.dto;

public class TaskResponseDTO {

    private Long id;
    private String description;
    private int points;
    private boolean status;

    public TaskResponseDTO(Long id, String description, int points, boolean status) {
        this.id = id;
        this.description = description;
        this.points = points;
        this.status = status;
    }

    // Getter
    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public int getPoints() {
        return points;
    }

    public boolean isStatus() {
        return status;
    }
}
