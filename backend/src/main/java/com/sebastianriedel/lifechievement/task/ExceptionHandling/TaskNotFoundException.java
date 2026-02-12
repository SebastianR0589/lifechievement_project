package com.sebastianriedel.lifechievement.task.ExceptionHandling;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(Long id) {
        super("Task with ID" + id + "not found");
    }
}
