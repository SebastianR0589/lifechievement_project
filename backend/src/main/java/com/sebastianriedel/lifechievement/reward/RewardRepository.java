package com.sebastianriedel.lifechievement.reward;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RewardRepository extends JpaRepository<Reward, Long> {

    List<Reward> findByArchivedFalse();
    List<Reward> findByArchivedTrue();

    Optional<Reward> findByIdAndArchivedFalse(Long id);
    Optional<Reward> findByIdAndArchivedTrue(Long id);
}
