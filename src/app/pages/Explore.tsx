import { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Clock,
  DollarSign,
  BookOpen,
  Heart,
  ChevronRight,
  X,
  Globe,
  Plane,
  GraduationCap,
  Filter,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { scholarshipsData, Scholarship, Level, Region } from "../data/mock";
import { MatchScore } from "../components/MatchScore";
import { ApplicationForm } from "../components/ApplicationForm";
import { useAppState } from "../App";
import { cn } from "../../lib/utils";

const QUICK_CHIPS = [
  {
    id: "full",
    label: "💰 Totalmente Financiada",
    filter: (s: Scholarship) => s.coverageType === "Full",
  },
  {
    id: "notest",
    label: "🌐 Sin examen de idioma",
    filter: (s: Scholarship) => !s.requiresLanguageTest,
  },
  {
    id: "urgent",
    label: "⏰ Cierre Próximo",
    filter: (s: Scholarship) => s.daysLeft > 0 && s.daysLeft <= 15,
  },
  { id: "highmatch", label: "⭐ Alta Afinidad", filter: (s: Scholarship) => s.matchScore >= 80 },
];

const REGIONS: Region[] = ["Europa", "América", "Asia", "África", "Oceanía"];
const LEVELS: Level[] = ["Pregrado", "Maestría", "Doctorado", "Curso Corto"];
const COVERAGES = [
  { id: "Full", label: "Completa (matrícula + manutención)" },
  { id: "Partial", label: "Parcial (matrícula + estipendio)" },
  { id: "Tuition", label: "Solo Matrícula" },
];

export function Explore() {
  const { savedScholarshipIds, toggleSaved } = useAppState();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChips, setActiveChips] = useState<string[]>([]);
  const [minMatch, setMinMatch] = useState(0);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedCoverages, setSelectedCoverages] = useState<string[]>([]);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const filtered = useMemo(() => {
    return scholarshipsData.filter((s) => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          s.title.toLowerCase().includes(q) ||
          s.university.toLowerCase().includes(q) ||
          s.country.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q) ||
          s.level.toLowerCase().includes(q) ||
          s.region.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // Quick chips
      for (const chipId of activeChips) {
        const chip = QUICK_CHIPS.find((c) => c.id === chipId);
        if (chip && !chip.filter(s)) return false;
      }
      // Min match
      if (s.matchScore < minMatch) return false;
      // Levels
      if (selectedLevels.length > 0 && !selectedLevels.includes(s.level)) return false;
      // Regions
      if (selectedRegions.length > 0 && !selectedRegions.includes(s.region)) return false;
      // Coverage
      if (selectedCoverages.length > 0 && !selectedCoverages.includes(s.coverageType)) return false;

      return true;
    });
  }, [searchQuery, activeChips, minMatch, selectedLevels, selectedRegions, selectedCoverages]);

  const toggleChip = (id: string) => {
    setActiveChips((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  };

  const toggleList = (value: string, current: string[], setter: (v: string[]) => void) => {
    setter(current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);
  };

  const activeFilterCount =
    activeChips.length +
    selectedLevels.length +
    selectedRegions.length +
    selectedCoverages.length +
    (minMatch > 0 ? 1 : 0);

  const clearAll = () => {
    setActiveChips([]);
    setMinMatch(0);
    setSelectedLevels([]);
    setSelectedRegions([]);
    setSelectedCoverages([]);
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* ── Header ── */}
      <div>
        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-1 tracking-wide uppercase">
          Explorar Becas
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Encuentra tu beca ideal
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          {scholarshipsData.length} becas disponibles en nuestra base de datos
        </p>
      </div>

      {/* ── Search Bar ── */}
      <div className="relative">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Busca "becas para ciencias en Europa" o "sin examen de idioma"...'
          className="w-full pl-12 pr-12 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* ── Quick Chips ── */}
      <div className="flex items-center gap-3 flex-wrap">
        {QUICK_CHIPS.map((chip) => (
          <button
            key={chip.id}
            onClick={() => toggleChip(chip.id)}
            className={cn(
              "px-4 py-2 rounded-full border text-sm font-semibold transition-all",
              activeChips.includes(chip.id)
                ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-700"
            )}
          >
            {chip.label}
          </button>
        ))}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "ml-auto px-4 py-2 rounded-full border text-sm font-semibold flex items-center gap-2 transition-all",
            showFilters || activeFilterCount > 0
              ? "bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900"
              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400"
          )}
        >
          <Filter size={14} />
          Filtros
          {activeFilterCount > 0 && (
            <span className="bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* ── Main Content: Filters + Results ── */}
      <div className="flex gap-6 items-start">
        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, width: 0, x: -20 }}
              animate={{ opacity: 1, width: 280, x: 0 }}
              exit={{ opacity: 0, width: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex-shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden"
              style={{ minWidth: 280 }}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <SlidersHorizontal size={16} />
                    Filtros
                  </h3>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAll}
                      className="text-xs text-rose-500 font-semibold hover:underline"
                    >
                      Limpiar todo
                    </button>
                  )}
                </div>

                {/* Match Slider */}
                <FilterSection title="Afinidad Mínima" icon={<Star size={14} />}>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Cualquiera</span>
                      <span className="font-bold text-emerald-600">{minMatch}%+</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={95}
                      step={5}
                      value={minMatch}
                      onChange={(e) => setMinMatch(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>0%</span>
                      <span>95%</span>
                    </div>
                  </div>
                </FilterSection>

                {/* Region */}
                <FilterSection title="Región" icon={<Globe size={14} />}>
                  <div className="space-y-2">
                    {REGIONS.map((region) => (
                      <label
                        key={region}
                        className="flex items-center gap-2.5 cursor-pointer group"
                      >
                        <div
                          onClick={() => toggleList(region, selectedRegions, setSelectedRegions)}
                          className={cn(
                            "w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer",
                            selectedRegions.includes(region)
                              ? "bg-emerald-600 border-emerald-600"
                              : "border-slate-300 dark:border-slate-600 group-hover:border-emerald-400"
                          )}
                        >
                          {selectedRegions.includes(region) && (
                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                              <path
                                d="M1 3L3 5L7 1"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                          {region}
                        </span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Level */}
                <FilterSection title="Nivel de Estudios" icon={<GraduationCap size={14} />}>
                  <div className="space-y-2">
                    {LEVELS.map((level) => (
                      <label key={level} className="flex items-center gap-2.5 cursor-pointer group">
                        <div
                          onClick={() => toggleList(level, selectedLevels, setSelectedLevels)}
                          className={cn(
                            "w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer",
                            selectedLevels.includes(level)
                              ? "bg-emerald-600 border-emerald-600"
                              : "border-slate-300 dark:border-slate-600 group-hover:border-emerald-400"
                          )}
                        >
                          {selectedLevels.includes(level) && (
                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                              <path
                                d="M1 3L3 5L7 1"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Coverage */}
                <FilterSection title="Cobertura" icon={<DollarSign size={14} />} noBorder>
                  <div className="space-y-2">
                    {COVERAGES.map((cov) => (
                      <label
                        key={cov.id}
                        className="flex items-center gap-2.5 cursor-pointer group"
                      >
                        <div
                          onClick={() =>
                            toggleList(cov.id, selectedCoverages, setSelectedCoverages)
                          }
                          className={cn(
                            "w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer",
                            selectedCoverages.includes(cov.id)
                              ? "bg-emerald-600 border-emerald-600"
                              : "border-slate-300 dark:border-slate-600 group-hover:border-emerald-400"
                          )}
                        >
                          {selectedCoverages.includes(cov.id) && (
                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                              <path
                                d="M1 3L3 5L7 1"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                          {cov.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </FilterSection>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-bold text-slate-900 dark:text-white">{filtered.length}</span>{" "}
              becas encontradas
            </p>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-slate-500 hover:text-rose-500 transition-colors flex items-center gap-1"
              >
                <X size={12} /> Limpiar filtros
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">
                No encontramos resultados
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                Intenta ajustar los filtros o cambiar el término de búsqueda.
              </p>
              <button
                onClick={clearAll}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors"
              >
                Ver todas las becas
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((s) => (
                <ScholarshipCard
                  key={s.id}
                  scholarship={s}
                  isSaved={savedScholarshipIds.includes(s.id)}
                  onSave={() => toggleSaved(s.id)}
                  onView={() => setSelectedScholarship(s)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Detail Drawer ── */}
      <AnimatePresence>
        {selectedScholarship && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedScholarship(null)}
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
              {/* Drawer Header */}
              <div
                className="p-6 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${selectedScholarship.logoColor}20, ${selectedScholarship.logoColor}05)`,
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <button
                  onClick={() => setSelectedScholarship(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-black/10 rounded-full transition-colors"
                >
                  <X size={20} className="text-slate-600 dark:text-slate-400" />
                </button>
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: selectedScholarship.logoColor }}
                  >
                    {selectedScholarship.logoInitials}
                  </div>
                  <div className="flex-1 pr-8">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {selectedScholarship.title}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {selectedScholarship.university}
                    </p>
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <span className="text-xs px-2.5 py-1 bg-white/80 dark:bg-slate-800/80 rounded-full font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {selectedScholarship.flag} {selectedScholarship.country}
                      </span>
                      <span className="text-xs px-2.5 py-1 bg-white/80 dark:bg-slate-800/80 rounded-full font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {selectedScholarship.level}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-6">
                  {/* Match Score */}
                  <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                    <MatchScore score={selectedScholarship.matchScore} size="lg" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {selectedScholarship.matchScore}% de Afinidad
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {selectedScholarship.matchScore >= 90
                          ? "¡Perfil excelente para esta beca!"
                          : selectedScholarship.matchScore >= 75
                            ? "Buen perfil con algunos pendientes."
                            : "Trabaja en los requisitos faltantes."}
                      </p>
                    </div>
                  </div>

                  {/* Key Info */}
                  <div className="grid grid-cols-2 gap-3">
                    <InfoPill
                      icon={<DollarSign size={14} />}
                      label="Cobertura"
                      value={selectedScholarship.coverage}
                    />
                    <InfoPill
                      icon={<Clock size={14} />}
                      label="Cierre"
                      value={
                        selectedScholarship.daysLeft > 0
                          ? `${selectedScholarship.daysLeft} días`
                          : "Cerrada"
                      }
                      urgent={selectedScholarship.daysLeft > 0 && selectedScholarship.daysLeft <= 5}
                    />
                    <InfoPill
                      icon={<MapPin size={14} />}
                      label="Ubicación"
                      value={selectedScholarship.location}
                    />
                    <InfoPill
                      icon={<BookOpen size={14} />}
                      label="Nivel"
                      value={selectedScholarship.level}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                      Sobre esta Beca
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedScholarship.description}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                      Beneficios
                    </h3>
                    <ul className="space-y-2">
                      {selectedScholarship.benefits.map((b, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-emerald-500 mt-0.5 flex-shrink-0"
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                      Requisitos de tu Perfil
                    </h3>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-2.5 border border-slate-100 dark:border-slate-700">
                      <ReqItem
                        label="Idioma (Nivel C1)"
                        met={selectedScholarship.requirements.language}
                      />
                      <ReqItem
                        label="Promedio Académico ≥ 8.5"
                        met={selectedScholarship.requirements.gpa}
                      />
                      <ReqItem
                        label="Cartas de Recomendación"
                        met={selectedScholarship.requirements.documents}
                      />
                    </div>
                    {!selectedScholarship.requirements.language && (
                      <p className="mt-2 text-xs text-amber-600 dark:text-amber-400 leading-relaxed">
                        ⚠️ Casi lo tienes — aún te falta el certificado de idioma. ¡Puedes lograrlo!
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-3">
                <button
                  onClick={() => toggleSaved(selectedScholarship.id)}
                  className={cn(
                    "px-4 py-3 rounded-xl border font-semibold text-sm flex items-center gap-2 transition-all",
                    savedScholarshipIds.includes(selectedScholarship.id)
                      ? "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-300 hover:text-rose-500"
                  )}
                >
                  <Heart
                    size={16}
                    className={
                      savedScholarshipIds.includes(selectedScholarship.id) ? "fill-current" : ""
                    }
                  />
                  {savedScholarshipIds.includes(selectedScholarship.id) ? "Guardada" : "Guardar"}
                </button>
                <button
                  onClick={() => setShowApplicationForm(true)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  ¡Postular ahora! <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {showApplicationForm && selectedScholarship && (
        <ApplicationForm
          scholarshipId={selectedScholarship.id}
          scholarshipTitle={selectedScholarship.title}
          onClose={() => setShowApplicationForm(false)}
        />
      )}
    </div>
  );
}

/* ─── Scholarship Card ─── */
function ScholarshipCard({
  scholarship: s,
  isSaved,
  onSave,
  onView,
}: {
  scholarship: Scholarship;
  isSaved: boolean;
  onSave: () => void;
  onView: () => void;
}) {
  const isUrgent = s.daysLeft > 0 && s.daysLeft <= 5;
  const isClosed = s.daysLeft <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all group flex flex-col overflow-hidden"
    >
      {/* Card Header */}
      <div className="p-4 pb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-sm"
            style={{ backgroundColor: s.logoColor }}
          >
            {s.logoInitials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
              {s.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
              {s.university}
            </p>
          </div>
        </div>
        {/* Match Score */}
        <div className="flex-shrink-0">
          <MatchScore score={s.matchScore} size="sm" />
        </div>
      </div>

      {/* Tags */}
      <div className="px-4 pb-3 flex flex-wrap gap-1.5">
        <Tag
          label={
            s.coverageType === "Full"
              ? "💰 Completa"
              : s.coverageType === "Partial"
                ? "💸 Parcial"
                : "🎓 Matrícula"
          }
          color={s.coverageType === "Full" ? "emerald" : "blue"}
        />
        <Tag label={`${s.flag} ${s.country}`} color="slate" />
        <Tag label={s.level} color="violet" />
      </div>

      {/* Body: key info */}
      <div className="px-4 pb-4 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <MapPin size={11} />
          {s.location}
        </span>
        <span className="flex items-center gap-1">
          <DollarSign size={11} />
          {s.coverage}
        </span>
      </div>

      {/* Footer */}
      <div className="mt-auto px-4 pb-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <div
          className={cn(
            "flex items-center gap-1.5 text-xs font-semibold",
            isClosed
              ? "text-slate-400 dark:text-slate-600"
              : isUrgent
                ? "text-rose-600 dark:text-rose-400"
                : "text-slate-500 dark:text-slate-400"
          )}
        >
          <Clock size={12} />
          {isClosed ? "Convocatoria cerrada" : `Cierra en ${s.daysLeft} días`}
          {isUrgent && !isClosed && (
            <span className="bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 px-1.5 py-0.5 rounded-full text-[10px] font-bold ml-1">
              URGENTE
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
            className={cn(
              "p-2 rounded-xl border transition-all",
              isSaved
                ? "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-500"
                : "border-slate-200 dark:border-slate-700 text-slate-400 hover:border-rose-300 hover:text-rose-400"
            )}
          >
            <Heart size={14} className={isSaved ? "fill-current" : ""} />
          </button>
          <button
            onClick={onView}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            Ver Detalles <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Minor sub-components ─── */
function FilterSection({
  title,
  icon,
  children,
  noBorder,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  noBorder?: boolean;
}) {
  return (
    <div className={cn("py-4", !noBorder && "border-b border-slate-100 dark:border-slate-800")}>
      <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
        {icon}
        {title}
      </h4>
      {children}
    </div>
  );
}

function Tag({ label, color }: { label: string; color: "emerald" | "blue" | "violet" | "slate" }) {
  const colors = {
    emerald:
      "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50",
    blue: "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900/50",
    violet:
      "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border-violet-100 dark:border-violet-900/50",
    slate:
      "bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-700",
  };
  return (
    <span
      className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full border", colors[color])}
    >
      {label}
    </span>
  );
}

function InfoPill({
  icon,
  label,
  value,
  urgent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  urgent?: boolean;
}) {
  return (
    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
      <div
        className={cn(
          "flex items-center gap-1.5 text-xs font-semibold mb-1",
          urgent ? "text-rose-600 dark:text-rose-400" : "text-slate-500 dark:text-slate-400"
        )}
      >
        {icon}
        {label}
      </div>
      <p
        className={cn(
          "text-sm font-bold",
          urgent ? "text-rose-700 dark:text-rose-300" : "text-slate-900 dark:text-white"
        )}
      >
        {value}
      </p>
    </div>
  );
}

function ReqItem({ label, met }: { label: string; met: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {met ? (
        <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0" />
      ) : (
        <AlertCircle size={15} className="text-amber-500 flex-shrink-0" />
      )}
      <span
        className={cn(
          "text-sm flex-1",
          met
            ? "text-slate-700 dark:text-slate-300"
            : "font-semibold text-slate-900 dark:text-white"
        )}
      >
        {label}
      </span>
      {!met && <span className="text-xs text-amber-500 font-bold">Pendiente</span>}
    </div>
  );
}
