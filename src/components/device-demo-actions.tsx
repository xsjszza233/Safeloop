"use client";

import { useState } from "react";

const actions = ["编辑设备", "查看二维码", "发起临时点检"] as const;

export function DeviceDemoActions() {
  const [notice, setNotice] = useState("这些操作当前仅用于界面演示，不会保存或发起真实业务。" );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <button key={action} type="button" onClick={() => setNotice(`${action}：演示功能暂未开放。`)} className="min-h-11 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200">
            {action}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-slate-500" role="status">{notice}</p>
    </div>
  );
}
