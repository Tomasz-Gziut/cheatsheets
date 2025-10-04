import { Link } from "react-router-dom";
import { availableRoutes } from "../App";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

function Home() {
  const otherRoutes = availableRoutes.filter((route) => route.path !== "/");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Cheatsheets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {otherRoutes.map((route) => (
          <Card key={route.path} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg">
                <Link 
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200" 
                  to={route.path}
                >
                  {route.name}
                </Link>
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Home;
