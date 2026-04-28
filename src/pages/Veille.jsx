import React, { useState } from 'react';
import EditableText from '../components/ui/EditableText';

export default function Veille() {
  const [articles, setArticles] = useState([
    { id: 1, icon: '📰', title: 'Feedly / Inoreader', desc: 'Agrégateur de flux RSS pour suivre les blogs tech...', type: 'RSS' },
    { id: 2, icon: '🐦', title: 'Twitter / LinkedIn', desc: 'Suivi de comptes experts...', type: 'Réseaux' },
  ]);

  const addArticle = () => {
    const icons = ['🔐','🌐','⚙️','🤖','📱','☁️','🛡️','💡','🔬','📊'];
    const newArticle = {
      id: Date.now(),
      icon: icons[Math.floor(Math.random() * icons.length)],
      title: "Titre de l'article",
      desc: "Résumé ou points clés...",
      type: "Date"
    };
    setArticles([...articles, newArticle]);
  };

  return (
    <section id="page-veille" className="page active">
      <div className="page-header">
        <div className="page-eyebrow">Culture numérique</div>
        <h1 className="page-title">Veille technologique</h1>
        <p className="page-subtitle">Suivi de l'actualité informatique — sources, outils et articles sélectionnés.</p>
      </div>

      <h3 className="section-title">Thèmes suivis</h3>
      <div className="info-chips" style={{ marginBottom: '36px' }}>
        <div className="chip"><span className="dot"></span><EditableText initialValue="Cybersécurité" tagName="span" /></div>
        <div className="chip"><span className="dot" style={{ background: 'var(--accent)' }}></span><EditableText initialValue="Développement web" tagName="span" /></div>
        <div className="chip"><span className="dot" style={{ background: 'var(--accent2)' }}></span><EditableText initialValue="Cloud & DevOps" tagName="span" /></div>
        <div className="chip"><span className="dot" style={{ background: 'var(--yellow)' }}></span><EditableText initialValue="IA & automatisation" tagName="span" /></div>
      </div>

      <h3 className="section-title">Outils & Ressources de veille</h3>
      <div className="veille-grid" style={{ marginBottom: '32px' }}>
        {articles.map(article => (
          <div key={article.id} className="veille-card">
            <div className="veille-ico">{article.icon}</div>
            <div>
              <h4><EditableText initialValue={article.title} tagName="span" /></h4>
              <p><EditableText initialValue={article.desc} tagName="span" /></p>
            </div>
            <span className="veille-date"><EditableText initialValue={article.type} tagName="span" /></span>
          </div>
        ))}
      </div>
      
      <button className="add-row-btn" onClick={addArticle}>+ Ajouter un article ou une ressource</button>
    </section>
  );
}