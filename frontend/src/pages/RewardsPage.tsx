import { useEffect, useState } from "react";
import axios from "axios";


export default function RewardsPage() {
    const [rewards, setRewards] = useState([]);

    useEffect(() => {axios.get("http://localhost:8080/api/rewards").then((response) => {
        setRewards(response.data);
    });}, []);

    return (
        <>
    <div>
      <h1>Rewards</h1>
      <p>This is the Rewards page.</p>
      {rewards.map((reward) => (
        <div key={reward.id}>
          <p>{reward.description}</p>
          <p>{reward.cost}</p>
          <p>{reward.redeemed ? "Redeemed" : "Not redeemed"}</p>
        </div>
      ))}
    </div>
    <button onClick={() => {axios.post("http://localhost:8080/api/rewards", {description: "New Reward", cost: 100, redeemed: false}).then(() => {window.location.reload();})}}>Add Reward</button>
</>
  );
}