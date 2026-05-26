# `DESIGN.md` - Pathfinder (Buscador & Gestor de Becas)

## 1. Visión General del Proyecto
**Pathfinder** es una aplicación Frontend construida en React orientada a ayudar a los usuarios a explorar, clasificar y gestionar postulaciones a becas y metas académicas/profesionales.
Actualmente es una Single Page Application (SPA) que funciona enteramente en el cliente (mocking de datos), sirviendo como prototipo interactivo o MVP de alta fidelidad.

## 2. Pila Tecnológica (Tech Stack)

### **Núcleo y Construcción**
- **Framework**: `react` (v18.3.1) y `react-dom` con **TypeScript** estricto (`@types/react` v19+).
- **Bundler y Herramientas**: `vite` (v6.x implícito) con los plugins `@vitejs/plugin-react` y `@tailwindcss/vite`.
- **Enrutamiento**: `react-router` (v7), gestionado vía `createBrowserRouter`.

### **Diseño y Estilos (UI/UX)**
- **CSS Framework**: **Tailwind CSS v4** gestionado directamente a través del ecosistema Vite (sin archivos voluminosos de PostCSS).
- **Sistema de Componentes UI**: Inspirado en **shadcn/ui**, construido sobre los componentes headless y accesibles de **Radix UI** (Accordion, Dialog, HoverCard, Popover, Select, etc.).
- **Gestión de clases condicionales**: Se utiliza `clsx`, `tailwind-merge` y `class-variance-authority` (CVA). Encapsulados clásicamente en la utilidad `cn()` en `src/lib/utils.ts`.
- **CSS-in-JS Alternativo**: Existen dependencias como `@emotion/react` y `@emotion/styled` orientadas a casos de uso muy particulares o integración con bibliotecas como MUI (aunque prima Radix/Tailwind).
- **Animaciones y Micro-interacciones**: 
  - `motion` (Framer Motion) para transiciones fluidas.
  - `vaul` para menús tipo *drawer* adaptables a móviles.
  - `tw-animate-css` y utilidades extra de animaciones de Tailwind.
- **Iconografía**: `lucide-react`.
- **Tipografía**: **Plus Jakarta Sans** importada a nivel global vía Google Fonts.
- **Gráficos y Visualización**: `recharts` para visualización de progreso/metas, y `canvas-confetti` para interacciones de éxito.
- **Notificaciones**: `sonner` para los brindis (*toast*).

### **Lógica de Negocio y Utilidades**
- **Gestión de Formularios**: `react-hook-form`.
- **Gestión de Fechas**: `date-fns` acoplado con `react-day-picker`.
- **Arrastrar y Soltar**: `react-dnd` y `react-dnd-html5-backend` (ideal para reordenar metas o kanbans de becas).

---

## 3. Arquitectura y Gestión de Estado

### **Punto de Entrada (`src/main.tsx` > `src/app/App.tsx` > `src/app/routes.tsx`)**
La aplicación se inicializa inyectando los proveedores principales en el layout. `App.tsx` posee lógica crítica.

### **State Management (`useAppState` Contexto)**
El estado de la aplicación no usa Redux ni Zustand, sino **React Context (`AppContext`)** combinado con un **Custom Hook de LocalStorage** (`useLocalStorage`).
- **Estado Gestionado**:
  - `savedScholarshipIds`: (string[]) Becas favoritas/guardadas.
  - `applications`: (Gestor del ciclo de vida de la postulación: "Borrador", "Enviado", "Entrevista", "Finalizado").
  - `goals`: (Metas asociadas a las becas).
  - `darkMode`: Toggle en tiempo real del modo visual.

### **Estructura de Datos (Mocking)**
La app simula respuestas de backend a través de `src/app/data/mock.ts`. Todo componente de UI debe leer la data estática (`Scholarship`, `Goal`, `mockGoals`) desde allí hasta que se integre un API real.

### **Rutas principales (`react-router`)**
- `/` —  Dashboard (Resumen de progreso y notificaciones).
- `/buscar` — Explore (Buscador y filtros avanzados de becas).
- `/metas` — Goals (Gestor de progreso y objetivos a cumplir).
- `/guardadas` — Saved (Lista de becas guardadas o en progreso).

