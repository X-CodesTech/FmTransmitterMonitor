import { useMemo } from "react";

interface CircularGaugeProps {
  value: number;
  min: number;
  max: number;
  title: string;
  unit?: string;
}

export function CircularGauge({ value, min, max, title, unit = "" }: CircularGaugeProps) {
  const needleAngle = useMemo(() => {
    const percentage = Math.min(Math.max((value - min) / (max - min), 0), 1);
    // The arc goes from left (-90°) to right (+90°), spanning 180°
    return -90 + (percentage * 180);
  }, [value, min, max]);

  const needleX = useMemo(() => {
    const radians = (needleAngle * Math.PI) / 180;
    return 140 + Math.cos(radians) * 90; // Scaled up needle
  }, [needleAngle]);

  const needleY = useMemo(() => {
    const radians = (needleAngle * Math.PI) / 180;
    return 140 + Math.sin(radians) * 90; // Scaled up needle
  }, [needleAngle]);

  return (
    <div className="bg-[var(--radio-panel)] p-6 rounded">
      <h3 className="text-base mb-4 text-gray-300 font-medium">{title}</h3>
      <div className="flex justify-center mb-4">
        <div className="gauge-container">
          <svg width="280" height="160" viewBox="0 0 280 160">
            {/* Gauge arc background */}
            <path d="M 50 140 A 112 112 0 0 1 230 140" className="gauge-arc" strokeWidth="3"/>
            
            {/* Scale marks - Major ticks */}
            {/* 0 (left) */}
            <line x1="50" y1="140" x2="65" y2="130" stroke="var(--radio-light-gray)" strokeWidth="3"/>
            {/* 500 (quarter) */}
            <line x1="85" y1="79" x2="95" y2="69" stroke="var(--radio-light-gray)" strokeWidth="3"/>
            {/* 1000 (half) */}
            <line x1="140" y1="28" x2="140" y2="43" stroke="var(--radio-light-gray)" strokeWidth="3"/>
            {/* 1500 (three-quarter) */}
            <line x1="195" y1="79" x2="185" y2="69" stroke="var(--radio-light-gray)" strokeWidth="3"/>
            {/* 2000 (right) */}
            <line x1="230" y1="140" x2="215" y2="130" stroke="var(--radio-light-gray)" strokeWidth="3"/>
            
            {/* Scale marks - Minor ticks */}
            <line x1="62" y1="115" x2="67" y2="110" stroke="var(--radio-light-gray)" strokeWidth="1"/>
            <line x1="75" y1="90" x2="80" y2="85" stroke="var(--radio-light-gray)" strokeWidth="1"/>
            <line x1="90" y1="71" x2="95" y2="66" stroke="var(--radio-light-gray)" strokeWidth="1"/>
            <line x1="112" y1="39" x2="115" y2="44" stroke="var(--radio-light-gray)" strokeWidth="1"/>
            <line x1="165" y1="39" x2="162" y2="44" stroke="var(--radio-light-gray)" strokeWidth="1"/>
            <line x1="185" y1="71" x2="180" y2="66" stroke="var(--radio-light-gray)" strokeWidth="1"/>
            <line x1="200" y1="90" x2="195" y2="85" stroke="var(--radio-light-gray)" strokeWidth="1"/>
            <line x1="215" y1="115" x2="210" y2="110" stroke="var(--radio-light-gray)" strokeWidth="1"/>
            
            {/* Needle */}
            <line x1="140" y1="140" x2={needleX} y2={needleY} className="gauge-needle" strokeWidth="3"/>
            
            {/* Center dot */}
            <circle cx="140" cy="140" r="5" fill="var(--radio-light-gray)"/>
            
            {/* Scale labels */}
            <text x="50" y="158" fill="var(--radio-light-gray)" textAnchor="middle" fontSize="14">0</text>
            <text x="85" y="60" fill="var(--radio-light-gray)" textAnchor="middle" fontSize="14">500</text>
            <text x="140" y="20" fill="var(--radio-light-gray)" textAnchor="middle" fontSize="14">1000</text>
            <text x="195" y="60" fill="var(--radio-light-gray)" textAnchor="middle" fontSize="14">1500</text>
            <text x="230" y="158" fill="var(--radio-light-gray)" textAnchor="middle" fontSize="14">2000</text>
          </svg>
        </div>
      </div>
      <div className="text-center text-[var(--radio-yellow)] text-3xl font-bold font-mono">
        {Math.round(value)}{unit}
      </div>
    </div>
  );
}
