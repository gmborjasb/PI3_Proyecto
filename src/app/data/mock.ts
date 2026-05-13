export type ApplicationState = "Draft" | "Sent" | "Interview" | "Finished";
export type Level = "Maestría" | "Doctorado" | "Pregrado" | "Curso Corto";
export type Region = "Europa" | "América" | "Asia" | "África" | "Oceanía";

export interface Scholarship {
  id: string;
  title: string;
  university: string;
  location: string;
  country: string;
  flag: string;
  region: Region;
  level: Level;
  matchScore: number;
  coverage: string;
  coverageType: "Full" | "Partial" | "Tuition";
  deadline: string;
  daysLeft: number;
  tags: string[];
  requiresLanguageTest: boolean;
  state?: ApplicationState;
  requirements: {
    language: boolean;
    gpa: boolean;
    documents: boolean;
  };
  description: string;
  benefits: string[];
  logoColor: string;
  logoInitials: string;
}

export interface Goal {
  id: string;
  name: string;
  region: Region;
  progress: number;
  total: number;
  emoji: string;
  color: string;
}

export const mockUser = {
  name: "Camila",
  activeGoal: "Maestría en Europa",
  documentsCompleted: 3,
  documentsTotal: 5,
  savedIds: ["5", "6", "7"],
  stats: {
    applied: 4,
    matches: 6,
    interviews: 1,
    maxMatch: 95,
  },
};

export const mockGoals: Goal[] = [
  {
    id: "g1",
    name: "Maestría en Europa",
    region: "Europa",
    progress: 3,
    total: 5,
    emoji: "🇪🇺",
    color: "emerald",
  },
  {
    id: "g2",
    name: "PhD en Norteamérica",
    region: "América",
    progress: 1,
    total: 4,
    emoji: "🇺🇸",
    color: "blue",
  },
  {
    id: "g3",
    name: "Curso de Verano Asia",
    region: "Asia",
    progress: 2,
    total: 3,
    emoji: "🌏",
    color: "violet",
  },
];

