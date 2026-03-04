package com.sebastianriedel.lifechievement.reward;

import com.sebastianriedel.lifechievement.balance.BalanceService;
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
    @Autowired
    BalanceService balanceService;

    public List<RewardResponseDTO> getAllRewards() {
        List<Reward> rewards = rewardRepository.findAll();

        return rewards.stream().map(reward -> new RewardResponseDTO(reward.getId(), reward.getDescription(), reward.getCost(), reward.isRedeemed(), reward.isState())).toList();
    }

    public RewardResponseDTO getRewardById(Long id) {
        Reward reward = rewardRepository.findById(id).orElseThrow(() -> new RewardNotFoundException(id));

        return new RewardResponseDTO(reward.getId(), reward.getDescription(), reward.getCost(), reward.isRedeemed(), reward.isState());
    }

    public Reward createReward(RewardCreaetDTO dto) {
        Reward reward = new Reward();
        reward.setDescription(dto.getDescription());
        reward.setCost(dto.getCost());
        reward.setRedeemed(dto.isRedeemed());
        reward.setState(dto.isState());

        return rewardRepository.save(reward);
    }

    public Reward updateReward(RewardUpdateDTO dto, Long id) {
        Reward existingReward = rewardRepository.findById(id).orElseThrow(() -> new RewardNotFoundException(id));

        boolean oldStatus = existingReward.isRedeemed();

        existingReward.setDescription(dto.getDescription());
        existingReward.setCost(dto.getCost());
        existingReward.setRedeemed(dto.isRedeemed());

        boolean newStatus = dto.isRedeemed();


        if (!oldStatus && newStatus) {
            if (balanceService.getBalance() < dto.getCost()) {
                throw new IllegalStateException("Balance too low");
            }

            balanceService.updateBalance(-existingReward.getCost());
            existingReward.setState(true);
        }

        if (oldStatus && !newStatus) {
            balanceService.updateBalance(existingReward.getCost());
            existingReward.setState(false);
        }

        return rewardRepository.save(existingReward);
    }


    public void deleteReward(Long id) {
        if (rewardRepository.existsById(id)) {
            rewardRepository.deleteById(id);

        } else {
            System.out.println("Reward with" + id + " doesn't exist");
        }
    }


}
