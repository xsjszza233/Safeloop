# SafeLoop

SafeLoop 是一个设备点检与隐患闭环管理平台的前端演示原型。项目依据 `docs/` 中的产品需求、页面清单、角色权限与状态流转文档搭建。

## 启动

```bash
npm install
npm run dev
```

随后访问 `http://localhost:3000`，将自动进入首页看板；登录页位于 `/login`。

## 可用命令

```bash
npm run lint
npm run build
npm run start
```

## 当前范围

- Next.js App Router、TypeScript、Tailwind CSS、ESLint 与 `src` 目录结构。
- 响应式后台布局：顶部导航、桌面端侧栏、移动端折叠菜单、用户信息和面包屑。
- 页面骨架：登录、看板、设备及详情、检查任务、扫码检查、异常与隐患及详情、整改、EHS 复查、检查模板、用户权限。
- 首页统计、设备、检查任务和隐患数据均为本地虚构数据，位于 `src/data/mock-data.ts`。

## 尚未实现

未连接 Supabase 或其他数据库，未实现真实登录认证、真实业务操作、二维码、文件上传、邮件提醒或 AI API 调用。所有界面中的操作按钮仅用于展示。
