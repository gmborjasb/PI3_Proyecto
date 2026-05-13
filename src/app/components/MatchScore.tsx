import { cn } from "../../lib/utils";

interface MatchScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

export function MatchScore({ score, size = "md", showTooltip = true }: MatchScoreProps) {
  const sizeConfig = {
    sm: { dim: 36, radius: 13, stroke: 3, fontSize: "text-[9px]" },
    md: { dim: 48, radius: 17, stroke: 4, fontSize: "text-[11px]" },
    lg: { dim: 64, radius: 23, stroke: 5, fontSize: "text-xs" },
  };

  const { dim, radius, stroke, fontSize } = sizeConfig[size];
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let scoreColor = "text-emerald-500";
  let scoreBg = "text-emerald-50 dark:text-emerald-900/30";
  if (score < 50) {
    scoreColor = "text-rose-500";
    scoreBg = "text-rose-50 dark:text-rose-900/30";
  } else if (score < 75) {
    scoreColor = "text-amber-500";
    scoreBg = "text-amber-50 dark:text-amber-900/30";
  }

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        showTooltip && "group cursor-pointer"
      )}
    >
      <svg height={dim} width={dim} className="transform -rotate-90 flex-shrink-0">
        {/* Track */}
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          r={radius}
          cx={dim / 2}
          cy={dim / 2}
          className="text-slate-150 dark:text-slate-800"
          style={{ color: "rgba(0,0,0,0.07)" }}
        />
        {/* Progress */}
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={radius}
          cx={dim / 2}
          cy={dim / 2}
          className={cn("transition-all duration-1000 ease-out", scoreColor)}
        />
      </svg>

      {/* Label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn("font-bold", fontSize, scoreColor)}>{score}%</span>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute hidden group-hover:flex flex-col bottom-full mb-2 w-52 bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-3.5 border border-slate-100 dark:border-slate-700 z-50 pointer-events-none">
          <div className="font-bold text-slate-900 dark:text-white text-xs mb-2.5 pb-2 border-b border-slate-100 dark:border-slate-700">
            Desglose de Afinidad
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <span>✅</span> Idioma C1
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <span>✅</span> Promedio ≥ 8.5
            </div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <span>⚠️</span> Carta de Recomendación
            </div>
          </div>
          {/* Arrow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white dark:border-t-slate-800" />
        </div>
      )}
    </div>
  );
}
