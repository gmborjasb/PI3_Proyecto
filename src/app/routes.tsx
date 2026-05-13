import React from "react";
import { createBrowserRouter } from "react-router";
import { AppLayout } from "./components/AppLayout";

const Dashboard = React.lazy(() =>
  import("./pages/Dashboard").then((m) => ({ default: m.Dashboard }))
);
const Explore = React.lazy(() => import("./pages/Explore").then((m) => ({ default: m.Explore })));
const Saved = React.lazy(() => import("./pages/Saved").then((m) => ({ default: m.Saved })));
const Goals = React.lazy(() => import("./pages/Goals").then((m) => ({ default: m.Goals })));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "buscar", Component: Explore },
      { path: "metas", Component: Goals },
      { path: "guardadas", Component: Saved },
    ],
  },
]);
