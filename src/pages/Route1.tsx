import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Route1() {
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
          <CardTitle className="text-xl md:text-2xl">
            Zagadnienia na kartkówkę 9.10.
          </CardTitle>
          <CardDescription className="text-base md:text-lg">
            Zagadnienia kartkówka Wielka Wojna
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm md:prose-base max-w-none">
            <p className="text-sm md:text-base leading-relaxed">
              <strong>Omów przyczyny wybuchu I wojny światowej</strong> -
              długofalowe (np. imperializm, militaryzm, wyścig zbrojeń, system
              sojuszy) i bezpośrednie (zamach w Sarajewie) przyczyny wojny.
            </p>
            <p className="text-sm md:text-base leading-relaxed">
              <strong>Omów System sojuszy i plany wojenne przed 1914 r.</strong>{" "}
              Trójprzymierze vs Trójporozumienie, składy sojuszy i przyczyny ich
              zawarcia
            </p>
            <p className="text-sm md:text-base leading-relaxed">
              <strong>Wskaż Najważniejsze wydarzenia i bitwy 1914–1916</strong>{" "}
              - bitwa nad Marną (1914), bitwa pod Tannenbergiem, bitwa pod
              Verdun, bitwa nad Sommą, wojna pozycyjna na Zachodzie, ruchy
              frontu Wschodniego.
            </p>
            <p className="text-sm md:text-base leading-relaxed">
              <strong>
                Omów przyczyny i skutki rewolucji lutowej i październikowej.
              </strong>{" "}
              Wskaż przyczyny przyłączenia Stanów Zjednoczonych do ententy.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Route1;
