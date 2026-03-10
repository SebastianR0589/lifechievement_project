import { useEffect, useState } from "react";
import axios from "axios";

interface Reward {
  id: number;
  description: string;
  cost: number;
  gotten: number;
  redeemed: boolean;
  state: boolean;
  repeatable: boolean;
}

type PageProps = {
  onUpdate: () => void;
};

export default function RewardsPage({ onUpdate }: PageProps) {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0);
  const [gotten] = useState(0);
  const [editingReward, setEditingReward] = useState<Reward | null>(null);
  const [repeatable, setRepeatable] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/api/rewards").then((response) => {
      setRewards(response.data);
    });
  }, []);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newReward = {
      description: description,
      cost: Number(cost),
      gotten: Number(gotten),
      redeemed: false,
      state: false,
      repeatable: repeatable,
    };
    axios
      .post("http://localhost:8080/api/rewards", newReward)
      .then((response) => {
        console.log("POST RESPONSE:", response.data);
        setRewards((prev) => [...prev, response.data]);

        setDescription("");
        setCost(0);
        setRepeatable(false);
      });
  };

  const handleRedeemToggle = (reward: Reward) => {
    const updatedReward = { ...reward, redeemed: !reward.redeemed };
    axios
      .put(`http://localhost:8080/api/rewards/${reward.id}`, updatedReward)
      .then((response) => {
        const updated = response.data;
        setRewards((prevRewards) => {
          if (updated.state) {
            return prevRewards.filter((r) => r.id !== reward.id);
          }
          return prevRewards.map((r) => (r.id === reward.id ? updated : r));
        });

        onUpdate();
      });
  };

  const handleRepeatableToggle = (reward: Reward) => {

  const updatedReward = {
    ...reward,
    repeatable: !reward.repeatable
  };

  axios.put(`http://localhost:8080/api/rewards/${reward.id}`, updatedReward)
    .then((response) => {

      const updated = response.data;

      setRewards(prev =>
        prev.map(r => r.id === reward.id ? updated : r)
      );

    });
};

  const handleDelete = (rewardId: number) => {
    axios.delete(`http://localhost:8080/api/rewards/${rewardId}`).then(() => {
      setRewards(rewards.filter((r) => r.id !== rewardId));
    });
  };

  const handleSave = async () => {
    if (!editingReward) return;

    try {
      const response = await axios.put(
        `http://localhost:8080/api/rewards/${editingReward.id}`,
        editingReward,
      );
      setRewards(
        rewards.map((r) => (r.id === editingReward.id ? response.data : r)),
      );
      setEditingReward(null);
    } catch (error) {
      console.error("Error updating reward:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1
        className="text-4xl font-bold text-neonPink mb-6 text-center"
        style={{
          textShadow: "0 0 5px #ff00ff, 0 0 15px #ff00ff, 0 0 30px #ff66ff",
        }}
      >
        Rewards
      </h1>

      {/* Add Reward Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-6 rounded-2xl border-2 border-cyan-500 mb-8"
        style={{
          boxShadow:
            "0 0 10px #06b6d4, 0 0 25px #06b6d4, inset 0 0 15px rgba(6,182,212,0.4)",
        }}
      >
        <div className="mb-4">
          <label className="block text-cyan-400 uppercase tracking-widest mb-1">
            Description:
          </label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-cyan-400 uppercase tracking-widest mb-1">
            Cost:
          </label>
          <input
            type="number"
            name="cost"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
             <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            name="repeatable"
            checked={repeatable}
            onChange={(e) => setRepeatable(e.target.checked)}
            className="form-checkbox h-5 w-5 text-cyan-500 focus:ring-cyan-400 border-cyan-500"
          />
          <label className="block text-cyan-400 uppercase tracking-widest mb-1">
            Repeatable:
          </label>
        </div>
        <button
          type="submit"
          className="px-6 py-2 rounded-xl bg-neonPink text-slate-900 font-bold hover:bg-pink-600 transition-all"
          style={{ textShadow: "0 0 5px #ff00ff, 0 0 15px #ff00ff" }}
        >
          Add Reward
        </button>
      </form>

      {/* Reward List */}
      <div className="space-y-4">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-slate-900 p-4 rounded-xl border-2 border-cyan-500 flex flex-col md:flex-row md:justify-between items-start md:items-center"
            style={{
              boxShadow:
                "0 0 10px #06b6d4, 0 0 20px #06b6d4, inset 0 0 10px rgba(6,182,212,0.3)",
            }}
          >
            {/* Reward Info */}
            {editingReward?.id === reward.id ? (
              <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
                <input
                  value={editingReward.description}
                  onChange={(e) =>
                    setEditingReward({
                      ...editingReward,
                      description: e.target.value,
                    })
                  }
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-cyan-500 text-white"
                />
                <input
                  type="number"
                  value={editingReward.cost}
                  onChange={(e) =>
                    setEditingReward({
                      ...editingReward,
                      cost: Number(e.target.value),
                    })
                  }
                  className="w-24 px-3 py-2 rounded-lg bg-slate-800 border border-cyan-500 text-white"
                />
                 <input
                  type="checkbox"
                  checked={editingReward.repeatable}
                  onChange={(e) =>
                    setEditingReward({
                      ...editingReward,
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
                <p className="text-cyan-400 font-mono tracking-widest"> -{reward.cost} pts</p>
                  <p>
  Repeatable:
  <input
    type="checkbox"
    checked={reward.repeatable}
    onChange={() => handleRepeatableToggle(reward)}
    className="ml-2"
  />
</p>
           {reward.repeatable && (
  <p>Gotten: {reward.gotten}x</p>
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
                    onClick={() => setEditingReward(reward)}
                    className="
    px-4 py-1
    border border-yellow-400
    text-yellow-300
    rounded-lg
    uppercase text-xs tracking-widest
    transition-all duration-300
    hover:shadow-[0_0_12px_#facc15]
    hover:text-yellow-200
  "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRedeemToggle(reward)}
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
                   Redeem
                  </button>
                  <button
                    onClick={() => handleDelete(reward.id)}
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
