package com.sebastianriedel.lifechievement.task;

import com.sebastianriedel.lifechievement.balance.BalanceService;
import com.sebastianriedel.lifechievement.task.ExceptionHandling.TaskNotFoundException;
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
    @Autowired
    BalanceService balanceService;

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

    public TaskResponseDTO getTaskById(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        return new TaskResponseDTO(
                task.getId(),
                task.getDescription(),
                task.getPoints(),
                task.isStatus()
        );
    }


    public Task createTask(TaskCreateDTO dto) {

        Task task = new Task();
        task.setDescription(dto.getDescription());
        task.setPoints(dto.getPoints());
        task.setStatus(dto.isStatus());

        return taskRepository.save(task);
    }


    public Task updateTask(TaskUpdateDTO dto, Long id) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        boolean oldStatus = existingTask.isStatus();

        existingTask.setDescription(dto.getDescription());
        existingTask.setPoints(dto.getPoints());
        existingTask.setStatus(dto.isStatus());

        boolean newStatus = dto.isStatus();

        if (!oldStatus && newStatus) {
            balanceService.updateBalance(existingTask.getPoints());
        }
        if (oldStatus && !newStatus) {
            balanceService.updateBalance(-existingTask.getPoints());
        }

        return taskRepository.save(existingTask);
    }

    public void deleteTask(Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
        } else {
            System.out.println("Task with " + id + " doesn't exist.");
        }
    }

}
