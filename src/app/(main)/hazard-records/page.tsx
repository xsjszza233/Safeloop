import { HazardRecordRegister } from "@/components/hazard-record-register";
import { PageHeader } from "@/components/page-header";

export default function HazardRecordsPage() {
  return <><PageHeader title="隐患管理" description="查看来源异常、整改责任与当前闭环状态。本页数据仅用于演示。" /><HazardRecordRegister /></>;
}
