package com.sebastianriedel.lifechievement.reward;

import com.sebastianriedel.lifechievement.reward.dto.RewardCreaetDTO;
import com.sebastianriedel.lifechievement.reward.dto.RewardResponseDTO;
import com.sebastianriedel.lifechievement.reward.dto.RewardUpdateDTO;
import com.sebastianriedel.lifechievement.reward.ExceptionHandling.RewardNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RewardService {
    @Autowired
    RewardRepository rewardRepository;

    public List<RewardResponseDTO> getAllRewards() {
        List<Reward> rewards = rewardRepository.findAll();

        return rewards.stream().map(reward -> new RewardResponseDTO(reward.getId(), reward.getDescription(), reward.getCost(), reward.isRedeemed())).toList();
    }

    public RewardResponseDTO getRewardById(Long id) {
        Reward reward = rewardRepository.findById(id).orElseThrow(() -> new RewardNotFoundException(id));

        return new RewardResponseDTO(reward.getId(), reward.getDescription(), reward.getCost(), reward.isRedeemed());
    }

    public Reward createReward(RewardCreaetDTO dto) {
        Reward reward = new Reward();
        reward.setDescription(dto.getDescription());
        reward.setCost(dto.getCost());
        reward.setRedeemed(dto.getRedeemed());

        return rewardRepository.save(reward);
    }

    public Reward updateReward(RewardUpdateDTO dto, Long id) {
        Reward existingReward = rewardRepository.findById(id).orElseThrow(() -> new RewardNotFoundException(id));
        existingReward.setDescription(dto.getDescription());
        existingReward.setCost(dto.getCost());
        existingReward.setRedeemed(dto.getRedeemed());

        return rewardRepository.save(existingReward);
    }

    public void deleteReward(Long id) {
        if (rewardRepository.existsById(id)) {
            rewardRepository.deleteById(id);

        } else {
            System.out.println("Rewar with" + id + " doesn't exist");
        }
    }


}
