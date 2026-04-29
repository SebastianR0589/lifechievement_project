import { getArchivedRewards, deleteArchivedReward, unarchiveReward } from "../api/rewardApi";
import type { Reward } from "../types/Reward";
import { useEffect, useState } from "react";
import RewardArchiveCard from "../components/rewards/RewardArchivedCard";

export default function RewardsArchivePage() {

  const [archivedRewards, setArchivedRewards] = useState<Reward[]>([]);

  useEffect(() => {
    getArchivedRewards().then(res => {
      setArchivedRewards(res.data);
    });
  }, []);

  const handleDelete = (id: number) => {
    deleteArchivedReward(id).then(() => {
      setArchivedRewards(prev => prev.filter(r => r.id !== id));
    });
  };

  const handleUnarchive = (reward: Reward) => {
    unarchiveReward(reward.id).then(() => {
      setArchivedRewards(prev => prev.filter(r => r.id !== reward.id));
    });
  };

  return (
    <div>
      {archivedRewards.map(reward => (
        <RewardArchiveCard
          key={reward.id}
          reward={reward}
          onDelete={handleDelete}
          onUnarchive={handleUnarchive}
        />
      ))}
    </div>
  );
}