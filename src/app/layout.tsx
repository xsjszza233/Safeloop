import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "SafeLoop | 设备点检与隐患闭环", description: "SafeLoop 设备点检与隐患闭环管理平台演示原型" };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-CN"><body>{children}</body></html>; }
