package com.sebastianriedel.lifechievement.balance;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class BalanceServiceTest {

    @Mock
    private BalanceRepository balanceRepository;

    @InjectMocks
    private BalanceService balanceService;

    @Test
    void updateBalance_shouldAddDeltaToExistingBalance() {
        Balance existingBalance = new Balance(100);
        when(balanceRepository.findById(1L)).thenReturn(Optional.of(existingBalance));

        int result = balanceService.updateBalance(50);
        assertEquals(150, result, "The new balance should be 150.");
        verify(balanceRepository, times(1)).save(any(Balance.class));
    }

    @Test
    void updateBalance_shouldStartAtZero_WhenNoBalanceExists() {
        when(balanceRepository.findById(1L)).thenReturn(Optional.empty());

        int result = balanceService.updateBalance(20);

        assertEquals(20, result, "Shold start at 0 and update to 20.");
        verify(balanceRepository).save(any(Balance.class));
    }
}