import type { Anomaly, Device, Hazard, InspectionTask } from "@/types";

export const dashboardStats = [
  { label: "待办点检任务", value: "10", hint: "其中 3 项即将到期", tone: "emerald" },
  { label: "已逾期点检任务", value: "2", hint: "需要优先处理", tone: "amber" },
  { label: "待确认异常", value: "3", hint: "等待 EHS 管理员确认", tone: "blue" },
  { label: "待复查隐患", value: "2", hint: "等待 EHS 复查记录", tone: "violet" },
];

export const devices: Device[] = [
  { id: "EQ-001", code: "AC-001", name: "酸碱柜 A-01", category: "酸碱柜", department: "研发部", location: "研发楼 3层 化学实验室", owner: "林晓", status: "在用", riskLevel: "高", nextInspectionDate: "2026-08-02", inspectionTag: "即将到期" },
  { id: "EQ-002", code: "AC-002", name: "酸碱柜 A-02", category: "酸碱柜", department: "研发部", location: "研发楼 2层 材料实验室", owner: "林晓", status: "在用", riskLevel: "中", nextInspectionDate: "2026-08-16", inspectionTag: "正常" },
  { id: "EQ-003", code: "AC-003", name: "酸碱柜 A-03", category: "酸碱柜", department: "质量部", location: "质量检测室 西侧", owner: "周宁", status: "维修中", riskLevel: "中", nextInspectionDate: "2026-07-24", inspectionTag: "已逾期" },
  { id: "EQ-004", code: "AC-004", name: "酸碱柜 A-04", category: "酸碱柜", department: "研发部", location: "研发楼 1层 样品间", owner: "陈璐", status: "停用", riskLevel: "低", nextInspectionDate: "2026-07-18", inspectionTag: "正常" },
  { id: "EQ-005", code: "AC-005", name: "酸碱柜 A-05", category: "酸碱柜", department: "制造部", location: "试制车间 配液区", owner: "顾然", status: "在用", riskLevel: "高", nextInspectionDate: "2026-07-27", inspectionTag: "已逾期" },
  { id: "EQ-006", code: "AC-006", name: "酸碱柜 A-06", category: "酸碱柜", department: "研发部", location: "研发楼 3层 试剂间", owner: "林晓", status: "报废", riskLevel: "低", nextInspectionDate: "—", inspectionTag: "正常" },
  { id: "EQ-007", code: "FH-001", name: "通风橱 F-01", category: "通风橱", department: "研发部", location: "研发楼 3层 有机实验室", owner: "陈璐", status: "在用", riskLevel: "高", nextInspectionDate: "2026-07-28", inspectionTag: "已逾期" },
  { id: "EQ-008", code: "FH-002", name: "通风橱 F-02", category: "通风橱", department: "研发部", location: "研发楼 3层 无机实验室", owner: "陈璐", status: "在用", riskLevel: "高", nextInspectionDate: "2026-08-01", inspectionTag: "即将到期" },
  { id: "EQ-009", code: "FH-003", name: "通风橱 F-03", category: "通风橱", department: "质量部", location: "质量检测室 前处理区", owner: "周宁", status: "在用", riskLevel: "中", nextInspectionDate: "2026-08-19", inspectionTag: "正常" },
  { id: "EQ-010", code: "FH-004", name: "通风橱 F-04", category: "通风橱", department: "研发部", location: "研发楼 2层 分析实验室", owner: "林晓", status: "维修中", riskLevel: "高", nextInspectionDate: "2026-07-26", inspectionTag: "已逾期" },
  { id: "EQ-011", code: "FH-005", name: "通风橱 F-05", category: "通风橱", department: "制造部", location: "试制车间 检验区", owner: "顾然", status: "停用", riskLevel: "中", nextInspectionDate: "2026-07-20", inspectionTag: "正常" },
  { id: "EQ-012", code: "FH-006", name: "通风橱 F-06", category: "通风橱", department: "研发部", location: "研发楼 1层 备用实验室", owner: "陈璐", status: "在用", riskLevel: "低", nextInspectionDate: "2026-08-12", inspectionTag: "正常" },
  { id: "EQ-013", code: "PB-001", name: "配电箱 P-01", category: "配电箱", department: "制造部", location: "装配车间 东侧", owner: "高远", status: "在用", riskLevel: "高", nextInspectionDate: "2026-08-03", inspectionTag: "即将到期" },
  { id: "EQ-014", code: "PB-002", name: "配电箱 P-02", category: "配电箱", department: "制造部", location: "装配车间 西侧", owner: "高远", status: "在用", riskLevel: "中", nextInspectionDate: "2026-08-23", inspectionTag: "正常" },
  { id: "EQ-015", code: "PB-003", name: "配电箱 P-03", category: "配电箱", department: "行政部", location: "办公楼 1层 大厅", owner: "许宁", status: "在用", riskLevel: "中", nextInspectionDate: "2026-07-23", inspectionTag: "已逾期" },
  { id: "EQ-016", code: "PB-004", name: "配电箱 P-04", category: "配电箱", department: "研发部", location: "研发楼 2层 机房", owner: "高远", status: "维修中", riskLevel: "高", nextInspectionDate: "2026-07-25", inspectionTag: "已逾期" },
  { id: "EQ-017", code: "PB-005", name: "配电箱 P-05", category: "配电箱", department: "制造部", location: "试制车间 北侧", owner: "高远", status: "停用", riskLevel: "低", nextInspectionDate: "2026-07-15", inspectionTag: "正常" },
  { id: "EQ-018", code: "PB-006", name: "配电箱 P-06", category: "配电箱", department: "行政部", location: "仓储区 值班室", owner: "许宁", status: "报废", riskLevel: "低", nextInspectionDate: "—", inspectionTag: "正常" },
  { id: "EQ-019", code: "FE-001", name: "干粉灭火器 FE-01", category: "消防器材", department: "行政部", location: "办公楼 1层 东门", owner: "许宁", status: "在用", riskLevel: "中", nextInspectionDate: "2026-08-05", inspectionTag: "即将到期" },
  { id: "EQ-020", code: "FE-002", name: "干粉灭火器 FE-02", category: "消防器材", department: "制造部", location: "装配车间 A通道", owner: "高远", status: "在用", riskLevel: "中", nextInspectionDate: "2026-08-29", inspectionTag: "正常" },
  { id: "EQ-021", code: "FE-003", name: "消防栓箱 FE-03", category: "消防器材", department: "行政部", location: "办公楼 2层 西侧", owner: "许宁", status: "在用", riskLevel: "高", nextInspectionDate: "2026-07-22", inspectionTag: "已逾期" },
  { id: "EQ-022", code: "FE-004", name: "消防栓箱 FE-04", category: "消防器材", department: "制造部", location: "仓储区 南门", owner: "顾然", status: "维修中", riskLevel: "中", nextInspectionDate: "2026-07-21", inspectionTag: "已逾期" },
  { id: "EQ-023", code: "FE-005", name: "应急照明 FE-05", category: "消防器材", department: "行政部", location: "办公楼 地下车库", owner: "许宁", status: "停用", riskLevel: "低", nextInspectionDate: "2026-07-14", inspectionTag: "正常" },
  { id: "EQ-024", code: "FE-006", name: "干粉灭火器 FE-06", category: "消防器材", department: "质量部", location: "质量检测室 门口", owner: "周宁", status: "在用", riskLevel: "中", nextInspectionDate: "2026-08-14", inspectionTag: "正常" },
  { id: "EQ-025", code: "EL-001", name: "客梯 E-01", category: "电梯", department: "行政部", location: "办公楼 1号电梯厅", owner: "许宁", status: "在用", riskLevel: "高", nextInspectionDate: "2026-08-01", inspectionTag: "即将到期" },
  { id: "EQ-026", code: "EL-002", name: "货梯 E-02", category: "电梯", department: "制造部", location: "仓储区 货梯间", owner: "顾然", status: "在用", riskLevel: "高", nextInspectionDate: "2026-07-24", inspectionTag: "已逾期" },
  { id: "EQ-027", code: "EL-003", name: "客梯 E-03", category: "电梯", department: "研发部", location: "研发楼 电梯厅", owner: "林晓", status: "在用", riskLevel: "中", nextInspectionDate: "2026-08-20", inspectionTag: "正常" },
  { id: "EQ-028", code: "EL-004", name: "货梯 E-04", category: "电梯", department: "制造部", location: "试制车间 货梯间", owner: "顾然", status: "维修中", riskLevel: "高", nextInspectionDate: "2026-07-19", inspectionTag: "已逾期" },
  { id: "EQ-029", code: "EL-005", name: "客梯 E-05", category: "电梯", department: "行政部", location: "办公楼 东侧电梯厅", owner: "许宁", status: "停用", riskLevel: "中", nextInspectionDate: "2026-07-16", inspectionTag: "正常" },
  { id: "EQ-030", code: "EL-006", name: "客梯 E-06", category: "电梯", department: "行政部", location: "办公楼 西侧电梯厅", owner: "许宁", status: "报废", riskLevel: "低", nextInspectionDate: "—", inspectionTag: "正常" },
];

