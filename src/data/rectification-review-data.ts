import type { RectificationRecord, ReviewRecord } from "@/types";

export const rectificationRecords: RectificationRecord[] = [
  { id: "RC-2026-001", hazardId: "HZ-2026-002", rectificationOwner: "陈璐", measure: "检查并维护通风橱排风机，消除异常噪声。", description: "已联系实验设施维护人员完成现场检查，等待更换磨损部件。", submittedAt: "2026-07-29 16:20", attachments: ["通风橱排风机检查单.jpg（模拟）"], result: "整改中" },
  { id: "RC-2026-002", hazardId: "HZ-2026-003", rectificationOwner: "顾然", measure: "修复货梯门槛磨损区域并清理周边。", description: "已完成门槛防护条更换，现场通行恢复正常，提交 EHS 复查。", submittedAt: "2026-07-27 14:40", attachments: ["货梯门槛整改后照片.jpg（模拟）"], result: "已提交" },
  { id: "RC-2026-003", hazardId: "HZ-2026-004", rectificationOwner: "林晓", measure: "清理通风橱台面残留并复核实验区域整理要求。", description: "已完成台面清洁和现场复核，整改结果已提交。", submittedAt: "2026-07-30 10:10", attachments: ["通风橱台面整改照片.jpg（模拟）"], result: "已完成" },
  { id: "RC-2026-004", hazardId: "HZ-2026-006", rectificationOwner: "许宁", measure: "清理消防器材配置点前通道并补充物品摆放提示。", description: "通道已清理，区域提示标识正在补充。", submittedAt: "2026-08-03 11:25", attachments: ["消防配置点通道整改照片.jpg（模拟）"], result: "整改中" },
  { id: "RC-2026-005", hazardId: "HZ-2026-007", rectificationOwner: "许宁", measure: "恢复电梯厅防滑提示标识并检查固定状态。", description: "已重新张贴标识并完成现场固定检查，整改结果已提交。", submittedAt: "2026-07-24 15:10", attachments: ["电梯厅提示标识整改照片.jpg（模拟）"], result: "已完成" },
  { id: "RC-2026-006", hazardId: "HZ-2026-008", rectificationOwner: "高远", measure: "排查配电箱异味原因并紧固相关接线。", description: "已完成外部检查与接线紧固处理，等待 EHS 复查。", submittedAt: "2026-07-25 17:05", attachments: ["配电箱整改记录.jpg（模拟）"], result: "已提交" },
  { id: "RC-2026-007", hazardId: "HZ-2026-009", rectificationOwner: "顾然", measure: "更换酸碱柜接液盘并复核柜体防护状态。", description: "替换接液盘已到货，计划在本周内完成更换。", submittedAt: "2026-07-24 09:30", attachments: [], result: "整改中" },
];

export const reviewRecords: ReviewRecord[] = [
  { id: "RV-2026-001", hazardId: "HZ-2026-004", reviewer: "陈小安（EHS管理员）", reviewedAt: "2026-07-30 15:30", result: "通过", opinion: "复查通过，通风橱操作区域已恢复整洁，隐患关闭。" },
  { id: "RV-2026-002", hazardId: "HZ-2026-007", reviewer: "王宁（EHS管理员）", reviewedAt: "2026-07-25 16:20", result: "通过", opinion: "复查通过，提示标识清晰且固定可靠，隐患关闭。" },
];

export function getRectificationRecords(hazardId: string) {
  return rectificationRecords.filter((record) => record.hazardId === hazardId);
}

export function getReviewRecords(hazardId: string) {
  return reviewRecords.filter((record) => record.hazardId === hazardId);
}
