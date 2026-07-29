export type TaskStatus = "待执行" | "执行中" | "已提交" | "已完成" | "已取消";
export type HazardStatus = "待分派" | "待整改" | "整改中" | "待复查" | "已关闭" | "已驳回整改";
export type AnomalyStatus = "草稿" | "待确认" | "已确认隐患" | "一般异常" | "已驳回";
export type DeviceStatus = "在用" | "停用" | "维修中" | "报废";
export type InspectionTimeTag = "正常" | "即将到期" | "已逾期";
export interface Device {
  id: string;
  code: string;
  name: string;
  category: "酸碱柜" | "通风橱" | "配电箱" | "消防器材" | "电梯";
  department: string;
  location: string;
  owner: string;
  status: DeviceStatus;
  riskLevel: "低" | "中" | "高";
  nextInspectionDate: string;
  inspectionTag: InspectionTimeTag;
}
export interface InspectionTask { id: string; device: string; inspector: string; deadline: string; status: TaskStatus; timeTag: "正常" | "即将到期" | "已逾期"; }
export interface Hazard { id: string; title: string; device: string; level: "高" | "中" | "低"; owner: string; deadline: string; status: HazardStatus; }
export interface Anomaly { id: string; title: string; device: string; reporter: string; reportedAt: string; status: AnomalyStatus; }
