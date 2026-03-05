import axios from "axios";
import { useEffect, useState } from "react";

interface ArchivedReward {
  id: number;
  description: string;
  points: number;
  status: boolean;
  state: boolean;
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
                <p className="text-white font-semibold text-lg">{archivedReward.description}</p>
                <p className="text-cyan-400">{archivedReward.points} pts</p>
                <p className={archivedReward.status ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                  {archivedReward.status ? "Redeemed" : "Not redeemed"}
                </p>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">              
                <button onClick={() => handleStateToggle(archivedReward)}
                        className="px-3 py-1 bg-green-500 rounded-lg font-bold text-slate-900 hover:bg-green-400 transition-all">
                  Toggle
                </button>
                <button onClick={() => handleDelete(archivedReward.id)}
                        className="px-3 py-1 bg-red-500 rounded-lg font-bold text-slate-900 hover:bg-red-400 transition-all">
                  Delete
                </button>
              </div>
            </div>
         
        </div>
        ))}
    </div>
  </div>
);
}