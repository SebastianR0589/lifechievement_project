import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="flex justify-center mb-10">
      <ul className="flex gap-8">
        <li>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `
              px-8 py-3
              rounded-xl
              border-2
              uppercase tracking-widest text-sm
              transition-all duration-300
              ${
                isActive
                  ? "border-cyan-400 text-cyan-300 shadow-[0_0_20px_#06b6d4]"
                  : "border-slate-700 text-slate-400 hover:border-cyan-500 hover:text-cyan-400"
              }
              `
            }
          >
            Tasks
          </NavLink>
        </li>

          <li>
          <NavLink
            to="/tasks/archive"
            className={({ isActive }) =>
              `
              px-8 py-3
              rounded-xl
              border-2
              uppercase tracking-widest text-sm
              transition-all duration-300
              ${
                isActive
                  ? "border-cyan-400 text-cyan-300 shadow-[0_0_20px_#06b6d4]"
                  : "border-slate-700 text-slate-400 hover:border-cyan-500 hover:text-cyan-400"
              }
              `
            }
          >
            Tasks Archive
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/rewards"
            className={({ isActive }) =>
              `
              px-8 py-3
              rounded-xl
              border-2
              uppercase tracking-widest text-sm
              transition-all duration-300
              ${
                isActive
                  ? "border-pink-500 text-pink-400 shadow-[0_0_20px_#ff00ff]"
                  : "border-slate-700 text-slate-400 hover:border-pink-500 hover:text-pink-400"
              }
              `
            }
          >
            Rewards
          </NavLink>
        </li>
                <li>
          <NavLink
            to="/rewards/archive"
            className={({ isActive }) =>
              `
              px-8 py-3
              rounded-xl
              border-2
              uppercase tracking-widest text-sm
              transition-all duration-300
              ${
                isActive
                  ? "border-pink-500 text-pink-400 shadow-[0_0_20px_#ff00ff]"
                  : "border-slate-700 text-slate-400 hover:border-pink-500 hover:text-pink-400"
              }
              `
            }
          >
            Rewards Archive
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}