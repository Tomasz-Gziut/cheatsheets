import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoteDetail from "./pages/NoteDetail";
import { Footer } from "@/components/ui/footer";

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:slug" element={<NoteDetail />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
