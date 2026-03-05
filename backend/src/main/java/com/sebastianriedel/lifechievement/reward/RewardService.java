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

    public List<RewardResponseDTO> getAllActiveRewards() {
        List<Reward> rewards = rewardRepository.findByStateFalse();

        return rewards.stream().map(reward -> new RewardResponseDTO(reward.getId(), reward.getDescription(), reward.getCost(), reward.isRedeemed(), reward.isState())).toList();
    }

    public List<RewardResponseDTO> getAllArchivedRewards() {
        List<Reward> rewards = rewardRepository.findByStateTrue();

        return rewards.stream().map(reward -> new RewardResponseDTO(reward.getId(), reward.getDescription(), reward.getCost(), reward.isRedeemed(), reward.isState())).toList();
    }

    public RewardResponseDTO getActiveRewardById(Long id) {
        Reward reward = rewardRepository.findByIdAndStateFalse(id).orElseThrow(() -> new RewardNotFoundException(id));

        return new RewardResponseDTO(reward.getId(), reward.getDescription(), reward.getCost(), reward.isRedeemed(), reward.isState());
    }

    public RewardResponseDTO getArchivedRewardById(Long id) {
        Reward reward = rewardRepository.findByIdAndStateTrue(id).orElseThrow(() -> new RewardNotFoundException(id));

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

    public Reward archiveReward(Long id){
        Reward reward = rewardRepository.findByIdAndStateFalse(id).orElseThrow(() -> new RewardNotFoundException(id));

        reward.setState(true);
        return rewardRepository.save(reward);
    }

    public Reward unarchiveReward(Long id){
        Reward reward = rewardRepository.findByIdAndStateTrue(id).orElseThrow(() -> new RewardNotFoundException(id));

        reward.setState(false);
        reward.setRedeemed(false);
        return rewardRepository.save(reward);
    }


    public void deleteActiveReward(Long id) {
        if (rewardRepository.existsById(id)) {
            rewardRepository.deleteById(id);

        } else {
            System.out.println("Reward with" + id + " doesn't exist");
        }
    }

    public void deleteArchivedReward(Long id) {
        if (rewardRepository.existsById(id)) {
            rewardRepository.deleteById(id);

        } else {
            System.out.println("Reward with" + id + " doesn't exist");
        }
    }


}
