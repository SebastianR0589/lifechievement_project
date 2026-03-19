import type { Reward } from "../../types/Reward";

type Props = {
  reward: Reward;
  isEditing: boolean;
  editingReward: Reward | null;
  setEditingReward: (r: Reward | null) => void;
  handleSave: () => void;
  handleDelete: (id: number) => void;
  handleRedeemToggle: (r: Reward) => void;
  handleRepeatableToggle: (r: Reward) => void;
};

export default function RewardItem({
  reward,
  isEditing,
  editingReward,
  setEditingReward,
  handleSave,
  handleDelete,
  handleRedeemToggle,
  handleRepeatableToggle,
}: Readonly<Props>) {
  return (
    <div
      className="bg-slate-900 p-4 rounded-xl border-2 border-cyan-500 flex flex-col md:flex-row md:justify-between items-start md:items-center"
      style={{
        boxShadow:
          "0 0 10px #06b6d4, 0 0 20px #06b6d4, inset 0 0 10px rgba(6,182,212,0.3)",
      }}
    >
      {isEditing ? (
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
          <input
            value={editingReward?.description || ""}
            onChange={(e) =>
              setEditingReward({
                ...editingReward!,
                description: e.target.value,
              })
            }
            className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-cyan-500 text-white"
          />

          <input
            type="number"
            value={editingReward?.cost || 0}
            onChange={(e) =>
              setEditingReward({
                ...editingReward!,
                cost: Number(e.target.value),
              })
            }
            className="w-24 px-3 py-2 rounded-lg bg-slate-800 border border-cyan-500 text-white"
          />

          <input
            type="checkbox"
            checked={editingReward?.repeatable || false}
            onChange={(e) =>
              setEditingReward({
                ...editingReward!,
                repeatable: e.target.checked,
              })
            }
            className="form-checkbox h-5 w-5 text-cyan-500 focus:ring-cyan-400 border-cyan-500"
          />

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-neonPink text-slate-900 font-bold hover:bg-pink-600 transition-all"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
          <div>
            <p className="text-slate-100 font-semibold text-lg tracking-wide">
              {reward.description}
            </p>

            <p className="text-cyan-400 font-mono tracking-widest">
              -{reward.cost} pts
            </p>

            <p>
              Repeatable:
              <input
                type="checkbox"
                checked={reward.repeatable}
                onChange={() => handleRepeatableToggle(reward)}
                className="ml-2"
              />
            </p>

            {reward.repeatable && <p>Gotten: {reward.gotten}x</p>}

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
              onClick={() => setEditingReward(reward)}
              className="px-4 py-1 border border-yellow-400 text-yellow-300 rounded-lg uppercase text-xs tracking-widest transition-all duration-300 hover:shadow-[0_0_12px_#facc15] hover:text-yellow-200"
            >
              Edit
            </button>

            <button
              onClick={() => handleRedeemToggle(reward)}
              className="px-4 py-1 border border-cyan-400 text-cyan-300 rounded-lg uppercase text-xs tracking-widest transition-all duration-300 hover:shadow-[0_0_12px_#22d3ee] hover:text-cyan-200"
            >
              Redeem
            </button>

            <button
              onClick={() => handleDelete(reward.id)}
              className="px-4 py-1 border border-pink-500 text-pink-400 rounded-lg uppercase text-xs tracking-widest transition-all duration-300 hover:shadow-[0_0_12px_#ff00ff] hover:text-pink-300"
            >
              Delete Reward
            </button>
          </div>
        </div>
      )}
    </div>
  );
}