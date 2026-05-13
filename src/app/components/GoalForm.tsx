import { useState } from "react";
import { X } from "lucide-react";
import { useAppState } from "../App";
import { Goal, Region } from "../data/mock";
import { toast } from "sonner";

interface GoalFormProps {
  goal?: Goal;
  onClose: () => void;
}

const REGIONS: Region[] = ["Europa", "América", "Asia", "África", "Oceanía"];
const COLORS = ["emerald", "blue", "violet", "amber", "rose"];
const EMOJIS = ["🇪🇺", "🇺🇸", "🌏", "🌍", "🌎"];

export function GoalForm({ goal, onClose }: GoalFormProps) {
  const { addGoal, updateGoal } = useAppState();
  const [name, setName] = useState(goal?.name || "");
  const [region, setRegion] = useState<Region>(goal?.region || "Europa");
  const [total, setTotal] = useState(goal?.total || 5);
  const [emoji, setEmoji] = useState(goal?.emoji || "🇪🇺");
  const [color, setColor] = useState(goal?.color || "emerald");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("El nombre de la meta es requerido");
      return;
    }

    if (total < 1 || total > 50) {
      toast.error("El total de pasos debe estar entre 1 y 50");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (goal) {
        updateGoal(goal.id, {
          name,
          region,
          total,
          emoji,
          color,
        });
        toast.success("Meta actualizada");
      } else {
        const newGoal: Goal = {
          id: `g_${Date.now()}`,
          name,
          region,
          progress: 0,
          total,
          emoji,
          color,
        };
        addGoal(newGoal);
        toast.success("Nueva meta creada");
      }
      setLoading(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {goal ? "Editar Meta" : "Nueva Meta"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Nombre de la Meta *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Maestría en Europa"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              disabled={loading}
            />
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Región
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value as Region)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              disabled={loading}
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Emoji */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Emoji
            </label>
            <select
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              disabled={loading}
            >
              {EMOJIS.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Color
            </label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              disabled={loading}
            >
              {COLORS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Total Steps */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Pasos Totales ({total})
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={total}
              onChange={(e) => setTotal(Number(e.target.value))}
              className="w-full accent-emerald-600"
              disabled={loading}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {loading ? "Guardando..." : goal ? "Actualizar" : "Crear Meta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
