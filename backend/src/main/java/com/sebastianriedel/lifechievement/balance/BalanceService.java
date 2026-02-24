package com.sebastianriedel.lifechievement.balance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BalanceService {
    @Autowired
    BalanceRepository balanceRepository;

    public Long getBalance(){
        return balanceRepository.findById(1L).orElse(new Balance(0L)).getBalance();
    }

    public Long updateBalance(Long delta){
        Balance balance = balanceRepository.findById(1L).orElse(new Balance(0L));
        balance.setBalance(balance.getBalance() + delta);
        balanceRepository.save(balance);
        return balance.getBalance();
    }
}
