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
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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

  const handleStatusToggle = (task: Task) => {
    const updatedTask = { ...task, status: !task.status };
    axios.put(`http://localhost:8080/api/tasks/${task.id}`, updatedTask).then((response) => {
      setTasks(tasks.map((t) => (t.id === task.id ? response.data : t)));
    });
  };

 const handleDelete = (taskId: number) => {
    axios.delete(`http://localhost:8080/api/tasks/${taskId}`).then(() => {
      setTasks(tasks.filter((t) => t.id !== taskId));
    });
  };

const handleSave = async () => {
  if (!editingTask) return;

  try {
    const response = await axios.put(
      `http://localhost:8080/api/tasks/${editingTask.id}`,
      editingTask
    );

    // Den Task im State aktualisieren
    setTasks(prev =>
      prev.map(task => (task.id === editingTask.id ? response.data : task))
    );

    // Formular schließen
    setEditingTask(null);
  } catch (err) {
    console.error("Fehler beim Speichern:", err);
  }
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

{tasks.map(task => (
  <div key={task.id}>
    {editingTask?.id === task.id ? (
      // Form für Edit
      <>
        <input
          value={editingTask.description}
          onChange={e => setEditingTask({...editingTask, description: e.target.value})}
        />
        <input
          type="number"
          value={editingTask.points}
          onChange={e => setEditingTask({...editingTask, points: Number(e.target.value)})}
        />
        <button onClick={handleSave}>Save</button>
      </>
    ) : (
      // Normale Darstellung
      <>
        <p>{task.description}</p>
        <p>{task.points}</p>
        <p>{task.status ? "Completed" : "Not completed"}</p>
        <button onClick={() => setEditingTask(task)}>Edit</button>
        <button onClick={() => handleStatusToggle(task)}>Toggle Status</button>
        <button onClick={() => handleDelete(task.id)}>Delete Task</button>
      </>
    )}
  </div>
))}
    </div>
  );
}

