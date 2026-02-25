import { useEffect, useState } from "react";
import axios from "axios";

  interface Reward {
    id: number;
    description: string;
    cost: number;
    redeemed: boolean;
  }

  type PageProps = {
  onUpdate: () => void;
};


export default function RewardsPage({ onUpdate }: PageProps) {


    const [rewards, setRewards] = useState<Reward[]>([]);
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState(0);
    const [editingReward, setEditingReward] = useState<Reward | null>(null);

    useEffect(() => {axios.get("http://localhost:8080/api/rewards").then((response) => {
        setRewards(response.data);
    });}, []);

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newReward = {
            description: description,
            cost: Number(cost),
            redeemed: false,
        };
        axios.post("http://localhost:8080/api/rewards", newReward).then((response) => {
            console.log("POST RESPONSE:", response.data);
            setRewards((prev) => [...prev, response.data]);

            setDescription("");
            setCost(0);
        });
      };

    

      const handleRedeemToggle = (reward: Reward) => {
        const updatedReward = { ...reward, redeemed: !reward.redeemed };
        axios.put(`http://localhost:8080/api/rewards/${reward.id}`, updatedReward).then((response) => {
          setRewards(rewards.map((r) => (r.id === reward.id ? response.data : r)));
            onUpdate();
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
              `http://localhost:8080/api/rewards/${editingReward.id}`, editingReward
            );
            setRewards(rewards.map((r) => (r.id === editingReward.id ? response.data : r)));
            setEditingReward(null);
          } catch (error) {
            console.error("Error updating reward:", error);
          } 
        };



      return (
       <div>
      <h1>Rewards</h1>
      <p>This is the Rewards page.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Cost:</label>
          <input
            type="number"
            name="cost"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
          />
        </div>
        <button type="submit">Add Reward</button>
      </form>
{rewards.map(reward => (
  <div key={reward.id}>
    {editingReward?.id === reward.id ? (

      <>
        <input
          value={editingReward.description}
          onChange={e => setEditingReward({...editingReward, description: e.target.value})}
        />
        <input
          type="number"
          value={editingReward.cost}
          onChange={e => setEditingReward({...editingReward, cost: Number(e.target.value)})}
        />
        <button onClick={handleSave}>Save</button>
      </>
    ) : (

      <>
        <p>{reward.description}</p>
        <p>{reward.cost}</p>
        <p>{reward.redeemed ? "Redeemed" : "Not redeemed"}</p>
        <button onClick={() => setEditingReward(reward)}>Edit</button>
        <button onClick={() => handleRedeemToggle(reward)}>Toggle Redeemed</button>
        <button onClick={() => handleDelete(reward.id)}>Delete Reward</button>
      </>
    )}
  </div>
))}
    </div>
  );
}