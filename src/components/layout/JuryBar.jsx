import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PortfolioContext } from '../../context/PortfolioContext';

export default function JuryBar() {
  const { setJuryMode } = useContext(PortfolioContext);
  const navigate = useNavigate();

  return (
    <div className="jury-bar">
      <span className="jb-title">🎓 Mode Présentation Jury</span>
      <button className="jb-btn" onClick={() => navigate('/')}>Accueil</button>
      <button className="jb-btn" onClick={() => navigate('/dashboard')}>Dashboard</button>
      <button className="jb-btn" onClick={() => navigate('/b1')}>B1</button>
      <button className="jb-btn" onClick={() => navigate('/ap-list')}>Mes AP</button>
      <button className="jb-btn" onClick={() => navigate('/stage')}>Stage</button>
      <button className="jb-btn" onClick={() => window.print()}>🖨 Imprimer</button>
      <button className="jb-btn jb-exit" onClick={() => setJuryMode(false)}>✕ Quitter</button>
    </div>
  );
}