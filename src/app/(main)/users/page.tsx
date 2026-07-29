import { PlaceholderPage } from "@/components/placeholder-page";
export default function UsersPage() { return <PlaceholderPage title="用户与权限管理" description="由系统管理员维护人员账号、角色及权限边界。" action="新增用户" sections={[{ title: "角色定义", text: "系统管理员、EHS 管理员、检查人员和设备责任人共四类角色，权限范围以需求文档为准。" }, { title: "权限矩阵", text: "EHS 管理员负责异常确认、分派、复查与关闭；设备责任人不能自行关闭隐患。" }]} /> }
