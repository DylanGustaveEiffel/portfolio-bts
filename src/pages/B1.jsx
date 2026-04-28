import React, { useState } from 'react';

const b1Data = [
  { id: 'B1.1', title: 'Gérer le patrimoine informatique', items: ['Recenser et identifier les ressources numériques', 'Exploiter des référentiels, normes et standards adoptés par le prestataire', "Mettre en place et vérifier les niveaux d'habilitation associés à un service"] },
  { id: 'B1.2', title: "Répondre aux incidents et aux demandes d'assistance", items: ['Collecter, suivre et orienter des demandes', 'Traiter des demandes concernant les services réseau et système', 'Traiter des demandes concernant les applications'] },
  { id: 'B1.3', title: "Développer la présence en ligne de l'organisation", items: ["Participer à la valorisation de l'image sur les médias numériques", 'Référencer les services en ligne et mesurer leur visibilité', "Participer à l'évolution d'un site Web exploitant les données"] },
  { id: 'B1.4', title: 'Travailler en mode projet', items: ["Analyser les objectifs et les modalités d'organisation d'un projet", 'Planifier les activités', "Évaluer les indicateurs de suivi d'un projet et analyser les écarts"] },
  { id: 'B1.5', title: 'Mettre à disposition des utilisateurs un service informatique', items: ["Réaliser les tests d'intégration et d'acceptation d'un service", 'Déployer un service', "Accompagner les utilisateurs dans la mise en place d'un service"] },
  { id: 'B1.6', title: 'Organiser son développement professionnel', items: ["Mettre en place son environnement d'apprentissage personnel", "Mettre en œuvre des outils et stratégies de veille informationnelle", "Gérer les artefacts numériques nécessaires à la réalisation des missions"] }
];

export default function B1() {
  const [openCards, setOpenCards] = useState(['B1.1', 'B1.2']);

  const toggleCard = (id) => {
    setOpenCards(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  return (
    <section id="page-b1" className="page active">
      <div className="page-header">
        <div className="page-eyebrow">Référentiel — Tronc commun</div>
        <h1 className="page-title">Bloc B1</h1>
        <p className="page-subtitle">Support et mise à disposition de services informatiques — 6 compétences communes aux deux options.</p>
      </div>

      <div className="comp-grid">
        {b1Data.map(comp => {
          const isOpen = openCards.includes(comp.id);
          return (
            <div key={comp.id} className={`comp-card ${isOpen ? 'open' : ''}`}>
              <div className="comp-hd" onClick={() => toggleCard(comp.id)}>
                <span className="comp-badge">{comp.id}</span>
                <span className="comp-title">{comp.title}</span>
                <span className="comp-chevron">▾</span>
              </div>
              <div className="comp-body">
                <div className="comp-progress">
                  <div className="comp-progress-bar" style={{ width: '0%' }}></div>
                </div>
                <ul className="sub-list">
                  {comp.items.map((item, idx) => (
                    <li key={idx} className="sub-item">
                      <span className="sub-dot"></span>
                      <span className="sub-text">{item}</span>
                      <span className="lv lv-none">Non évalué</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}