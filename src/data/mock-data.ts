import type { Anomaly, Device, Hazard, InspectionTask } from "@/types";
import { getDeviceResponsibility } from "@/data/device-responsibility";

export const dashboardStats = [
  { label: "待办点检任务", value: "10", hint: "其中 3 项即将到期", tone: "emerald" },
  { label: "已逾期点检任务", value: "2", hint: "需要优先处理", tone: "amber" },
  { label: "待确认异常", value: "3", hint: "等待 EHS 管理员确认", tone: "blue" },
  { label: "待复查隐患", value: "2", hint: "等待 EHS 复查记录", tone: "violet" },
];

type DeviceInput = Omit<Device, "id" | "code" | "nextInspectionDate" | "inspectionTag">;

const inspectionTiming = [
  { nextInspectionDate: "2026-08-18", inspectionTag: "正常" },
  { nextInspectionDate: "2026-08-02", inspectionTag: "即将到期" },
  { nextInspectionDate: "2026-07-26", inspectionTag: "已逾期" },
] as const;

function createDevice(sequence: number, prefix: string, input: DeviceInput, timingIndex = sequence) : Device {
  const timing = input.status === "报废"
    ? { nextInspectionDate: "—", inspectionTag: "正常" as const }
    : inspectionTiming[timingIndex % inspectionTiming.length];
  return {
    id: `EQ-${String(sequence).padStart(3, "0")}`,
    code: `${prefix}-${String(sequence).padStart(3, "0")}`,
    ...input,
    ...getDeviceResponsibility({ id: `EQ-${String(sequence).padStart(3, "0")}`, category: input.category, location: input.location }),
    ...timing,
  };
}

const labLocations = [
  "研发楼 1层 一层研发实验区",
  "研发楼 1层 样品处理区",
  "研发楼 1层 实验辅助区",
  "研发楼 2层 二层研发实验区",
  "研发楼 2层 分析测试区",
  "研发楼 2层 实验辅助区",
  "研发楼 3层 三层研发实验区",
  "研发楼 3层 工艺验证区",
  "研发楼 3层 化学实验区",
];

const acidCabinets = [
  [1, "酸碱柜 A-01", "研发中心", "研发楼 1层 样品处理区", "林晓", "在用", "高"],
  [2, "酸碱柜 A-02", "实验室管理", "研发楼 1层 一层研发实验区", "陈璐", "在用", "高"],
  [3, "酸碱柜 A-03", "实验室管理", "研发楼 2层 分析测试区", "周宁", "维修中", "高"],
  [4, "酸碱柜 A-04", "研发中心", "研发楼 3层 化学实验区", "林晓", "停用", "高"],
  [5, "酸碱柜 A-05", "实验室管理", "研发楼 3层 工艺验证区", "顾然", "在用", "高"],
] as const;

const fumeHoodSequences = [6, 7, 8, 9, 10, 11, 12, 14, 17, 18, 20, 23, 28, 29, 30, 31, 32, 33, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85];
const fumeHoodCodeBySequence: Record<number, number> = { 7: 1, 8: 2, 9: 3, 10: 4 };
const fumeHoods = fumeHoodSequences.map((sequence, index) => createDevice(sequence, "FH", {
  name: `通风橱 F-${String(fumeHoodCodeBySequence[sequence] ?? index + 5).padStart(2, "0")}`,
  category: "通风橱",
  department: index % 3 === 0 ? "实验室管理" : "研发中心",
  location: labLocations[index % labLocations.length],
  owner: ["陈璐", "林晓", "周宁"][index % 3],
  status: index === 3 ? "维修中" : index === 10 ? "停用" : "在用",
  riskLevel: "高",
}));

const auxiliaryEquipmentNames = ["水浴锅", "实验搅拌机", "黏度测试仪", "恒温加热板", "实验离心机"];
const auxiliaryEquipment = Array.from({ length: 30 }, (_, index) => createDevice(34 + index, "LAB", {
  name: `${auxiliaryEquipmentNames[index % auxiliaryEquipmentNames.length]} LAB-${String(index + 1).padStart(2, "0")}`,
  category: "实验辅助设备",
  department: index % 4 === 0 ? "实验室管理" : "研发中心",
  location: labLocations[index % labLocations.length],
  owner: ["林晓", "陈璐", "周宁", "顾然"][index % 4],
  status: index === 8 ? "维修中" : index === 17 ? "停用" : index === 26 ? "报废" : "在用",
  riskLevel: index % 4 === 0 ? "高" : "中",
}));

