package com.sebastianriedel.lifechievement.reward;

import com.sebastianriedel.lifechievement.balance.BalanceService;
import com.sebastianriedel.lifechievement.reward.dto.RewardCreateDTO;
import com.sebastianriedel.lifechievement.reward.dto.RewardResponseDTO;
import com.sebastianriedel.lifechievement.reward.dto.RewardUpdateDTO;
import com.sebastianriedel.lifechievement.reward.ExceptionHandling.RewardNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RewardService {
    private final RewardRepository rewardRepository;
    private final BalanceService balanceService;

    public RewardService(RewardRepository rewardRepository, BalanceService balanceService) {
        this.rewardRepository = rewardRepository;
        this.balanceService = balanceService;
    }

    public List<RewardResponseDTO> getAllActiveRewards() {
        List<Reward> rewards = rewardRepository.findByArchivedFalse();

        return rewards.stream().map(reward -> new RewardResponseDTO(reward.getId(), reward.getDescription(), reward.getCost(), reward.getGotten(), reward.isRedeemed(), reward.isArchived(), reward.isRepeatable())).toList();
    }

    public List<RewardResponseDTO> getAllArchivedRewards() {
        List<Reward> rewards = rewardRepository.findByArchivedTrue();

        return rewards.stream().map(reward -> new RewardResponseDTO(reward.getId(), reward.getDescription(), reward.getCost(), reward.getGotten(), reward.isRedeemed(), reward.isArchived(), reward.isRepeatable())).toList();
    }

    public RewardResponseDTO getActiveRewardById(Long id) {
        Reward reward = rewardRepository.findByIdAndArchivedFalse(id).orElseThrow(() -> new RewardNotFoundException(id));

        return new RewardResponseDTO(reward.getId(), reward.getDescription(), reward.getCost(), reward.getGotten(), reward.isRedeemed(), reward.isArchived(), reward.isRepeatable());
    }

    public RewardResponseDTO getArchivedRewardById(Long id) {
        Reward reward = rewardRepository.findByIdAndArchivedTrue(id).orElseThrow(() -> new RewardNotFoundException(id));

        return new RewardResponseDTO(reward.getId(), reward.getDescription(), reward.getCost(), reward.getGotten(), reward.isRedeemed(), reward.isArchived(), reward.isRepeatable());
    }

    public Reward createReward(RewardCreateDTO dto) {
        Reward reward = new Reward();
        reward.setDescription(dto.getDescription());
        reward.setCost(dto.getCost());
        reward.setRepeatable(dto.isRepeatable());

        return rewardRepository.save(reward);
    }

    public Reward updateReward(RewardUpdateDTO dto, Long id) {
        Reward existingReward = rewardRepository.findById(id).orElseThrow(() -> new RewardNotFoundException(id));

        boolean oldStatus = existingReward.isRedeemed();

        existingReward.setDescription(dto.getDescription());
        existingReward.setCost(dto.getCost());
        existingReward.setRedeemed(dto.isRedeemed());
        existingReward.setRepeatable(dto.isRepeatable());

        boolean newStatus = dto.isRedeemed();

        if (!oldStatus && newStatus) {
            if (balanceService.getBalance() < dto.getCost()) {
                throw new IllegalStateException("Balance too low");
            }
            balanceService.updateBalance(-existingReward.getCost());

            if (existingReward.isRepeatable()) {
                existingReward.setGotten(existingReward.getGotten() + 1);
                existingReward.setRedeemed(false);
            } else {
                existingReward.setArchived(true);
            }

        }

        if (oldStatus && !newStatus) {
            balanceService.updateBalance(existingReward.getCost());
            existingReward.setArchived(false);
        }

        return rewardRepository.save(existingReward);
    }

    public Reward unarchiveReward(Long id) {
        Reward reward = rewardRepository.findByIdAndArchivedTrue(id).orElseThrow(() -> new RewardNotFoundException(id));

        reward.setArchived(false);
        reward.setRedeemed(false);
        reward.setGotten(0);
        return rewardRepository.save(reward);
    }


    public void deleteActiveReward(Long id) {
            rewardRepository.deleteById(id);
    }

    public void deleteArchivedReward(Long id) {
            rewardRepository.deleteById(id);
    }

}
