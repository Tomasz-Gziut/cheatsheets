import { Link } from "react-router-dom";
import { availableRoutes } from "../App";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

function Home() {
  const otherRoutes = availableRoutes.filter((route) => route.path !== "/");

  return (
    <>
      <h1>Cheatsheets:</h1>
      <div>
        {otherRoutes.map((route) => (
          <div key={route.path}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Link className="text-blue-600" to={route.path}>
                    {route.name}
                  </Link>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
