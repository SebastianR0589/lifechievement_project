import { useEffect, useState } from "react";
import axios from "axios";

  interface Task {
    id: number;
    description: string;
    points: number;
    status: boolean;
  }

  type PageProps = {
  onUpdate: () => void;
};

export default function TasksPage({ onUpdate }: PageProps) {


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
        onUpdate();
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
  <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold text-neonPink mb-6 text-center"
        style={{ textShadow: "0 0 5px #ff00ff, 0 0 15px #ff00ff, 0 0 30px #ff66ff" }}>
      Tasks
    </h1>

    {/* Add Task Form */}
    <form onSubmit={handleSubmit} className="bg-slate-900 p-6 rounded-2xl border-2 border-cyan-500 mb-8"
          style={{ boxShadow: "0 0 10px #06b6d4, 0 0 25px #06b6d4, inset 0 0 15px rgba(6,182,212,0.4)" }}>
      <div className="mb-4">
        <label className="block text-cyan-400 uppercase tracking-widest mb-1">Description:</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-cyan-400 uppercase tracking-widest mb-1">Points:</label>
        <input
          type="number"
          name="points"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
          className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-2 rounded-xl bg-neonPink text-slate-900 font-bold hover:bg-pink-600 transition-all"
        style={{ textShadow: "0 0 5px #ff00ff, 0 0 15px #ff00ff" }}
      >
        Add Task
      </button>
    </form>

    {/* Task List */}
    <div className="space-y-4">
      {tasks.map(task => (
        <div key={task.id} className="bg-slate-900 p-4 rounded-xl border-2 border-cyan-500 flex flex-col md:flex-row md:justify-between items-start md:items-center"
             style={{ boxShadow: "0 0 10px #06b6d4, 0 0 20px #06b6d4, inset 0 0 10px rgba(6,182,212,0.3)" }}>
          
          {/* Task Info */}
          {editingTask?.id === task.id ? (
            <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
              <input
                value={editingTask.description}
                onChange={e => setEditingTask({ ...editingTask, description: e.target.value })}
                className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-cyan-500 text-white"
              />
              <input
                type="number"
                value={editingTask.points}
                onChange={e => setEditingTask({ ...editingTask, points: Number(e.target.value) })}
                className="w-24 px-3 py-2 rounded-lg bg-slate-800 border border-cyan-500 text-white"
              />
              <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-neonPink text-slate-900 font-bold hover:bg-pink-600 transition-all">
                Save
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
              <div>
                <p className="text-white font-semibold text-lg">{task.description}</p>
                <p className="text-cyan-400">{task.points} pts</p>
                <p className={task.status ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                  {task.status ? "Completed" : "Not completed"}
                </p>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button onClick={() => setEditingTask(task)}
                        className="px-3 py-1 bg-yellow-500 rounded-lg font-bold text-slate-900 hover:bg-yellow-400 transition-all">
                  Edit
                </button>
                <button onClick={() => handleStatusToggle(task)}
                        className="px-3 py-1 bg-green-500 rounded-lg font-bold text-slate-900 hover:bg-green-400 transition-all">
                  Toggle
                </button>
                <button onClick={() => handleDelete(task.id)}
                        className="px-3 py-1 bg-red-500 rounded-lg font-bold text-slate-900 hover:bg-red-400 transition-all">
                  Delete
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

