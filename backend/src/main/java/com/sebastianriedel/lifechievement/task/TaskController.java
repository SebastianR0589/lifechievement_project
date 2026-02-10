package com.sebastianriedel.lifechievement.task;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @GetMapping
    public List<Task> getTasks(){
        return List.of(
                new Task(1L, "Putze die Wohnung", 50, false),
                new Task(2L, "Putze die Fenster", 100, false)
        );
    }
}
