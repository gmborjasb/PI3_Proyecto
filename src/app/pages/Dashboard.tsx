import { useState } from "react";
import { useAppState } from "../App";
import { ApplicationForm } from "../components/ApplicationForm";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Trophy,
  Plane,
  CalendarDays,
  ChevronRight,
  TrendingUp,
  Star,
  FileText,
  Zap,
  Target,
  ArrowRight,
  X,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  mockUser,
  mockGoals,
  scholarshipsData,
  featuredScholarship,
  Scholarship,
} from "../data/mock";
import { MatchScore } from "../components/MatchScore";
import { cn } from "../../lib/utils";

export function Dashboard() {
  const { applications, savedScholarshipIds } = useAppState();
  const [selectedApp, setSelectedApp] = useState<Scholarship | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Scholarship | null>(null);

  const activeApps = scholarshipsData.filter((s) => s.state);
  const recommended = scholarshipsData.filter((s) => !s.state && s.matchScore >= 80).slice(0, 3);
  const docsLeft = mockUser.documentsTotal - mockUser.documentsCompleted;
  const docPercent = Math.round((mockUser.documentsCompleted / mockUser.documentsTotal) * 100);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto relative">
      {/* ── Welcome Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-1 tracking-wide uppercase">
            Panel de Control
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
            ¡Hola, {mockUser.name}! 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Estás a{" "}
            <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">
              {docsLeft} documentos
            </strong>{" "}
            de completar tu meta para Europa.
          </p>
        </div>

        {/* Quick Stats Strip */}
        <div className="flex gap-3 flex-wrap">
          <QuickStat
            label="Match Máx."
            value={`${mockUser.stats.maxMatch}%`}
            color="emerald"
            icon={<Zap size={14} />}
          />
          <QuickStat
            label="Postulaciones"
            value={String(mockUser.stats.applied)}
            color="blue"
            icon={<FileText size={14} />}
          />
          <QuickStat
            label="Entrevistas"
            value={String(mockUser.stats.interviews)}
            color="violet"
            icon={<Star size={14} />}
          />
        </div>
      </div>

      {/* ── Bento Grid ── */}
      <div className="grid grid-cols-12 gap-4 auto-rows-auto">
        {/* Cell A: Active Goal (large) */}
        <div className="col-span-12 md:col-span-8 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-2xl p-6 text-white shadow-md overflow-hidden relative min-h-[200px]">
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
            <Trophy size={220} />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 bg-white/20 w-fit px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm">
                <MapPin size={14} />
                Meta Principal
              </div>
              <h2 className="text-2xl font-bold mb-1">{mockUser.activeGoal}</h2>
              <p className="text-white/70 text-sm mb-6">
                {mockUser.stats.applied} becas activas · {mockUser.stats.matches} matches
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold">
                <span>Progreso de Preparación</span>
                <span>{docPercent}%</span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-3">
                <div
                  className="bg-white rounded-full h-3 transition-all duration-700 shadow-sm"
                  style={{ width: `${docPercent}%` }}
                />
              </div>
              <div className="text-xs text-white/60 flex justify-between">
                <span>{mockUser.documentsCompleted} documentos listos</span>
                <span>Faltan {docsLeft}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cell B: Próximo Cierre */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
          <div className="flex-1 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 rounded-2xl p-5">
            <div className="flex gap-3 items-start mb-4">
              <div className="p-2.5 bg-amber-100 dark:bg-amber-900/50 rounded-xl text-amber-600 dark:text-amber-400">
                <CalendarDays size={18} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">Próximo Cierre</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  ¡Solo quedan 3 días!
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              La <strong className="text-amber-700 dark:text-amber-400">Beca Eiffel</strong> cierra
              el <strong>10 ene</strong>. Sube tu ensayo personal hoy para revisión.
            </p>
            <div className="w-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2">
              <Plane size={14} />
              Ver Beca
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Target size={16} className="text-blue-200" />
              <span className="text-blue-100 text-xs font-semibold uppercase tracking-wide">
                Beca del Día
              </span>
            </div>
            <h4 className="font-bold leading-snug mb-1">{featuredScholarship.title}</h4>
            <p className="text-blue-200 text-xs mb-3">{featuredScholarship.university}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-medium">
                {featuredScholarship.matchScore}% afinidad
              </span>
              <ArrowRight size={16} className="text-blue-200" />
            </div>
          </div>
        </div>

        {/* Cell C: Pipeline */}
        <div className="col-span-12 md:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Mi Pipeline
            </h2>
            <button className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1">
              Ver todas <ChevronRight size={14} />
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 snap-x -mx-1 px-1">
            {activeApps.map((app) => (
              <PipelineCard key={app.id} app={app} onClick={() => setSelectedApp(app)} />
            ))}
          </div>
        </div>

        {/* Cell D: Recommendations */}
        <div className="col-span-12 md:col-span-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-emerald-500" />
            Matches para ti
          </h2>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="space-y-4">
              {recommended.map((rec, i) => (
                <div key={rec.id}>
                  <div className="flex items-start gap-3 group cursor-pointer">
                    <MatchScore score={rec.matchScore} size="sm" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        {rec.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <Plane size={11} />
                        {rec.location}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedRecommendation(rec);
                      setShowApplicationForm(true);
                    }}
                    className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    Aplicar →
                  </button>
                  {i < recommended.length - 1 && (
                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-3" />
                  )}
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl transition-colors border border-emerald-100 dark:border-emerald-900/50">
              Explorar todas →
            </button>
          </div>
        </div>

        {/* Cell E: Goals Progress */}
        <div className="col-span-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Target size={18} className="text-blue-500" />
              Progreso de Metas
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Drawer ── */}
      <AnimatePresence>
        {selectedApp && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedApp(null)}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 z-50 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                    getStateColor(selectedApp.state!)
                  )}
                >
                  {getStateLabel(selectedApp.state!)}
                </span>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ backgroundColor: selectedApp.logoColor }}
                    >
                      {selectedApp.logoInitials}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
                        {selectedApp.title}
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {selectedApp.university}
                      </p>
                    </div>
                  </div>

                  {/* Match Score */}
                  <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-6">
                    <MatchScore score={selectedApp.matchScore} size="lg" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Afinidad de Perfil</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {selectedApp.matchScore >= 90
                          ? "¡Excelente match! Tienes muy buenas posibilidades."
                          : selectedApp.matchScore >= 75
                            ? "Buen match. Algunos requisitos pendientes."
                            : "Match moderado. Trabaja en los requisitos faltantes."}
                      </p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                      Línea de Vida
                    </h3>
                    <div className="relative">
                      <div className="absolute left-[10px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700" />
                      <div className="space-y-5 relative">
                        <TimelineStep status="completed" title="Documentación" date="12 Nov 2024" />
                        <TimelineStep
                          status={selectedApp.state === "Draft" ? "current" : "completed"}
                          title="Solicitud Enviada"
                          date="15 Nov 2024"
                        />
                        <TimelineStep
                          status={
                            selectedApp.state === "Sent" || selectedApp.state === "Draft"
                              ? "upcoming"
                              : selectedApp.state === "Interview"
                                ? "current"
                                : "completed"
                          }
                          title="Entrevista"
                          date="Por confirmar"
                        />
                        <TimelineStep
                          status={selectedApp.state === "Finished" ? "completed" : "upcoming"}
                          title="Resultados"
                          date="Dic 2024"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                      Requisitos
                    </h3>
                    <div className="space-y-2.5 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <ReqRow label="Idioma (Nivel C1)" met={selectedApp.requirements.language} />
                      <ReqRow label="Promedio Académico ≥ 8.5" met={selectedApp.requirements.gpa} />
                      <ReqRow
                        label="Cartas de Recomendación"
                        met={selectedApp.requirements.documents}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                  ¡Postular ahora! <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {showApplicationForm && selectedRecommendation && (
        <ApplicationForm
          scholarshipId={selectedRecommendation.id}
          scholarshipTitle={selectedRecommendation.title}
          onClose={() => setShowApplicationForm(false)}
        />
      )}
    </div>
  );
}

