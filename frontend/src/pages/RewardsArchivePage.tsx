import axios from "axios";
import { useEffect, useState } from "react";

interface ArchivedReward {
  id: number;
  description: string;
  cost: number;
  gotten: number;
  redeemed: boolean;
  state: boolean;
  repeatable: boolean;
}

export default function RewardsArchivePage() {


  const [archivedRewards, setArchivedRewards] = useState<ArchivedReward[]>([]);

  useEffect(() => {
    axios.get<ArchivedReward[]>("http://localhost:8080/api/rewards/archived")
      .then((response) => {
        setArchivedRewards(response.data);
      });
  }, []);

   const handleDelete = (rewardId: number) => {
    axios.delete(`http://localhost:8080/api/rewards/archived/${rewardId}`).then(() => {
      setArchivedRewards(archivedRewards.filter((r) => r.id !== rewardId));
    });
  };

 const handleStateToggle = (archivedReward: ArchivedReward) => {
    const updatedArchivedReward = { ...archivedReward, state: !archivedReward.state };
    axios.patch(`http://localhost:8080/api/rewards/${archivedReward.id}/unarchive`, updatedArchivedReward).then((response) => {
      const updated = response.data;
         setArchivedRewards((prevArchivedRewards) => {
        if (!updated.state) {
          return prevArchivedRewards.filter((r) => r.id !== archivedReward.id);
        }
        return prevArchivedRewards.map((r) => (r.id === archivedReward.id ? updated : r));
      });
    });
  };


  

return (
  <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold text-neonPink mb-6 text-center"
        style={{ textShadow: "0 0 5px #ff00ff, 0 0 15px #ff00ff, 0 0 30px #ff66ff" }}>
      Archived Rewards
    </h1>

    {/* Reward List */}
    <div className="space-y-4">
      {archivedRewards.map(archivedReward => (
        <div key={archivedReward.id} className="bg-slate-900 p-4 rounded-xl border-2 border-cyan-500 flex flex-col md:flex-row md:justify-between items-start md:items-center"
             style={{ boxShadow: "0 0 10px #06b6d4, 0 0 20px #06b6d4, inset 0 0 10px rgba(6,182,212,0.3)" }}>
          
    
            <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
                 <div>
             <p className="text-slate-100 font-semibold text-lg tracking-wide">
                    {archivedReward.description}
                  </p>
                <p className="text-cyan-400 font-mono tracking-widest">{archivedReward.cost} pts</p>
                  {archivedReward.gotten > 0 && (
  <p>Gotten: {archivedReward.gotten}x</p>
)}
                  <p
                 className={`font-bold uppercase tracking-wider ${
                      archivedReward.redeemed
                        ? "text-green-400 drop-shadow-[0_0_6px_#22c55e]"
                        : "text-red-400 drop-shadow-[0_0_6px_#ef4444]"
                    }`}
                  >
                    {archivedReward.redeemed ? "Redeemed" : "Not redeemed"}
                  </p>
                </div>
              <div className="flex gap-2 mt-2 md:mt-0">              
                <button onClick={() => handleStateToggle(archivedReward)}
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
                <button onClick={() => handleDelete(archivedReward.id)}
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
        ))}
    </div>
  </div>
);
}