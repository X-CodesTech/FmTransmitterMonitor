interface DeviceStatusWidgetProps {
  title: string;
}

export function DeviceStatusWidget({ title }: DeviceStatusWidgetProps) {
  // Simulated device data
  const deviceStatus = {
    model: "FM-2100TX",
    version: "v3.12.4",
    status: "OPERATIONAL"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPERATIONAL": return "text-green-400";
      case "WARNING": return "text-yellow-400";
      case "ERROR": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="bg-[var(--radio-panel)] p-3 rounded">
      <h3 className="text-sm mb-3 text-gray-300">{title}</h3>
      <div className="space-y-2 text-xs">
        <div className="grid grid-cols-3 items-center gap-2">
          <span className="text-yellow-400">Device Model</span>
          <span className="text-white font-bold text-right font-mono">{deviceStatus.model}</span>
          <span className="text-gray-400"></span>
        </div>
        <div className="grid grid-cols-3 items-center gap-2">
          <span className="text-yellow-400">Firmware Version</span>
          <span className="text-white font-bold text-right font-mono">{deviceStatus.version}</span>
          <span className="text-gray-400"></span>
        </div>
        <div className="grid grid-cols-3 items-center gap-2">
          <span className="text-yellow-400">System Status</span>
          <span className={`font-bold text-right font-mono ${getStatusColor(deviceStatus.status)}`}>
            {deviceStatus.status}
          </span>
          <span className="text-gray-400"></span>
        </div>
      </div>
    </div>
  );
}