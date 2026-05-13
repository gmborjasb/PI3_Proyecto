import { useState } from "react";
import { useAppState } from "../App";
import { Heart, Clock, MapPin, DollarSign, ChevronRight, X } from "lucide-react";
import { motion } from "motion/react";
import { scholarshipsData, Scholarship } from "../data/mock";
import { MatchScore } from "../components/MatchScore";
import { cn } from "../../lib/utils";

export function Saved() {
  const { savedScholarshipIds, toggleSaved } = useAppState();
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  const saved = scholarshipsData.filter((s) => savedScholarshipIds.includes(s.id));

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-1 tracking-wide uppercase">
          Mis Becas
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Guardadas
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          {saved.length} beca{saved.length !== 1 ? "s" : ""} en tu lista de seguimiento
        </p>
      </div>

      {saved.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="text-5xl mb-4">🤍</div>
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">
            Aún no tienes becas guardadas
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Explora las becas disponibles y guarda las que más te interesen.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {saved.map((s) => (
            <motion.div
              key={s.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-4 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm"
                style={{ backgroundColor: s.logoColor }}
              >
                {s.logoInitials}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {s.university}
                </p>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <MapPin size={10} /> {s.location}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <DollarSign size={10} /> {s.coverage}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-semibold flex items-center gap-1",
                      s.daysLeft > 0 && s.daysLeft <= 5
                        ? "text-rose-600 dark:text-rose-400"
                        : "text-slate-500 dark:text-slate-400"
                    )}
                  >
                    <Clock size={10} />
                    {s.daysLeft > 0 ? `Cierra en ${s.daysLeft}d` : "Cerrada"}
                  </span>
                </div>
              </div>

              <MatchScore score={s.matchScore} size="sm" />

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setSelectedScholarship(s)}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  Ver <ChevronRight size={12} />
                </button>
                <button
                  onClick={() => toggleSaved(s.id)}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:border-rose-300 hover:text-rose-500 transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedScholarship && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50"
          onClick={() => setSelectedScholarship(null)}
        >
          <motion.div
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full sm:max-w-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-b from-white dark:from-slate-900 to-transparent p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg"
                  style={{ backgroundColor: selectedScholarship.logoColor }}
                >
                  {selectedScholarship.logoInitials}
                </div>
                <div className="min-w-0">
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">
                    {selectedScholarship.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {selectedScholarship.university}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedScholarship(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors flex-shrink-0"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {selectedScholarship.description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Ubicación</span>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">
                    {selectedScholarship.location}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Cobertura</span>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">
                    {selectedScholarship.coverage}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
