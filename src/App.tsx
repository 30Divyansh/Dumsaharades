import { useState } from "react";
import { EntryPage } from "./components/EntryPage";
import { GamePage } from "./components/GamePage";
import { FinalPage } from "./components/FinalPage";

export default function App() {
  const [teamName, setTeamName] = useState("");
  const [page, setPage] = useState<"entry" | "game" | "final">("entry");
  const [finalScore, setFinalScore] = useState(0);

  const handleStart = () => setPage("game");
  const handleFinish = (score: number) => {
    setFinalScore(score);
    setPage("final");
  };

  const handleRestart = () => {
    setTeamName("");
    setFinalScore(0);
    setPage("entry");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 dark:from-gray-900 dark:to-gray-700 p-6 text-white">
      {page === "entry" && <EntryPage teamName={teamName} setTeamName={setTeamName} onStart={handleStart} />}
      {page === "game" && <GamePage teamName={teamName} onFinish={handleFinish} />}
      {page === "final" && <FinalPage score={finalScore} onRestart={handleRestart} />}
    </main>
  );
}
