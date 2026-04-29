import type { Task } from "../../types/Task";

type Props = {
  task: Task;
  isEditing: boolean;
  editingTask: Task | null;
  setEditingTask: (t: Task | null) => void;
  handleSave: () => void;
  handleDelete: (id: number) => void;
  handleStatusToggle: (t: Task) => void;
  handleRepeatableToggle: (t: Task) => void;
};

export default function TaskItem({
  task,
  isEditing,
  editingTask,
  setEditingTask,
  handleSave,
  handleDelete,
  handleStatusToggle,
  handleRepeatableToggle,
}: Readonly<Props>) {
  return (
    <div
      className="bg-slate-900 p-4 rounded-xl border-2 border-cyan-500 flex flex-col md:flex-row md:justify-between items-start md:items-center"
      style={{
        boxShadow:
          "0 0 10px #06b6d4, 0 0 20px #06b6d4, inset 0 0 10px rgba(6,182,212,0.3)",
      }}
    >
      {isEditing ? (
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
          <input
            value={editingTask?.description || ""}
            onChange={(e) =>
              setEditingTask({
                ...editingTask!,
                description: e.target.value,
              })
            }
            className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-cyan-500 text-white"
          />

          <input
            type="number"
            value={editingTask?.points || 0}
            onChange={(e) =>
              setEditingTask({
                ...editingTask!,
                points: Number(e.target.value),
              })
            }
            className="w-24 px-3 py-2 rounded-lg bg-slate-800 border border-cyan-500 text-white"
          />

          <input
            type="checkbox"
            checked={editingTask?.repeatable || false}
            onChange={(e) =>
              setEditingTask({
                ...editingTask!,
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

            {task.repeatable && <p>Done: {task.done}x</p>}

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
              className="px-4 py-1 border border-yellow-400 text-yellow-300 rounded-lg uppercase text-xs tracking-widest transition-all duration-300 hover:shadow-[0_0_12px_#facc15] hover:text-yellow-200"
            >
              Edit Task
            </button>

            <button
              onClick={() => handleStatusToggle(task)}
              className="px-4 py-1 border border-cyan-400 text-cyan-300 rounded-lg uppercase text-xs tracking-widest transition-all duration-300 hover:shadow-[0_0_12px_#22d3ee] hover:text-cyan-200"
            >
              Done
            </button>

            <button
              onClick={() => handleDelete(task.id)}
              className="px-4 py-1 border border-pink-500 text-pink-400 rounded-lg uppercase text-xs tracking-widest transition-all duration-300 hover:shadow-[0_0_12px_#ff00ff] hover:text-pink-300"
            >
              Delete Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}