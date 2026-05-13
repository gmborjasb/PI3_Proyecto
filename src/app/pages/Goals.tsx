import { useState } from "react";
import { useAppState } from "../App";
import { GoalForm } from "../components/GoalForm";
import {
  Target,
  Plus,
  CheckCircle2,
  Circle,
  TrendingUp,
  MapPin,
  BookOpen,
  Globe,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { mockGoals, scholarshipsData } from "../data/mock";
import { MatchScore } from "../components/MatchScore";
import { cn } from "../../lib/utils";

const STEPS_BY_GOAL = {
  g1: [
    { id: "s1", label: "Completar perfil académico", done: true },
    { id: "s2", label: "Subir certificado de idioma (IELTS/TOEFL)", done: true },
    { id: "s3", label: "Redactar carta de motivación", done: true },
    { id: "s4", label: "Solicitar cartas de recomendación", done: false },
    { id: "s5", label: "Traducir documentos académicos", done: false },
  ],
  g2: [
    { id: "s1", label: "Preparar CV académico en inglés", done: true },
    { id: "s2", label: "Identificar programas de interés en EE.UU.", done: false },
    { id: "s3", label: "Tomar GRE / GMAT", done: false },
    { id: "s4", label: "Obtener cartas de recomendación", done: false },
  ],
  g3: [
    { id: "s1", label: "Investigar universidades en Asia", done: true },
    { id: "s2", label: "Traducir documentos al inglés/japonés", done: true },
    { id: "s3", label: "Preparar ensayo de motivación", done: false },
  ],
};

export function Goals() {
  const { goals } = useAppState();
  const [steps, setSteps] = useState<
    Record<string, { id: string; label: string; done: boolean }[]>
  >(STEPS_BY_GOAL as any);
  const [activeGoal, setActiveGoal] = useState("g1");
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState<(typeof goals)[0] | undefined>(undefined);

  const toggleStep = (goalId: string, stepId: string) => {
    setSteps((prev) => ({
      ...prev,
      [goalId]: prev[goalId]?.map((s) => (s.id === stepId ? { ...s, done: !s.done } : s)) || [],
    }));
  };

  const currentSteps = steps[activeGoal] || [];
  const completedSteps = currentSteps.filter((s) => s.done).length;
  const activeGoalData = goals.find((g) => g.id === activeGoal);
  const relevantScholarships = scholarshipsData
    .filter((s) => !s.state && s.matchScore >= 70)
    .slice(0, 3);

  const colorMap: Record<string, { bg: string; ring: string; text: string; bar: string }> = {
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50",
      ring: "ring-emerald-500",
      text: "text-emerald-700 dark:text-emerald-400",
      bar: "bg-emerald-500",
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50",
      ring: "ring-blue-500",
      text: "text-blue-700 dark:text-blue-400",
      bar: "bg-blue-500",
    },
    violet: {
      bg: "bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-900/50",
      ring: "ring-violet-500",
      text: "text-violet-700 dark:text-violet-400",
      bar: "bg-violet-500",
    },
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div>
        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-1 tracking-wide uppercase">
          Tu Camino
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Mis Metas
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Gestiona tus objetivos académicos y el progreso hacia cada uno.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Goals List */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Objetivos Activos
          </h2>

          {goals.map((goal) => {
            const c = colorMap[goal.color] || colorMap.emerald;
            const goalSteps = steps[goal.id] || [];
            const done = goalSteps.filter((s) => s.done).length;
            const total = goalSteps.length || goal.total;
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;
            const isActive = activeGoal === goal.id;

            return (
              <button
                key={goal.id}
                onClick={() => setActiveGoal(goal.id)}
                className={cn(
                  "w-full text-left rounded-2xl border p-4 transition-all",
                  isActive
                    ? cn(c.bg, `ring-2 ${c.ring}`)
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{goal.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">
                      {goal.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {done} de {total} pasos
                    </p>
                  </div>
                  <span className={cn("text-sm font-bold", c.text)}>{pct}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                  <div
                    className={cn("rounded-full h-2 transition-all duration-700", c.bar)}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </button>
            );
          })}

          <button
            onClick={() => {
              setGoalToEdit(undefined);
              setShowGoalForm(true);
            }}
            className="w-full flex items-center gap-2 justify-center py-3 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 hover:border-emerald-300 hover:text-emerald-500 transition-colors text-sm font-semibold"
          >
            <Plus size={16} />
            Nueva Meta
          </button>
        </div>

        {/* Steps Detail */}
        <div className="lg:col-span-2 space-y-4">
          {activeGoalData && (
            <>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl">{activeGoalData.emoji}</span>
                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white">
                      {activeGoalData.name}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {completedSteps} de {currentSteps.length} pasos completados
                    </p>
                  </div>
                  <div className="ml-auto">
                    <TrendingUp size={20} className="text-emerald-500" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  {currentSteps.map((step) => (
                    <motion.button
                      key={step.id}
                      onClick={() => toggleStep(activeGoal, step.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all group",
                        step.done
                          ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/50"
                          : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800"
                      )}
                    >
                      {step.done ? (
                        <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                      ) : (
                        <Circle
                          size={18}
                          className="text-slate-300 dark:text-slate-600 flex-shrink-0 group-hover:text-emerald-400 transition-colors"
                        />
                      )}
                      <span
                        className={cn(
                          "text-sm font-medium flex-1",
                          step.done
                            ? "text-emerald-700 dark:text-emerald-400 line-through decoration-emerald-300 dark:decoration-emerald-700"
                            : "text-slate-700 dark:text-slate-300"
                        )}
                      >
                        {step.label}
                      </span>
                      {!step.done && (
                        <span className="text-xs text-slate-400 dark:text-slate-600 group-hover:text-emerald-500 transition-colors font-medium">
                          Marcar ✓
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Relevant Scholarships */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <TrendingUp size={16} className="text-emerald-500" />
                  Becas relevantes para esta meta
                </h3>
                <div className="space-y-3">
                  {relevantScholarships.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors cursor-pointer group"
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                        style={{ backgroundColor: s.logoColor }}
                      >
                        {s.logoInitials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          {s.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {s.flag} {s.location}
                        </p>
                      </div>
                      <MatchScore score={s.matchScore} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {showGoalForm && (
        <GoalForm
          goal={goalToEdit}
          onClose={() => {
            setShowGoalForm(false);
            setGoalToEdit(undefined);
          }}
        />
      )}
    </div>
  );
}
