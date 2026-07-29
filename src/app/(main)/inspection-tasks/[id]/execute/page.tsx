import { notFound } from "next/navigation";

import { BackButton } from "@/components/back-button";
import { InspectionExecutionForm } from "@/components/inspection-execution-form";
import { PageHeader } from "@/components/page-header";
import { getInspectionManagementTask } from "@/data/inspection-task-data";
import { getInspectionTemplate } from "@/data/inspection-templates";
import { devices } from "@/data/mock-data";

export default async function InspectionTaskExecutePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const task = getInspectionManagementTask(id);
  const device = task ? devices.find((item) => item.id === task.deviceId) : undefined;
  const template = task ? getInspectionTemplate(task.templateId) : undefined;

  if (!task || !device || !template) notFound();

  return (
    <>
      <BackButton fallbackHref={`/inspection-tasks/${task.id}`} label="返回任务详情" />
      <PageHeader title="移动点检执行" description={`${task.taskNumber} · ${task.deviceName}`} />
      <InspectionExecutionForm task={task} device={device} template={template} />
    </>
  );
}
