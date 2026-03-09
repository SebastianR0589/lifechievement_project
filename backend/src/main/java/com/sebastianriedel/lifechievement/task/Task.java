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
    //status false = not done; status true = done
    private boolean status;
    //state false = active; state true = archive
    private boolean state;
    private boolean repeatable;


    //Constructor
    public Task() {
    }

    public Task(String description, int points, int done, boolean status, boolean state, boolean repeatable) {
        this.description = description;
        this.points = points;
        this.done = done;
        this.status = status;
        this.state = state;
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
