import { PageHeader } from "@/components/page-header";
import { DeviceQrScanEntry } from "@/components/scan-entry";
import { BackButton } from "@/components/back-button";
export default function ScanPage() { return <><BackButton fallbackHref="/devices" label="返回设备台账" /><PageHeader title="扫码点检" description="模拟扫描设备二维码，快速进入设备详情和已有点检任务。" /><DeviceQrScanEntry /></> }
