import React, { useState, useEffect } from 'react';
import { useVantageData } from './hooks/useVantageData';
import { useVisibility } from './hooks/useVisibility';
import GlobalRibbon from './components/GlobalRibbon';
import VelocityTicker from './components/VelocityTicker';
import Dashboard from './components/Dashboard';
import SidePanel from './components/SidePanel';
import HandoverBrief from './components/HandoverBrief';

function App() {
  const { city, news, marketIndices, loading, lastVisit } = useVantageData();
  const isVisible = useVisibility();
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [showHandover, setShowHandover] = useState(false);

  useEffect(() => {
    // Show handover if it's been more than 5 minutes or if first visit in this session
    if (lastVisit && !sessionStorage.getItem('handover_shown')) {
      setShowHandover(true);
      sessionStorage.setItem('handover_shown', 'true');
    }
  }, [lastVisit]);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsPanelOpen(true);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen bg-[#010101] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-2 border-white/10 border-t-emeraldGlow rounded-full animate-spin mb-4" />
        <span className="text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase">Initializing Vantage Intelligence...</span>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-obsidian text-white flex flex-col transition-all duration-500 ${!isVisible ? 'blur-grayscale' : ''}`}>
      <GlobalRibbon indices={marketIndices} onSelect={handleSelect} />
      <VelocityTicker news={news} />
      
      <main className="flex-grow">
        <Dashboard news={news} onSelect={handleSelect} />
      </main>

      <footer className="p-4 border-t border-white/5 flex justify-between items-center bg-[#050505]">
        <div className="flex items-center space-x-6">
          <div className="flex flex-col">
            <span className="text-[8px] font-bold text-white/30 uppercase">Detected Location</span>
            <span className="text-[10px] font-medium text-emeraldGlow">{city}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] font-bold text-white/30 uppercase">System Time</span>
            <span className="text-[10px] font-medium">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        <div className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em]">
          Vantage Executive v1.0.0 // Encrypted Stream
        </div>
      </footer>

      <SidePanel 
        item={selectedItem} 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
      />

      <HandoverBrief 
        show={showHandover} 
        city={city} 
        topTrend={news[0]} 
        onDismiss={() => setShowHandover(false)} 
      />
    </div>
  );
}

export default App;
