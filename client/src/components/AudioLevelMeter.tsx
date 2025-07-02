import { useMemo } from "react";

interface AudioLevelMeterProps {
  value: number; // Value in dB, typically -60 to +6
  label: string;
  peakValue?: number;
}

export function AudioLevelMeter({ value, label, peakValue }: AudioLevelMeterProps) {
  const segments = 20;
  const minDb = -60;
  const maxDb = 6;
  
  const normalizedValue = useMemo(() => {
    return Math.max(0, Math.min(1, (value - minDb) / (maxDb - minDb)));
  }, [value, minDb, maxDb]);

  const normalizedPeak = useMemo(() => {
    if (!peakValue) return 0;
    return Math.max(0, Math.min(1, (peakValue - minDb) / (maxDb - minDb)));
  }, [peakValue, minDb, maxDb]);
  
  const filledSegments = Math.floor(normalizedValue * segments);
  const peakSegment = Math.floor(normalizedPeak * segments);

  return (
    <div className="bg-[var(--radio-panel)] p-3 rounded border border-gray-600">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[var(--radio-yellow)] text-sm font-medium">{label}</span>
        <span className="text-white text-sm font-mono">
          {value > -60 ? `${value >= 0 ? '+' : ''}${value.toFixed(1)}` : '-∞'} dB
        </span>
      </div>
      
      <div className="flex gap-px h-4 items-end bg-black p-1 rounded">
        {Array.from({ length: segments }, (_, i) => {
          let color = "#333"; // Dark background
          let opacity = 0.3;
          
          // Determine segment color and state
          if (i < filledSegments) {
            opacity = 1;
            if (i < segments * 0.6) {
              color = "#00ff00"; // Green zone (-60 to -18 dB)
            } else if (i < segments * 0.85) {
              color = "#ffff00"; // Yellow zone (-18 to -3 dB)
            } else {
              color = "#ff0000"; // Red zone (-3 to +6 dB)
            }
          }
          
          // Peak indicator
          if (peakValue && i === peakSegment && i >= filledSegments) {
            color = "#ff6600";
            opacity = 1;
          }

          return (
            <div
              key={i}
              className="flex-1 rounded-sm transition-all duration-100"
              style={{
                backgroundColor: color,
                opacity: opacity,
                height: i % 4 === 3 ? "100%" : "70%", // Taller segments every 4th
                border: `1px solid ${i < filledSegments ? color : '#555'}`
              }}
            />
          );
        })}
      </div>
      
      {/* Scale markings */}
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>-60</span>
        <span>-40</span>
        <span>-20</span>
        <span>-6</span>
        <span>0</span>
        <span>+6</span>
      </div>
    </div>
  );
}