import React, { useState, useContext } from 'react';
import { PortfolioContext } from '../context/PortfolioContext';
import { Link } from 'react-router-dom';

export default function ApList() {
  const { apData } = useContext(PortfolioContext);
  const [filter, setFilter] = useState('all');

  const b1Filters = ['B1.1', 'B1.2', 'B1.3', 'B1.4', 'B1.5', 'B1.6'];
  const filteredAps = filter === 'all' ? apData : apData.filter(ap => (ap.comps || []).includes(filter));

  return (
    <section id="page-ap-list" className="page active">
      <div className="page-header">
        <div className="page-eyebrow">Activités Professionnelles</div>
        <h1 className="page-title">Mes AP</h1>
        <p className="page-subtitle">Toutes mes activités professionnelles — cliquez pour voir le détail, modifier ou ajouter des preuves.</p>
      </div>

      <div className="ap-toolbar">
        <button className={`filt-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Toutes</button>
        {b1Filters.map(f => (
          <button key={f} className={`filt-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
        {/* On suppose que l'ouverture de la modal sera gérée depuis App ou via Context */}
        <button className="btn-add" onClick={() => alert('Ouvrir la modale (Logique à relier)')}>+ Nouvelle AP</button>
      </div>

      <div className="ap-grid" id="ap-container">
        {filteredAps.length === 0 && (
          <div className="empty-state">
            <div className="es-ico">📄</div>
            <p>Aucune AP trouvée.</p>
          </div>
        )}
        {filteredAps.map((ap, index) => (
          <Link to={`/ap/${index}`} key={index} className="ap-card" data-comps={(ap.comps||[]).join(',')}>
            <span className="ap-arrow">↗</span>
            <div className="ap-card-num">AP {String(index + 1).padStart(2, '0')}</div>
            <div className="ap-card-title">{ap.title}</div>
            <div className="ap-card-ctx">{ap.context.substring(0, 110)}{ap.context.length > 110 ? '…' : ''}</div>
            <div className="ap-card-tags">
              {(ap.tools || []).slice(0, 4).map(t => <span key={t} className="tag tag-tool">{t}</span>)}
              {(ap.comps || []).map(c => <span key={c} className="tag tag-comp">{c}</span>)}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}