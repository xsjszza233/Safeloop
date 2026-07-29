import type { Device } from "@/types";

type InspectionResult = "正常" | "发现异常";

export interface DeviceInspectionRecord {
  id: string;
  inspector: string;
  inspectedAt: string;
  result: InspectionResult;
  timeTag: "正常" | "即将到期" | "已逾期";
}

export interface DeviceAnomalyRecord {
  id: string;
  title: string;
  reportedAt: string;
  reporter: string;
  status: "待确认" | "一般异常" | "已确认隐患";
}

export interface DeviceHazardRecord {
  id: string;
  title: string;
  level: "低" | "中" | "高";
  status: "待整改" | "整改中" | "待复查" | "已关闭";
}

const categorySettings: Record<Device["category"], { defaultCycle: string; template: string; description: string }> = {
  酸碱柜: { defaultCycle: "每月 1 次", template: "酸碱柜日常点检模板", description: "用于实验室试剂分类存放与柜体状态的日常管理。" },
  通风橱: { defaultCycle: "每月 1 次", template: "通风橱日常点检模板", description: "用于化学实验操作区域的通风与柜体状态检查。" },
  配电箱: { defaultCycle: "每月 1 次", template: "配电箱安全点检模板", description: "用于配电箱外观、标识及现场状态的日常检查。" },
  消防器材: { defaultCycle: "每月 1 次", template: "消防器材日常点检模板", description: "用于消防器材外观、配置位置与有效状态的日常管理。" },
  电梯: { defaultCycle: "每月 1 次", template: "电梯现场巡查模板", description: "用于电梯运行状态、警示标识及现场异常的日常巡查。" },
};

const anomalyRecords: Record<string, DeviceAnomalyRecord[]> = {
  "EQ-001": [
    { id: "AN-EQ001-01", title: "柜内试剂分类标签褪色", reportedAt: "2026-07-21", reporter: "林晓", status: "一般异常" },
    { id: "AN-EQ001-02", title: "柜门闭合阻尼偏弱", reportedAt: "2026-06-18", reporter: "陈璐", status: "待确认" },
  ],
  "EQ-007": [
    { id: "AN-EQ007-01", title: "面风速记录缺少当日签名", reportedAt: "2026-07-18", reporter: "陈璐", status: "一般异常" },
    { id: "AN-EQ007-02", title: "操作窗定位提示不清晰", reportedAt: "2026-07-09", reporter: "林晓", status: "已确认隐患" },
    { id: "AN-EQ007-03", title: "排风运行声音异常", reportedAt: "2026-06-26", reporter: "陈璐", status: "待确认" },
  ],
  "EQ-013": [
    { id: "AN-EQ013-01", title: "箱门警示标识边缘翘起", reportedAt: "2026-07-20", reporter: "高远", status: "一般异常" },
    { id: "AN-EQ013-02", title: "箱体周边堆放物需清理", reportedAt: "2026-07-12", reporter: "顾然", status: "已确认隐患" },
  ],
};

const hazardRecords: Record<string, DeviceHazardRecord[]> = {
  "EQ-007": [
    { id: "HZ-EQ007-01", title: "操作窗定位提示不清晰", level: "中", status: "整改中" },
  ],
  "EQ-013": [
    { id: "HZ-EQ013-01", title: "箱体周边堆放物需清理", level: "中", status: "待复查" },
    { id: "HZ-EQ013-02", title: "接地标识脱落", level: "低", status: "待整改" },
  ],
};

export function getDeviceDetailData(device: Device) {
  const setting = categorySettings[device.category];
  const locationParts = device.location.trim().split(/\s+/);
  const areaPartCount = locationParts[0]?.includes("楼") && locationParts.length > 2 ? 2 : 1;
  const area = locationParts.slice(0, areaPartCount).join(" ");
  const specificLocation = locationParts.slice(areaPartCount).join(" ") || "未补充";
  const sequence = Number(device.id.replace("EQ-", ""));
  const inspectors = ["林晓", "周宁", "陈璐", "顾然", "高远"];
  const dates = ["2026-07-18", "2026-06-20", "2026-05-22", "2026-04-23", "2026-03-24"];

  return {
    area,
    specificLocation,
    commissionedAt: `202${(sequence % 4) + 1}-0${(sequence % 8) + 1}-15`,
    description: setting.description,
    defaultCycle: setting.defaultCycle,
    actualCycle: device.riskLevel === "高" ? "每两周 1 次" : setting.defaultCycle,
    template: setting.template,
    lastInspectionDate: dates[0],
    inspectionRecords: dates.map((inspectedAt, index) => ({
      id: `IR-${device.id}-${index + 1}`,
      inspector: inspectors[(sequence + index) % inspectors.length],
      inspectedAt,
      result: index === 2 && sequence % 3 === 1 ? "发现异常" : "正常",
      timeTag: index === 0 ? device.inspectionTag : "正常",
    })),
    anomalies: anomalyRecords[device.id] ?? [],
    hazards: hazardRecords[device.id] ?? [],
    operations: [
      { time: "2026-07-18 10:20", operator: "EHS管理员", summary: "完成最近一次点检记录归档" },
      { time: "2026-06-01 09:30", operator: "EHS管理员", summary: "复核设备点检设置" },
      { time: "2026-01-15 14:10", operator: device.owner, summary: "确认设备责任人信息" },
      { time: "2025-12-20 16:40", operator: "系统管理员", summary: "创建设备台账模拟记录" },
    ],
  };
}
