import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PortfolioContext } from '../../context/PortfolioContext';
import EditableText from '../ui/EditableText';

export default function Sidebar() {
  const { apData, setJuryMode } = useContext(PortfolioContext);
  const [isOpen, setIsOpen] = useState(false); // Pour le menu burger mobile

  return (
    <>
      <button id="menu-toggle" onClick={() => setIsOpen(!isOpen)} style={{ display: 'none' }}>☰</button>
      
      <aside id="sidebar" className={isOpen ? 'open' : ''}>
        <div className="sidebar-top">
          <div className="sidebar-badge">BTS SIO · 2ème année</div>
          <div className="sidebar-name">
            <EditableText initialValue="Dylan GARNIER" placeholder="Prénom NOM" tagName="span" />
          </div>
          <div className="sidebar-sub">
            <EditableText initialValue="Option SLAM" placeholder="Option SLAM / SISR" tagName="span" />
          </div>
        </div>
        
        <nav>
          <div className="nav-section">
            <div className="nav-label">Navigation</div>
            <NavLink to="/" end><span className="ni">🏠</span>Présentation</NavLink>
            <NavLink to="/dashboard"><span className="ni">📊</span>Tableau de bord</NavLink>
          </div>
          <div className="nav-section">
            <div className="nav-label">Compétences</div>
            <NavLink to="/b1"><span className="ni">📋</span>Bloc B1 <span className="nav-pill">6</span></NavLink>
          </div>
          <div className="nav-section">
            <div className="nav-label">Activités Pro</div>
            <NavLink to="/ap-list"><span className="ni">📁</span>Toutes les AP <span className="nav-pill">{apData.length}</span></NavLink>
            <div id="nav-ap-links">
              {apData.map((ap, idx) => (
                <NavLink key={idx} to={`/ap/${idx}`} className="nav-ap-link">
                  <span className="ni">📄</span>{ap.title.substring(0,26)}{ap.title.length>26?'…':''}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="nav-section">
            <div className="nav-label">Expérience & Veille</div>
            <NavLink to="/stage"><span className="ni">🏢</span>Stage</NavLink>
            <NavLink to="/veille"><span className="ni">📡</span>Veille technologique</NavLink>
          </div>
        </nav>
        
        <div className="sidebar-actions">
          <button className="sa-btn jury-btn-side" onClick={() => setJuryMode(true)}>
            <span className="si">🎓</span>Mode jury
          </button>
          <div className="sa-grid">
            <button className="sa-btn"><span className="si">💾</span>Exporter</button>
            <button className="sa-btn"><span className="si">📥</span>Importer</button>
          </div>
          <button className="sa-btn" onClick={() => window.print()}><span className="si">🖨</span>Imprimer / PDF</button>
        </div>
      </aside>
    </>
  );
}