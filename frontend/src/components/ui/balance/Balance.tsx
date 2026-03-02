import { useEffect, useRef, useState } from "react";

type FlashType = "gain" | "loss" | null;

type BalanceProps = {
  balance: number;
};

export default function Balance({ balance }: BalanceProps) {
  const prevBalance = useRef(balance);
  const [flash, setFlash] = useState<FlashType>(null);

  useEffect(() => {
    if (balance > prevBalance.current) {
      setFlash("gain");
    } else if (balance < prevBalance.current) {
      setFlash("loss");
    } else {
      setFlash(null);
    }

    // Flash für 500ms sichtbar lassen
    const timeout = setTimeout(() => {
      setFlash(null);
      prevBalance.current = balance; // erst danach prevBalance aktualisieren
    }, 500);

    return () => clearTimeout(timeout);
  }, [balance]);

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-3">
      <span
        className="text-neonPink text-4xl transition-all duration-300"
        style={{
          textShadow: `
            0 0 5px #ff00ff,
            0 0 10px #ff00ff,
            0 0 20px #ff66ff
          `,
            animation: "flicker 2s infinite",
          fontFamily: "'Neonderthaw', cursive",
        }}
      >
        Balance:
      </span>
      <h2
        className={`text-4xl font-bold text-neonPink transition-all duration-300 ${
          flash === "gain" ? "animate-gain" : ""
        } ${flash === "loss" ? "animate-loss" : ""}`}
        style={{
          textShadow: `
            0 0 5px #ff00ff,
            0 0 15px #ff00ff,
            0 0 30px #ff66ff
          `,
            animation: "flicker 2s infinite",
          fontFamily: "'Neonderthaw', cursive",
        }}
      >
        {balance}
      </h2>

      <style>
        {`
          @keyframes flicker {
            0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
            20%, 22%, 24%, 55% { opacity: 0.4; }
          }

          .animate-gain {
            animation: gainFlash 0.5s ease-in-out;
            color: #00ff7f !important;
            text-shadow: 0 0 10px #00ff7f, 0 0 20px #00ff7f;
          }

          .animate-loss {
            animation: lossFlash 0.5s ease-in-out;
            color: #ff0033 !important;
            text-shadow: 0 0 10px #ff0033, 0 0 20px #ff0033;
            transform: translateX(-2px) rotate(-2deg);
          }

          @keyframes gainFlash {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }

          @keyframes lossFlash {
            0% { transform: scale(1); }
            50% { transform: scale(0.9) translateX(-2px) rotate(-2deg); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}