export const inspectionTasks: InspectionTask[] = [
  { id: "IT-2026-071", device: "数控加工中心", inspector: "刘洋", deadline: "2026-07-30", status: "待执行", timeTag: "即将到期" }, { id: "IT-2026-072", device: "工业空压机", inspector: "刘洋", deadline: "2026-07-28", status: "执行中", timeTag: "正常" },
  { id: "IT-2026-073", device: "激光切割机", inspector: "周婷", deadline: "2026-07-25", status: "待执行", timeTag: "已逾期" }, { id: "IT-2026-074", device: "实验室通风柜", inspector: "周婷", deadline: "2026-08-02", status: "已提交", timeTag: "正常" },
  { id: "IT-2026-075", device: "叉车", inspector: "刘洋", deadline: "2026-08-05", status: "已完成", timeTag: "正常" }, { id: "IT-2026-076", device: "注塑成型机", inspector: "周婷", deadline: "2026-07-31", status: "待执行", timeTag: "即将到期" },
  { id: "IT-2026-077", device: "行车", inspector: "刘洋", deadline: "2026-07-23", status: "待执行", timeTag: "已逾期" }, { id: "IT-2026-078", device: "焊接机器人", inspector: "周婷", deadline: "2026-08-08", status: "待执行", timeTag: "正常" },
  { id: "IT-2026-079", device: "高低温试验箱", inspector: "刘洋", deadline: "2026-08-01", status: "执行中", timeTag: "即将到期" }, { id: "IT-2026-080", device: "配电柜", inspector: "周婷", deadline: "2026-08-10", status: "待执行", timeTag: "正常" },
];

