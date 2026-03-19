import { useEffect, useState } from "react";

import type { Task } from "../types/Task";
import { createTask, deleteTask, getTasks, updateTask } from "../api/taskApi";
import TaskForm from "../components/tasks/TaskForm";

type PageProps = {
  onUpdate: () => void;
};

export default function TasksPage({ onUpdate }: PageProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [repeatable, setRepeatable] = useState(false);


useEffect(() => {
  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  fetchTasks();
}, []);

const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  const newTask = {
    description,
    points,
    done: 0,
    status: false,
    archived: false,
    repeatable,
  };

  const created = await createTask(newTask);

  setTasks((prev) => [...prev, created]);

  setDescription("");
  setPoints(0);
  setRepeatable(false);
};


const handleStatusToggle = async (task: Task) => {
  const updatedTask = { ...task, status: !task.status };

  const updated = await updateTask(updatedTask);

  setTasks((prev) =>
    updated.archived
      ? prev.filter((t) => t.id !== task.id)
      : prev.map((t) => (t.id === updated.id ? updated : t))
  );

  onUpdate();
};


const handleRepeatableToggle = async (task: Task) => {
  const updatedTask = {
    ...task,
    repeatable: !task.repeatable,
  };

  const updated = await updateTask(updatedTask);

  setTasks((prev) =>
    prev.map((t) => (t.id === updated.id ? updated : t))
  );
};

const handleDelete = async (taskId: number) => {
  await deleteTask(taskId);

  setTasks((prev) => prev.filter((t) => t.id !== taskId));
};

const handleSave = async () => {
  if (!editingTask) return;

  try {
    const updated = await updateTask(editingTask);

    setTasks((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );

    setEditingTask(null);
  } catch (err) {
    console.error("Fehler beim Speichern:", err);
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
        Tasks
      </h1>

      {/* Add Task Form */}
<TaskForm
  description={description}
  points={points}
  repeatable={repeatable}
  onSubmit={handleSubmit}
  setDescription={setDescription}
  setPoints={setPoints}
  setRepeatable={setRepeatable}
/>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-slate-900 p-4 rounded-xl border-2 border-cyan-500 flex flex-col md:flex-row md:justify-between items-start md:items-center"
            style={{
              boxShadow:
                "0 0 10px #06b6d4, 0 0 20px #06b6d4, inset 0 0 10px rgba(6,182,212,0.3)",
            }}
          >
            {/* Task Info */}
            {editingTask?.id === task.id ? (
              <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
                <input
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-cyan-500 text-white"
                />
                <input
                  type="number"
                  value={editingTask.points}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      points: Number(e.target.value),
                    })
                  }
                  className="w-24 px-3 py-2 rounded-lg bg-slate-800 border border-cyan-500 text-white"
                />
                <input
                  type="checkbox"
                  checked={editingTask.repeatable}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      repeatable: e.target.checked,
                    })
                  }
                  className="form-checkbox h-5 w-5 text-cyan-500 focus:ring-cyan-400 border-cyan-500"
                />
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg bg-neonPink text-slate-900 font-bold hover:bg-pink-600 transition-all"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
                <div>
                  <p className="text-slate-100 font-semibold text-lg tracking-wide">
                    {task.description}
                  </p>

                  <p className="text-cyan-400 font-mono tracking-widest">
                    +{task.points} PTS
                  </p>
             <p>
  Repeatable:
  <input
    type="checkbox"
    checked={task.repeatable}
    onChange={() => handleRepeatableToggle(task)}
    className="ml-2"
  />
</p>
           {task.repeatable && (
  <p>Done: {task.done}x</p>
)}
                  <p
                    className={`font-bold uppercase tracking-wider ${
                      task.status
                        ? "text-green-400 drop-shadow-[0_0_6px_#22c55e]"
                        : "text-red-400 drop-shadow-[0_0_6px_#ef4444]"
                    }`}
                  >
                    {task.status ? "Completed" : "Not Completed"}
                  </p>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    onClick={() => setEditingTask(task)}
                    className="
    px-4 py-1
    border border-yellow-400
    text-yellow-300
    rounded-lg
    uppercase text-xs tracking-widest
    transition-all duration-300
    hover:shadow-[0_0_12px_#facc15]
    hover:text-yellow-200
  "
                  >
                    Edit Task
                  </button>
                  <button
                    onClick={() => handleStatusToggle(task)}
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
                   Done
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
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
                    Delete Task
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
