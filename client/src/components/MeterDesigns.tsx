import { useMemo } from "react";

interface MeterProps {
  value: number;
  min: number;
  max: number;
  title: string;
  unit?: string;
  scaleLabels?: string[];
}

// Design 1: Classic Analog VU Meter Style
export function ClassicAnalogMeter({ value, min, max, title, unit = "" }: MeterProps) {
  const needleAngle = useMemo(() => {
    const percentage = Math.min(Math.max((value - min) / (max - min), 0), 1);
    return -90 + (percentage * 180);
  }, [value, min, max]);

  const needleX = useMemo(() => {
    const radians = (needleAngle * Math.PI) / 180;
    return 150 + Math.cos(radians) * 80;
  }, [needleAngle]);

  const needleY = useMemo(() => {
    const radians = (needleAngle * Math.PI) / 180;
    return 150 + Math.sin(radians) * 80;
  }, [needleAngle]);

  return (
    <div className="bg-[var(--radio-panel)] p-6 rounded border-2 border-gray-600">
      <h3 className="text-base mb-4 text-[var(--radio-yellow)] font-bold text-center">{title}</h3>
      <div className="flex justify-center mb-4">
        <svg width="300" height="180" viewBox="0 0 300 180">
          {/* Outer bezel */}
          <circle cx="150" cy="150" r="110" fill="none" stroke="#444" strokeWidth="4"/>
          <circle cx="150" cy="150" r="105" fill="none" stroke="#666" strokeWidth="1"/>
          
          {/* Color zones */}
          <path d="M 70 150 A 80 80 0 0 1 230 150" fill="none" stroke="#00ff00" strokeWidth="8" opacity="0.3"/>
          <path d="M 190 94 A 80 80 0 0 1 230 150" fill="none" stroke="#ffff00" strokeWidth="8" opacity="0.3"/>
          <path d="M 215 120 A 80 80 0 0 1 230 150" fill="none" stroke="#ff0000" strokeWidth="8" opacity="0.3"/>
          
          {/* Main arc */}
          <path d="M 70 150 A 80 80 0 0 1 230 150" fill="none" stroke="var(--radio-light-gray)" strokeWidth="2"/>
          
          {/* Major tick marks */}
          {Array.from({ length: 11 }, (_, i) => {
            const angle = -90 + (i * 18);
            const radians = (angle * Math.PI) / 180;
            const x1 = 150 + Math.cos(radians) * 85;
            const y1 = 150 + Math.sin(radians) * 85;
            const x2 = 150 + Math.cos(radians) * 75;
            const y2 = 150 + Math.sin(radians) * 75;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="2"/>;
          })}
          
          {/* Minor tick marks */}
          {Array.from({ length: 41 }, (_, i) => {
            if (i % 4 === 0) return null;
            const angle = -90 + (i * 4.5);
            const radians = (angle * Math.PI) / 180;
            const x1 = 150 + Math.cos(radians) * 85;
            const y1 = 150 + Math.sin(radians) * 85;
            const x2 = 150 + Math.cos(radians) * 80;
            const y2 = 150 + Math.sin(radians) * 80;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#aaa" strokeWidth="1"/>;
          })}
          
          {/* Scale labels */}
          {Array.from({ length: 11 }, (_, i) => {
            const angle = -90 + (i * 18);
            const radians = (angle * Math.PI) / 180;
            const x = 150 + Math.cos(radians) * 65;
            const y = 150 + Math.sin(radians) * 65;
            const label = (i * 200).toString();
            return (
              <text key={i} x={x} y={y + 5} fill="white" textAnchor="middle" fontSize="12" fontWeight="bold">
                {label}
              </text>
            );
          })}
          
          {/* Needle */}
          <line x1="150" y1="150" x2={needleX} y2={needleY} stroke="#ff0000" strokeWidth="3"/>
          <circle cx="150" cy="150" r="6" fill="#333" stroke="#666" strokeWidth="2"/>
          <circle cx="150" cy="150" r="3" fill="#ff0000"/>
        </svg>
      </div>
      <div className="text-center text-[var(--radio-yellow)] text-3xl font-bold font-mono bg-black p-2 rounded">
        {Math.round(value)}{unit}
      </div>
    </div>
  );
}