---

## 4. Estructura de Directorios

```text
src/
├── app/
│   ├── App.tsx             # Context Provider y LocalStorage logic
│   ├── routes.tsx          # Definición de router v7
│   ├── components/
│   │   ├── ui/             # +40 Primitivas de Shadcn UI (button, dialog, textarea, etc.)
│   │   ├── ApplicationForm.tsx # Formulario complejo de Postulación
│   │   ├── GoalForm.tsx    # Formulario para metas
│   │   ├── MatchScore.tsx  # Componente visual para porcentaje de compatibilidad
│   │   ├── Drawer.tsx      # Contenedor inferior/lateral (usa Vaul)
│   │   └── AppLayout.tsx   # Contenedor visual de las páginas (Sidebar/Navbar)
│   ├── data/
│   │   └── mock.ts         # Origen de verdad (Single Source of Truth actual)
│   └── pages/              # Views/Páginas enrutadas
├── lib/
│   └── utils.ts            # Utilidad `cn()` indispensable para Shadcn UI
└── styles/
    ├── fonts.css           # Carga de Plus Jakarta Sans
    ├── index.css           # Entry css
    ├── tailwind.css        # Core de utilidades Tailwind v4
    └── theme.css           # Definición de CSS Variables y Dark Mode.
```

---

## 5. Patrones y Reglas de Desarrollo Impuestas (Instrucciones para IA)

Para cualquier código agregado, modificado o refactorizado, debes acatar estas directrices obligatoriamente:

1. **Imports y Alias**: Usa SIEMPRE el import alias `@/`. (Ej. `import { Button } from "@/app/components/ui/button";`).
2. **Estilizado de Componentes**: 
   - Prohibido el CSS tradicional en línea. Utiliza puramente clases de **Tailwind CSS**.
   - Respeta las variables de tema (ej. `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`). Modificamos el Dark Mode agregando `.dark` al root global en `theme.css`.
   - Utiliza `cn()` siempre que expongas la prop `className` en componentes React. Utiliza `cva` para definir variantes (ej. tamaños: `sm`, `lg`; intenciones: `default`, `destructive`, `ghost`).
3. **Control de Formularios**: Si requieres recoger input de usuario, **debes usar** `react-hook-form` integrado con Radix vía `src/app/components/ui/form.tsx`.
4. **Diseño de Interfaz Avanzado (UI/UX)**: 
   - Transiciones fluidas: Si renderizas listas (ej. filtros de becas mutando), envuélvelos en `AnimatePresence` y animaciones de `framer-motion`.
   - Esquinas redondeadas (ej. `rounded-xl`, `rounded-2xl`), sombras suaves (`shadow-sm`, `shadow-md`), y uso correcto del espacio negativo (`gap-6`, `p-6`).
5. **Tipado Estricto**: Cero uso de `any`. Exporta todas tus interfaces de dominio (ej. `Scholarship`, `Goal`) y reaprovéchalas por todo el proyecto.
6. **Lógica de LocalStorage**: Si agregas nueva información que persista de forma global, intégralo obligatoriamente extendiendo la interfaz `AppState` y creando un nuevo state con `useLocalStorage` en `App.tsx`.

---

## 6. Oportunidades Clave de Mejora (Roadmap)
1. **Refactorización del Filtro Avanzado**: Mejorar la página `/buscar` para que la búsqueda por texto y los filtros (Radix Checkboxes/Selects) tengan un filtrado componible robusto y performante.
2. **Vista Detalle de Beca (Modal vs Page)**: Implementar una *Sheet* (Vaul) o un *Dialog* (Radix) que permita ver la información completa de una beca sin abandonar la página `/buscar`.
3. **Tablero Kanban (Drag & Drop)**: Implementar en la vista `/guardadas` o postulación un pipeline de estados (Draft > Sent > Interview > Finished) usando `react-dnd`.
4. **Componentización de Gráficos**: Extender la integración de `recharts` en el `/` Dashboard para mostrar hitos o probabilidades matemáticas visuales de obtener una beca.
