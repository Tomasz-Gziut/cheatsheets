import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Route1 from "./pages/Route1";
import Route2 from "./pages/Route2";

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
    </div>
  );
}

export default App;
