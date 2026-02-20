package com.sebastianriedel.lifechievement.reward;

import com.sebastianriedel.lifechievement.reward.dto.RewardCreaetDTO;
import com.sebastianriedel.lifechievement.reward.dto.RewardResponseDTO;
import com.sebastianriedel.lifechievement.reward.dto.RewardUpdateDTO;
import com.sebastianriedel.lifechievement.task.dto.TaskCreateDTO;
import com.sebastianriedel.lifechievement.task.dto.TaskUpdateDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rewards")
public class RewardController {
    @Autowired
    RewardService rewardService;

    @GetMapping
    public List<RewardResponseDTO> getReward() {
        return rewardService.getAllRewards();
    }

    @GetMapping("{id}")
    public RewardResponseDTO getRewardById(@PathVariable Long id) {
        return rewardService.getRewardById(id);
    }

    @PostMapping
    public RewardResponseDTO createReward(@Valid @RequestBody RewardCreaetDTO dto) {
        Reward reward = rewardService.createReward(dto);
        return new RewardResponseDTO(
                reward.getId(),
                reward.getDescription(),
                reward.getCost(),
                reward.getRedeemed()
        );
    }

    @PutMapping("{id}")
    public void updateReward(@Valid @RequestBody RewardUpdateDTO dto, @PathVariable Long id) {
        rewardService.updateReward(dto, id);
    }

    @DeleteMapping("{id}")
    public void deleteReward(@PathVariable Long id) {
        rewardService.deleteReward(id);
    }

}
