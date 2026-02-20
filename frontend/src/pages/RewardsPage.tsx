import { useEffect, useState } from "react";
import axios from "axios";


export default function RewardsPage() {
  interface Reward {
    id: number;
    description: string;
    cost: number;
    redeemed: boolean;
  }

    const [rewards, setRewards] = useState<Reward[]>([]);
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState(0);

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
      {rewards.map((reward) => (
        <div key={reward.id}>
          <p>{reward.description}</p>
          <p>{reward.cost}</p>
          <p>{reward.redeemed ? "Redeemed" : "Not redeemed"}</p>
        </div>
      ))}
    </div>
  );
}