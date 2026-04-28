import React, { useState, useRef } from 'react';
import EditableText from '../components/ui/EditableText';

export default function Stage() {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map(f => f.name);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const newFiles = Array.from(e.dataTransfer.files).map(f => f.name);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragOver = (e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); };
  const handleDragLeave = (e) => { e.currentTarget.classList.remove('drag-over'); };

  return (
    <section id="page-stage" className="page active">
      <div className="page-header">
        <div className="page-eyebrow">Expérience professionnelle</div>
        <h1 className="page-title">Stage</h1>
        <p className="page-subtitle">Détail de ma période de stage en entreprise — cliquez sur les champs pour les modifier.</p>
      </div>

      <div className="stage-grid">
        <div className="stage-cell"><label>Entreprise</label><div className="stage-val"><EditableText initialValue="— À remplir —" tagName="span"/></div></div>
        <div className="stage-cell"><label>Période</label><div className="stage-val"><EditableText initialValue="— À remplir —" tagName="span"/></div></div>
        <div className="stage-cell"><label>Tuteur</label><div className="stage-val"><EditableText initialValue="— À remplir —" tagName="span"/></div></div>
        <div className="stage-cell"><label>Secteur</label><div className="stage-val"><EditableText initialValue="— À remplir —" tagName="span"/></div></div>
        <div className="stage-cell"><label>Lieu</label><div className="stage-val"><EditableText initialValue="— À remplir —" tagName="span"/></div></div>
        <div className="stage-cell"><label>Durée</label><div className="stage-val"><EditableText initialValue="— À remplir —" tagName="span"/></div></div>
      </div>

      <h3 className="section-title">Missions réalisées</h3>
      <div className="ap-section">
        <p><EditableText initialValue="À compléter — décrivez vos missions, les tâches confiées et les responsabilités assumées." tagName="span"/></p>
      </div>

      <h3 className="section-title" style={{ marginTop: '36px' }}>Bilan personnel</h3>
      <div className="bilan-grid">
        <div className="bilan-item pos"><EditableText initialValue="Point fort ou compétence acquise" tagName="span"/></div>
        <div className="bilan-item pos"><EditableText initialValue="Deuxième point fort ou apprentissage clé" tagName="span"/></div>
        <div className="bilan-item neg"><EditableText initialValue="Difficulté rencontrée ou axe d'amélioration" tagName="span"/></div>
        <div className="bilan-item neg"><EditableText initialValue="Deuxième axe d'amélioration" tagName="span"/></div>
      </div>

      <h3 className="section-title" style={{ marginTop: '36px' }}>Documents de stage</h3>
      <div 
        className="proof-drop" 
        style={{ maxWidth: '480px' }} 
        onClick={() => fileInputRef.current.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="pz-icon">📋</div>
        <p>Convention, rapports, attestations…<br /><strong>Cliquez ou glissez pour ajouter</strong></p>
      </div>
      <input type="file" multiple style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
      
      <div>
        {files.map((file, index) => (
          <div key={index} className="proof-file"><span>📄</span><span>{file}</span></div>
        ))}
      </div>
    </section>
  );
}