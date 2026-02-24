package com.sebastianriedel.lifechievement.balance;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Balance {
    @Id
    private Long id = 1L;

    private Long balance;

    //Constructor
    public Balance() {
        this.balance = 0L;
    }

    public Balance(Long balance) {
        this.balance = balance;
    }

    //Getter & Setter
    public Long getBalance() {
        return balance;
    }

    public void setBalance(Long balance) {
        this.balance = balance;
    }
}
