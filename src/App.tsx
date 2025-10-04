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
    <Routes>
      {availableRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  );
}

export default App;