export const anomalies: Anomaly[] = [
  { id: "AN-2026-011", title: "设备急停按钮标识磨损", device: "数控加工中心", reporter: "刘洋", reportedAt: "2026-07-27", status: "已确认隐患" }, { id: "AN-2026-012", title: "空压机安全阀检测临期", device: "工业空压机", reporter: "刘洋", reportedAt: "2026-07-27", status: "已确认隐患" },
  { id: "AN-2026-013", title: "激光防护门联锁异常", device: "激光切割机", reporter: "周婷", reportedAt: "2026-07-25", status: "已确认隐患" }, { id: "AN-2026-014", title: "通风柜风速记录缺失", device: "实验室通风柜", reporter: "周婷", reportedAt: "2026-07-26", status: "待确认" },
  { id: "AN-2026-015", title: "叉车倒车报警器失效", device: "叉车", reporter: "刘洋", reportedAt: "2026-07-19", status: "已确认隐患" }, { id: "AN-2026-016", title: "注塑机防护罩固定件松动", device: "注塑成型机", reporter: "周婷", reportedAt: "2026-07-27", status: "待确认" },
  { id: "AN-2026-017", title: "行车吊钩限位开关异响", device: "行车", reporter: "刘洋", reportedAt: "2026-07-24", status: "待确认" }, { id: "AN-2026-018", title: "焊接工位标识褪色", device: "焊接机器人", reporter: "周婷", reportedAt: "2026-07-22", status: "一般异常" },
];

export const hazards: Hazard[] = [
  { id: "HZ-2026-021", title: "设备急停按钮标识磨损", device: "数控加工中心", level: "中", owner: "张伟", deadline: "2026-07-31", status: "待整改" }, { id: "HZ-2026-022", title: "空压机安全阀检测临期", device: "工业空压机", level: "高", owner: "李娜", deadline: "2026-07-29", status: "整改中" },
  { id: "HZ-2026-023", title: "激光防护门联锁异常", device: "激光切割机", level: "高", owner: "王磊", deadline: "2026-07-26", status: "待复查" }, { id: "HZ-2026-024", title: "叉车倒车报警器失效", device: "叉车", level: "中", owner: "赵敏", deadline: "2026-07-20", status: "已关闭" },
  { id: "HZ-2026-025", title: "冷却塔护栏缺少踢脚板", device: "冷却塔", level: "中", owner: "李娜", deadline: "2026-08-03", status: "待分派" }, { id: "HZ-2026-026", title: "压力容器铭牌信息不清晰", device: "压力容器", level: "高", owner: "王磊", deadline: "2026-07-24", status: "已驳回整改" },
  { id: "HZ-2026-027", title: "配电柜接地标识脱落", device: "配电柜", level: "低", owner: "赵敏", deadline: "2026-08-08", status: "待整改" }, { id: "HZ-2026-028", title: "真空泵联轴器防护缺失", device: "真空泵", level: "中", owner: "李娜", deadline: "2026-08-01", status: "整改中" },
];
