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
  const [systemTime, setSystemTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setSystemTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
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
        <div className="w-10 h-10 border border-white/10 border-t-emeraldGlow rounded-full animate-spin mb-6" />
        <span className="text-[10px] font-bold tracking-[0.4em] text-white/20 uppercase">Acquiring Intelligence Stream...</span>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen bg-obsidian text-white flex flex-col transition-all duration-500 ${!isVisible ? 'blur-grayscale' : ''}`}
      data-testid="vantage-root"
    >
      <GlobalRibbon indices={marketIndices} onSelect={handleSelect} />
      <VelocityTicker news={news} />
      
      <main className="flex-grow">
        <Dashboard news={news} onSelect={handleSelect} city={city} />
      </main>

      <footer className="px-6 py-3 border-t border-white/[0.04] flex justify-between items-center bg-[#020202]">
        <div className="flex items-center space-x-8">
          <div className="flex flex-col">
            <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em]">Station</span>
            <span className="text-[11px] font-medium text-emeraldGlow">{city}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em]">Clock</span>
            <span className="text-[11px] font-mono text-white/50">{systemTime.toLocaleTimeString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em]">Signals</span>
            <span className="text-[11px] font-mono text-white/50">{news.length}</span>
          </div>
        </div>
        <div className="text-[8px] font-bold text-white/10 uppercase tracking-[0.2em]">
          Vantage v1.0 // Encrypted
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
