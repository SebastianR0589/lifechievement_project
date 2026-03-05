import axios from "axios";
import { useEffect, useState } from "react";

interface ArchivedTask {
  id: number;
  description: string;
  points: number;
  status: boolean;
  state: boolean;
}

export default function TasksArchivePage() {


  const [archivedTasks, setArchivedTasks] = useState<ArchivedTask[]>([]);

  useEffect(() => {
    axios.get<ArchivedTask[]>("http://localhost:8080/api/tasks/archived")
      .then((response) => {
        setArchivedTasks(response.data);
      });
  }, []);

   const handleDelete = (taskId: number) => {
    axios.delete(`http://localhost:8080/api/tasks/archived/${taskId}`).then(() => {
      setArchivedTasks(archivedTasks.filter((t) => t.id !== taskId));
    });
  };

 const handleStateToggle = (archivedTask: ArchivedTask) => {
    const updatedArchivedTask = { ...archivedTask, state: !archivedTask.state };
    axios.patch(`http://localhost:8080/api/tasks/${archivedTask.id}/unarchive`, updatedArchivedTask).then((response) => {
      const updated = response.data;
         setArchivedTasks((prevArchivedTasks) => {
        if (!updated.state) {
          return prevArchivedTasks.filter((t) => t.id !== archivedTask.id);
        }
        return prevArchivedTasks.map((t) => (t.id === archivedTask.id ? updated : t));
      });
    });
  };


  

return (
  <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold text-neonPink mb-6 text-center"
        style={{ textShadow: "0 0 5px #ff00ff, 0 0 15px #ff00ff, 0 0 30px #ff66ff" }}>
      Archived Tasks
    </h1>

    {/* Task List */}
    <div className="space-y-4">
      {archivedTasks.map(archivedTask => (
        <div key={archivedTask.id} className="bg-slate-900 p-4 rounded-xl border-2 border-cyan-500 flex flex-col md:flex-row md:justify-between items-start md:items-center"
             style={{ boxShadow: "0 0 10px #06b6d4, 0 0 20px #06b6d4, inset 0 0 10px rgba(6,182,212,0.3)" }}>
          
    
            <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
              <div>
                <p className="text-white font-semibold text-lg">{archivedTask.description}</p>
                <p className="text-cyan-400">{archivedTask.points} pts</p>
                <p className={archivedTask.status ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                  {archivedTask.status ? "Completed" : "Not completed"}
                </p>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">              
                <button onClick={() => handleStateToggle(archivedTask)}
                        className="px-3 py-1 bg-green-500 rounded-lg font-bold text-slate-900 hover:bg-green-400 transition-all">
                  Toggle
                </button>
                <button onClick={() => handleDelete(archivedTask.id)}
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