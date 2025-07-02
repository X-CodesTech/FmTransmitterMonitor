import { Link } from "wouter";
import { ClassicAnalogMeter, DigitalBarMeter, StripChartMeter, EdgewiseMeter, LCDMeter } from "../components/MeterDesigns";

export default function MeterDesigns() {
  const testValue = 1500; // Test value to show needle position
  const min = 0;
  const max = 2000;

  return (
    <div className="min-h-screen bg-[var(--radio-dark)] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <button className="bg-[var(--radio-yellow)] text-black px-4 py-2 font-medium rounded hover:bg-yellow-400 transition-colors">
              ← Back to FM Transmitter
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-[var(--radio-yellow)] flex-1 text-center">
            Professional Meter Design Options (0-2000W)
          </h1>
          <div className="w-48"></div> {/* Spacer for centering */}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">1. Classic Analog VU Meter</h2>
            <p className="text-gray-300 mb-4 text-sm">
              Traditional analog meter with color zones (green/yellow/red), classic needle movement, 
              and professional broadcast equipment styling.
            </p>
            <ClassicAnalogMeter 
              value={testValue} 
              min={min} 
              max={max} 
              title="Forward Power" 
              unit="W" 
            />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">2. Digital Bar Graph</h2>
            <p className="text-gray-300 mb-4 text-sm">
              Modern LED-style bar display with individual segments, commonly used in 
              professional audio and RF equipment.
            </p>
            <DigitalBarMeter 
              value={testValue} 
              min={min} 
              max={max} 
              title="Forward Power" 
              unit="W" 
            />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">3. Horizontal Strip Chart</h2>
            <p className="text-gray-300 mb-4 text-sm">
              Linear meter with moving pointer, similar to chart recorders used in 
              industrial monitoring applications.
            </p>
            <StripChartMeter 
              value={testValue} 
              min={min} 
              max={max} 
              title="Forward Power" 
              unit="W" 
            />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">4. Edgewise Panel Meter</h2>
            <p className="text-gray-300 mb-4 text-sm">
              Compact 90-degree arc meter typical of panel-mounted instruments in 
              rack-mounted RF equipment.
            </p>
            <EdgewiseMeter 
              value={testValue} 
              min={min} 
              max={max} 
              title="Forward Power" 
              unit="W" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 max-w-2xl mx-auto">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">5. Modern LCD Display</h2>
            <p className="text-gray-300 mb-4 text-sm">
              Digital LCD-style meter with retro green display, reminiscent of early 
              computer terminals and digital test equipment.
            </p>
            <LCDMeter 
              value={testValue} 
              min={min} 
              max={max} 
              title="Forward Power" 
              unit="W" 
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-[var(--radio-panel)] p-6 rounded border border-gray-600">
            <h3 className="text-lg font-bold text-[var(--radio-yellow)] mb-4">Design Selection Guide</h3>
            <div className="text-left text-gray-300 space-y-2 text-sm">
              <p><strong>Classic Analog:</strong> Most authentic for vintage radio equipment replication</p>
              <p><strong>Digital Bar:</strong> Best for high-precision monitoring and modern equipment</p>
              <p><strong>Strip Chart:</strong> Ideal for trend visualization and continuous monitoring</p>
              <p><strong>Edgewise:</strong> Space-efficient for compact panel layouts</p>
              <p><strong>LCD Display:</strong> Clean, modern look with high readability</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}