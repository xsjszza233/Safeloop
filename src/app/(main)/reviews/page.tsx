import { PlaceholderPage } from "@/components/placeholder-page";
import { BackButton } from "@/components/back-button";
export default function ReviewsPage() { return <><BackButton fallbackHref="/hazards" label="返回隐患列表" /><PlaceholderPage title="EHS 复查" description="由 EHS 管理员确认整改是否合格并推动隐患闭环。" action="开始复查" sections={[{ title: "待复查隐患", text: "责任人提交整改记录后，隐患将进入待复查状态，等待 EHS 管理员处理。" }, { title: "复查结论", text: "复查通过后才能关闭隐患；不通过时将驳回整改并返回待整改。" }]} /></> }
