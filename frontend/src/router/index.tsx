import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Datasets from "../pages/Dataset";
import Dataset from "../pages/Dataset";
import Analytics from "../pages/Analytics";
import ML from "../pages/ML";
import AIInsights from "../pages/AIInsights";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/datasets",
    element: <Datasets />,
  },
  {
    path: "/analytics",
    element: <Analytics />,
  },
  {
    path: "/ml",
    element: <ML />,
  },
  {
    path: "/ai-insights",
    element: <AIInsights />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/dataset",
     element: <Dataset />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

export default router;