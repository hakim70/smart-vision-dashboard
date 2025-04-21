import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>👋 Bienvenue dans le Dashboard</h1>
      <p>Voici un résumé de l'activité du jour :</p>

      <div className="stats">
        <div className="card">
          <h3>🧑‍💼 Supervisors</h3>
          <p>5 actifs</p>
        </div>
        <div className="card">
          <h3>🗺️ Sectors</h3>
          <p>3 zones créées</p>
        </div>
        <div className="card">
          <h3>🕵️ Agents</h3>
          <p>12 agents connectés</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
