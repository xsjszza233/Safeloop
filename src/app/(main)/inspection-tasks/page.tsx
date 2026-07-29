import { InspectionTaskRegister } from "@/components/inspection-task-register";
import { PageHeader } from "@/components/page-header";

export default function InspectionTasksPage() {
  return <><PageHeader title="点检任务" description="查看当前点检任务、时间标记和执行进度。本页数据仅用于演示。" /><InspectionTaskRegister /></>;
}
