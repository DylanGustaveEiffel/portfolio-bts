import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PortfolioProvider, PortfolioContext } from './context/PortfolioContext';

import Sidebar from './components/layout/Sidebar';
import JuryBar from './components/layout/JuryBar';
import ApModal from './components/ap/ApModal';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import B1 from './pages/B1';
import ApList from './pages/ApList';
import Stage from './pages/Stage';
import Veille from './pages/Veille';

function AppContent() {
  const { juryMode } = useContext(PortfolioContext);

  // Applique la classe 'jury-mode' sur le body global (comme dans ton Vanilla JS)
  useEffect(() => {
    if (juryMode) document.body.classList.add('jury-mode');
    else document.body.classList.remove('jury-mode');
  }, [juryMode]);

  return (
    <>
      <JuryBar />
      <Sidebar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/b1" element={<B1 />} />
          <Route path="/ap-list" element={<ApList />} />
          <Route path="/stage" element={<Stage />} />
          <Route path="/veille" element={<Veille />} />
        </Routes>
      </main>
      <ApModal />
    </>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <Router>
        <AppContent />
      </Router>
    </PortfolioProvider>
  );
}