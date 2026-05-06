import { useState } from "react"; 
import styles from "./Balance.module.css";

type FlashType = "gain" | "loss" | null;

type BalanceProps = {
  balance: number;
};

const textStyle: React.CSSProperties = {
  textShadow: `
    0 0 5px #ff00ff,
    0 0 10px #ff00ff,
    0 0 20px #ff66ff
  `,
  animation: "flicker 2s infinite",
  fontFamily: "'Neonderthaw', cursive",
};

export default function Balance({ balance }: BalanceProps) {
  const [prevBalance, setPrevBalance] = useState(balance);
  const [flash, setFlash] = useState<FlashType>(null);

  if (balance !== prevBalance) {
    setPrevBalance(balance);
    setFlash(balance > prevBalance ? "gain" : "loss");

    setTimeout(() => {
      setFlash(null);
    }, 500);
  }

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-3">
      <span className="text-neonPink text-4xl transition-all duration-300" style={textStyle}>
        Balance:
      </span>

      <h2
        className={`text-4xl font-bold text-neonPink transition-all duration-300 
        ${styles.flicker} ${flash === "gain" ? styles.gain : ""} ${flash === "loss" ? styles.loss : ""}`}
        style={textStyle}
      >
        {balance}
      </h2>
    </div>
  );
}