import { useEffect, useState } from "react";
import type { Reward } from "../types/Reward";
import {
  getRewards,
  createReward,
  updateReward,
  deleteReward,
} from "../api/rewardApi";
import RewardForm from "../components/rewards/RewardForm";
import RewardItem from "../components/rewards/RewardItem";

type PageProps = {
  onUpdate: () => void;
};

export default function RewardsPage({ onUpdate }: PageProps) {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0);
  const [editingReward, setEditingReward] = useState<Reward | null>(null);
  const [repeatable, setRepeatable] = useState(false);

  useEffect(() => {
    const fetchRewards = async () => {
      const data = await getRewards();
      setRewards(data);
    };
    fetchRewards();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newReward = {
      description,
      cost,
      gotten: 0,
      redeemed: false,
      archived: false,
      repeatable,
    };

    const created = await createReward(newReward);
    setRewards((prev) => [...prev, created]);

    setDescription("");
    setCost(0);
    setRepeatable(false);
  };

  const handleRedeemToggle = async (reward: Reward) => {
    const updatedReward = { ...reward, redeemed: !reward.redeemed };
    const updated = await updateReward(updatedReward);

    setRewards((prev) =>
      updated.archived
        ? prev.filter((r) => r.id !== reward.id)
        : prev.map((r) => (r.id === reward.id ? updated : r))
    );

    onUpdate();
  };

  const handleRepeatableToggle = async (reward: Reward) => {
  const updatedReward = {
    ...reward,
    repeatable: !reward.repeatable,
  };

  try {
    const updated = await updateReward(updatedReward);

    setRewards((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
  } catch (error) {
    console.error("Error updating repeatable:", error);
  }
};

  const handleDelete = async (id: number) => {
    await deleteReward(id);
    setRewards((prev) => prev.filter((r) => r.id !== id));
  };
  
const handleSave = async () => {
  if (!editingReward) return;

  try {
    const updated = await updateReward(editingReward);

    setRewards((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
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
<RewardForm
  description={description}
  cost={cost}
  repeatable={repeatable}
  onSubmit={handleSubmit}
  setDescription={setDescription}
  setCost={setCost}
  setRepeatable={setRepeatable}
/>

      {/* Reward List */}
      <div className="space-y-4">
  {rewards.map((reward) => (
    <RewardItem
      key={reward.id}
      reward={reward}
      isEditing={editingReward?.id === reward.id}
      editingReward={editingReward}
      setEditingReward={setEditingReward}
      handleSave={handleSave}
      handleDelete={handleDelete}
      handleRedeemToggle={handleRedeemToggle}
      handleRepeatableToggle={handleRepeatableToggle}
    />
  ))}
</div>
    </div>
  );
}
