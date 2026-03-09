package com.sebastianriedel.lifechievement.task.dto;

public class TaskResponseDTO {

    private Long id;
    private String description;
    private int points;
    private int done;
    private boolean status;
    private boolean state;
    private boolean repeatable;

    public TaskResponseDTO(Long id, String description, int points, int done, boolean status, boolean state, boolean repeatable) {
        this.id = id;
        this.description = description;
        this.points = points;
        this.done = done;
        this.status = status;
        this.state = state;
        this.repeatable = repeatable;
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

    public int getDone() {
        return done;
    }

    public boolean isStatus() {
        return status;
    }

    public boolean isState() {
        return state;
    }

    public boolean isRepeatable() {
        return repeatable;
    }
}