/* ─── Sub-components ─── */

function QuickStat({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string;
  color: "emerald" | "blue" | "violet";
  icon: React.ReactNode;
}) {
  const colors = {
    emerald:
      "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50",
    blue: "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900/50",
    violet:
      "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border-violet-100 dark:border-violet-900/50",
  };
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold",
        colors[color]
      )}
    >
      {icon}
      <span>{value}</span>
      <span className="text-xs font-normal opacity-70">{label}</span>
    </div>
  );
}

function PipelineCard({ app, onClick }: { app: Scholarship; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all w-64 flex-shrink-0 snap-start group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
            style={{ backgroundColor: app.logoColor }}
          >
            {app.logoInitials}
          </div>
          <div className="min-w-0 text-left">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-2 group-hover:text-emerald-700 transition-colors">
              {app.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{app.university}</p>
          </div>
        </div>
        <MatchScore score={app.matchScore} size="sm" />
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <Clock size={12} />
          {app.daysLeft > 0 ? `${app.daysLeft}d left` : "Closed"}
        </span>
        <span
          className={cn(
            "text-xs font-semibold px-2 py-1 rounded-full",
            app.state === "Draft"
              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
              : app.state === "Sent"
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                : app.state === "Interview"
                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                  : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
          )}
        >
          {getStateLabel(app.state!)}
        </span>
      </div>
    </button>
  );
}

function GoalCard({ goal }: { goal: any }) {
  const goalProgress = Math.round((goal.progress / goal.total) * 100);
  const colors: Record<string, { bg: string; ring: string; text: string; bar: string }> = {
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
    <div
      className={cn(
        "border rounded-2xl p-5 space-y-4",
        colors[goal.color as keyof typeof colors]?.bg || colors.emerald.bg
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{goal.emoji}</span>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">{goal.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{goal.region}</p>
          </div>
        </div>
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
          {goalProgress}%
        </span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            colors[goal.color as keyof typeof colors]?.bar || colors.emerald.bar
          )}
          style={{ width: `${goalProgress}%` }}
        />
      </div>
    </div>
  );
}

function TimelineStep({
  status,
  title,
  date,
}: {
  status: "completed" | "current" | "upcoming";
  title: string;
  date: string;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="relative flex flex-col items-center">
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
            status === "completed"
              ? "bg-emerald-500 border-emerald-500"
              : status === "current"
                ? "border-emerald-500 bg-white dark:bg-slate-900"
                : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
          )}
        >
          {status === "completed" && <CheckCircle2 size={12} className="text-white" />}
        </div>
      </div>
      <div className="pt-0.5">
        <p
          className={cn(
            "font-semibold text-sm",
            status === "completed"
              ? "text-slate-900 dark:text-white"
              : status === "current"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-slate-500 dark:text-slate-400"
          )}
        >
          {title}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{date}</p>
      </div>
    </div>
  );
}

function ReqRow({ label, met }: { label: string; met: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0",
          met ? "bg-emerald-500 border-emerald-500" : "border-slate-300 dark:border-slate-600"
        )}
      >
        {met && <CheckCircle2 size={10} className="text-white" />}
      </div>
      <span
        className={cn(
          "text-sm",
          met ? "text-slate-900 dark:text-white font-medium" : "text-slate-500 dark:text-slate-400"
        )}
      >
        {label}
      </span>
    </div>
  );
}

function getStateColor(state: string) {
  switch (state) {
    case "Draft":
      return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
    case "Sent":
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
    case "Interview":
      return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400";
    case "Finished":
      return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400";
    default:
      return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300";
  }
}

function getStateLabel(state: string) {
  switch (state) {
    case "Draft":
      return "En Borrador";
    case "Sent":
      return "Enviada";
    case "Interview":
      return "Entrevista";
    case "Finished":
      return "Finalizada";
    default:
      return state;
  }
}
