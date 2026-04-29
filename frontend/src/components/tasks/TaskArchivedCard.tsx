import type { Task} from "../../types/Task";

type TaskArchiveCardProps = {
  task: Task;
  onDelete: (id: number) => void;
  onUnarchive: (task: Task) => void;
};

export default function TaskArchivedCard({
  task,
  onDelete,
  onUnarchive,
}: Readonly<TaskArchiveCardProps>) {
  return (
    <div
      className="bg-slate-900 p-4 rounded-xl border-2 border-cyan-500 flex flex-col md:flex-row md:justify-between items-start md:items-center"
      style={{
        boxShadow:
          "0 0 10px #06b6d4, 0 0 20px #06b6d4, inset 0 0 10px rgba(6,182,212,0.3)",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
        <div>
          <p className="text-slate-100 font-semibold text-lg tracking-wide">
            {task.description}
          </p>

          <p className="text-cyan-400 font-mono tracking-widest">
            {task.points} pts
          </p>

          {task.done > 0 && (
            <p className="text-slate-300">Done: {task.done}x</p>
          )}

          <p
            className={`font-bold uppercase tracking-wider ${
              task.status
                ? "text-green-400 drop-shadow-[0_0_6px_#22c55e]"
                : "text-red-400 drop-shadow-[0_0_6px_#ef4444]"
            }`}
          >
            {task.status ? "Completed" : "Not completed"}
          </p>
        </div>

        <div className="flex gap-2 mt-2 md:mt-0">
          <button
            onClick={() => onUnarchive(task)}
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

          <button
            onClick={() => onDelete(task.id)}
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
  );
}