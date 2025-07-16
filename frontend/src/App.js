import React, { useState, useEffect } from 'react';
import MatchList from './components/MatchList';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [credits, setCredits] = useState(0);
  const apiBase = process.env.REACT_APP_API_URL;

  const handleLogin = async () => {
    const res = await fetch(`${apiBase}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    setCredits(data.credits);
    setUserLoggedIn(true);
  };

  const refreshCredits = () => {
    fetch(`${apiBase}/api/users/${username}`)
      .then(res => res.json())
      .then(data => setCredits(data.credits));
  };

  return (
    <div className="App">
      {!userLoggedIn ? (
        <>
          <h2>Enter Username to Login</h2>
          <input value={username} onChange={e => setUsername(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <h1>Welcome {username} — Credits: {credits}</h1>
          <MatchList
            username={username}
            onBetPlaced={refreshCredits}
          />
        </>
      )}
    </div>
  );
}

export default App;

