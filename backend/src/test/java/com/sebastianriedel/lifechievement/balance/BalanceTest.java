package com.sebastianriedel.lifechievement.balance;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BalanceTest {

    @Test
    void defaultConstructorShouldSetBalanceToZero() {
        Balance balance = new Balance();

        assertEquals(0, balance.getBalance());
    }

    @Test
    void constructorShouldSetBalance() {
        Balance balance = new Balance(100);

        assertEquals(100, balance.getBalance());
    }

    @Test
    void setterShouldUpdateBalance() {
        Balance balance = new Balance();

        balance.setBalance(200);

        assertEquals(200, balance.getBalance());
    }

}