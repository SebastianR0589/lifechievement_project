package com.sebastianriedel.lifechievement.task;


import com.sebastianriedel.lifechievement.task.dto.TaskCreateDTO;
import com.sebastianriedel.lifechievement.task.dto.TaskResponseDTO;
import com.sebastianriedel.lifechievement.task.dto.TaskUpdateDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    TaskService taskService;

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
        return new TaskResponseDTO(
                task.getId(),
                task.getDescription(),
                task.getPoints(),
                task.isStatus(),
                task.isState()
        );
    }

    @PutMapping("/{id}")
    public TaskResponseDTO updateTask(@Valid @RequestBody TaskUpdateDTO dto, @PathVariable Long id) {
        Task task = taskService.updateTask(dto, id);
        return new TaskResponseDTO(task.getId(),
                task.getDescription(),
                task.getPoints(),
                task.isStatus(),
                task.isState()
        );
    }

    @PatchMapping("/{id}/archive")
    public TaskResponseDTO archiveTask(@PathVariable Long id) {
        Task task = taskService.archiveTask(id);
        return new TaskResponseDTO(
                task.getId(),
                task.getDescription(),
                task.getPoints(),
                task.isStatus(),
                task.isState()
        );
    }

    @PatchMapping("/{id}/unarchive")
    public TaskResponseDTO unarchiveTask(@PathVariable Long id) {
        Task task = taskService.unarchiveTask(id);
        return new TaskResponseDTO(
                task.getId(),
                task.getDescription(),
                task.getPoints(),
                task.isStatus(),
                task.isState()
        );
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
