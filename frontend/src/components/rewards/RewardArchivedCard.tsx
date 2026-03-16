import type { Reward } from "../../types/Reward";

type RewardArchiveCardProps = {
  reward: Reward;
  onDelete: (id: number) => void;
  onUnarchive: (reward: Reward) => void;
};

export default function RewardArchiveCard({
  reward,
  onDelete,
  onUnarchive,
}: Readonly<RewardArchiveCardProps>) {
  return (
    <div
      className="bg-slate-900 p-4 rounded-xl border-2 border-cyan-500 flex flex-col md:flex-row md:justify-between items-start md:items-center"
      style={{
        boxShadow:
          "0 0 10px #06b6d4, 0 0 20px #06b6d4, inset 0 0 10px rgba(6,182,212,0.3)",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
        <div>
          <p className="text-slate-100 font-semibold text-lg tracking-wide">
            {reward.description}
          </p>

          <p className="text-cyan-400 font-mono tracking-widest">
            {reward.cost} pts
          </p>

          {reward.gotten > 0 && (
            <p className="text-slate-300">Gotten: {reward.gotten}x</p>
          )}

          <p
            className={`font-bold uppercase tracking-wider ${
              reward.redeemed
                ? "text-green-400 drop-shadow-[0_0_6px_#22c55e]"
                : "text-red-400 drop-shadow-[0_0_6px_#ef4444]"
            }`}
          >
            {reward.redeemed ? "Redeemed" : "Not redeemed"}
          </p>
        </div>

        <div className="flex gap-2 mt-2 md:mt-0">
          <button
            onClick={() => onUnarchive(reward)}
            className="
              px-4 py-1
              border border-cyan-400
              text-cyan-300
              rounded-lg
              uppercase text-xs tracking-widest
              transition-all duration-300
              hover:shadow-[0_0_12px_#22d3ee]
              hover:text-cyan-200
            "
          >
            Unarchive
          </button>

          <button
            onClick={() => onDelete(reward.id)}
            className="
              px-4 py-1
              border border-pink-500
              text-pink-400
              rounded-lg
              uppercase text-xs tracking-widest
              transition-all duration-300
              hover:shadow-[0_0_12px_#ff00ff]
              hover:text-pink-300
            "
          >
            Delete Reward
          </button>
        </div>
      </div>
    </div>
  );
}