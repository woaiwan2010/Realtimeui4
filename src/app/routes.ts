import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { ModelProcessing } from "./pages/ModelProcessing";
import { InstantSim } from "./pages/InstantSim";
import { AutomatedSim } from "./pages/AutomatedSim";
import { FineSim } from "./pages/FineSim";
import { Home } from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "model-processing", Component: ModelProcessing },
      { path: "instant-sim", Component: InstantSim },
      { path: "automated-sim", Component: AutomatedSim },
      { path: "fine-sim", Component: FineSim },
    ],
  },
]);
