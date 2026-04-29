package com.sebastianriedel.lifechievement.reward;

import com.sebastianriedel.lifechievement.reward.dto.RewardCreateDTO;
import com.sebastianriedel.lifechievement.reward.dto.RewardResponseDTO;
import com.sebastianriedel.lifechievement.reward.dto.RewardUpdateDTO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rewards")
public class RewardController {
    private final RewardService rewardService;

    public RewardController(RewardService rewardService) {
        this.rewardService = rewardService;
    }

    private RewardResponseDTO mapToDTO(Reward reward) {
        return new RewardResponseDTO(
                reward.getId(),
                reward.getDescription(),
                reward.getCost(),
                reward.getGotten(),
                reward.isRedeemed(),
                reward.isArchived(),
                reward.isRepeatable()
        );
    }

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
    public RewardResponseDTO createReward(@Valid @RequestBody RewardCreateDTO dto) {
        Reward reward = rewardService.createReward(dto);
        return mapToDTO(reward);
    }

    @PutMapping("{id}")
    public RewardResponseDTO updateReward(@Valid @RequestBody RewardUpdateDTO dto, @PathVariable Long id) {
        Reward reward = rewardService.updateReward(dto, id);
        return mapToDTO(reward);
    }


    @PatchMapping("/{id}/unarchive")
    public RewardResponseDTO unarchiveReward(@PathVariable Long id) {
        Reward reward = rewardService.unarchiveReward(id);
        return mapToDTO(reward);
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
