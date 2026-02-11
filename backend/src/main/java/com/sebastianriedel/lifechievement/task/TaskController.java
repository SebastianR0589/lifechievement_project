package com.sebastianriedel.lifechievement.task;


import com.sebastianriedel.lifechievement.task.dto.TaskCreateDTO;
import com.sebastianriedel.lifechievement.task.dto.TaskResponseDTO;
import com.sebastianriedel.lifechievement.task.dto.TaskUpdateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    TaskService taskService;

    @GetMapping
    public List<TaskResponseDTO> getTasks(){
       return taskService.getAllTasks();
    }

    @PostMapping
    public void createTask(@RequestBody TaskCreateDTO dto) {
        taskService.createTask(dto);
    }

    @PutMapping("/{id}")
    public void updateTask(@RequestBody TaskUpdateDTO dto, @PathVariable Long id){
        taskService.updateTask(dto, id);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id){
        taskService.deleteTask(id);
    }
}
