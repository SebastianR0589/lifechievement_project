package com.sebastianriedel.lifechievement.task;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByArchivedFalse();

    List<Task> findByArchivedTrue();

    Optional<Task> findByIdAndArchivedFalse(Long id);
    Optional<Task> findByIdAndArchivedTrue(Long id);

}
