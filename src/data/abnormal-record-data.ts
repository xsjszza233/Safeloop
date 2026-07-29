import { inspectionManagementTasks } from "@/data/inspection-task-data";
import { devices } from "@/data/mock-data";
import type { AbnormalRecord, AbnormalRecordStatus, AbnormalSourceType } from "@/types";

type AbnormalSeed = {
  id: string;
  abnormalNumber: string;
  sourceType: AbnormalSourceType;
  deviceId: string;
  taskId?: string;
  inspectionRecordNumber?: string;
  inspectionItemName?: string;
  finder: string;
  foundAt: string;
  submittedAt: string;
  description: string;
  attachments: string[];
  suggestedLevel: "低" | "中" | "高";
  status: AbnormalRecordStatus;
  reviewOpinion?: string;
  reviewer?: string;
  reviewedAt?: string;
  hazardNumber?: string;
};

const abnormalSeeds: AbnormalSeed[] = [
  { id: "AB-2026-001", abnormalNumber: "AB-2026-001", sourceType: "点检异常", deviceId: "EQ-007", taskId: "IT-2026-081", inspectionRecordNumber: "IR-IT-2026-081", inspectionItemName: "柜体与操作窗", finder: "陈璐", foundAt: "2026-07-25 10:15", submittedAt: "2026-07-25 10:22", description: "操作窗右侧把手松动，启闭时存在轻微卡顿。", attachments: ["通风橱操作窗_现场照片.jpg（模拟）"], suggestedLevel: "中", status: "待确认" },
  { id: "AB-2026-002", abnormalNumber: "AB-2026-002", sourceType: "主动上报", deviceId: "EQ-005", finder: "顾然", foundAt: "2026-07-24 14:30", submittedAt: "2026-07-24 14:42", description: "柜门密封条局部老化，发现轻微变形。", attachments: ["酸碱柜密封条_现场照片.jpg（模拟）"], suggestedLevel: "中", status: "一般异常", reviewOpinion: "已通知设备责任人纳入日常维护观察，当前不进入正式隐患闭环。", reviewer: "陈小安", reviewedAt: "2026-07-25 09:10" },
  { id: "AB-2026-003", abnormalNumber: "AB-2026-003", sourceType: "点检异常", deviceId: "EQ-013", taskId: "IT-2026-085", inspectionRecordNumber: "IR-IT-2026-085", inspectionItemName: "周边环境", finder: "高远", foundAt: "2026-07-31 11:05", submittedAt: "2026-07-31 11:12", description: "配电箱前方堆放周转箱，影响日常巡查和接近操作。", attachments: ["配电箱周边堆放_现场照片.jpg（模拟）"], suggestedLevel: "高", status: "已确认隐患", reviewOpinion: "确认需清理通道并纳入整改跟踪。", reviewer: "陈小安", reviewedAt: "2026-07-31 15:20", hazardNumber: "HZ-2026-001" },
  { id: "AB-2026-004", abnormalNumber: "AB-2026-004", sourceType: "主动上报", deviceId: "EQ-019", finder: "许宁", foundAt: "2026-07-26 08:50", submittedAt: "2026-07-26 09:00", description: "灭火器箱门开启角度受旁侧临时物品影响。", attachments: [], suggestedLevel: "低", status: "一般异常", reviewOpinion: "现场已完成物品移位，保留记录用于后续巡查。", reviewer: "陈小安", reviewedAt: "2026-07-26 13:30" },
  { id: "AB-2026-005", abnormalNumber: "AB-2026-005", sourceType: "点检异常", deviceId: "EQ-010", taskId: "IT-2026-084", inspectionRecordNumber: "IR-IT-2026-084", inspectionItemName: "排风运行状态", finder: "陈璐", foundAt: "2026-07-24 16:10", submittedAt: "2026-07-24 16:18", description: "启动后排风声音较平时明显增大，建议检查风机运行情况。", attachments: ["通风橱排风状态_现场照片.jpg（模拟）"], suggestedLevel: "高", status: "已确认隐患", reviewOpinion: "确认需开展维修处理，维修完成后安排专项点检。", reviewer: "陈小安", reviewedAt: "2026-07-25 10:00", hazardNumber: "HZ-2026-002" },
  { id: "AB-2026-006", abnormalNumber: "AB-2026-006", sourceType: "点检异常", deviceId: "EQ-021", taskId: "IT-2026-089", inspectionRecordNumber: "IR-IT-2026-089", inspectionItemName: "状态指示", finder: "许宁", foundAt: "2026-07-20 09:35", submittedAt: "2026-07-20 09:45", description: "消防栓箱内可见状态标识不清晰，需进一步核对。", attachments: ["消防栓箱状态标识_现场照片.jpg（模拟）"], suggestedLevel: "中", status: "待确认" },
  { id: "AB-2026-007", abnormalNumber: "AB-2026-007", sourceType: "主动上报", deviceId: "EQ-025", finder: "许宁", foundAt: "2026-07-23 17:20", submittedAt: "2026-07-23 17:30", description: "电梯厅警示提示牌有轻微污损，文字仍可识别。", attachments: [], suggestedLevel: "低", status: "一般异常", reviewOpinion: "不影响当前使用，已记录并安排清洁维护。", reviewer: "陈小安", reviewedAt: "2026-07-24 09:15" },
  { id: "AB-2026-008", abnormalNumber: "AB-2026-008", sourceType: "点检异常", deviceId: "EQ-015", taskId: "IT-2026-086", inspectionRecordNumber: "IR-IT-2026-086", inspectionItemName: "警示与回路标识", finder: "许宁", foundAt: "2026-07-21 10:40", submittedAt: "2026-07-21 10:48", description: "箱门外部警示标识边缘翘起，部分文字存在磨损。", attachments: ["配电箱警示标识_现场照片.jpg（模拟）"], suggestedLevel: "低", status: "已驳回", reviewOpinion: "与已登记的维护工单重复，本记录不单独进入后续流程。", reviewer: "陈小安", reviewedAt: "2026-07-21 14:20" },
  { id: "AB-2026-009", abnormalNumber: "AB-2026-009", sourceType: "主动上报", deviceId: "EQ-003", finder: "周宁", foundAt: "2026-07-22 13:10", submittedAt: "2026-07-22 13:25", description: "维修中设备柜门张贴的维修状态标识有褪色，现场状态仍可辨识。", attachments: [], suggestedLevel: "低", status: "已驳回", reviewOpinion: "该设备处于维修中，相关标识已纳入维修现场统一管理，本记录信息不足。", reviewer: "陈小安", reviewedAt: "2026-07-23 10:00" },
  { id: "AB-2026-010", abnormalNumber: "AB-2026-010", sourceType: "点检异常", deviceId: "EQ-024", taskId: "IT-2026-090", inspectionRecordNumber: "IR-IT-2026-090", inspectionItemName: "外观状态", finder: "周宁", foundAt: "2026-08-11 15:00", submittedAt: "2026-08-11 15:12", description: "灭火器筒体外观存在明显划痕，需确认是否影响后续使用状态。", attachments: ["灭火器筒体外观_现场照片.jpg（模拟）"], suggestedLevel: "中", status: "待确认" },
  { id: "AB-2026-011", abnormalNumber: "AB-2026-011", sourceType: "主动上报", deviceId: "EQ-026", finder: "顾然", foundAt: "2026-07-18 14:20", submittedAt: "2026-07-18 14:35", description: "货梯门槛区域有明显磨损，现场通行时存在绊碰风险。", attachments: ["货梯门槛_现场照片.jpg（模拟）"], suggestedLevel: "高", status: "已确认隐患", reviewOpinion: "确认需安排整改并在完成后复查。", reviewer: "陈小安", reviewedAt: "2026-07-19 09:10", hazardNumber: "HZ-2026-003" },
  { id: "AB-2026-012", abnormalNumber: "AB-2026-012", sourceType: "点检异常", deviceId: "EQ-008", taskId: "IT-2026-082", inspectionRecordNumber: "IR-IT-2026-082", inspectionItemName: "操作区域", finder: "林晓", foundAt: "2026-07-29 10:15", submittedAt: "2026-07-29 10:25", description: "通风橱台面发现未及时清理的试剂残留。", attachments: ["通风橱台面_现场照片.jpg（模拟）"], suggestedLevel: "中", status: "已确认隐患", reviewOpinion: "确认需清理并复核现场操作区域管理。", reviewer: "陈小安", reviewedAt: "2026-07-29 14:00", hazardNumber: "HZ-2026-004" },
  { id: "AB-2026-013", abnormalNumber: "AB-2026-013", sourceType: "主动上报", deviceId: "EQ-022", finder: "顾然", foundAt: "2026-07-17 09:40", submittedAt: "2026-07-17 10:00", description: "消防栓箱门锁损坏，箱门无法正常闭合。", attachments: ["消防栓箱门锁_现场照片.jpg（模拟）"], suggestedLevel: "高", status: "已确认隐患", reviewOpinion: "确认需修复门锁并保障器材可正常取用。", reviewer: "陈小安", reviewedAt: "2026-07-17 15:20", hazardNumber: "HZ-2026-005" },
  { id: "AB-2026-014", abnormalNumber: "AB-2026-014", sourceType: "点检异常", deviceId: "EQ-019", taskId: "IT-2026-088", inspectionRecordNumber: "IR-IT-2026-088", inspectionItemName: "取用通道", finder: "许宁", foundAt: "2026-08-02 11:00", submittedAt: "2026-08-02 11:08", description: "灭火器前方通道被临时物料占用，影响快速取用。", attachments: ["灭火器取用通道_现场照片.jpg（模拟）"], suggestedLevel: "中", status: "已确认隐患", reviewOpinion: "确认需清理通道并落实现场物料管理。", reviewer: "陈小安", reviewedAt: "2026-08-02 13:40", hazardNumber: "HZ-2026-006" },
  { id: "AB-2026-015", abnormalNumber: "AB-2026-015", sourceType: "主动上报", deviceId: "EQ-027", finder: "林晓", foundAt: "2026-07-21 16:30", submittedAt: "2026-07-21 16:45", description: "电梯厅地面防滑提示标识脱落，雨天易造成识别不足。", attachments: ["电梯厅提示标识_现场照片.jpg（模拟）"], suggestedLevel: "中", status: "已确认隐患", reviewOpinion: "确认需恢复提示标识并检查固定状态。", reviewer: "陈小安", reviewedAt: "2026-07-22 09:30", hazardNumber: "HZ-2026-007" },
  { id: "AB-2026-016", abnormalNumber: "AB-2026-016", sourceType: "点检异常", deviceId: "EQ-015", taskId: "IT-2026-086", inspectionRecordNumber: "IR-IT-2026-086", inspectionItemName: "异常迹象", finder: "许宁", foundAt: "2026-07-21 10:50", submittedAt: "2026-07-21 11:00", description: "配电箱外部可闻到轻微异味，需要进一步检查。", attachments: ["配电箱外部状态_现场照片.jpg（模拟）"], suggestedLevel: "高", status: "已确认隐患", reviewOpinion: "确认需安排专业人员检查并保留处理记录。", reviewer: "陈小安", reviewedAt: "2026-07-21 14:35", hazardNumber: "HZ-2026-008" },
  { id: "AB-2026-017", abnormalNumber: "AB-2026-017", sourceType: "主动上报", deviceId: "EQ-005", finder: "顾然", foundAt: "2026-07-20 15:30", submittedAt: "2026-07-20 15:40", description: "酸碱柜底部接液盘存在裂纹，可能影响泄漏收集。", attachments: ["酸碱柜接液盘_现场照片.jpg（模拟）"], suggestedLevel: "高", status: "已确认隐患", reviewOpinion: "确认需更换接液盘并复核柜体防护状态。", reviewer: "陈小安", reviewedAt: "2026-07-20 17:00", hazardNumber: "HZ-2026-009" },
  { id: "AB-2026-018", abnormalNumber: "AB-2026-018", sourceType: "点检异常", deviceId: "EQ-024", taskId: "IT-2026-090", inspectionRecordNumber: "IR-IT-2026-090", inspectionItemName: "状态指示", finder: "周宁", foundAt: "2026-08-11 15:05", submittedAt: "2026-08-11 15:16", description: "灭火器压力指示不在设备标识的正常范围内。", attachments: ["灭火器压力指示_现场照片.jpg（模拟）"], suggestedLevel: "中", status: "已确认隐患", reviewOpinion: "确认需更换或处理该器材，并完成后复查。", reviewer: "陈小安", reviewedAt: "2026-08-11 16:00", hazardNumber: "HZ-2026-010" },
];

function getAreaAndSpecificLocation(location: string) {
  const parts = location.trim().split(/\s+/);
  const areaPartCount = parts[0]?.includes("楼") && parts.length > 2 ? 2 : 1;
  return { area: parts.slice(0, areaPartCount).join(" "), specificLocation: parts.slice(areaPartCount).join(" ") || "未补充" };
}

export const abnormalRecords: AbnormalRecord[] = abnormalSeeds.map((seed) => {
  const device = devices.find((item) => item.id === seed.deviceId);
  if (!device) throw new Error(`未找到异常关联设备：${seed.deviceId}`);
  const task = seed.taskId ? inspectionManagementTasks.find((item) => item.id === seed.taskId) : undefined;
  if (seed.taskId && !task) throw new Error(`未找到异常关联点检任务：${seed.taskId}`);
  const { area, specificLocation } = getAreaAndSpecificLocation(device.location);
  return { ...seed, deviceCode: device.code, deviceName: device.name, deviceCategory: device.category, area, specificLocation, taskNumber: task?.taskNumber };
});

export function getAbnormalRecord(id: string) {
  return abnormalRecords.find((record) => record.id === id);
}
