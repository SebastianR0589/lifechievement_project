import { useEffect, useState } from "react";
import axios from "axios";

export default function TasksPage() {
  interface Task {
    id: number;
    description: string;
    points: number;
    status: boolean;
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8080/api/tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTask = {
      description: description,
      points: Number(points),
      status: false,
    };
    axios.post("http://localhost:8080/api/tasks", newTask).then((response) => {
      console.log("POST RESPONSE:", response.data);
      setTasks((prev) => [...prev, response.data]);

      setDescription("");
      setPoints(0);
    });
  };

  return (
    <div>
      <h1>Tasks</h1>
      <p>This is the Tasks page.</p>
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
          <label>Points:</label>
          <input
            type="number"
            name="points"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
      {tasks.map((task) => (
        <div key={task.id}>
          <p>{task.description}</p>
          <p>{task.points}</p>
          <p>{task.status ? "Completed" : "Not completed"}</p>
        </div>
      ))}
    </div>
  );
}
