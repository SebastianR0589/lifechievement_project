package com.sebastianriedel.lifechievement.task;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByStateFalse();

    List<Task> findByStateTrue();

    Optional<Task> findByIdAndStateFalse(Long id);
    Optional<Task> findByIdAndStateTrue(Long id);

}
