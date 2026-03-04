package com.sebastianriedel.lifechievement.task.dto;

public class TaskResponseDTO {

    private Long id;
    private String description;
    private int points;
    private boolean status;
    private boolean state;

    public TaskResponseDTO(Long id, String description, int points, boolean status, boolean state) {
        this.id = id;
        this.description = description;
        this.points = points;
        this.status = status;
        this.state = state;
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

    public boolean isState() {return state;}
}
