package com.sebastianriedel.lifechievement.balance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BalanceService {

    private final BalanceRepository balanceRepository;

    public BalanceService(BalanceRepository balanceRepository) {
        this.balanceRepository = balanceRepository;
    }

    public int getBalance() {
        return balanceRepository.findById(1L).orElse(new Balance(0)).getBalance();
    }

    public int updateBalance(int delta) {
        Balance balance = balanceRepository.findById(1L).orElse(new Balance(0));
        balance.setBalance(balance.getBalance() + delta);
        balanceRepository.save(balance);
        return balance.getBalance();
    }
}
