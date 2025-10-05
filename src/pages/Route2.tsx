import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Route2() {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
        >
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            ← Back
          </Button>
        </Link>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Test Page</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm md:text-base">This is a test page.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Route2;
