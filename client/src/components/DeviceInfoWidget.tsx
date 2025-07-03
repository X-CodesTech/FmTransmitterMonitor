interface DeviceInfoWidgetProps {
  title: string;
}

export function DeviceInfoWidget({ title }: DeviceInfoWidgetProps) {
  // Simulated device data with some variation
  const deviceInfo = {
    fanSpeed: Math.floor(2350 + Math.random() * 200), // Simulated varying fan speed
    activeAudioSource: "AES"
  };

  const getAudioSourceColor = (source: string) => {
    switch (source) {
      case "AES": return "bg-blue-600";
      case "SATELLITE": return "bg-purple-600";
      case "STEREO": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="bg-[var(--radio-panel)] p-4 rounded-lg border border-[var(--radio-gray)]">
      <h3 className="text-sm font-medium text-gray-300 mb-4 border-b border-[var(--radio-gray)] pb-2">
        {title}
      </h3>
      
      <div className="space-y-4">

        {/* Fan Speed */}
        <div className="bg-[var(--radio-dark)] p-3 rounded border border-[var(--radio-gray)]">
          <div className="text-xs text-yellow-400 mb-2">Cooling Fan Speed</div>
          <div className="flex items-center justify-between">
            <span className="text-white font-bold font-mono text-lg">{deviceInfo.fanSpeed}</span>
            <span className="text-gray-400 text-sm">RPM</span>
          </div>
          <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((deviceInfo.fanSpeed / 3000) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Active Audio Source */}
        <div className="bg-[var(--radio-dark)] p-3 rounded border border-[var(--radio-gray)]">
          <div className="text-xs text-yellow-400 mb-2">Active Audio Source</div>
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-white font-bold text-sm ${getAudioSourceColor(deviceInfo.activeAudioSource)}`}>
              {deviceInfo.activeAudioSource}
            </span>
            <div className="flex space-x-1">
              <div className={`w-2 h-2 rounded-full ${deviceInfo.activeAudioSource === 'AES' ? 'bg-blue-400' : 'bg-gray-600'}`}></div>
              <div className={`w-2 h-2 rounded-full ${deviceInfo.activeAudioSource === 'SATELLITE' ? 'bg-purple-400' : 'bg-gray-600'}`}></div>
              <div className={`w-2 h-2 rounded-full ${deviceInfo.activeAudioSource === 'STEREO' ? 'bg-green-400' : 'bg-gray-600'}`}></div>
            </div>
          </div>
        </div>

        {/* Additional Status Indicators */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-[var(--radio-dark)] p-2 rounded border border-[var(--radio-gray)] text-center">
            <div className="text-xs text-yellow-400 mb-1">RF Power</div>
            <div className="w-2 h-2 bg-green-400 rounded-full mx-auto animate-pulse"></div>
          </div>
          <div className="bg-[var(--radio-dark)] p-2 rounded border border-[var(--radio-gray)] text-center">
            <div className="text-xs text-yellow-400 mb-1">Audio</div>
            <div className="w-2 h-2 bg-green-400 rounded-full mx-auto animate-pulse"></div>
          </div>
          <div className="bg-[var(--radio-dark)] p-2 rounded border border-[var(--radio-gray)] text-center">
            <div className="text-xs text-yellow-400 mb-1">Network</div>
            <div className="w-2 h-2 bg-green-400 rounded-full mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}