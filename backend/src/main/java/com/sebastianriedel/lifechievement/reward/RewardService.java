package com.sebastianriedel.lifechievement.reward;

import com.sebastianriedel.lifechievement.reward.dto.RewardCreaetDTO;
import com.sebastianriedel.lifechievement.reward.dto.RewardResponseDTO;
import com.sebastianriedel.lifechievement.reward.dto.RewardUpdateDTO;
import com.sebastianriedel.lifechievement.task.ExceptionHandling.TaskNotFoundException;
import com.sebastianriedel.lifechievement.task.Task;
import com.sebastianriedel.lifechievement.task.dto.TaskCreateDTO;
import com.sebastianriedel.lifechievement.task.dto.TaskResponseDTO;
import com.sebastianriedel.lifechievement.task.dto.TaskUpdateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RewardService {
    @Autowired
    RewardRepository rewardRepository;

    public List<RewardResponseDTO> getAllRewards() {
        List<Reward> rewards = rewardRepository.findAll();

        return rewards.stream().map(reward -> new RewardResponseDTO(reward.getId(), reward.getDescription(), reward.getCost(), reward.getRedeemed())).toList();
    }

    public RewardResponseDTO getRewardById(Long id) {
        Reward reward = rewardRepository.findById(id).orElseThrow(() -> new RewardNotFoundException(id));

        return new RewardResponseDTO(reward.getId(), reward.getDescription(), reward.getCost(), reward.getRedeemed());
    }

    public void createReward(RewardCreaetDTO dto) {
        Reward reward = new Reward();
        reward.setDescription(dto.getDescription());
        reward.setCost(dto.getCost());
        reward.setRedeemed(dto.getRedeemed());

        rewardRepository.save(reward);
    }

    public void updateReward(RewardUpdateDTO dto, Long id) {
        Reward existingReward = rewardRepository.findById(id).orElseThrow(() -> new RewardNotFoundException(id));
        existingReward.setDescription(dto.getDescription());
        existingReward.setCost(dto.getCost());
        existingReward.setRedeemed(dto.getRedeemed());
        rewardRepository.save(existingReward);
    }

    public void deleteReward(Long id) {
        if (rewardRepository.existsById(id)) {
            rewardRepository.deleteById(id);

        } else {
            System.out.println("Rewar with" + id + " doesn't exist");
        }
    }


}
