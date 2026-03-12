package com.sebastianriedel.lifechievement.balance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/balance")
public class BalanceController {
    private final BalanceService balanceService;

    public BalanceController(BalanceService balanceService) {
        this.balanceService = balanceService;
    }

    @GetMapping
    public int getBalance() {
        return balanceService.getBalance();
    }

    @PutMapping
    public int updateBalance(@RequestParam int delta) {
        return balanceService.updateBalance(delta);
    }

}