const powerSequences = [13, 15, 16, 64, 65, 66, 67, 68, 69, 70, 71, 72];
const powerCodeBySequence: Record<number, number> = { 13: 1, 15: 3, 16: 4 };
const powerLocations = [
  "研发楼配电间 总配电区",
  "研发楼 1层 一层研发实验区",
  "研发楼 1层 实验辅助区",
  "研发楼 2层 二层研发实验区",
  "研发楼 2层 分析测试区",
  "研发楼 2层 实验辅助区",
  "研发楼 3层 三层研发实验区",
  "研发楼 3层 化学实验区",
  "设备间 通风系统控制区",
  "设备间 给排水控制区",
  "消防设施区域 消防控制柜旁",
  "研发楼配电间 应急电源区",
];
const powerFacilities = powerSequences.map((sequence, index) => createDevice(sequence, "PB", {
  name: index === 8 || index === 9 ? `设备间控制柜 P-${String(index + 1).padStart(2, "0")}` : `配电箱 P-${String(powerCodeBySequence[sequence] ?? index + 5).padStart(2, "0")}`,
  category: "配电箱",
  department: "Facility设施管理",
  location: powerLocations[index],
  owner: "高远",
  status: index === 2 ? "维修中" : index === 10 ? "停用" : "在用",
  riskLevel: "中",
}));

const fireSequences = [19, 21, 22, 24, 73, 74, 75, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102];
const fireLocations = [
  "消防设施区域 一层研发实验区东侧",
  "消防设施区域 一层样品处理区入口",
  "消防设施区域 一层实验辅助区通道",
  "消防设施区域 一层公共区域电梯厅",
  "消防设施区域 二层研发实验区东侧",
  "消防设施区域 二层分析测试区入口",
  "消防设施区域 二层实验辅助区通道",
  "消防设施区域 三层研发实验区东侧",
  "消防设施区域 三层工艺验证区入口",
  "消防设施区域 三层化学实验区入口",
  "消防设施区域 研发楼配电间外",
  "消防设施区域 设备间入口",
  "消防设施区域 一层公共区域西侧",
  "消防设施区域 二层公共区域东侧",
  "消防设施区域 三层公共区域西侧",
  "消防设施区域 一层研发实验区西侧",
  "消防设施区域 二层研发实验区西侧",
  "消防设施区域 三层研发实验区西侧",
  "消防设施区域 化学实验区缓冲区",
  "消防设施区域 工艺验证区通道",
];
const fireFacilities = fireSequences.map((sequence, index) => createDevice(sequence, "FE", {
  name: `消防器材配置点 FE-${String(index + 1).padStart(2, "0")}`,
  category: "消防器材",
  department: "Facility设施管理",
  location: fireLocations[index],
  owner: "许宁",
  status: index === 2 ? "维修中" : index === 14 ? "停用" : "在用",
  riskLevel: index === 9 || index === 18 ? "高" : index >= 12 && index <= 17 ? "低" : "中",
}));

const elevators = [
  createDevice(25, "EL", { name: "客梯 E-01", category: "电梯", department: "Facility设施管理", location: "研发楼 公共区域 东侧电梯厅", owner: "许宁", status: "在用", riskLevel: "中" }),
  createDevice(26, "EL", { name: "货梯 E-02", category: "电梯", department: "Facility设施管理", location: "研发楼 公共区域 货梯间", owner: "顾然", status: "在用", riskLevel: "中" }),
  createDevice(27, "EL", { name: "客梯 E-03", category: "电梯", department: "Facility设施管理", location: "研发楼 公共区域 西侧电梯厅", owner: "许宁", status: "维修中", riskLevel: "中" }),
];

export const devices: Device[] = [
  ...acidCabinets.map(([sequence, name, department, location, owner, status, riskLevel]) => createDevice(sequence, "AC", { name, category: "酸碱柜", department, location, owner, status, riskLevel })),
  ...fumeHoods,
  ...auxiliaryEquipment,
  ...powerFacilities,
  ...fireFacilities,
  ...elevators,
];

