package com.sebastianriedel.lifechievement.reward;

import com.sebastianriedel.lifechievement.reward.dto.RewardCreaetDTO;
import com.sebastianriedel.lifechievement.reward.dto.RewardResponseDTO;
import com.sebastianriedel.lifechievement.reward.dto.RewardUpdateDTO;
import com.sebastianriedel.lifechievement.task.Task;
import com.sebastianriedel.lifechievement.task.dto.TaskCreateDTO;
import com.sebastianriedel.lifechievement.task.dto.TaskResponseDTO;
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
    public List<RewardResponseDTO> getActiveReward() {
        return rewardService.getAllActiveRewards();
    }

    @GetMapping("/archived")
    public List<RewardResponseDTO> getArchivedReward() {
        return rewardService.getAllArchivedRewards();
    }

    @GetMapping("{id}")
    public RewardResponseDTO getActiveRewardById(@PathVariable Long id) {
        return rewardService.getActiveRewardById(id);
    }

    @GetMapping("/archived/{id}")
    public RewardResponseDTO getArchivedRewardById(@PathVariable Long id) {
        return rewardService.getArchivedRewardById(id);
    }

    @PostMapping
    public RewardResponseDTO createReward(@Valid @RequestBody RewardCreaetDTO dto) {
        Reward reward = rewardService.createReward(dto);
        return new RewardResponseDTO(
                reward.getId(),
                reward.getDescription(),
                reward.getCost(),
                reward.getGotten(),
                reward.isRedeemed(),
                reward.isState(),
                reward.isRepeatable()
        );
    }

    @PutMapping("{id}")
    public RewardResponseDTO updateReward(@Valid @RequestBody RewardUpdateDTO dto, @PathVariable Long id) {
        Reward reward = rewardService.updateReward(dto, id);
        return new RewardResponseDTO(
                reward.getId(),
                reward.getDescription(),
                reward.getCost(),
                reward.getGotten(),
                reward.isRedeemed(),
                reward.isState(),
                reward.isRepeatable()
        );
    }

    @PatchMapping("/{id}/archive")
    public RewardResponseDTO archiveTask(@PathVariable Long id) {
        Reward reward = rewardService.archiveReward(id);
        return new RewardResponseDTO(
                reward.getId(),
                reward.getDescription(),
                reward.getCost(),
                reward.getGotten(),
                reward.isRedeemed(),
                reward.isState(),
                reward.isRepeatable()
        );
    }

    @PatchMapping("/{id}/unarchive")
    public RewardResponseDTO unarchiveTask(@PathVariable Long id) {
        Reward reward = rewardService.unarchiveReward(id);
        return new RewardResponseDTO(
                reward.getId(),
                reward.getDescription(),
                reward.getCost(),
                reward.getGotten(),
                reward.isRedeemed(),
                reward.isState(),
                reward.isRepeatable()
        );
    }


    @DeleteMapping("{id}")
    public void deleteActiveReward(@PathVariable Long id) {
        rewardService.deleteActiveReward(id);
    }

    @DeleteMapping("/archived/{id}")
    public void deleteArchivedReward(@PathVariable Long id) {
        rewardService.deleteArchivedReward(id);
    }
}
