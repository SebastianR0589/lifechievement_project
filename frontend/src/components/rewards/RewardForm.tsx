type Props = {
  description: string;
  cost: number;
  repeatable: boolean;
  onSubmit: (e: React.FormEvent) => void;
  setDescription: (v: string) => void;
  setCost: (v: number) => void;
  setRepeatable: (v: boolean) => void;
};

export default function RewardForm({
  description,
  cost,
  repeatable,
  onSubmit,
  setDescription,
  setCost,
  setRepeatable,
}: Readonly<Props>) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-slate-900 p-6 rounded-2xl border-2 border-cyan-500 mb-8"
      style={{
        boxShadow:
          "0 0 10px #06b6d4, 0 0 25px #06b6d4, inset 0 0 15px rgba(6,182,212,0.4)",
      }}
    >
      <div className="mb-4">
        <label className="block text-cyan-400 uppercase tracking-widest mb-1">
          Description:
        </label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-cyan-400 uppercase tracking-widest mb-1">
          Cost:
        </label>
        <input
          type="number"
          name="cost"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
          className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          name="repeatable"
          checked={repeatable}
          onChange={(e) => setRepeatable(e.target.checked)}
          className="form-checkbox h-5 w-5 text-cyan-500 focus:ring-cyan-400 border-cyan-500"
        />
        <label className="block text-cyan-400 uppercase tracking-widest mb-1">
          Repeatable:
        </label>
      </div>

      <button
        type="submit"
        className="px-6 py-2 rounded-xl bg-neonPink text-slate-900 font-bold hover:bg-pink-600 transition-all"
        style={{ textShadow: "0 0 5px #ff00ff, 0 0 15px #ff00ff" }}
      >
        Add Reward
      </button>
    </form>
  );
}