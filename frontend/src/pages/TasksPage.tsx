import { useEffect, useState } from "react";

import type { Task } from "../types/Task";
import { createTask, deleteTask, getTasks, updateTask } from "../api/taskApi";
import TaskForm from "../components/tasks/TaskForm";
import TaskItem from "../components/tasks/TaskItem";

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
    <TaskItem
      key={task.id}
      task={task}
      isEditing={editingTask?.id === task.id}
      editingTask={editingTask}
      setEditingTask={setEditingTask}
      handleSave={handleSave}
      handleDelete={handleDelete}
      handleStatusToggle={handleStatusToggle}
      handleRepeatableToggle={handleRepeatableToggle}
    />
  ))}
</div>
    </div>
  );
}
