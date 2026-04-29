package com.sebastianriedel.lifechievement.task;

import com.sebastianriedel.lifechievement.balance.BalanceService;
import com.sebastianriedel.lifechievement.task.ExceptionHandling.TaskNotFoundException;
import com.sebastianriedel.lifechievement.task.dto.TaskCreateDTO;
import com.sebastianriedel.lifechievement.task.dto.TaskResponseDTO;
import com.sebastianriedel.lifechievement.task.dto.TaskUpdateDTO;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final BalanceService balanceService;

    public TaskService(TaskRepository taskRepository, BalanceService balanceService) {
        this.taskRepository = taskRepository;
        this.balanceService = balanceService;
    }

    public List<TaskResponseDTO> getAllActiveTasks() {

        List<Task> tasks = taskRepository.findByArchivedFalse();

        return tasks.stream()
                .map(task -> new TaskResponseDTO(
                        task.getId(),
                        task.getDescription(),
                        task.getPoints(),
                        task.getDone(),
                        task.isStatus(),
                        task.isArchived(),
                        task.isRepeatable()
                ))
                .toList();
    }

    public List<TaskResponseDTO> getAllArchivedTasks() {
        List<Task> tasks = taskRepository.findByArchivedTrue();

        return tasks.stream()
                .map(task -> new TaskResponseDTO(
                        task.getId(),
                        task.getDescription(),
                        task.getPoints(),
                        task.getDone(),
                        task.isStatus(),
                        task.isArchived(),
                        task.isRepeatable()
                ))
                .toList();
    }


    public TaskResponseDTO getActiveTaskById(Long id) {

        Task task = taskRepository.findByIdAndArchivedFalse(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        return new TaskResponseDTO(
                task.getId(),
                task.getDescription(),
                task.getPoints(),
                task.getDone(),
                task.isStatus(),
                task.isArchived(),
                task.isRepeatable()
        );
    }

    public TaskResponseDTO getArchivedTaskById(Long id) {

        Task task = taskRepository.findByIdAndArchivedTrue(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        return new TaskResponseDTO(
                task.getId(),
                task.getDescription(),
                task.getPoints(),
                task.getDone(),
                task.isStatus(),
                task.isArchived(),
                task.isRepeatable()
        );
    }


    public Task createTask(TaskCreateDTO dto) {

        Task task = new Task();
        task.setDescription(dto.getDescription());
        task.setPoints(dto.getPoints());
        task.setRepeatable(dto.isRepeatable());

        return taskRepository.save(task);
    }


    public Task updateTask(TaskUpdateDTO dto, Long id) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        boolean oldStatus = existingTask.isStatus();

        existingTask.setDescription(dto.getDescription());
        existingTask.setPoints(dto.getPoints());
        existingTask.setStatus(dto.isStatus());
        existingTask.setRepeatable(dto.isRepeatable());

        boolean newStatus = dto.isStatus();

        if (!oldStatus && newStatus) {
            balanceService.updateBalance(existingTask.getPoints());
            if (existingTask.isRepeatable()) {
                existingTask.setDone(existingTask.getDone() + 1);
                existingTask.setStatus(false);
            } else {
                existingTask.setArchived(true);
            }
        }
        if (oldStatus && !newStatus) {
            balanceService.updateBalance(-existingTask.getPoints());
            existingTask.setArchived(false);
        }

        return taskRepository.save(existingTask);
    }

    public Task unarchiveTask(Long id) {
        Task task = taskRepository.findByIdAndArchivedTrue(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        task.setArchived(false);
        task.setStatus(false);
        task.setDone(0);
        return taskRepository.save(task);
    }

    public void deleteActiveTask(Long id) {
            taskRepository.deleteById(id);
    }

    public void deleteArchivedTask(Long id) {
            taskRepository.deleteById(id);
    }

}
