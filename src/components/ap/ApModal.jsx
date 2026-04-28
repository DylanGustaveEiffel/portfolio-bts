import React, { useContext, useState, useEffect } from 'react';
import { PortfolioContext } from '../../context/PortfolioContext';

export default function ApModal() {
  const { isModalOpen, closeModal, saveAp, apData, editingApIndex } = useContext(PortfolioContext);

  const [formData, setFormData] = useState({ title: '', pb: '', context: '', actions: '', tools: '', comps: [], bilan: '' });

  useEffect(() => {
    if (editingApIndex !== null && apData[editingApIndex]) {
      const ap = apData[editingApIndex];
      setFormData({
        title: ap.title || '', pb: ap.pb || '', context: ap.context || '', 
        actions: ap.actions || '', tools: (ap.tools || []).join(', '), 
        comps: ap.comps || [], bilan: ap.bilan || ''
      });
    } else {
      setFormData({ title: '', pb: '', context: '', actions: '', tools: '', comps: [], bilan: '' });
    }
  }, [editingApIndex, isModalOpen, apData]);

  if (!isModalOpen) return null;

  const handleCheckbox = (val) => {
    setFormData(prev => ({
      ...prev,
      comps: prev.comps.includes(val) ? prev.comps.filter(c => c !== val) : [...prev.comps, val]
    }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.context || !formData.actions) {
      alert('Titre, contexte et actions sont obligatoires');
      return;
    }
    const finalAp = {
      ...formData,
      tools: formData.tools.split(',').map(t => t.trim()).filter(Boolean)
    };
    saveAp(finalAp);
    closeModal();
  };

  return (
    <div className="overlay show" id="ap-modal" onClick={(e) => e.target.id === 'ap-modal' && closeModal()}>
      <div className="modal">
        <button className="modal-close" onClick={closeModal}>✕</button>
        <div className="modal-title">{editingApIndex !== null ? "Modifier l'AP" : "Nouvelle AP"}</div>
        <div className="modal-sub">Remplissez les champs pour documenter votre activité professionnelle.</div>
        
        <div className="fg"><label>Titre *</label><input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Ex : Développement..." /></div>
        <div className="fg"><label>Problématique</label><input type="text" value={formData.pb} onChange={e => setFormData({...formData, pb: e.target.value})} /></div>
        <div className="fg"><label>Contexte *</label><textarea value={formData.context} onChange={e => setFormData({...formData, context: e.target.value})}></textarea></div>
        <div className="fg"><label>Ce que j'ai fait *</label><textarea value={formData.actions} onChange={e => setFormData({...formData, actions: e.target.value})}></textarea></div>
        <div className="fg"><label>Outils (séparés par des virgules)</label><input type="text" value={formData.tools} onChange={e => setFormData({...formData, tools: e.target.value})} /></div>
        
        <div className="fg">
          <label>Compétences mobilisées</label>
          <div className="comp-checks">
            {['B1.1', 'B1.2', 'B1.3', 'B1.4', 'B1.5', 'B1.6'].map(comp => (
              <label className="cc" key={comp}>
                <input type="checkbox" checked={formData.comps.includes(comp)} onChange={() => handleCheckbox(comp)} />
                <span>{comp}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="fg"><label>Bilan</label><textarea value={formData.bilan} onChange={e => setFormData({...formData, bilan: e.target.value})}></textarea></div>
        
        <div className="modal-footer">
          <button className="btn-ghost" onClick={closeModal}>Annuler</button>
          <button className="btn-primary" onClick={handleSubmit}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
}