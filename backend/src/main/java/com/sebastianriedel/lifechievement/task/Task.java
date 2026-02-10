package com.sebastianriedel.lifechievement.task;

public class Task {
    private Long id;
    private String description;
    private int points;
    private boolean status;


    //Constructor
    public Task(Long id, String description, int points, boolean status){
        this.id = id;
        this.description = description;
        this.points = points;
        this.status = status;
    }

    //Getter & Setter
    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

    public int getPoints() {return points;}
    public void setPoints(int points) {this.points = points;}

    public boolean isStatus() {return status;}
    public void setStatus(boolean status) {this.status = status;}

}
