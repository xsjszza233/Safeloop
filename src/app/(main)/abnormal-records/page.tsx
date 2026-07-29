import { AbnormalRecordRegister } from "@/components/abnormal-record-register";
import { PageHeader } from "@/components/page-header";

export default function AbnormalRecordsPage() {
  return <><PageHeader title="异常管理" description="查看现场异常、EHS 审核结论及其关联设备和点检来源。本页数据仅用于演示。" /><AbnormalRecordRegister /></>;
}
