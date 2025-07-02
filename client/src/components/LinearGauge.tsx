import { useMemo } from "react";

interface LinearGaugeProps {
  value: number;
  min: number;
  max: number;
  title: string;
  scalePoints?: number[];
}

export function LinearGauge({ value, min, max, title, scalePoints }: LinearGaugeProps) {
  const percentage = useMemo(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  const defaultScalePoints = useMemo(() => {
    if (scalePoints) return scalePoints;
    const step = (max - min) / 5;
    return Array.from({ length: 6 }, (_, i) => min + i * step);
  }, [min, max, scalePoints]);

  return (
    <div className="bg-[var(--radio-panel)] p-6 rounded">
      <h3 className="text-base mb-4 text-gray-300 font-medium">{title}</h3>
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2 text-[#05e305]">
          {defaultScalePoints.map((point, index) => (
            <span key={index}>{Math.round(point)}</span>
          ))}
        </div>
        <div className="linear-gauge" style={{ height: "16px" }}>
          <div 
            className="linear-gauge-fill" 
            style={{ 
              width: "3px", 
              left: `${percentage}%`,
              transform: "translateX(-50%)",
              height: "100%"
            }}
          />
        </div>
      </div>
      <div className="text-center text-white text-2xl font-bold font-mono">
        {typeof value === "number" ? value.toFixed(title === "Frequency" ? 2 : 1) : value}
      </div>
    </div>
  );
}
