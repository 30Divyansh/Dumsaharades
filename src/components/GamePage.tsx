import React, { useState, useEffect, useRef } from "react";
import "./GamePage.css";

interface GamePageProps {
  teamName: string;
  onFinish: (finalScore: number) => void;
}

const riddles = [
  { phrase: "I guard your secrets, but I'm just dots or stars.", answer: "password" },
  { phrase: "I'm a page with no paper and no pen.", answer: "website" },
  { phrase: "I fly high with no wings, and take pictures too.", answer: "drone" },
  { phrase: "I'm full of keys but open no locks.", answer: "keyboard" },
  { phrase: "I carry electricity, not people.", answer: "wire" },
  { phrase: "I connect you to others, but I'm not a phone.", answer: "internet" },
  { phrase: "I live in your pocket and know everything.", answer: "smartphone" },
  { phrase: "I'm smart, but I'm not human.", answer: "ai" },
  { phrase: "I keep bad guys out of your system.", answer: "antivirus" },
  { phrase: "I talk in ones and zeros.", answer: "binary" },
  { phrase: "I'm small, mighty, and control robots.", answer: "microcontroller" },
  { phrase: "I turn sound into electricity.", answer: "microphone" },
  { phrase: "I sneak into systems quietly.", answer: "virus" },
  { phrase: "I feed power to the hungry gadgets.", answer: "charger" },
  { phrase: "I open secret vaults with a plastic swipe.", answer: "atm" },
  { phrase: "I spin above your head but never fall down.", answer: "fan" },
  { phrase: "I shine bright without burning out.", answer: "bulb" },
  { phrase: "I live in your pocket but know the whole world.", answer: "smartphone" },
];

export const GamePage: React.FC<GamePageProps> = ({ teamName, onFinish }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [riddle, setRiddle] = useState(riddles[Math.floor(Math.random() * riddles.length)]);
  const [playerAnswer, setPlayerAnswer] = useState("");
  const [hintUsed, setHintUsed] = useState(false);
  const [hint, setHint] = useState("");
  const [feedback, setFeedback] = useState("");

  const [timeLeft, setTimeLeft] = useState(180); // ✅ 3 minutes = 180 seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

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

  const handleSubmit = () => {
    const correct = playerAnswer.trim().toLowerCase() === riddle.answer.toLowerCase();
    const earned = correct ? (hintUsed ? 5 : 10) : 0;
    setScore((prev) => prev + earned);
    setFeedback(correct ? "🎉 Woohoo! You nailed it!" : "💔 Oops! Try harder next time.");
  };

  const nextRound = () => {
    if (round < 2) { // ✅ stays 2 rounds
      setRound(round + 1);
      setRiddle(riddles[Math.floor(Math.random() * riddles.length)]);
      setHintUsed(false);
      setHint("");
      setPlayerAnswer("");
      setFeedback("");
    } else {
      onFinish(score);
    }
  };

  return (
    <div className="game-page">
      <div className="game-container fade-in">
        <div className="game-header">
          <h1>{`🎮 Team: ${teamName}`}</h1>
          <p>{`🔁 Round ${round} of 2`}</p>
          <div className="timer-section">
            <p>⏱️ Time Left: {formatTime(timeLeft)}</p>
            <button onClick={toggleTimer}>
              {timerRunning ? "⏸️ Stop Timer" : "▶️ Start Timer"}
            </button>
          </div>
        </div>

        <div className="question-section">
          <p className="riddle-text">"{riddle.phrase}"</p>
          <input
            value={playerAnswer}
            onChange={(e) => setPlayerAnswer(e.target.value)}
            placeholder="Type your answer here..."
          />
          <div className="button-group">
            <button onClick={handleHint}>💡 Get Hint</button>
            <button onClick={handleSubmit}>✅ Submit Final Guess</button>
          </div>
          {hint && <p className="hint-text">{hint}</p>}
        </div>

        {feedback && (
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
