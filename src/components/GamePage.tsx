import React, { useState, useEffect, useRef } from "react";
import "./GamePage.css";

interface GamePageProps {
  teamName: string;
  onFinish: (finalScore: number) => void;
}

const riddles = [
  { phrase: "I guard your secrets, but I’m just dots or stars.", answer: "password" },
  { phrase: "I live in the clouds, but I’m not weather.", answer: "cloud" },
  { phrase: "You talk to me, and I do what you say.", answer: "voice assistant" },
  { phrase: "I open windows but I’m not a house part.", answer: "browser" },
  { phrase: "I think fast but I’m not human.", answer: "cpu" },
];

export const GamePage: React.FC<GamePageProps> = ({ teamName, onFinish }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [riddle, setRiddle] = useState(riddles[Math.floor(Math.random() * riddles.length)]);
  const [playerAnswer, setPlayerAnswer] = useState("");
  const [finalGuess, setFinalGuess] = useState("");
  const [hintUsed, setHintUsed] = useState(false);
  const [hint, setHint] = useState("");
  const [stage, setStage] = useState<"question" | "final" | "feedback">("question");
  const [feedback, setFeedback] = useState("");

  // ✅ Timer logic (correct type!)
  const [timeLeft, setTimeLeft] = useState(240); // 4 minutes
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef<number | null>(null); // ✅ FIXED type

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      timerRef.current = window.setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
    }

    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, [timerRunning, timeLeft]);

  const toggleTimer = () => {
    setTimerRunning((prev) => !prev);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleHint = () => {
    const hintStr = riddle.answer
      .split("")
      .map((c, i) => (i % 2 === 0 ? c : "_"))
      .join("");
    setHint(`Hint: ${hintStr}`);
    setHintUsed(true);
  };

  const handleNextStage = () => setStage("final");

  const handleSubmit = () => {
    const correct = finalGuess.trim().toLowerCase() === riddle.answer.toLowerCase();
    const earned = correct ? (hintUsed ? 5 : 10) : 0;
    setScore((prev) => prev + earned);
    setFeedback(correct ? "🎉 Woohoo! You nailed it!" : "💔 Oops! Try harder next time.");
    setStage("feedback");
  };

  const nextRound = () => {
    if (round < 3) {
      setRound(round + 1);
      setRiddle(riddles[Math.floor(Math.random() * riddles.length)]);
      setStage("question");
      setHintUsed(false);
      setHint("");
      setPlayerAnswer("");
      setFinalGuess("");
    } else {
      onFinish(score);
    }
  };

  return (
    <div className="game-page">
      <div className="game-container fade-in">
        <div className="game-header">
          <h1>{`🎮 Team: ${teamName}`}</h1>
          <p>{`🔁 Round ${round} of 3`}</p>
          <div className="timer-section">
            <p>⏱️ Time Left: {formatTime(timeLeft)}</p>
            <button onClick={toggleTimer}>
              {timerRunning ? "⏸️ Stop Timer" : "▶️ Start Timer"}
            </button>
          </div>
        </div>

        {stage === "question" && (
          <div className="question-section">
            <p className="riddle-text">"{riddle.phrase}"</p>
            <input
              value={playerAnswer}
              onChange={(e) => setPlayerAnswer(e.target.value)}
              placeholder="Type your answer here..."
            />
            <div className="button-group">
              <button onClick={handleHint}>💡 Get Hint</button>
              <button onClick={handleNextStage}>✅ Final Guess</button>
            </div>
            {hint && <p className="hint-text">{hint}</p>}
          </div>
        )}

        {stage === "final" && (
          <div className="final-section">
            <input
              value={finalGuess}
              onChange={(e) => setFinalGuess(e.target.value)}
              placeholder="Final guess (Player 3)..."
            />
            <div className="button-group">
              <button onClick={handleSubmit}>🚀 Submit Final Answer</button>
            </div>
          </div>
        )}

        {stage === "feedback" && (
          <div className="feedback-section">
            <h2>{feedback}</h2>
            <p>✨ Score: {score}</p>
            <button onClick={nextRound}>🔄 Next Round</button>
          </div>
        )}
      </div>
    </div>
  );
};