export const inspectionTasks: InspectionTask[] = [
  { id: "IT-2026-071", device: "通风橱 F-01", inspector: "周悦", deadline: "2026-07-30", status: "待执行", timeTag: "即将到期" }, { id: "IT-2026-072", device: "酸碱柜 A-01", inspector: "周悦", deadline: "2026-07-28", status: "执行中", timeTag: "正常" },
  { id: "IT-2026-073", device: "配电箱 P-01", inspector: "高远", deadline: "2026-07-25", status: "待执行", timeTag: "已逾期" }, { id: "IT-2026-074", device: "通风橱 F-02", inspector: "方宁", deadline: "2026-08-02", status: "已提交", timeTag: "正常" },
  { id: "IT-2026-075", device: "消防器材配置点 FE-01", inspector: "许宁", deadline: "2026-08-05", status: "已完成", timeTag: "正常" }, { id: "IT-2026-076", device: "水浴锅 LAB-01", inspector: "方宁", deadline: "2026-07-31", status: "待执行", timeTag: "即将到期" },
  { id: "IT-2026-077", device: "货梯 E-02", inspector: "顾然", deadline: "2026-07-23", status: "待执行", timeTag: "已逾期" }, { id: "IT-2026-078", device: "实验搅拌机 LAB-02", inspector: "周悦", deadline: "2026-08-08", status: "待执行", timeTag: "正常" },
  { id: "IT-2026-079", device: "黏度测试仪 LAB-03", inspector: "方宁", deadline: "2026-08-01", status: "执行中", timeTag: "即将到期" }, { id: "IT-2026-080", device: "设备间控制柜 P-09", inspector: "高远", deadline: "2026-08-10", status: "待执行", timeTag: "正常" },
];

export const anomalies: Anomaly[] = [
  { id: "AN-2026-011", title: "通风橱操作窗定位提示不清晰", device: "通风橱 F-01", reporter: "陈璐", reportedAt: "2026-07-27", status: "已确认隐患" }, { id: "AN-2026-012", title: "酸碱柜接液盘有裂纹", device: "酸碱柜 A-01", reporter: "林晓", reportedAt: "2026-07-27", status: "已确认隐患" },
  { id: "AN-2026-013", title: "配电箱前方巡检通道堆放物品", device: "配电箱 P-01", reporter: "高远", reportedAt: "2026-07-25", status: "已确认隐患" }, { id: "AN-2026-014", title: "通风橱面风速记录缺失", device: "通风橱 F-02", reporter: "陈璐", reportedAt: "2026-07-26", status: "待确认" },
  { id: "AN-2026-015", title: "消防器材配置点前通道受临时物品影响", device: "消防器材配置点 FE-01", reporter: "许宁", reportedAt: "2026-07-19", status: "已确认隐患" }, { id: "AN-2026-016", title: "水浴锅电源线外皮磨损", device: "水浴锅 LAB-01", reporter: "周宁", reportedAt: "2026-07-27", status: "待确认" },
  { id: "AN-2026-017", title: "货梯门槛区域磨损", device: "货梯 E-02", reporter: "顾然", reportedAt: "2026-07-24", status: "待确认" }, { id: "AN-2026-018", title: "实验搅拌机操作标识褪色", device: "实验搅拌机 LAB-02", reporter: "林晓", reportedAt: "2026-07-22", status: "一般异常" },
];

export const hazards: Hazard[] = [
  { id: "HZ-2026-021", title: "通风橱操作窗定位提示不清晰", device: "通风橱 F-01", level: "中", owner: "陈璐", deadline: "2026-07-31", status: "待整改" }, { id: "HZ-2026-022", title: "酸碱柜接液盘有裂纹", device: "酸碱柜 A-01", level: "高", owner: "林晓", deadline: "2026-07-29", status: "整改中" },
  { id: "HZ-2026-023", title: "配电箱前方巡检通道堆放物品", device: "配电箱 P-01", level: "高", owner: "高远", deadline: "2026-07-26", status: "待复查" }, { id: "HZ-2026-024", title: "消防器材配置点前通道受临时物品影响", device: "消防器材配置点 FE-01", level: "中", owner: "许宁", deadline: "2026-07-20", status: "已关闭" },
  { id: "HZ-2026-025", title: "货梯门槛区域磨损", device: "货梯 E-02", level: "中", owner: "顾然", deadline: "2026-08-03", status: "待分派" }, { id: "HZ-2026-026", title: "通风橱排风运行异响", device: "通风橱 F-04", level: "高", owner: "陈璐", deadline: "2026-07-24", status: "已驳回整改" },
  { id: "HZ-2026-027", title: "配电箱接地标识脱落", device: "配电箱 P-03", level: "低", owner: "高远", deadline: "2026-08-08", status: "待整改" }, { id: "HZ-2026-028", title: "实验搅拌机防护罩固定件松动", device: "实验搅拌机 LAB-02", level: "中", owner: "周宁", deadline: "2026-08-01", status: "整改中" },
];
