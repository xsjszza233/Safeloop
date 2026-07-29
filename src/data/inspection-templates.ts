import type { InspectionTemplate } from "@/types";

export const inspectionTemplates: InspectionTemplate[] = [
  {
    id: "TPL-FH-001",
    code: "TPL-FH-001",
    name: "通风橱日常点检模板",
    category: "通风橱",
    riskLevels: ["中", "高"],
    cycle: "每月 1 次",
    status: "启用",
    version: 1,
    createdBy: "陈小安",
    updatedAt: "2026-07-18 10:00",
    items: [
      { id: "FH-ITEM-01", name: "柜体与操作窗", content: "检查柜体、操作窗和把手外观。", method: "目视并轻启闭操作窗", criterion: "无明显破损，操作窗启闭无明显卡阻。", notesRequired: false, photoRequired: true, order: 1 },
      { id: "FH-ITEM-02", name: "排风运行状态", content: "检查启动后排风及异常声响。", method: "启动设备并观察、听辨", criterion: "排风能够启动，未发现明显异常声响或振动。", notesRequired: false, photoRequired: false, order: 2 },
      { id: "FH-ITEM-03", name: "操作区域", content: "检查台面和内部是否存在影响安全操作的堆放或残留。", method: "目视", criterion: "操作区域整洁，无明显泄漏、积液或无关物品堆放。", notesRequired: false, photoRequired: true, order: 3 },
      { id: "FH-ITEM-04", name: "状态标识", content: "检查设备编号、状态及操作提示是否清晰。", method: "目视", criterion: "设备标识可识别，必要提示未脱落或严重污损。", notesRequired: false, photoRequired: false, order: 4 },
    ],
  },
  {
    id: "TPL-PB-001",
    code: "TPL-PB-001",
    name: "配电箱安全点检模板",
    category: "配电箱",
    riskLevels: ["中", "高"],
    cycle: "每月 1 次",
    status: "启用",
    version: 1,
    createdBy: "陈小安",
    updatedAt: "2026-07-16 14:30",
    items: [
      { id: "PB-ITEM-01", name: "箱门与锁闭", content: "检查箱门、锁具和外壳状态。", method: "目视并确认箱门闭合", criterion: "箱体无明显破损，箱门能够正常关闭。", notesRequired: false, photoRequired: true, order: 1 },
      { id: "PB-ITEM-02", name: "警示与回路标识", content: "检查警示标识和回路标识可读性。", method: "目视", criterion: "标识清晰、未明显缺失或脱落。", notesRequired: false, photoRequired: false, order: 2 },
      { id: "PB-ITEM-03", name: "周边环境", content: "检查箱体前方和周边是否被占用。", method: "目视", criterion: "未发现影响接近、操作或巡查的堆放。", notesRequired: false, photoRequired: true, order: 3 },
      { id: "PB-ITEM-04", name: "异常迹象", content: "检查外部可观察到的异味、异常声响或明显过热迹象。", method: "观察、听辨，不进行带电拆检", criterion: "未发现明显异味、异响或异常发热迹象。", notesRequired: true, photoRequired: true, order: 4 },
    ],
  },
  {
    id: "TPL-FE-001",
    code: "TPL-FE-001",
    name: "消防器材日常点检模板",
    category: "消防器材",
    riskLevels: ["低", "中", "高"],
    cycle: "每月 1 次",
    status: "启用",
    version: 1,
    createdBy: "陈小安",
    updatedAt: "2026-07-15 09:20",
    items: [
      { id: "FE-ITEM-01", name: "配置位置", content: "检查器材是否位于台账登记位置。", method: "现场核对设备编号和位置", criterion: "设备与登记位置一致，未被随意移动。", notesRequired: false, photoRequired: true, order: 1 },
      { id: "FE-ITEM-02", name: "外观状态", content: "检查筒体、箱体、软管等可见部位。", method: "目视", criterion: "未发现明显破损、严重锈蚀或部件缺失。", notesRequired: false, photoRequired: true, order: 2 },
      { id: "FE-ITEM-03", name: "状态指示", content: "检查可见压力或状态指示。", method: "目视读取，不拆卸器材", criterion: "可见状态指示处于设备标识的正常范围。", notesRequired: false, photoRequired: true, order: 3 },
      { id: "FE-ITEM-04", name: "取用通道", content: "检查器材前方和取用路径。", method: "目视", criterion: "未被物品遮挡，能够正常接近和取用。", notesRequired: false, photoRequired: false, order: 4 },
      { id: "FE-ITEM-05", name: "标识可读性", content: "检查设备编号和使用提示。", method: "目视", criterion: "编号与必要提示清晰可识别。", notesRequired: false, photoRequired: false, order: 5 },
    ],
  },
];

export function getInspectionTemplate(id: string) {
  return inspectionTemplates.find((template) => template.id === id);
}