export const scholarshipsData: Scholarship[] = [
  {
    id: "1",
    title: "Beca Erasmus Mundus Joint Master",
    university: "Múltiples Universidades Europeas",
    location: "Europa",
    country: "Unión Europea",
    flag: "🇪🇺",
    region: "Europa",
    level: "Maestría",
    matchScore: 92,
    coverage: "Matrícula + Manutención + Vuelos",
    coverageType: "Full",
    deadline: "15 Jan 2025",
    daysLeft: 4,
    tags: ["100% Completa", "🇪🇺 Europa", "Maestría"],
    requiresLanguageTest: true,
    state: "Interview",
    requirements: { language: true, gpa: true, documents: true },
    description:
      "El programa Erasmus Mundus ofrece becas de excelencia para estudiar en al menos dos universidades europeas. Cubre todos los gastos del estudiante durante el programa de maestría.",
    benefits: [
      "Matrícula completa en 2+ universidades",
      "€1,000/mes de manutención",
      "Vuelos de ida y vuelta",
      "Seguro médico incluido",
    ],
    logoColor: "#003399",
    logoInitials: "EM",
  },
  {
    id: "2",
    title: "Beca Fundación Carolina",
    university: "Universidad Complutense de Madrid",
    location: "España",
    country: "España",
    flag: "🇪🇸",
    region: "Europa",
    level: "Maestría",
    matchScore: 85,
    coverage: "Matrícula + 800€/mes",
    coverageType: "Partial",
    deadline: "10 Mar 2025",
    daysLeft: 25,
    tags: ["Parcial", "🇪🇸 España", "Maestría"],
    requiresLanguageTest: false,
    state: "Sent",
    requirements: { language: true, gpa: true, documents: false },
    description:
      "La Fundación Carolina promueve las relaciones entre España y los países de América Latina mediante becas de posgrado de alta calidad.",
    benefits: [
      "Matrícula en universidad española",
      "€800/mes de estipendio",
      "Acceso a red alumni",
    ],
    logoColor: "#c60b1e",
    logoInitials: "FC",
  },
  {
    id: "3",
    title: "Chevening Scholarships",
    university: "Universidades de UK",
    location: "Reino Unido",
    country: "Reino Unido",
    flag: "🇬🇧",
    region: "Europa",
    level: "Maestría",
    matchScore: 88,
    coverage: "Cobertura Total",
    coverageType: "Full",
    deadline: "1 Nov 2024",
    daysLeft: -30,
    tags: ["100% Completa", "🇬🇧 UK", "Maestría"],
    requiresLanguageTest: true,
    state: "Finished",
    requirements: { language: true, gpa: true, documents: true },
    description:
      "Chevening es el programa de becas del gobierno del Reino Unido, gestionado por la Oficina de Asuntos Exteriores del Reino Unido.",
    benefits: [
      "Matrícula universitaria completa",
      "Estipendio de vida mensual",
      "Vuelo de ida y vuelta",
      "Seguro médico del NHS",
    ],
    logoColor: "#012169",
    logoInitials: "CV",
  },
  {
    id: "4",
    title: "Beca DAAD para Países en Desarrollo",
    university: "TU Munich",
    location: "Alemania",
    country: "Alemania",
    flag: "🇩🇪",
    region: "Europa",
    level: "Maestría",
    matchScore: 78,
    coverage: "Matrícula + 934€/mes",
    coverageType: "Full",
    deadline: "15 Feb 2025",
    daysLeft: 12,
    tags: ["100% Completa", "🇩🇪 Alemania", "Maestría"],
    requiresLanguageTest: true,
    state: "Draft",
    requirements: { language: false, gpa: true, documents: false },
    description:
      "El DAAD ofrece becas para que estudiantes de países en desarrollo cursen posgrados en las mejores universidades técnicas de Alemania.",
    benefits: [
      "€934/mes de estipendio",
      "Seguro de salud",
      "Asistencia de viaje",
      "Cursos de alemán",
    ],
    logoColor: "#FFCE00",
    logoInitials: "DA",
  },
  {
    id: "5",
    title: "Eiffel Excellence Scholarship",
    university: "Sciences Po Paris",
    location: "Francia",
    country: "Francia",
    flag: "🇫🇷",
    region: "Europa",
    level: "Maestría",
    matchScore: 95,
    coverage: "1,181€/mes + Viaje",
    coverageType: "Partial",
    deadline: "10 Jan 2025",
    daysLeft: 3,
    tags: ["Parcial", "🇫🇷 Francia", "Maestría"],
    requiresLanguageTest: false,
    requirements: { language: true, gpa: true, documents: true },
    description:
      "El Programa Eiffel es un instrumento del Ministerio de Europa y Asuntos Exteriores de Francia para atraer a los mejores estudiantes extranjeros.",
    benefits: [
      "€1,181/mes de estipendio",
      "Cobertura de billetes de avión",
      "Seguro médico",
      "Actividades culturales",
    ],
    logoColor: "#002395",
    logoInitials: "EF",
  },
  {
    id: "6",
    title: "Becas de Excelencia Gobierno de Suiza",
    university: "ETH Zurich",
    location: "Suiza",
    country: "Suiza",
    flag: "🇨🇭",
    region: "Europa",
    level: "Doctorado",
    matchScore: 72,
    coverage: "1,920 CHF/mes",
    coverageType: "Full",
    deadline: "15 Apr 2025",
    daysLeft: 60,
    tags: ["100% Completa", "🇨🇭 Suiza", "Doctorado"],
    requiresLanguageTest: true,
    requirements: { language: true, gpa: false, documents: false },
    description:
      "Las Becas de Excelencia del Gobierno de Suiza son otorgadas por la Comisión Federal de Becas para Estudiantes Extranjeros (FCS).",
    benefits: [
      "CHF 1,920/mes de estipendio",
      "Exención de matrícula",
      "Seguro de accidentes",
      "Asistencia para el alojamiento",
    ],
    logoColor: "#FF0000",
    logoInitials: "CH",
  },
  {
    id: "7",
    title: "Fulbright Program",
    university: "Universidades de EE.UU.",
    location: "Estados Unidos",
    country: "Estados Unidos",
    flag: "🇺🇸",
    region: "América",
    level: "Maestría",
    matchScore: 81,
    coverage: "Matrícula + Manutención + Vuelos",
    coverageType: "Full",
    deadline: "1 Oct 2025",
    daysLeft: 90,
    tags: ["100% Completa", "🇺🇸 EE.UU.", "Maestría"],
    requiresLanguageTest: true,
    requirements: { language: true, gpa: true, documents: false },
    description:
      "El Programa Fulbright es el programa de intercambio educativo internacional más grande del mundo financiado por el gobierno de EE.UU.",
    benefits: [
      "Matrícula universitaria completa",
      "Estipendio mensual",
      "Seguro médico",
      "Vuelo internacional",
      "Orientación previa al viaje",
    ],
    logoColor: "#3C3B6E",
    logoInitials: "FL",
  },
  {
    id: "8",
    title: "Beca Presidente de la República Chile",
    university: "Universidades en el extranjero",
    location: "Global",
    country: "Chile",
    flag: "🇨🇱",
    region: "América",
    level: "Doctorado",
    matchScore: 68,
    coverage: "USD 2,000/mes + Matrícula",
    coverageType: "Full",
    deadline: "30 Jun 2025",
    daysLeft: 45,
    tags: ["100% Completa", "Global", "Doctorado"],
    requiresLanguageTest: false,
    requirements: { language: false, gpa: true, documents: true },
    description:
      "Becas del gobierno de Chile para que profesionales chilenos se especialicen en el extranjero en programas de doctorado.",
    benefits: [
      "USD 2,000/mes",
      "Matrícula completa",
      "Pasaje aéreo de ida y vuelta",
      "Seguro médico",
    ],
    logoColor: "#D52B1E",
    logoInitials: "BC",
  },
  {
    id: "9",
    title: "MEXT Scholarship (Japón)",
    university: "Universidades Japonesas",
    location: "Japón",
    country: "Japón",
    flag: "🇯🇵",
    region: "Asia",
    level: "Maestría",
    matchScore: 75,
    coverage: "¥143,000/mes + Matrícula",
    coverageType: "Full",
    deadline: "30 May 2025",
    daysLeft: 35,
    tags: ["100% Completa", "🇯🇵 Japón", "Maestría"],
    requiresLanguageTest: false,
    requirements: { language: false, gpa: true, documents: false },
    description:
      "El Ministerio de Educación, Cultura, Deportes, Ciencia y Tecnología de Japón ofrece becas para estudiar en universidades japonesas.",
    benefits: [
      "¥143,000/mes de estipendio",
      "Matrícula gratuita",
      "Vuelo de ida y vuelta",
      "Cursos de idioma japonés",
    ],
    logoColor: "#BC002D",
    logoInitials: "MX",
  },
  {
    id: "10",
    title: "ADB Japan Scholarship",
    university: "Universidades Seleccionadas en Asia-Pacífico",
    location: "Asia",
    country: "Asia-Pacífico",
    flag: "🌏",
    region: "Asia",
    level: "Maestría",
    matchScore: 63,
    coverage: "Matrícula + USD 1,500/mes",
    coverageType: "Full",
    deadline: "28 Feb 2025",
    daysLeft: 18,
    tags: ["100% Completa", "🌏 Asia", "Maestría"],
    requiresLanguageTest: true,
    requirements: { language: true, gpa: false, documents: false },
    description:
      "El Programa de Becas del Banco Asiático de Desarrollo promueve el desarrollo económico y social en países miembros en desarrollo.",
    benefits: ["Matrícula completa", "USD 1,500/mes", "Seguro médico", "Allowance de instalación"],
    logoColor: "#E95B0C",
    logoInitials: "AD",
  },
  {
    id: "11",
    title: "Becas Santander Universidades",
    university: "Universidades Partner Santander",
    location: "España / Global",
    country: "España",
    flag: "🇪🇸",
    region: "Europa",
    level: "Pregrado",
    matchScore: 82,
    coverage: "€4,500 único",
    coverageType: "Partial",
    deadline: "15 Mar 2025",
    daysLeft: 30,
    tags: ["Parcial", "🇪🇸 España", "Pregrado"],
    requiresLanguageTest: false,
    requirements: { language: true, gpa: true, documents: true },
    description:
      "El programa de becas Santander Universidades apoya la movilidad estudiantil entre universidades de la red Universia en todo el mundo.",
    benefits: [
      "€4,500 de ayuda directa",
      "Acceso a plataforma digital Santander",
      "Red de alumni global",
    ],
    logoColor: "#EC0000",
    logoInitials: "SN",
  },
  {
    id: "12",
    title: "Beca OEA para Posgrado",
    university: "Universidades en Américas",
    location: "América Latina",
    country: "América Latina",
    flag: "🌎",
    region: "América",
    level: "Maestría",
    matchScore: 79,
    coverage: "Matrícula + USD 900/mes",
    coverageType: "Full",
    deadline: "31 Mar 2025",
    daysLeft: 40,
    tags: ["100% Completa", "🌎 Américas", "Maestría"],
    requiresLanguageTest: false,
    requirements: { language: false, gpa: true, documents: false },
    description:
      "La OEA financia estudios de posgrado en universidades de sus Estados miembros para promover el desarrollo de la región.",
    benefits: [
      "Matrícula completa",
      "USD 900/mes de estipendio",
      "Pasajes de avión",
      "Seguro médico básico",
    ],
    logoColor: "#009DC4",
    logoInitials: "OE",
  },
];

export const featuredScholarship = scholarshipsData[4]; // Eiffel as featured
