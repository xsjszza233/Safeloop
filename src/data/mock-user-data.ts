export type MockUserRole =
  | "系统管理员"
  | "EHS管理员"
  | "部门EHS Coordinator"
  | "设备责任人"
  | "Facility工程师"
  | "点检执行人员";

export type MockUser = {
  name: string;
  role: MockUserRole;
  organization: string;
  responsibility: string;
};

// 本地模拟人员仅用于说明既有设备、点检、异常和隐患数据中的人员职责。
export const mockUsers: MockUser[] = [
  { name: "林川", role: "系统管理员", organization: "信息技术支持", responsibility: "账号、角色、权限与系统技术配置" },
  { name: "陈小安", role: "EHS管理员", organization: "EHS部门", responsibility: "异常审核、隐患确认、EHS复查与关闭" },
  { name: "王宁", role: "EHS管理员", organization: "EHS部门", responsibility: "异常审核、隐患确认、EHS复查与关闭" },
  { name: "周悦", role: "部门EHS Coordinator", organization: "研发中心·一层实验组", responsibility: "本部门点检协助、异常提交与整改跟踪" },
  { name: "方宁", role: "部门EHS Coordinator", organization: "研发中心·一层实验组", responsibility: "本部门点检协助、异常提交与整改跟踪" },
  { name: "何悦", role: "部门EHS Coordinator", organization: "研发中心·分析测试组", responsibility: "本部门点检协助、异常提交与整改跟踪" },
  { name: "曹宁", role: "部门EHS Coordinator", organization: "研发中心·分析测试组", responsibility: "本部门点检协助、异常提交与整改跟踪" },
  { name: "顾航", role: "部门EHS Coordinator", organization: "研发中心·材料研发组", responsibility: "本部门点检协助、异常提交与整改跟踪" },
  { name: "陆晨", role: "部门EHS Coordinator", organization: "研发中心·材料研发组", responsibility: "本部门点检协助、异常提交与整改跟踪" },
  { name: "陈璐", role: "部门EHS Coordinator", organization: "研发中心·化学与工艺组", responsibility: "本部门点检协助、异常提交与整改跟踪" },
  { name: "沈乐", role: "部门EHS Coordinator", organization: "研发中心·化学与工艺组", responsibility: "本部门点检协助、异常提交与整改跟踪" },
  { name: "孙航", role: "设备责任人", organization: "研发中心·一层实验组", responsibility: "一层研发实验区酸碱柜及本人使用的实验辅助设备" },
  { name: "吴敏", role: "设备责任人", organization: "研发中心·分析测试组", responsibility: "二层分析测试区酸碱柜及本人使用的实验辅助设备" },
  { name: "唐悦", role: "设备责任人", organization: "研发中心·材料研发组", responsibility: "二层材料研发区酸碱柜及本人使用的实验辅助设备" },
  { name: "冯倩", role: "设备责任人", organization: "研发中心·化学与工艺组", responsibility: "三层化学实验区酸碱柜及本人使用的实验辅助设备" },
  { name: "王工", role: "Facility工程师", organization: "Facility设施管理", responsibility: "配电设施维护与整改" },
  { name: "李工", role: "Facility工程师", organization: "Facility设施管理", responsibility: "消防设施维护与整改" },
  { name: "赵工", role: "Facility工程师", organization: "Facility设施管理", responsibility: "电梯及公辅设备维护与整改" },
  { name: "高远", role: "点检执行人员", organization: "Facility设施管理", responsibility: "配电设施点检" },
  { name: "许宁", role: "点检执行人员", organization: "Facility设施管理", responsibility: "消防设施点检" },
  { name: "顾然", role: "点检执行人员", organization: "Facility设施管理", responsibility: "电梯及公辅设备点检" },
];