// Design 2: Digital Bar Graph Style
export function DigitalBarMeter({ value, min, max, title, unit = "", scaleLabels }: MeterProps) {
  const percentage = useMemo(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  const segments = 40;
  const filledSegments = Math.floor((percentage / 100) * segments);
  const defaultLabels = ["0", "500", "1000", "1500", "2000"];
  const labels = scaleLabels || defaultLabels;

  return (
    <div className="bg-[var(--radio-panel)] p-6 rounded border border-gray-600 ml-[0px] mr-[0px] mt-[8px] mb-[8px] pl-[19px] pr-[19px] pt-[0px] pb-[0px]">
      <h3 className="text-base mb-4 text-[var(--radio-yellow)] font-bold text-center">{title}</h3>
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          {labels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>
        <div className="flex gap-1 h-8 items-end">
          {Array.from({ length: segments }, (_, i) => {
            let color = "#333";
            if (i < filledSegments) {
              if (i < segments * 0.6) color = "#00ff00";
              else if (i < segments * 0.8) color = "#ffff00";
              else color = "#ff0000";
            }
            return (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  backgroundColor: color,
                  height: i % 5 === 4 ? "100%" : "60%",
                  border: "1px solid #555"
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="text-center text-[var(--radio-yellow)] text-3xl font-bold font-mono bg-black p-2 rounded">
        {Math.round(value)}{unit}
      </div>
    </div>
  );
}

// Design 3: Horizontal Strip Chart Style
export function StripChartMeter({ value, min, max, title, unit = "" }: MeterProps) {
  const percentage = useMemo(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  return (
    <div className="bg-[var(--radio-panel)] p-6 rounded border border-gray-600">
      <h3 className="text-base mb-4 text-[var(--radio-yellow)] font-bold text-center">{title}</h3>
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>0</span>
          <span>500</span>
          <span>1000</span>
          <span>1500</span>
          <span>2000</span>
        </div>
        <div className="relative h-12 bg-black border-2 border-gray-600 rounded">
          {/* Grid lines */}
          {[25, 50, 75].map(pos => (
            <div key={pos} className="absolute h-full border-l border-gray-600" style={{ left: `${pos}%` }} />
          ))}
          
          {/* Color zones */}
          <div className="absolute inset-0 flex">
            <div className="bg-green-500 opacity-20" style={{ width: "60%" }} />
            <div className="bg-yellow-500 opacity-20" style={{ width: "20%" }} />
            <div className="bg-red-500 opacity-20" style={{ width: "20%" }} />
          </div>
          
          {/* Value indicator */}
          <div
            className="absolute top-0 h-full w-1 bg-white shadow-lg"
            style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
          />
          <div
            className="absolute -top-2 w-3 h-3 bg-white rotate-45 border border-gray-400"
            style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
          />
        </div>
      </div>
      <div className="text-center text-[var(--radio-yellow)] text-3xl font-bold font-mono bg-black p-2 rounded">
        {Math.round(value)}{unit}
      </div>
    </div>
  );
}

// Design 4: Edgewise Panel Meter Style
export function EdgewiseMeter({ value, min, max, title, unit = "" }: MeterProps) {
  const needleAngle = useMemo(() => {
    const percentage = Math.min(Math.max((value - min) / (max - min), 0), 1);
    return -45 + (percentage * 90); // 90 degree arc
  }, [value, min, max]);

  const needleX = useMemo(() => {
    const radians = (needleAngle * Math.PI) / 180;
    return 150 + Math.cos(radians) * 60;
  }, [needleAngle]);

  const needleY = useMemo(() => {
    const radians = (needleAngle * Math.PI) / 180;
    return 120 + Math.sin(radians) * 60;
  }, [needleAngle]);

  return (
    <div className="bg-[var(--radio-panel)] p-6 rounded border border-gray-600">
      <h3 className="text-base mb-4 text-[var(--radio-yellow)] font-bold text-center">{title}</h3>
      <div className="flex justify-center mb-4">
        <svg width="300" height="140" viewBox="0 0 300 140">
          {/* Panel background */}
          <rect x="30" y="30" width="240" height="80" fill="#1a1a1a" stroke="#444" strokeWidth="2" rx="5"/>
          
          {/* Scale arc */}
          <path d="M 105 120 A 60 60 0 0 1 195 120" fill="none" stroke="var(--radio-light-gray)" strokeWidth="2"/>
          
          {/* Major ticks */}
          {Array.from({ length: 5 }, (_, i) => {
            const angle = -45 + (i * 22.5);
            const radians = (angle * Math.PI) / 180;
            const x1 = 150 + Math.cos(radians) * 65;
            const y1 = 120 + Math.sin(radians) * 65;
            const x2 = 150 + Math.cos(radians) * 55;
            const y2 = 120 + Math.sin(radians) * 55;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="2"/>;
          })}
          
          {/* Scale labels */}
          <text x="105" y="135" fill="white" textAnchor="middle" fontSize="10">0</text>
          <text x="130" y="95" fill="white" textAnchor="middle" fontSize="10">500</text>
          <text x="150" y="85" fill="white" textAnchor="middle" fontSize="10">1000</text>
          <text x="170" y="95" fill="white" textAnchor="middle" fontSize="10">1500</text>
          <text x="195" y="135" fill="white" textAnchor="middle" fontSize="10">2000</text>
          
          {/* Needle */}
          <line x1="150" y1="120" x2={needleX} y2={needleY} stroke="#ff0000" strokeWidth="2"/>
          <circle cx="150" cy="120" r="4" fill="#333" stroke="#666" strokeWidth="1"/>
        </svg>
      </div>
      <div className="text-center text-[var(--radio-yellow)] text-2xl font-bold font-mono bg-black p-2 rounded">
        {Math.round(value)}{unit}
      </div>
    </div>
  );
}

// Design 5: Modern LCD Style
export function LCDMeter({ value, min, max, title, unit = "" }: MeterProps) {
  const percentage = useMemo(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  return (
    <div className="bg-[var(--radio-panel)] p-6 rounded border border-gray-600">
      <h3 className="text-base mb-4 text-[var(--radio-yellow)] font-bold text-center">{title}</h3>
      <div className="bg-green-900 p-4 rounded border-2 border-green-700 mb-4">
        <div className="flex justify-between text-xs text-green-300 mb-2">
          <span>0</span>
          <span>500</span>
          <span>1000</span>
          <span>1500</span>
          <span>2000</span>
        </div>
        <div className="relative h-8 bg-green-950 border border-green-700 rounded mb-3">
          <div
            className="h-full bg-green-400 rounded transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-px bg-green-600 opacity-50" />
          </div>
        </div>
        <div className="text-center text-green-300 text-4xl font-mono font-bold bg-green-950 p-2 rounded border border-green-700">
          {Math.round(value).toString().padStart(4, '0')}{unit}
        </div>
      </div>
    </div>
  );
}