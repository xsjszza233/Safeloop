import { PlaceholderPage } from "@/components/placeholder-page";
export default function TemplatesPage() { return <PlaceholderPage title="检查模板管理" description="维护设备类别默认点检模板与默认周期。" action="新建模板" sections={[{ title: "默认检查项", text: "设备类别可关联默认点检模板，单台设备允许在后续版本覆盖默认设置。" }, { title: "周期配置", text: "支持按设备类别配置默认检查周期，当前仅建立展示骨架。" }]} /> }
