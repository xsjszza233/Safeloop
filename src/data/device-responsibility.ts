import type { Device } from "@/types";

type DeviceReference = Pick<Device, "id" | "category" | "location">;

export type DeviceResponsibility = {
  department: string;
  managementTeam: string;
  owner: string;
  inspectionTeam: string;
  primaryInspector: string;
  backupInspectors: string[];
};

function deviceSequence(id: string) {
  return Number(id.replace("EQ-", ""));
}

const auxiliaryEquipmentOwners: Record<string, string> = {
  "EQ-034": "许晴", "EQ-035": "韩宇", "EQ-036": "罗琪",
  "EQ-037": "陶然", "EQ-038": "周霖", "EQ-039": "陆青",
  "EQ-040": "孟珂", "EQ-041": "沈乐", "EQ-042": "顾斐",
  "EQ-043": "韩宇", "EQ-044": "罗琪", "EQ-045": "许晴",
  "EQ-046": "汪珂", "EQ-047": "袁青", "EQ-048": "陶然",
  "EQ-049": "沈乐", "EQ-050": "顾斐", "EQ-051": "孟珂",
  "EQ-052": "罗琪", "EQ-053": "许晴", "EQ-054": "韩宇",
  "EQ-055": "陆青", "EQ-056": "吴敏", "EQ-057": "汪珂",
  "EQ-058": "顾斐", "EQ-059": "孟珂", "EQ-060": "沈乐",
  "EQ-061": "许晴", "EQ-062": "韩宇", "EQ-063": "罗琪",
};

function auxiliaryEquipmentOwner(id: string) {
  return auxiliaryEquipmentOwners[id] ?? "未分配使用人员";
}

function laboratoryResponsibility(device: DeviceReference): DeviceResponsibility {
  const sequence = deviceSequence(device.id);

  if (device.location.includes("1层")) {
    const primaryInspector = sequence % 2 === 0 ? "方宁" : "周悦";
    return {
      department: "研发中心·一层实验组",
      managementTeam: "一层研发实验区域",
      owner: device.category === "通风橱"
        ? "徐工（实验设施管理员）"
        : device.category === "酸碱柜"
          ? "孙航"
          : auxiliaryEquipmentOwner(device.id),
      inspectionTeam: "一层实验组·部门EHS Coordinator",
      primaryInspector,
      backupInspectors: [primaryInspector === "周悦" ? "方宁" : "周悦"],
    };
  }

  if (device.location.includes("分析测试区")) {
    return {
      department: "研发中心·分析测试组",
      managementTeam: "二层分析测试区域",
      owner: device.category === "通风橱"
        ? "钱工（实验设施管理员）"
        : device.category === "酸碱柜"
          ? "吴敏"
          : auxiliaryEquipmentOwner(device.id),
      inspectionTeam: "分析测试组·部门EHS Coordinator",
      primaryInspector: "何悦",
      backupInspectors: ["曹宁"],
    };
  }

  if (device.location.includes("2层")) {
    return {
      department: "研发中心·材料研发组",
      managementTeam: "二层材料研发区域",
      owner: device.category === "通风橱"
        ? "钱工（实验设施管理员）"
        : device.category === "酸碱柜"
          ? "唐悦"
          : auxiliaryEquipmentOwner(device.id),
      inspectionTeam: "材料研发组·部门EHS Coordinator",
      primaryInspector: "顾航",
      backupInspectors: ["陆晨"],
    };
  }

  return {
    department: "研发中心·化学与工艺组",
    managementTeam: "三层化学与工艺验证区域",
    owner: device.category === "通风橱"
      ? "周工（实验设施管理员）"
      : device.category === "酸碱柜"
        ? "冯倩"
        : auxiliaryEquipmentOwner(device.id),
    inspectionTeam: "化学与工艺组·部门EHS Coordinator",
    primaryInspector: "陈璐",
    backupInspectors: ["沈乐"],
  };
}

const facilityResponsibilities: Record<Extract<Device["category"], "配电箱" | "消防器材" | "电梯">, DeviceResponsibility> = {
  配电箱: {
    department: "Facility设施管理",
    managementTeam: "Facility电气工程组",
    owner: "王工",
    inspectionTeam: "Facility电气 Coordinator",
    primaryInspector: "高远",
    backupInspectors: ["罗浩"],
  },
  消防器材: {
    department: "Facility设施管理",
    managementTeam: "Facility消防设施组",
    owner: "李工",
    inspectionTeam: "Facility消防设施 Coordinator",
    primaryInspector: "许宁",
    backupInspectors: ["苏雯"],
  },
  电梯: {
    department: "Facility设施管理",
    managementTeam: "Facility设备保障组",
    owner: "赵工",
    inspectionTeam: "Facility设备保障 Coordinator",
    primaryInspector: "顾然",
    backupInspectors: ["董晨"],
  },
};

export function getDeviceResponsibility(device: DeviceReference): DeviceResponsibility {
  if (device.category === "通风橱" || device.category === "酸碱柜" || device.category === "实验辅助设备") {
    return laboratoryResponsibility(device);
  }

  return facilityResponsibilities[device.category];
}
