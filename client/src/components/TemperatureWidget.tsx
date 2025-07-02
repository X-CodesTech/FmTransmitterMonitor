import { useMemo, useState, useEffect } from "react";

interface TemperatureWidgetProps {
  title: string;
}

export function TemperatureWidget({ title }: TemperatureWidgetProps) {
  // Simulate realistic temperature readings for FM transmitter
  const [temperatures, setTemperatures] = useState({
    rfMax: 37.3,
    psuMax: 43.0,
    environment: 24.3,
    fanSpeed: 67
  });

  // Simulate temperature fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperatures(prev => ({
        rfMax: Math.max(30, Math.min(50, prev.rfMax + (Math.random() - 0.5) * 2)),
        psuMax: Math.max(35, Math.min(55, prev.psuMax + (Math.random() - 0.5) * 1.5)),
        environment: Math.max(20, Math.min(30, prev.environment + (Math.random() - 0.5) * 0.5)),
        fanSpeed: Math.max(40, Math.min(100, prev.fanSpeed + (Math.random() - 0.5) * 5))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getTemperatureColor = (temp: number, maxSafe: number) => {
    if (temp < maxSafe * 0.7) return "#00ff00"; // Green
    if (temp < maxSafe * 0.85) return "#ffff00"; // Yellow
    return "#ff0000"; // Red
  };

  const getTempBarWidth = (temp: number, max: number) => {
    return Math.min((temp / max) * 100, 100);
  };

  return (
    <div className="bg-[var(--radio-panel)] p-4 rounded border border-gray-600">
      <h3 className="text-base mb-4 text-[var(--radio-yellow)] font-bold text-center">{title}</h3>
      
      {/* Temperature readings */}
      <div className="space-y-4">
        {/* RF Temperature */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-yellow-400 text-sm">RF Max Temperature</span>
            <span className="text-white font-bold font-mono text-sm">{temperatures.rfMax.toFixed(1)}°C</span>
          </div>
          <div className="w-full h-3 bg-gray-800 rounded border border-gray-600 overflow-hidden">
            <div 
              className="h-full transition-all duration-1000 rounded"
              style={{ 
                width: `${getTempBarWidth(temperatures.rfMax, 50)}%`,
                backgroundColor: "#00ff00"
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0°C</span>
            <span>25°C</span>
            <span>45°C</span>
            <span>50°C</span>
          </div>
        </div>

        {/* PSU Temperature */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-yellow-400 text-sm">PSU Max Temperature</span>
            <span className="text-white font-bold font-mono text-sm">{temperatures.psuMax.toFixed(1)}°C</span>
          </div>
          <div className="w-full h-3 bg-gray-800 rounded border border-gray-600 overflow-hidden">
            <div 
              className="h-full transition-all duration-1000 rounded"
              style={{ 
                width: `${getTempBarWidth(temperatures.psuMax, 60)}%`,
                backgroundColor: "#00ff00"
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0°C</span>
            <span>30°C</span>
            <span>50°C</span>
            <span>60°C</span>
          </div>
        </div>

        {/* Environment Temperature */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-yellow-400 text-sm">Environment</span>
            <span className="text-white font-bold font-mono text-sm">{temperatures.environment.toFixed(1)}°C</span>
          </div>
          <div className="w-full h-3 bg-gray-800 rounded border border-gray-600 overflow-hidden">
            <div 
              className="h-full transition-all duration-1000 rounded"
              style={{ 
                width: `${getTempBarWidth(temperatures.environment, 35)}%`,
                backgroundColor: "#00ff00"
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0°C</span>
            <span>15°C</span>
            <span>30°C</span>
            <span>35°C</span>
          </div>
        </div>

        {/* Fan Speed */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-yellow-400 text-sm">Fan Speed</span>
            <span className="text-white font-bold font-mono text-sm">{Math.round(temperatures.fanSpeed)}%</span>
          </div>
          <div className="w-full h-3 bg-gray-800 rounded border border-gray-600 overflow-hidden">
            <div 
              className="h-full transition-all duration-1000 rounded"
              style={{ 
                width: `${temperatures.fanSpeed}%`,
                backgroundColor: "#00ff00"
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Status indicator */}
      <div className="mt-4 text-center">
        <div className="inline-block px-3 py-1 rounded text-xs font-bold bg-green-600 text-white">
          NORMAL
        </div>
      </div>
    </div>
  );
}