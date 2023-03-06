import React, { useState } from 'react'
import './App.css'
import getLatestKills, { Kill } from "./getKills";

const App: React.FC = () => {
  const [characterNameOrId, setCharacterNameOrId] = useState('');
  const [kills, setKills] = useState<Kill[]>([]);

  const handleGetLatestKills = async () => {
    const latestKills = await getLatestKills(characterNameOrId);
    setKills(latestKills);
  };

  return (
    <div>
      <label>
        Character ID:
        <input type="text" value={characterNameOrId} onChange={(event) => setCharacterNameOrId(event.target.value)} />
      </label>
      <button onClick={handleGetLatestKills}>Get Latest Kills</button>
      <ul style={{listStyle: 'none'}}>
        {kills.map((kill) => (
          <li key={kill.id}>
            {kill.id} - {kill.hash}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
