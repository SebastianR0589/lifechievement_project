package com.sebastianriedel.lifechievement.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public void createTask(Task task) {
        taskRepository.save(task);
    }

    public void updateTask(Task task, Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        Task existingTask = optionalTask.get();
        existingTask.setDescription(task.getDescription());
        existingTask.setPoints(task.getPoints());
        existingTask.setStatus(task.isStatus());
        taskRepository.save(existingTask);
    }

    public void deleteTask(Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
        } else {
            System.out.println("Task mit ID " + id + " existiert nicht.");
        }
    }

}
