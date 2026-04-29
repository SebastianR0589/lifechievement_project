package com.sebastianriedel.lifechievement.task;


import com.sebastianriedel.lifechievement.balance.BalanceService;
import com.sebastianriedel.lifechievement.task.ExceptionHandling.TaskNotFoundException;
import com.sebastianriedel.lifechievement.task.dto.TaskUpdateDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private BalanceService balanceService;

    @InjectMocks
    private TaskService taskService;

    @Test
    void updateTask_shouldAddPoints_WhenTaskIsMarkedDone() {
        Long id = 1L;
        Task task = new Task();
        task.setPoints(20);
        task.setStatus(false);
        task.setRepeatable(false);

        TaskUpdateDTO dto = new TaskUpdateDTO();
        dto.setPoints(20);
        dto.setStatus(true);

        when(taskRepository.findById(id)).thenReturn(Optional.of(task));

        taskService.updateTask(dto, id);

        verify(balanceService).updateBalance(20);
        assertTrue(task.isArchived());
        verify(taskRepository).save(task);
    }

    @Test
    void updateTask_shouldIncreaseDoneCount_WhenTaskIsRepeatable() {
        Long id = 1L;
        Task task = new Task();
        task.setPoints(10);
        task.setStatus(false);
        task.setRepeatable(true);
        task.setDone(0);

        TaskUpdateDTO dto = new TaskUpdateDTO();
        dto.setStatus(true);
        dto.setRepeatable(true);
        dto.setPoints(10);

        when(taskRepository.findById(id)).thenReturn(Optional.of(task));

        taskService.updateTask(dto, id);

        assertEquals(1, task.getDone());
        assertFalse(task.isStatus(), "Repeatable tasks should turn open again");
        verify(balanceService).updateBalance(10);
    }

    @Test
    void updateTask_shouldSubtractPoints_WhenStatusIsReverted() {
        Long id = 1L;
        Task task = new Task();
        task.setPoints(50);
        task.setStatus(true);

        TaskUpdateDTO dto = new TaskUpdateDTO();
        dto.setStatus(false);
        dto.setPoints(50);

        when(taskRepository.findById(id)).thenReturn(Optional.of(task));

        taskService.updateTask(dto, id);

        verify(balanceService).updateBalance(-50);
        assertFalse(task.isArchived());
    }

    @Test
    void getActiveTaskById_shouldThrowException_WhenNotFound() {
        Long id = 99L;
        when(taskRepository.findByIdAndArchivedFalse(id)).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> taskService.getActiveTaskById(id));
    }

    @Test
    void unarchiveTask_shouldResetTaskState() {
        Long id = 1L;
        Task archivedTask = new Task();
        archivedTask.setArchived(true);
        archivedTask.setDone(10);

        when(taskRepository.findByIdAndArchivedTrue(id)).thenReturn(Optional.of(archivedTask));

        taskService.unarchiveTask(id);

        assertFalse(archivedTask.isArchived());
        assertEquals(0, archivedTask.getDone());
        verify(taskRepository).save(archivedTask);
    }
}