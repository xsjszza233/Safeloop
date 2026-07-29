import { PageHeader } from "@/components/page-header";
import { ScanEntry } from "@/components/scan-entry";
import { BackButton } from "@/components/back-button";
export default function ScanPage() { return <><BackButton fallbackHref="/devices" label="返回设备台账" /><PageHeader title="扫码点检" description="现场识别设备后进入对应的点检任务与点检记录录入。" /><ScanEntry /></> }
