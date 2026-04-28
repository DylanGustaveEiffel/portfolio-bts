import React, { createContext, useState, useEffect } from 'react';

export const PortfolioContext = createContext();

const SK = 'bts_portfolio_v3';

export const PortfolioProvider = ({ children }) => {
  const [apData, setApData] = useState([]);
  const [juryMode, setJuryMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApIndex, setEditingApIndex] = useState(null);

  // Charger les données au démarrage
  useEffect(() => {
    const raw = localStorage.getItem(SK);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.apData) setApData(parsed.apData);
    }
  }, []);

  // Sauvegarder les données à chaque modification
  useEffect(() => {
    localStorage.setItem(SK, JSON.stringify({ apData }));
  }, [apData]);

  const saveAp = (newAp) => {
    if (editingApIndex !== null) {
      const updated = [...apData];
      updated[editingApIndex] = newAp;
      setApData(updated);
    } else {
      setApData([...apData, newAp]);
    }
  };

  const deleteAp = (index) => {
    const updated = [...apData];
    updated.splice(index, 1);
    setApData(updated);
  };

  const openModal = (index = null) => {
    setEditingApIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingApIndex(null);
  };

  return (
    <PortfolioContext.Provider value={{ 
      apData, saveAp, deleteAp, 
      juryMode, setJuryMode,
      isModalOpen, openModal, closeModal, editingApIndex
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};