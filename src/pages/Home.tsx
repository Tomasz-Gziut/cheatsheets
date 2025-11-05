import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { fetchRoutes, type Route } from "@/lib/api";

function Home() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoutes = async () => {
      const fetchedRoutes = await fetchRoutes();
      setRoutes(fetchedRoutes);
      setLoading(false);
    };

    loadRoutes();
  }, []);

  if (loading) {
    return (
      <div className="w-full p-10">
        <div className="max-w-6xl">
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-10">
      <div className="max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          Cheatsheets
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.filter((route) => route.visible).map((route) => (
            <Link key={route.id} to={route.path || "/"} state={{ id: route.id }}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                    {route.name || route.title}
                  </CardTitle>
                  <CardDescription className="mb-4">{route.description}</CardDescription>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {route.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Created: {new Date(route.created_at).toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
                    <p>Updated: {new Date(route.updated_at).toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
