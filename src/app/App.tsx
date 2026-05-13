import React, { Suspense, createContext, useContext, useState, ReactNode } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Scholarship, Goal, mockGoals } from "./data/mock";

// Context y tipos
export interface Application {
  id: string;
  scholarshipId: string;
  state: "Draft" | "Sent" | "Interview" | "Finished";
  appliedDate: string;
  data: {
    fullName: string;
    email: string;
    phone?: string;
    motivationLetter: string;
    cvPath?: string;
  };
}

export interface AppState {
  savedScholarshipIds: string[];
  applications: Application[];
  goals: Goal[];
  darkMode: boolean;
  toggleSaved: (id: string) => void;
  addApplication: (app: Application) => void;
  updateApplicationState: (id: string, state: Application["state"]) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  setDarkMode: (dark: boolean) => void;
}

const AppContext = createContext<AppState | null>(null);

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState debe usarse dentro de AppProvider");
  return ctx;
}

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

function AppProvider({ children }: { children: ReactNode }) {
  const [savedScholarshipIds, setSavedScholarshipIds] = useLocalStorage<string[]>(
    "pathfinder_saved_scholarships",
    ["5", "6"]
  );
  const [applications, setApplications] = useLocalStorage<Application[]>(
    "pathfinder_applications",
    []
  );
  const [goals, setGoals] = useLocalStorage<Goal[]>("pathfinder_goals", mockGoals);
  const [darkMode, setDarkModeState] = useLocalStorage<boolean>("pathfinder_dark_mode", false);

  const toggleSaved = (id: string) => {
    setSavedScholarshipIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const addApplication = (app: Application) => {
    setApplications((prev) => [...prev, app]);
  };

  const updateApplicationState = (id: string, state: Application["state"]) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, state } : a)));
  };

  const addGoal = (goal: Goal) => {
    setGoals((prev) => [...prev, goal]);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const setDarkMode = (dark: boolean) => {
    setDarkModeState(dark);
    if (typeof window !== "undefined") {
      if (dark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  React.useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <AppContext.Provider
      value={{
        savedScholarshipIds,
        applications,
        goals,
        darkMode,
        toggleSaved,
        addApplication,
        updateApplicationState,
        addGoal,
        updateGoal,
        deleteGoal,
        setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Suspense fallback={<div className="p-8">Cargando...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </AppProvider>
  );
}
