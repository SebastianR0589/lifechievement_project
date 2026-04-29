package com.sebastianriedel.lifechievement.task;


import com.sebastianriedel.lifechievement.task.dto.TaskCreateDTO;
import com.sebastianriedel.lifechievement.task.dto.TaskResponseDTO;
import com.sebastianriedel.lifechievement.task.dto.TaskUpdateDTO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService TaskService) {
        this.taskService = TaskService;
    }

    private TaskResponseDTO mapToDTO(Task task) {
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

    @GetMapping
    public List<TaskResponseDTO> getActiveTasks() {
        return taskService.getAllActiveTasks();
    }

    @GetMapping("/archived")
    public List<TaskResponseDTO> getArchivedTasks() {
        return taskService.getAllArchivedTasks();
    }


    @GetMapping("/{id}")
    public TaskResponseDTO getActiveTaskByID(@PathVariable Long id) {
        return taskService.getActiveTaskById(id);
    }

    @GetMapping("/archived/{id}")
    public TaskResponseDTO getArchivedTaskByID(@PathVariable Long id) {
        return taskService.getArchivedTaskById(id);
    }

    @PostMapping
    public TaskResponseDTO createTask(@Valid @RequestBody TaskCreateDTO dto) {
        Task task = taskService.createTask(dto);
        return mapToDTO(task);
    }

    @PutMapping("/{id}")
    public TaskResponseDTO updateTask(@Valid @RequestBody TaskUpdateDTO dto, @PathVariable Long id) {
        Task task = taskService.updateTask(dto, id);
        return mapToDTO(task);
    }

    @PatchMapping("/{id}/unarchive")
    public TaskResponseDTO unarchiveTask(@PathVariable Long id) {
        Task task = taskService.unarchiveTask(id);
        return mapToDTO(task);
    }

    @DeleteMapping("/{id}")
    public void deleteActiveTask(@PathVariable Long id) {
        taskService.deleteActiveTask(id);
    }

    @DeleteMapping("/archived/{id}")
    public void deleteArchivedTask(@PathVariable Long id) {
        taskService.deleteArchivedTask(id);
    }
}
