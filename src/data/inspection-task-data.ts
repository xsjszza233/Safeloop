import type { InspectionManagementTask } from "@/types";

export const inspectionManagementTasks: InspectionManagementTask[] = [
  { id: "IT-2026-081", taskNumber: "IT-2026-081", deviceId: "EQ-007", deviceName: "通风橱 F-01", deviceCategory: "通风橱", templateId: "TPL-FH-001", templateName: "通风橱日常点检模板", templateCode: "TPL-FH-001", planDate: "2026-07-25", deadline: "2026-07-28", assignee: "陈璐", type: "常规点检", status: "待执行", timeTag: "已逾期" },
  { id: "IT-2026-082", taskNumber: "IT-2026-082", deviceId: "EQ-008", deviceName: "通风橱 F-02", deviceCategory: "通风橱", templateId: "TPL-FH-001", templateName: "通风橱日常点检模板", templateCode: "TPL-FH-001", planDate: "2026-07-29", deadline: "2026-08-01", assignee: "林晓", type: "常规点检", status: "执行中", timeTag: "即将到期" },
  { id: "IT-2026-083", taskNumber: "IT-2026-083", deviceId: "EQ-009", deviceName: "通风橱 F-03", deviceCategory: "通风橱", templateId: "TPL-FH-001", templateName: "通风橱日常点检模板", templateCode: "TPL-FH-001", planDate: "2026-08-16", deadline: "2026-08-19", assignee: "周宁", type: "常规点检", status: "待执行", timeTag: "正常" },
  { id: "IT-2026-084", taskNumber: "IT-2026-084", deviceId: "EQ-010", deviceName: "通风橱 F-04", deviceCategory: "通风橱", templateId: "TPL-FH-001", templateName: "通风橱日常点检模板", templateCode: "TPL-FH-001", planDate: "2026-07-24", deadline: "2026-07-26", assignee: "陈璐", type: "维修后专项点检", status: "已提交", timeTag: "已逾期" },
  { id: "IT-2026-085", taskNumber: "IT-2026-085", deviceId: "EQ-013", deviceName: "配电箱 P-01", deviceCategory: "配电箱", templateId: "TPL-PB-001", templateName: "配电箱安全点检模板", templateCode: "TPL-PB-001", planDate: "2026-07-31", deadline: "2026-08-03", assignee: "高远", type: "常规点检", status: "待执行", timeTag: "即将到期" },
  { id: "IT-2026-086", taskNumber: "IT-2026-086", deviceId: "EQ-015", deviceName: "配电箱 P-03", deviceCategory: "配电箱", templateId: "TPL-PB-001", templateName: "配电箱安全点检模板", templateCode: "TPL-PB-001", planDate: "2026-07-21", deadline: "2026-07-23", assignee: "许宁", type: "临时点检", status: "已完成", timeTag: "已逾期" },
  { id: "IT-2026-087", taskNumber: "IT-2026-087", deviceId: "EQ-016", deviceName: "配电箱 P-04", deviceCategory: "配电箱", templateId: "TPL-PB-001", templateName: "配电箱安全点检模板", templateCode: "TPL-PB-001", planDate: "2026-07-23", deadline: "2026-07-25", assignee: "高远", type: "维修后专项点检", status: "已取消", timeTag: "已逾期" },
  { id: "IT-2026-088", taskNumber: "IT-2026-088", deviceId: "EQ-019", deviceName: "干粉灭火器 FE-01", deviceCategory: "消防器材", templateId: "TPL-FE-001", templateName: "消防器材日常点检模板", templateCode: "TPL-FE-001", planDate: "2026-08-02", deadline: "2026-08-05", assignee: "许宁", type: "常规点检", status: "待执行", timeTag: "即将到期" },
  { id: "IT-2026-089", taskNumber: "IT-2026-089", deviceId: "EQ-021", deviceName: "消防栓箱 FE-03", deviceCategory: "消防器材", templateId: "TPL-FE-001", templateName: "消防器材日常点检模板", templateCode: "TPL-FE-001", planDate: "2026-07-20", deadline: "2026-07-22", assignee: "许宁", type: "临时点检", status: "已完成", timeTag: "已逾期" },
  { id: "IT-2026-090", taskNumber: "IT-2026-090", deviceId: "EQ-024", deviceName: "干粉灭火器 FE-06", deviceCategory: "消防器材", templateId: "TPL-FE-001", templateName: "消防器材日常点检模板", templateCode: "TPL-FE-001", planDate: "2026-08-11", deadline: "2026-08-14", assignee: "周宁", type: "常规点检", status: "待执行", timeTag: "正常" },
];

export function getInspectionManagementTask(id: string) {
  return inspectionManagementTasks.find((task) => task.id === id);
}
