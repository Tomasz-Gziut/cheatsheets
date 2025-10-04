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
    <>
      <Link to="/" className="text-blue-600">
        <Button variant="outline" size="icon" aria-label="Submit">
          Back
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Zagadnienia na kartkówkę 9.10.</CardTitle>
          <CardDescription>Zagadnienia kartkówka Wielka Wojna</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Omów przyczyny wybuchu I wojny światowej *długofalowe (np.
            imperializm, militaryzm, wyścig zbrojeń, system sojuszy) i
            bezpośrednie (zamach w Sarajewie) przyczyny wojny.
          </p>
          <p>
            Omów System sojuszy i plany wojenne przed 1914 r. Trójprzymierze vs
            Trójporozumienie, składy sojuszy i przyczyny ich zawarcia
          </p>
          <p>
            Wskaż Najważniejsze wydarzenia i bitwy 1914–1916 bitwa nad Marną
            (1914), bitwa pod Tannenbergiem, bitwa pod Verdun, bitwa nad Sommą,
            wojna pozycyjna na Zachodzie, ruchy frontu Wschodniego.
          </p>
          <p>
            Omów przyczyny i skutki rewolucji lutowej i październikowej. · Wskaż
            przyczyny przyłączenia Stanów Zjednoczonych do ententy.
          </p>
        </CardContent>
      </Card>
    </>
  );
}

export default Route1;
