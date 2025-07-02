import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { CircularGauge } from "@/components/CircularGauge";
import { LinearGauge } from "@/components/LinearGauge";
import { DigitalBarMeter } from "@/components/MeterDesigns";
import { AudioLevelMeter } from "@/components/AudioLevelMeter";
import { TemperatureWidget } from "@/components/TemperatureWidget";
import { StatusButton } from "@/components/StatusButton";
import type { TransmitterData } from "@shared/schema";
import dactaLogo from "@assets/DACTA-logo_vector_declinazioni_broadcast_1751479938965.png";

export default function FMTransmitter() {
  const [wsData, setWsData] = useState<TransmitterData | null>(null);
  const [targetPower, setTargetPower] = useState("1500");
  const [siteName, setSiteName] = useState("Trial BASMA Radio");
  
  
  // Demo audio levels that simulate realistic broadcast audio
  const [audioLevels, setAudioLevels] = useState({
    left: -8.5,
    leftPeak: -3.2,
    right: -9.1,
    rightPeak: -2.8,
    mpx: -12.3,
    mpxPeak: -6.5
  });

  // Fetch initial data
  const { data: initialData } = useQuery<TransmitterData>({
    queryKey: ["/api/transmitter/data"],
  });

  // WebSocket connection for real-time updates - temporarily disabled
  useEffect(() => {
    // Temporarily disable WebSocket to fix Vite conflicts
    // TODO: Re-enable once WebSocket configuration is fixed
    /*
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}`);
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "transmitter_data") {
        setWsData(message.data);
      }
    };

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    ws.onerror = (error) => {
      console.log("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
    */
  }, []);

  // Simulate dynamic audio levels for demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      setAudioLevels(prev => ({
        left: -15 + Math.random() * 10 + Math.sin(Date.now() / 1000) * 3,
        leftPeak: Math.max(prev.leftPeak - 0.5, -3 + Math.random() * 2),
        right: -15 + Math.random() * 10 + Math.cos(Date.now() / 1000) * 3,
        rightPeak: Math.max(prev.rightPeak - 0.5, -3 + Math.random() * 2),
        mpx: -18 + Math.random() * 8 + Math.sin(Date.now() / 1500) * 2,
        mpxPeak: Math.max(prev.mpxPeak - 0.3, -8 + Math.random() * 3)
      }));
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const currentData = wsData || initialData;

  if (!currentData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>Loading transmitter data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white select-none">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between p-2 bg-[var(--radio-dark)] border-b border-[var(--radio-gray)] ml-[4px] mr-[4px] mt-[-7px] mb-[-7px]">
        <div className="flex items-center space-x-1">
          {/* Navigation buttons */}
          <div className="flex">
            <button className="toolbar-btn toolbar-btn-yellow">◄</button>
            <button className="toolbar-btn toolbar-btn-yellow">◄</button>
            <button className="toolbar-btn toolbar-btn-yellow">►</button>
            <button className="toolbar-btn toolbar-btn-yellow">≡</button>
          </div>
          
          {/* Status buttons */}
          <div className="flex ml-4 space-x-1">
            <StatusButton variant="green">▲ ON</StatusButton>
            <StatusButton variant="orange">▼ ■</StatusButton>
            <StatusButton variant="green">📊 ✓</StatusButton>
            <StatusButton variant="gray">⚙</StatusButton>
            <StatusButton variant="gray">💾</StatusButton>
            <StatusButton variant="gray">📂</StatusButton>
            <StatusButton variant="gray">🔧</StatusButton>
            <StatusButton variant="gray">⏸</StatusButton>
            <StatusButton variant="gray">△</StatusButton>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img 
              src={dactaLogo} 
              alt="DACTA Broadcast" 
              className="h-8 w-auto"
            />
          </div>
          <div className="flex items-center space-x-2 bg-[#e6ff00] text-[#000000]">
            <span className="text-sm text-gray-400">🔧</span>
            <input 
              type="text" 
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="text-white px-2 py-1 text-sm border border-[var(--radio-gray)] rounded bg-[#3c445b]"
              placeholder="Site Name"
            />
            
          </div>
        </div>
      </div>
      <div className="flex h-screen">
        {/* Main Content Area */}
        <div className="flex-1 p-4 bg-[var(--radio-dark)]">
          {/* ON AIR Status */}
          <div className="mb-4">
            <div 
              className="text-black text-4xl font-bold text-center py-4 mb-2"
              style={{ background: currentData.isOnAir ? "var(--radio-green)" : "var(--radio-gray)" }}
            >
              {currentData.isOnAir ? "ON AIR" : "OFF AIR"}
            </div>
          </div>
          
          {/* Gauges Section */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <DigitalBarMeter
              value={currentData.forwardPower}
              min={0}
              max={2000}
              title="Forward power"
              unit="W"
            />
            
            <DigitalBarMeter
              value={currentData.reflectedPower}
              min={0}
              max={320}
              title="Reflected power"
              unit="W"
            />
          </div>

          {/* Audio Level Meters */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <AudioLevelMeter
              value={audioLevels.left}
              peakValue={audioLevels.leftPeak}
              label="L (Left)"
            />
            
            <AudioLevelMeter
              value={audioLevels.right}
              peakValue={audioLevels.rightPeak}
              label="R (Right)"
            />
            
            <AudioLevelMeter
              value={audioLevels.mpx}
              peakValue={audioLevels.mpxPeak}
              label="Mpx (Multiplex)"
            />
          </div>

          {/* Other Gauges */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <LinearGauge
              value={currentData.frequency}
              min={88}
              max={108}
              title="Frequency"
              scalePoints={[88, 92, 96, 100, 104, 108]}
            />
            
            <LinearGauge
              value={currentData.rfEfficiency}
              min={0}
              max={100}
              title="RF Efficiency"
              scalePoints={[0, 25, 50, 75, 100]}
            />
          </div>
          
          {/* Main Data Section */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Main data */}
              <div className="bg-[var(--radio-panel)] p-3 rounded">
                <h3 className="text-sm mb-3 text-gray-300">Main data</h3>
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <span className="text-yellow-400">Forward power</span>
                    <span className="text-white font-bold text-right font-mono">{Math.round(currentData.forwardPower)}</span>
                    <span className="text-gray-400">W</span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <span className="text-yellow-400">Reflected power</span>
                    <span className="text-white font-bold text-right font-mono">{Math.round(currentData.reflectedPower)}</span>
                    <span className="text-gray-400">W</span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <span className="text-yellow-400">Target power</span>
                    <span className="text-white font-bold text-right font-mono">{Math.round(currentData.targetPower)}</span>
                    <span className="text-gray-400">W</span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <span className="text-yellow-400">Frequency</span>
                    <span className="text-white font-bold text-right font-mono">{currentData.frequency.toFixed(2)}</span>
                    <span className="text-gray-400">MHz</span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <span className="text-yellow-400">RF Efficiency</span>
                    <span className="text-white font-bold text-right font-mono">{currentData.rfEfficiency.toFixed(1)}</span>
                    <span className="text-gray-400">%</span>
                  </div>
                </div>
              </div>

              {/* Services supplies */}
              <div className="bg-[var(--radio-panel)] p-3 rounded">
                <h3 className="text-sm mb-3 text-gray-300">Services supplies</h3>
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <span className="text-yellow-400">Vcc</span>
                    <span className="text-white font-bold text-right font-mono">5.25</span>
                    <span className="text-gray-400">V</span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <span className="text-yellow-400">+12</span>
                    <span className="text-white font-bold text-right font-mono">11.97</span>
                    <span className="text-gray-400">V</span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <span className="text-yellow-400">-12</span>
                    <span className="text-white font-bold text-right font-mono">-12.05</span>
                    <span className="text-gray-400">V</span>
                  </div>
                </div>
              </div>

              

              {/* Working Time */}
              <div className="bg-[var(--radio-panel)] p-3 rounded">
                <h3 className="text-sm mb-3 text-gray-300">Working Time</h3>
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <span className="text-yellow-400">RF Working Time</span>
                    <span className="text-white font-bold text-right font-mono">8298:27</span>
                    <span className="text-gray-400">h:m</span>
                  </div>
                </div>
              </div>

              
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Temperature Monitor */}
              <TemperatureWidget title="Device Temperature Monitor" />

              

              {/* Software */}
              <div className="bg-[var(--radio-panel)] p-3 rounded">
                <h3 className="text-sm mb-3 text-gray-300">Software</h3>
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-2 items-center gap-2">
                    <span className="text-yellow-400">Model</span>
                    <span className="text-white font-bold text-right font-mono">2100</span>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <span className="text-yellow-400">Software version</span>
                    <span className="text-white font-bold text-right font-mono">3.12</span>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <span className="text-yellow-400">Audio Software Version</span>
                    <span className="text-white font-bold text-right font-mono">307</span>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
  );
}
