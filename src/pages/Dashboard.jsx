import React, { useContext, useMemo } from 'react';
import { PortfolioContext } from '../context/PortfolioContext';

export default function Dashboard() {
  const { apData } = useContext(PortfolioContext);

  // Calculs dynamiques
  const stats = useMemo(() => {
    const total = apData.length;
    const compSet = new Set(apData.flatMap(ap => ap.comps || []));
    const toolMap = new Map();
    apData.forEach(ap => (ap.tools || []).forEach(t => toolMap.set(t, (toolMap.get(t) || 0) + 1)));
    
    const b1Comps = ['B1.1', 'B1.2', 'B1.3', 'B1.4', 'B1.5', 'B1.6'];
    const b1Covered = b1Comps.filter(c => compSet.has(c)).length;

    const coverage = b1Comps.map(c => {
      const n = apData.filter(ap => (ap.comps || []).includes(c)).length;
      const pct = total > 0 ? Math.min(100, Math.round((n / total) * 100)) : 0;
      return { label: c, pct };
    });

    const sortedTools = [...toolMap.entries()].sort((a, b) => b[1] - a[1]);

    return { total, b1Covered, totalTools: toolMap.size, totalComps: compSet.size, coverage, sortedTools };
  }, [apData]);

  return (
    <section id="page-dashboard" className="page active">
      <div className="page-header">
        <div className="page-eyebrow">Vue d'ensemble</div>
        <h1 className="page-title">Tableau de bord</h1>
        <p className="page-subtitle">Progression globale de vos compétences et activités professionnelles.</p>
      </div>

      <div className="dash-grid">
        <div className="dash-card"><div className="dash-val">{stats.total}</div><div className="dash-sub">AP documentées</div></div>
        <div className="dash-card"><div className="dash-val">{stats.b1Covered}<span style={{fontSize:'18px',color:'var(--text3)'}}>/6</span></div><div className="dash-sub">Compétences B1</div></div>
        <div className="dash-card"><div className="dash-val">{stats.totalTools}</div><div className="dash-sub">Outils utilisés</div></div>
        <div className="dash-card"><div className="dash-val">{stats.totalComps}</div><div className="dash-sub">Total compétences</div></div>
      </div>

      <div className="radar-wrap">
        <div className="cov-block">
          <h3>Couverture B1</h3>
          <div>
            {stats.coverage.map((item) => (
              <div className="cov-row" key={item.label}>
                <span className="cov-label">{item.label}</span>
                <div className="cov-bar-bg"><div className="cov-bar" style={{ width: `${item.pct}%` }}></div></div>
                <span className="cov-pct">{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tools-cloud-block">
        <h3>Outils & technologies</h3>
        <div className="tools-inner">
          {stats.sortedTools.length > 0 ? (
            stats.sortedTools.map(([t, n]) => (
              <span key={t} className="tag tag-tool" style={{ fontSize: `${Math.min(14, 9 + n)}px`, padding: `3px ${8 + n}px` }}>
                {t}
              </span>
            ))
          ) : (
            <span style={{ color: 'var(--text3)', fontSize: '13px' }}>Aucun outil renseigné.</span>
          )}
        </div>
      </div>
    </section>
  );
}