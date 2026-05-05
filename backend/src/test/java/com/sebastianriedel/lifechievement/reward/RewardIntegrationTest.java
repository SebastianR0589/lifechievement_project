package com.sebastianriedel.lifechievement.reward;

import com.sebastianriedel.lifechievement.balance.BalanceRepository;
import com.sebastianriedel.lifechievement.balance.BalanceService;
import com.sebastianriedel.lifechievement.reward.dto.RewardUpdateDTO;
import com.sebastianriedel.lifechievement.task.dto.TaskCreateDTO;
import com.sebastianriedel.lifechievement.task.dto.TaskUpdateDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Testcontainers
@Transactional
class RewardIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private RewardService rewardService;

    @Autowired
    private RewardRepository rewardRepository;

    @Autowired
    private BalanceService balanceService;

    @Test
    void updateReward_shouldDeductBalanceAndArchive_WhenNonRepeatableRewardIsRedeemed() {
        balanceService.updateBalance(100);

        Reward reward = new Reward();
        reward.setDescription("Reward Integration Test");
        reward.setCost(50);
        reward.setRepeatable(false);
        reward.setRedeemed(false);
        reward = rewardRepository.save(reward);

        RewardUpdateDTO dto = new RewardUpdateDTO();
        dto.setDescription("Reward Integration Test");
        dto.setCost(50);
        dto.setRedeemed(true);
        dto.setRepeatable(false);

        rewardService.updateReward(dto, reward.getId());

        Reward updated = rewardRepository.findById(reward.getId()).orElseThrow();

        assertTrue(updated.isArchived(), "One time rewards should be archived");
        assertEquals(50, balanceService.getBalance());
    }

    @Test
    void updateReward_shouldIncreaseGottenCount_WhenRepeatableRewardIsRedeemed() {
        balanceService.updateBalance(100);

        Reward reward = new Reward();
        reward.setDescription("Reward Integration Test 2");
        reward.setCost(20);
        reward.setRepeatable(true);
        reward.setGotten(0);
        reward = rewardRepository.save(reward);

        RewardUpdateDTO dto = new RewardUpdateDTO();
        dto.setCost(20);
        dto.setRedeemed(true);
        dto.setRepeatable(true);

        rewardService.updateReward(dto, reward.getId());

        Reward updated = rewardRepository.findById(reward.getId()).orElseThrow();

        assertEquals(1, updated.getGotten(), "Gotten should go up");
        assertFalse(updated.isRedeemed(), "Repeatable rewards should switch status");
        assertFalse(updated.isArchived(), "Repeatable rewards shouldn't be archived");
        assertEquals(80, balanceService.getBalance());
    }

    @Test
    void updateReward_shouldThrowException_WhenBalanceIsTooLow() {
        Reward reward = new Reward();
        reward.setCost(50);
        reward = rewardRepository.save(reward);

        RewardUpdateDTO dto = new RewardUpdateDTO();
        dto.setCost(50);
        dto.setRedeemed(true);

        Reward finalReward = reward;
        assertThrows(IllegalStateException.class, () -> {
            rewardService.updateReward(dto, finalReward.getId());
        }, "Should throw exception if not enough balance");
    }
}
