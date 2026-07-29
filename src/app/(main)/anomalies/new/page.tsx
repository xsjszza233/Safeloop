import { AnomalyReportForm } from "@/components/anomaly-report-form";
import { PageHeader } from "@/components/page-header";
export default function NewAnomalyPage() { return <><PageHeader title="异常上报" description="发现现场问题时先提交异常，不能直接创建正式隐患。" /><AnomalyReportForm /></>; }
