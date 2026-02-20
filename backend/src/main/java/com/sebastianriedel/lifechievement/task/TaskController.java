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
    public List<TaskResponseDTO> getTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public TaskResponseDTO getTaskByID(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @PostMapping
    public TaskResponseDTO createTask(@Valid @RequestBody TaskCreateDTO dto) {
        Task task = taskService.createTask(dto);
        return new TaskResponseDTO(
                task.getId(),
                task.getDescription(),
                task.getPoints(),
                task.isStatus()
        );
    }

    @PutMapping("/{id}")
    public void updateTask(@Valid @RequestBody TaskUpdateDTO dto, @PathVariable Long id) {
        taskService.updateTask(dto, id);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
