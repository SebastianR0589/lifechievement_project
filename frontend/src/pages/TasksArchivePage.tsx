import { getArchivedTasks, deleteArchivedTask, unarchiveTask } from "../api/taskApi";
import type { Task} from "../types/Task";
import { useEffect, useState } from "react";
import TaskArchiveCard from "../components/tasks/TaskArchivedCard";

export default function TasksArchivePage() {

  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);

  useEffect(() => {
    getArchivedTasks().then(res => {
      setArchivedTasks(res.data);
    });
  }, []);

  const handleDelete = (id: number) => {
    deleteArchivedTask(id).then(() => {
      setArchivedTasks(prev => prev.filter(t => t.id !== id));
    });
  };

  const handleUnarchive = (task: Task) => {
    unarchiveTask(task.id).then(() => {
      setArchivedTasks(prev => prev.filter(t => t.id !== task.id));
    });
  };

  return (
    <div>
      {archivedTasks.map(task => (
        <TaskArchiveCard
          key={task.id}
          task={task}
          onDelete={handleDelete}
          onUnarchive={handleUnarchive}
        />
      ))}
    </div>
  );
}