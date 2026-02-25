package com.sebastianriedel.lifechievement.balance;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Balance {
    @Id
    private Long id = 1L;

    private int balance;

    //Constructor
    public Balance() {
        this.balance = 0;
    }

    public Balance(int balance) {
        this.balance = balance;
    }

    //Getter & Setter
    public int getBalance() {
        return balance;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }
}
