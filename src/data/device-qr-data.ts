import { inspectionManagementTasks } from "@/data/inspection-task-data";
import { devices } from "@/data/mock-data";

export const deviceQrMappings = devices.map((device) => ({
  qrCode: `SAFELOOP:${device.code}`,
  deviceCode: device.code,
  deviceId: device.id,
}));

const taskDeviceIds = new Set(inspectionManagementTasks.map((task) => task.deviceId));

export const scannableDeviceQrMappings = deviceQrMappings.filter((mapping) => taskDeviceIds.has(mapping.deviceId));

export function getDeviceByQrCode(qrCode: string) {
  const mapping = deviceQrMappings.find((item) => item.qrCode === qrCode);
  return mapping ? devices.find((device) => device.id === mapping.deviceId) : undefined;
}
