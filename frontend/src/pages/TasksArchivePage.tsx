import axios from "axios";
import { useEffect, useState } from "react";

interface ArchivedTask {
  id: number;
  description: string;
  points: number;
  done: number
  status: boolean;
  state: boolean;
  repeatable: boolean;
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
                  <p className="text-slate-100 font-semibold text-lg tracking-wide">
                    {archivedTask.description}
                  </p>

                  <p className="text-cyan-400 font-mono tracking-widest">
                    {archivedTask.points} PTS
                  </p>
                     {archivedTask.done > 0 && (
  <p>Done: {archivedTask.done}x</p>
)}

                  <p
                    className={`font-bold uppercase tracking-wider ${
                      archivedTask.status
                        ? "text-green-400 drop-shadow-[0_0_6px_#22c55e]"
                        : "text-red-400 drop-shadow-[0_0_6px_#ef4444]"
                    }`}
                  >
                    {archivedTask.status ? "Completed" : "Not Completed"}
                  </p>
                </div>
              <div className="flex gap-2 mt-2 md:mt-0">              
                <button onClick={() => handleStateToggle(archivedTask)}
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
                 Unarchive
                </button>
                <button onClick={() => handleDelete(archivedTask.id)}
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
         
        </div>
        ))}
    </div>
  </div>
);
}