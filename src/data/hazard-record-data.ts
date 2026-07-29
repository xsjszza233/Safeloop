import { abnormalRecords } from "@/data/abnormal-record-data";
import type { HazardRecord, HazardRecordStatus } from "@/types";

type HazardSeed = {
  id: string;
  hazardNumber: string;
  sourceAbnormalId: string;
  description: string;
  level: "低" | "中" | "高";
  confirmedBy: string;
  confirmedAt: string;
  confirmationOpinion: string;
  rectificationOwner: string;
  rectificationDeadline: string;
  status: HazardRecordStatus;
  rectificationMeasure: string;
  reviewer?: string;
  reviewedAt?: string;
  reviewOpinion?: string;
};

const hazardSeeds: HazardSeed[] = [
  { id: "HZ-2026-001", hazardNumber: "HZ-2026-001", sourceAbnormalId: "AB-2026-003", description: "清理配电箱前方堆放物，保持巡查与操作通道畅通。", level: "高", confirmedBy: "陈小安", confirmedAt: "2026-07-31 15:20", confirmationOpinion: "确认需清理通道并纳入整改跟踪。", rectificationOwner: "高远", rectificationDeadline: "2026-08-05", status: "待整改", rectificationMeasure: "暂未提交整改措施。" },
  { id: "HZ-2026-002", hazardNumber: "HZ-2026-002", sourceAbnormalId: "AB-2026-005", description: "检查通风橱风机运行状态并消除异常声响。", level: "高", confirmedBy: "陈小安", confirmedAt: "2026-07-25 10:00", confirmationOpinion: "确认需开展维修处理，维修完成后安排专项点检。", rectificationOwner: "陈璐", rectificationDeadline: "2026-08-02", status: "整改中", rectificationMeasure: "已联系设备维护人员检查排风风机，等待维修处理。" },
  { id: "HZ-2026-003", hazardNumber: "HZ-2026-003", sourceAbnormalId: "AB-2026-011", description: "修复货梯门槛磨损部位并确认通行状态。", level: "高", confirmedBy: "陈小安", confirmedAt: "2026-07-19 09:10", confirmationOpinion: "确认需安排整改并在完成后复查。", rectificationOwner: "顾然", rectificationDeadline: "2026-07-28", status: "待复查", rectificationMeasure: "已完成门槛区域修复并清理周边，提交 EHS 复查。" },
  { id: "HZ-2026-004", hazardNumber: "HZ-2026-004", sourceAbnormalId: "AB-2026-012", description: "清理通风橱台面残留并复核操作区域现场管理。", level: "低", confirmedBy: "陈小安", confirmedAt: "2026-07-29 14:00", confirmationOpinion: "确认需清理并复核现场操作区域管理。", rectificationOwner: "林晓", rectificationDeadline: "2026-07-30", status: "已关闭", rectificationMeasure: "已完成台面清理，并由责任人复核操作区域整理要求。", reviewer: "陈小安", reviewedAt: "2026-07-30 15:30", reviewOpinion: "复查通过，操作区域已恢复整洁，隐患关闭。" },
  { id: "HZ-2026-005", hazardNumber: "HZ-2026-005", sourceAbnormalId: "AB-2026-013", description: "修复消防栓箱门锁，确保箱门可正常闭合与取用。", level: "高", confirmedBy: "陈小安", confirmedAt: "2026-07-17 15:20", confirmationOpinion: "确认需修复门锁并保障器材可正常取用。", rectificationOwner: "顾然", rectificationDeadline: "2026-07-24", status: "待整改", rectificationMeasure: "暂未提交整改措施。" },
  { id: "HZ-2026-006", hazardNumber: "HZ-2026-006", sourceAbnormalId: "AB-2026-014", description: "清理灭火器前方通道并落实物料临时放置管理。", level: "中", confirmedBy: "陈小安", confirmedAt: "2026-08-02 13:40", confirmationOpinion: "确认需清理通道并落实现场物料管理。", rectificationOwner: "许宁", rectificationDeadline: "2026-08-04", status: "整改中", rectificationMeasure: "已清理现场通道，正在补充区域物料摆放提示。" },
  { id: "HZ-2026-007", hazardNumber: "HZ-2026-007", sourceAbnormalId: "AB-2026-015", description: "恢复电梯厅防滑提示标识并检查固定状态。", level: "低", confirmedBy: "陈小安", confirmedAt: "2026-07-22 09:30", confirmationOpinion: "确认需恢复提示标识并检查固定状态。", rectificationOwner: "许宁", rectificationDeadline: "2026-07-25", status: "已关闭", rectificationMeasure: "已重新张贴防滑提示标识并检查现场固定状态。", reviewer: "陈小安", reviewedAt: "2026-07-25 16:20", reviewOpinion: "复查通过，标识清晰且固定可靠，隐患关闭。" },
  { id: "HZ-2026-008", hazardNumber: "HZ-2026-008", sourceAbnormalId: "AB-2026-016", description: "排查配电箱异常异味原因并完成必要处理。", level: "高", confirmedBy: "陈小安", confirmedAt: "2026-07-21 14:35", confirmationOpinion: "确认需安排专业人员检查并保留处理记录。", rectificationOwner: "高远", rectificationDeadline: "2026-07-26", status: "待复查", rectificationMeasure: "已完成外部检查与接线紧固处理，等待 EHS 复查。" },
  { id: "HZ-2026-009", hazardNumber: "HZ-2026-009", sourceAbnormalId: "AB-2026-017", description: "更换酸碱柜接液盘并复核柜体泄漏防护状态。", level: "高", confirmedBy: "陈小安", confirmedAt: "2026-07-20 17:00", confirmationOpinion: "确认需更换接液盘并复核柜体防护状态。", rectificationOwner: "顾然", rectificationDeadline: "2026-07-27", status: "整改中", rectificationMeasure: "已订购替换接液盘，待到货后完成更换与现场复核。" },
  { id: "HZ-2026-010", hazardNumber: "HZ-2026-010", sourceAbnormalId: "AB-2026-018", description: "处理压力指示异常的消防器材，并完成状态复核。", level: "中", confirmedBy: "陈小安", confirmedAt: "2026-08-11 16:00", confirmationOpinion: "确认需更换或处理该器材，并完成后复查。", rectificationOwner: "许宁", rectificationDeadline: "2026-08-15", status: "待整改", rectificationMeasure: "暂未提交整改措施。" },
];

export const hazardRecords: HazardRecord[] = hazardSeeds.map((seed) => {
  const abnormal = abnormalRecords.find((record) => record.id === seed.sourceAbnormalId);
  if (!abnormal) throw new Error(`未找到隐患来源异常：${seed.sourceAbnormalId}`);
  if (abnormal.status !== "已确认隐患") throw new Error(`隐患来源异常未确认：${seed.sourceAbnormalId}`);
  return {
    ...seed,
    sourceAbnormalNumber: abnormal.abnormalNumber,
    sourceType: abnormal.sourceType,
    deviceId: abnormal.deviceId,
    deviceCode: abnormal.deviceCode,
    deviceName: abnormal.deviceName,
    deviceCategory: abnormal.deviceCategory,
    area: abnormal.area,
    specificLocation: abnormal.specificLocation,
  };
});

export function getHazardRecord(id: string) {
  return hazardRecords.find((record) => record.id === id);
}
