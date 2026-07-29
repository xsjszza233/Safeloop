import { EquipmentRegister } from "@/components/equipment-register";
import { PageHeader } from "@/components/page-header";

export default function DevicesPage() {
  return (
    <>
      <PageHeader title="设备台账" description="基于本地模拟数据查看设备基础信息、点检状态和责任归属。" />
      <EquipmentRegister />
    </>
  );
}
