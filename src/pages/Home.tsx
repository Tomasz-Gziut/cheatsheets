import { Link } from "react-router-dom";
import { availableRoutes } from "../App";

function Home() {
  const otherRoutes = availableRoutes.filter((route) => route.path !== "/");

  return (
    <>
      <h1>Cheatsheets:</h1>
      <div>
        {otherRoutes.map((route) => (
          <div key={route.path}>
            <Link className="text-blue-600" to={route.path}>
              {route.name}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
