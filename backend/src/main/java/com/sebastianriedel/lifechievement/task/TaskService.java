package com.sebastianriedel.lifechievement.task;

import com.sebastianriedel.lifechievement.task.dto.TaskCreateDTO;
import com.sebastianriedel.lifechievement.task.dto.TaskResponseDTO;
import com.sebastianriedel.lifechievement.task.dto.TaskUpdateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    TaskRepository taskRepository;

    public List<TaskResponseDTO> getAllTasks() {

        List<Task> tasks = taskRepository.findAll();

        return tasks.stream()
                .map(task -> new TaskResponseDTO(
                        task.getId(),
                        task.getDescription(),
                        task.getPoints(),
                        task.isStatus()
                ))
                .toList();
    }


    public void createTask(TaskCreateDTO dto) {

        Task task = new Task();
        task.setDescription(dto.getDescription());
        task.setPoints(dto.getPoints());
        task.setStatus(dto.isStatus());

        taskRepository.save(task);
    }


    public void updateTask(TaskUpdateDTO dto, Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        Task existingTask = optionalTask.get();
        existingTask.setDescription(dto.getDescription());
        existingTask.setPoints(dto.getPoints());
        existingTask.setStatus(dto.isStatus());
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
