import { notFound } from "next/navigation";
import { InspectionForm } from "@/components/inspection-form";
import { PageHeader } from "@/components/page-header";
import { inspectionTasks } from "@/data/mock-data";
import { BackButton } from "@/components/back-button";
export default async function CheckPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const task = inspectionTasks.find((item) => item.id === id); if (!task) notFound(); return <><BackButton fallbackHref="/inspection-tasks" label="返回点检任务" /><PageHeader title="移动点检录入" description="响应式点检录入页面，可在手机宽度下完成演示操作。" /><InspectionForm task={task} /></>; }
