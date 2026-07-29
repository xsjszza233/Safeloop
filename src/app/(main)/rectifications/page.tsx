import { PlaceholderPage } from "@/components/placeholder-page";
import { BackButton } from "@/components/back-button";
export default function RectificationsPage() { return <><BackButton fallbackHref="/hazards" label="返回隐患列表" /><PlaceholderPage title="我的整改任务" description="设备责任人查看并提交管辖设备的整改记录。" action="提交整改记录" sections={[{ title: "待整改事项", text: "整改任务将保留责任人、整改期限与逾期时间标记，逾期不作为独立主状态。" }, { title: "整改记录", text: "后续将保存整改说明、整改措施、提交人和提交时间；附件上传本期不实现。" }]} /></> }
