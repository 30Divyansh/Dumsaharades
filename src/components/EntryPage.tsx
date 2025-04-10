import React, { useState, useEffect } from "react";
import "./EntryPage.css"; // 👈 Make sure to import the CSS

interface EntryPageProps {
  teamName: string;
  setTeamName: (name: string) => void;
  onStart: () => void;
}

export const EntryPage: React.FC<EntryPageProps> = ({
  teamName,
  setTeamName,
  onStart,
}) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <div className="entry-wrapper">
      {/* Theme Toggle */}
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Main Card */}
      <div className="entry-card">
        <img src="fr.jpg" alt="CICE" className="owner-img" />

        <h1 className="entry-title">Welcome to Tech Charades</h1>

        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter Team Name"
          className="team-input"
        />

        <button
          className="start-button"
          onClick={() => {
            if (teamName.trim() === "") {
              alert("Please enter a team name before starting!");
              return;
            }
            onStart(); // Proceed only if team name is not empty
          }}
        >
          💫 Start Game 💫
        </button>

        <div className="timer-section">
          <div className="timer-label">⏳ Timer</div>
          <div className="timer-value">4:00</div>
        </div>
      </div>
    </div>
  );
};
