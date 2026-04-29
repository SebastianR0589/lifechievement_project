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
    private int done;
    private boolean status;
    private boolean archived;
    private boolean repeatable;


    //Constructor
    public Task() {
    }

    public Task(String description, int points, boolean repeatable) {
        this.description = description;
        this.points = points;
        this.done = 0;
        this.status = false;
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

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getDone() {
        return done;
    }

    public void setDone(int done) {
        this.done = done;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
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
