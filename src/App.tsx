import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Route1 from "./pages/Route1";
import Route2 from "./pages/Route2";
import { Footer } from "@/components/ui/footer";

export const availableRoutes = [
  { path: "/", name: "Home", element: Home },
  {
    path: "/historia-wielka-wojna",
    name: "Historia - Wielka Wojna",
    element: Route1,
  },
  { path: "/test", name: "test", element: Route2 },
];

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        <Routes>
          {availableRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
