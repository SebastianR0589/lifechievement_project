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

    public List<TaskResponseDTO> getAllActiveTasks() {

        List<Task> tasks = taskRepository.findByStateFalse();

        return tasks.stream()
                .map(task -> new TaskResponseDTO(
                        task.getId(),
                        task.getDescription(),
                        task.getPoints(),
                        task.getDone(),
                        task.isStatus(),
                        task.isState(),
                        task.isRepeatable()
                ))
                .toList();
    }

    public List<TaskResponseDTO> getAllArchivedTasks() {
        List<Task> tasks = taskRepository.findByStateTrue();

        return tasks.stream()
                .map(task -> new TaskResponseDTO(
                        task.getId(),
                        task.getDescription(),
                        task.getPoints(),
                        task.getDone(),
                        task.isStatus(),
                        task.isState(),
                        task.isRepeatable()
                ))
                .toList();
    }


    public TaskResponseDTO getActiveTaskById(Long id) {

        Task task = taskRepository.findByIdAndStateFalse(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        return new TaskResponseDTO(
                task.getId(),
                task.getDescription(),
                task.getPoints(),
                task.getDone(),
                task.isStatus(),
                task.isState(),
                task.isRepeatable()
        );
    }

    public TaskResponseDTO getArchivedTaskById(Long id) {

        Task task = taskRepository.findByIdAndStateTrue(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        return new TaskResponseDTO(
                task.getId(),
                task.getDescription(),
                task.getPoints(),
                task.getDone(),
                task.isStatus(),
                task.isState(),
                task.isRepeatable()
        );
    }


    public Task createTask(TaskCreateDTO dto) {

        Task task = new Task();
        task.setDescription(dto.getDescription());
        task.setPoints(dto.getPoints());
        task.setStatus(dto.isStatus());
        task.setState(dto.isState());
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
                existingTask.setState(true);
            }
        }
        if (oldStatus && !newStatus) {
            balanceService.updateBalance(-existingTask.getPoints());
            existingTask.setState(false);
        }

        return taskRepository.save(existingTask);
    }

    public Task archiveTask(Long id) {
        Task task = taskRepository.findByIdAndStateFalse(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        task.setState(true);
        return taskRepository.save(task);
    }

    public Task unarchiveTask(Long id) {
        Task task = taskRepository.findByIdAndStateTrue(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        task.setState(false);
        task.setStatus(false);
        task.setDone(0);
        return taskRepository.save(task);
    }

    public void deleteActiveTask(Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
        } else {
            System.out.println("Task with " + id + " doesn't exist.");
        }
    }

    public void deleteArchivedTask(Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
        } else {
            System.out.println("Task with " + id + " doesn't exist.");
        }
    }

}
