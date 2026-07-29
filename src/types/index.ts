export type TaskStatus = "待执行" | "执行中" | "已提交" | "已完成" | "已取消";
export type HazardStatus = "待分派" | "待整改" | "整改中" | "待复查" | "已关闭" | "已驳回整改";
export type AnomalyStatus = "草稿" | "待确认" | "已确认隐患" | "一般异常" | "已驳回";
export interface Device { id: string; name: string; code: string; category: string; owner: string; location: string; status: "正常" | "维修中"; }
export interface InspectionTask { id: string; device: string; inspector: string; deadline: string; status: TaskStatus; timeTag: "正常" | "即将到期" | "已逾期"; }
export interface Hazard { id: string; title: string; device: string; level: "高" | "中" | "低"; owner: string; deadline: string; status: HazardStatus; }
export interface Anomaly { id: string; title: string; device: string; reporter: string; reportedAt: string; status: AnomalyStatus; }
