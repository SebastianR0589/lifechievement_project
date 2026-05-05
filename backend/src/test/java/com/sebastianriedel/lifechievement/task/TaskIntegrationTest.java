package com.sebastianriedel.lifechievement.task;

import com.sebastianriedel.lifechievement.balance.BalanceRepository;
import com.sebastianriedel.lifechievement.balance.BalanceService;
import com.sebastianriedel.lifechievement.task.dto.TaskCreateDTO;
import com.sebastianriedel.lifechievement.task.dto.TaskUpdateDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Testcontainers
@Transactional
class TaskIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private BalanceService balanceService;

    @Test
    void updateTask_shouldCompleteRepeatableTaskAndIncreaseDoneCount() {
        Task task = new Task();
        task.setDescription("Task Integration Test");
        task.setPoints(20);
        task.setRepeatable(true);
        task.setDone(0);
        task.setStatus(false);
        task = taskRepository.save(task);

        TaskUpdateDTO dto = new TaskUpdateDTO();
        dto.setDescription("Task Integration Test");
        dto.setPoints(20);
        dto.setStatus(true); // Wir haken ihn ab
        dto.setRepeatable(true);

        // 2. Act
        taskService.updateTask(dto, task.getId());

        // 3. Assert
        Task updated = taskRepository.findById(task.getId()).get();
        assertEquals(1, updated.getDone(), "Done counter needs to go up");
        assertFalse(updated.isStatus(), "Status should switch");
        assertFalse(updated.isArchived(), "Repeatable tasks shouldn't be archived");
        assertEquals(20, balanceService.getBalance(), "Points need to be adde");
    }

    @Test
    void updateTask_shouldArchiveOneTimeTask() {
        Task task = new Task();
        task.setPoints(100);
        task.setRepeatable(false);
        task.setStatus(false);
        task = taskRepository.save(task);

        TaskUpdateDTO dto = new TaskUpdateDTO();
        dto.setStatus(true);
        dto.setPoints(100);
        dto.setRepeatable(false);

        taskService.updateTask(dto, task.getId());

        Task updated = taskRepository.findById(task.getId()).get();
        assertTrue(updated.isArchived(), "One time tasks need to be archived");
        assertEquals(100, balanceService.getBalance());
    }

    @Test
    void updateTask_shouldDeductPointsWhenRevertingStatus() {
        balanceService.updateBalance(50);
        Task task = new Task();
        task.setPoints(50);
        task.setStatus(true);
        task = taskRepository.save(task);

        TaskUpdateDTO dto = new TaskUpdateDTO();
        dto.setStatus(false);
        dto.setPoints(50);

        taskService.updateTask(dto, task.getId());

        assertEquals(0, balanceService.getBalance(), "Points need to be subtracted");
        assertFalse(taskRepository.findById(task.getId()).get().isArchived());
    }
}