import React, { useEffect } from "react";
import "./FinalPage.css";

interface FinalPageProps {
  score: number;
  onRestart: () => void;
}

export const FinalPage: React.FC<FinalPageProps> = ({ score, onRestart }) => {
  const isWinner = score >= 10;

  useEffect(() => {
    document.body.className = isWinner ? "final-winner" : "final-loser";
  }, [isWinner]);

  return (
    <div className="final-wrapper">
      <div className="final-card">
        <h1 className={`final-title ${isWinner ? "winner" : "loser"}`}>
          {isWinner ? "🏆 YOU WON CHAMP! 🏆" : "💔 Try Again Next Time!"}
        </h1>

        <p className="final-score">
          Final Score: <span className="score-number">{score}</span>
        </p>

        <button className="restart-button" onClick={onRestart}>
          🔁 Restart Game
        </button>

        {isWinner && (
          <div className="emoji-rain">🎉✨🎊💥🌟🎈💫</div>
        )}
      </div>
    </div>
  );
};
