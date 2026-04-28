import React, { useState, useRef } from 'react';
import EditableText from '../components/ui/EditableText';

export default function Home() {
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setAvatar(event.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <section id="page-home" className="page active">
      <div className="page-header">
        <div className="page-eyebrow">Portfolio numérique</div>
        <h1 className="page-title">Bienvenue sur<br />mon portfolio</h1>
        <p className="page-subtitle">BTS Services Informatiques aux Organisations — deux années de formation, de projets et d'apprentissages.</p>
      </div>

      <div className="hero-grid">
        <div>
          <p className="hero-role">
            <EditableText initialValue="Étudiant BTS SIO · Option SLAM / SISR" placeholder="Votre option" tagName="span" />
          </p>
          <h2 className="hero-name">
            <EditableText initialValue="Dylan" placeholder="Prénom" tagName="span" />{' '}
            <em><EditableText initialValue="GARNIER" placeholder="NOM" tagName="span" /></em>
          </h2>
          <p className="hero-bio">
            <EditableText 
              initialValue="Actuellement en formation BTS SIO, je développe des compétences en informatique, en gestion de systèmes et en développement. Passionné par les nouvelles technologies, je cherche à mettre en pratique mes connaissances au travers de projets concrets." 
              placeholder="Décrivez-vous en quelques lignes…" 
              tagName="span" 
            />
          </p>
          <span className="edit-hint">✎ Cliquez sur n'importe quel texte pour le modifier</span>
          
          <div className="info-chips">
            <div className="chip"><span className="dot"></span><EditableText initialValue="Ville, France" tagName="span" /></div>
            <div className="chip"><span className="dot" style={{background: 'var(--accent)'}}></span><EditableText initialValue="Lycée / CFA" tagName="span" /></div>
            <div className="chip"><span className="dot" style={{background: 'var(--accent2)'}}></span><EditableText initialValue="Promo 2024–2026" tagName="span" /></div>
          </div>
        </div>

        <div className="avatar-zone">
          <div className="avatar-circle" onClick={() => fileInputRef.current.click()}>
            {!avatar && (
              <div className="upload-hint"><span>📷</span>Photo<br />de profil</div>
            )}
            {avatar && <img src={avatar} alt="Profil" style={{ display: 'block' }} />}
          </div>
          <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handleAvatarChange} />
          <p style={{ fontSize: '10px', color: 'var(--text3)', marginTop: '4px' }}>Cliquer pour modifier</p>
        </div>
      </div>

      <h3 className="section-title">Mes objectifs</h3>
      <div className="objectives-grid">
        <div className="obj-card">
          <div className="obj-num">01 / Compétences</div>
          <h4><EditableText initialValue="Maîtriser les outils" tagName="span" /></h4>
          <p><EditableText initialValue="Développer une expertise technique solide dans les domaines SLAM ou SISR pour répondre aux besoins des entreprises." tagName="span" /></p>
        </div>
        <div className="obj-card">
          <div className="obj-num">02 / Projet pro</div>
          <h4><EditableText initialValue="Valider mes AP" tagName="span" /></h4>
          <p><EditableText initialValue="Réaliser et documenter des activités professionnelles qui couvrent l'ensemble des compétences du référentiel." tagName="span" /></p>
        </div>
        <div className="obj-card">
          <div className="obj-num">03 / Orientation</div>
          <h4><EditableText initialValue="Préparer mon avenir" tagName="span" /></h4>
          <p><EditableText initialValue="Confirmer mon projet professionnel et explorer les voies de poursuite d'études ou d'insertion dans le secteur IT." tagName="span" /></p>
        </div>
      </div>
    </section>
  );
}