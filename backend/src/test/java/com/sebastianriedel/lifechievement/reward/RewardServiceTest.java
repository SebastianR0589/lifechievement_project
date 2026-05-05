package com.sebastianriedel.lifechievement.reward;

import com.sebastianriedel.lifechievement.balance.BalanceService;
import com.sebastianriedel.lifechievement.reward.ExceptionHandling.RewardNotFoundException;
import com.sebastianriedel.lifechievement.reward.dto.RewardUpdateDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RewardServiceTest {

    @Mock
    private RewardRepository rewardRepository;

    @Mock
    private BalanceService balanceService;

    @InjectMocks
    private RewardService rewardService;

    @Test
    void updateReward_shouldProcessPurchase_WhenBalanceIsEnough() {
        Long id = 1L;
        Reward reward = new Reward();
        reward.setCost(50);
        reward.setRedeemed(false);
        reward.setRepeatable(false);

        RewardUpdateDTO dto = new RewardUpdateDTO();
        dto.setCost(50);
        dto.setRedeemed(true);

        when(rewardRepository.findById(id)).thenReturn(Optional.of(reward));
        when(balanceService.getBalance()).thenReturn(100);

        rewardService.updateReward(dto, id);

        verify(balanceService).updateBalance(-50);
        assertTrue(reward.isArchived(), "Not repeatable reward should be archived");
        verify(rewardRepository).save(reward);
    }

    @Test
    void updateReward_shouldThrowException_WhenBalanceTooLow() {
        Long id = 1L;
        Reward reward = new Reward();
        reward.setCost(100);
        reward.setRedeemed(false);

        RewardUpdateDTO dto = new RewardUpdateDTO();
        dto.setCost(100);
        dto.setRedeemed(true);

        when(rewardRepository.findById(id)).thenReturn(Optional.of(reward));
        when(balanceService.getBalance()).thenReturn(20);

        assertThrows(IllegalStateException.class, () -> rewardService.updateReward(dto, id));
        verify(balanceService, never()).updateBalance(anyInt());
    }

    @Test
    void updateReward_shouldRefundBalance_WhenRedeemedIsReset() {
        Long id = 1L;
        Reward reward = new Reward();
        reward.setCost(30);
        reward.setRedeemed(true);

        RewardUpdateDTO dto = new RewardUpdateDTO();
        dto.setCost(30);
        dto.setRedeemed(false);

        when(rewardRepository.findById(id)).thenReturn(Optional.of(reward));

        rewardService.updateReward(dto, id);

        verify(balanceService).updateBalance(30);
        assertFalse(reward.isArchived());
        verify(rewardRepository).save(reward);
    }

    @Test
    void getActiveRewardById_shouldThrowNotFoundException_WhenIdInvalid() {
        Long id = 999L;
        when(rewardRepository.findByIdAndArchivedFalse(id)).thenReturn(Optional.empty());

        assertThrows(RewardNotFoundException.class, () -> rewardService.getActiveRewardById(id));
    }

    @Test
    void unarchiveReward_shouldResetStatusCorrectly() {
        Long id = 1L;
        Reward archivedReward = new Reward();
        archivedReward.setArchived(true);
        archivedReward.setGotten(5);
        archivedReward.setRedeemed(true);

        when(rewardRepository.findByIdAndArchivedTrue(id)).thenReturn(Optional.of(archivedReward));

        rewardService.unarchiveReward(id);

        assertFalse(archivedReward.isArchived());
        assertFalse(archivedReward.isRedeemed());
        assertEquals(0, archivedReward.getGotten());
        verify(rewardRepository).save(archivedReward);
    }
}