import { useEffect, useState } from "react";

interface FrequencyModulationWidgetProps {
  title: string;
}

export function FrequencyModulationWidget({ title }: FrequencyModulationWidgetProps) {
  const [demodulatedSignal, setDemodulatedSignal] = useState<number[]>([]);
  const [modulationDepth, setModulationDepth] = useState(75);
  const [carrierFrequency, setCarrierFrequency] = useState(98.5);
  const [snr, setSnr] = useState(42);
  const [thd, setThd] = useState(0.1);
  const [pilotStatus, setPilotStatus] = useState("OK");

  // Enhanced realistic FM audio simulation
  useEffect(() => {
    let timeOffset = 0;
    let phase = 0;
    
    const interval = setInterval(() => {
      timeOffset += 0.1;
      
      // Create realistic audio signal with better dynamics
      const newData = Array.from({ length: 60 }, (_, i) => {
        const sampleTime = timeOffset + i * 0.02;
        
        // Simulate complex audio content
        const fundamental = Math.sin(sampleTime * 4 + phase) * 0.7;
        const harmonic2 = Math.sin(sampleTime * 8 + phase * 1.3) * 0.3;
        const harmonic3 = Math.sin(sampleTime * 12 + phase * 0.7) * 0.2;
        
        // Add voice-like formants
        const formant1 = Math.sin(sampleTime * 15 + phase * 2) * 0.15;
        const formant2 = Math.sin(sampleTime * 25 + phase * 1.5) * 0.1;
        
        // Dynamic amplitude envelope (like speech or music)
        const envelope = (Math.sin(sampleTime * 0.8) * 0.4 + 0.6) * 
                        (Math.sin(sampleTime * 1.7) * 0.2 + 0.8);
        
        // Combine all components
        let audioSignal = (fundamental + harmonic2 + harmonic3 + formant1 + formant2) * envelope;
        
        // Add some transients (like percussion or speech pops)
        if (Math.random() < 0.02) {
          audioSignal += (Math.random() - 0.5) * 0.5;
        }
        
        // Realistic noise floor
        const noise = (Math.random() - 0.5) * 0.05;
        audioSignal += noise;
        
        // Soft compression/limiting
        return Math.tanh(audioSignal * 1.2) * 0.8;
      });
      
      setDemodulatedSignal(newData);
      phase += 0.1;
      
      // More realistic parameter variations
      const newModDepth = 60 + Math.sin(timeOffset * 0.4) * 20 + 
                         Math.sin(timeOffset * 1.1) * 8 + Math.random() * 6;
      setModulationDepth(Math.round(Math.max(35, Math.min(90, newModDepth))));
      
      // Very slight frequency drift
      const drift = 98.5 + Math.sin(timeOffset * 0.05) * 0.01 + (Math.random() - 0.5) * 0.005;
      setCarrierFrequency(Number(drift.toFixed(2)));
      
      // Gradual SNR variations
      const newSnr = 41 + Math.sin(timeOffset * 0.3) * 4 + Math.random() * 2;
      setSnr(Math.round(Math.max(35, Math.min(48, newSnr))));
      
      // THD variations
      const newThd = 0.09 + Math.sin(timeOffset * 0.25) * 0.04 + Math.random() * 0.02;
      setThd(Number(Math.max(0.05, Math.min(0.18, newThd)).toFixed(2)));
      
      // Pilot tone status changes
      if (Math.random() < 0.005) {
        setPilotStatus(prev => prev === "OK" ? "WEAK" : "OK");
      }
      
    }, 50); // Faster updates for smoother animation

    return () => clearInterval(interval);
  }, []);

  const getModulationColor = (depth: number) => {
    if (depth < 50) return "text-yellow-400";
    if (depth < 85) return "text-green-400";
    return "text-red-400";
  };

  return (
    <div className="bg-[var(--radio-panel)] p-4 rounded border border-gray-600">
      <h3 className="text-base mb-4 text-[var(--radio-yellow)] font-bold text-center">{title}</h3>
      {/* Compact FM Signal Display */}
      <div className="mb-4">
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="text-center">
            <div className="text-xs text-yellow-400 mb-1">Carrier Freq</div>
            <div className="text-white font-bold font-mono text-lg">93.4 MHz</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-yellow-400 mb-1">Mod Depth</div>
            <div className={`font-bold font-mono text-lg ${getModulationColor(modulationDepth)}`}>
              {modulationDepth}%
            </div>
          </div>
        </div>

        {/* Enhanced Waveform Display */}
        <div className="h-16 bg-gradient-to-b from-gray-900 to-black border border-gray-600 rounded mb-3 relative overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 300 64" className="absolute inset-0">
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="30" height="16" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 16" fill="none" stroke="#1a4a1a" strokeWidth="0.5"/>
              </pattern>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00ff00" stopOpacity="0.3"/>
                <stop offset="50%" stopColor="#00ff00" stopOpacity="1"/>
                <stop offset="100%" stopColor="#00ff00" stopOpacity="0.3"/>
              </linearGradient>
            </defs>
            
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Center line */}
            <line x1="0" y1="32" x2="300" y2="32" stroke="#00ff00" strokeWidth="0.5" opacity="0.5" />
            
            {/* Major grid lines */}
            <line x1="75" y1="0" x2="75" y2="64" stroke="#0a3a0a" strokeWidth="1" />
            <line x1="150" y1="0" x2="150" y2="64" stroke="#0a3a0a" strokeWidth="1" />
            <line x1="225" y1="0" x2="225" y2="64" stroke="#0a3a0a" strokeWidth="1" />
            
            {/* Waveform with glow effect */}
            <polyline
              points={demodulatedSignal.map((value, index) => {
                const x = (index / (demodulatedSignal.length - 1)) * 300;
                const y = 32 + (value * 26);
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth="2"
              filter="url(#glow)"
            />
            
            {/* Glow filter */}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Scanning line effect */}
            <line 
              x1={(Date.now() / 20) % 300} 
              y1="0" 
              x2={(Date.now() / 20) % 300} 
              y2="64" 
              stroke="#00ff00" 
              strokeWidth="1" 
              opacity="0.6"
            />
          </svg>
          
          {/* Level indicators */}
          <div className="absolute top-1 left-2 text-xs text-green-400 font-mono">+1V</div>
          <div className="absolute bottom-1 left-2 text-xs text-green-400 font-mono">-1V</div>
          <div className="absolute top-1 right-2 text-xs text-green-400 font-mono">AUDIO</div>
        </div>

        {/* Compact Status Grid */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="text-yellow-400">SNR</div>
            <div className={`font-bold ${snr > 35 ? 'text-green-400' : snr > 25 ? 'text-yellow-400' : 'text-red-400'}`}>
              {snr}dB
            </div>
          </div>
          <div className="text-center">
            <div className="text-yellow-400">THD</div>
            <div className={`font-bold ${thd < 0.15 ? 'text-green-400' : thd < 0.3 ? 'text-yellow-400' : 'text-red-400'}`}>
              {thd}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-yellow-400">Pilot</div>
            <div className={`font-bold ${pilotStatus === 'OK' ? 'text-green-400' : 'text-yellow-400'}`}>
              {pilotStatus}
            </div>
          </div>
        </div>
      </div>
      {/* Digital Display */}
      <div className="text-center text-[var(--radio-yellow)] text-2xl font-bold font-mono bg-black p-2 rounded pt-[29px] pb-[29px] pl-[10px] pr-[10px] ml-[3px] mr-[3px] mt-[5px] mb-[5px]">
        93.4 MHz BIET JALA SITE
      </div>
    </div>
  );
}