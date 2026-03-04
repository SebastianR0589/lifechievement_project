package com.sebastianriedel.lifechievement.reward;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RewardRepository extends JpaRepository<Reward, Long> {

    List<Reward> findByStateFalse();
    List<Reward> findByStateTrue();

    Optional<Reward> findByIdAndStateFalse(Long id);
    Optional<Reward> findByIdAndStateTrue(Long id);
}
