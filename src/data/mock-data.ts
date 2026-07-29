import type { Anomaly, Device, Hazard, InspectionTask } from "@/types";

export const dashboardStats = [
  { label: "待办点检任务", value: "10", hint: "其中 3 项即将到期", tone: "emerald" },
  { label: "已逾期点检任务", value: "2", hint: "需要优先处理", tone: "amber" },
  { label: "待确认异常", value: "3", hint: "等待 EHS 管理员确认", tone: "blue" },
  { label: "待复查隐患", value: "2", hint: "等待 EHS 复查记录", tone: "violet" },
];

const deviceSeeds = [
  ["数控加工中心", "CNC", "机械加工设备", "张伟", "A区 1号车间"], ["工业空压机", "AIR", "动力设备", "李娜", "B区 动力站"], ["激光切割机", "LAS", "特种设备", "王磊", "C区 3号车间"], ["实验室通风柜", "LAB", "实验室设备", "陈晨", "研发楼 2层"], ["叉车", "FLT", "物流设备", "赵敏", "仓储区"],
  ["注塑成型机", "INJ", "机械加工设备", "张伟", "A区 2号车间"], ["行车", "CRN", "起重设备", "李娜", "B区 1号车间"], ["焊接机器人", "WEL", "自动化设备", "王磊", "C区 2号车间"], ["高低温试验箱", "TST", "实验室设备", "陈晨", "研发楼 1层"], ["配电柜", "PWR", "电气设备", "赵敏", "动力配电室"],
  ["钻床", "DRL", "机械加工设备", "张伟", "A区 3号车间"], ["砂轮机", "GRD", "机械加工设备", "李娜", "B区 2号车间"], ["抛丸机", "SHT", "表面处理设备", "王磊", "C区 1号车间"], ["喷淋试验箱", "SPR", "实验室设备", "陈晨", "研发楼 1层"], ["电动搬运车", "PTK", "物流设备", "赵敏", "仓储区"],
  ["冲床", "PRS", "机械加工设备", "张伟", "A区 3号车间"], ["真空泵", "VAC", "动力设备", "李娜", "B区 动力站"], ["热处理炉", "HTR", "特种设备", "王磊", "C区 热处理区"], ["气相色谱仪", "GAS", "实验室设备", "陈晨", "研发楼 3层"], ["堆高车", "STK", "物流设备", "赵敏", "仓储区"],
  ["铣床", "MIL", "机械加工设备", "张伟", "A区 2号车间"], ["冷却塔", "CLT", "动力设备", "李娜", "B区 屋顶"], ["数显压力机", "DPR", "特种设备", "王磊", "C区 1号车间"], ["超净工作台", "CLB", "实验室设备", "陈晨", "研发楼 2层"], ["牵引车", "TOW", "物流设备", "赵敏", "仓储区"],
  ["车床", "LAT", "机械加工设备", "张伟", "A区 1号车间"], ["干燥机", "DRY", "动力设备", "李娜", "B区 动力站"], ["压力容器", "VES", "特种设备", "王磊", "C区 热处理区"], ["生物安全柜", "BIO", "实验室设备", "陈晨", "研发楼 3层"], ["AGV 搬运车", "AGV", "物流设备", "赵敏", "仓储区"],
] as const;

export const devices: Device[] = deviceSeeds.map(([name, code, category, owner, location], index) => ({ id: `EQ-${String(index + 1).padStart(3, "0")}`, name, code: `${code}-${String(index + 1).padStart(2, "0")}`, category, owner, location, status: index === 2 || index === 16 ? "维修中" : "正常" }));

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
