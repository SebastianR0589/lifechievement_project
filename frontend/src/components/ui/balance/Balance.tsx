  import { useEffect, useRef, useState } from "react";

 type FlashType = "gain" | "loss" | null;
  
  type BalanceProps = {
    balance: number;
  }

export default function Balance({ balance }: BalanceProps) {

   const prevbalance = useRef(balance);
  const [flash, setFlash] = useState<FlashType>(null);

  useEffect(() => {
    if (balance > prevbalance.current) {
      setFlash("gain");
    } else if (balance < prevbalance.current) {
      setFlash("loss");
    }

    prevbalance.current = balance;

    if (balance !== prevbalance.current) return;

    const timeout = setTimeout(() => {
      setFlash(null);
    }, 500);

    return () => clearTimeout(timeout);
  }, [balance]);

  return (
    <div className="flex justify-center mt-10">
      <div
        className={`
          px-10 py-6
          rounded-2xl
          border-2 border-cyan-500
          bg-slate-900
          text-center
          relative
          transition-all duration-300
          ${flash === "gain" ? "animate-gain" : ""}
          ${flash === "loss" ? "animate-loss" : ""}
        `}
        style={{
          boxShadow: `
            0 0 10px #06b6d4,
            0 0 25px #06b6d4,
            inset 0 0 15px rgba(6,182,212,0.4)
          `
        }}
      >
        <p className="text-sm tracking-widest text-cyan-400 uppercase mb-2">
          Balance
        </p>

        <h2
          className="text-5xl font-bold text-neonPink transition-all duration-300"
          style={{
            textShadow: `
              0 0 5px #ff00ff,
              0 0 15px #ff00ff,
              0 0 30px #ff66ff
            `
          }}
        >
          {balance}
        </h2>
      </div>
    </div>
    )

}