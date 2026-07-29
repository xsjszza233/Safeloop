"use client";

import { useState } from "react";

import type { Device, InspectionManagementTask, InspectionTemplate } from "@/types";

type Result = "正常" | "异常";

export function InspectionExecutionForm({ task, device, template }: { task: InspectionManagementTask; device: Device; template: InspectionTemplate }) {
  const [results, setResults] = useState<Record<string, Result | undefined>>({});
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});
  const [validationMessage, setValidationMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [photoNotice, setPhotoNotice] = useState("");

  const abnormalItems = template.items.filter((item) => results[item.id] === "异常");

  function updateResult(itemId: string, result: Result) {
    setResults((current) => ({ ...current, [itemId]: result }));
    setValidationMessage("");
    setSubmitMessage("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const hasIncompleteItem = template.items.some((item) => !results[item.id]);
    const missingDescription = abnormalItems.some((item) => !descriptions[item.id]?.trim());

    if (hasIncompleteItem) {
      setValidationMessage("请为所有检查项目选择检查结果后再提交。");
      setSubmitMessage("");
      return;
    }

    if (missingDescription) {
      setValidationMessage("存在异常项目时，必须填写对应的异常描述。");
      setSubmitMessage("");
      return;
    }

    setValidationMessage("");
    setSubmitMessage(abnormalItems.length > 0 ? "已发现异常，将生成异常记录（演示）" : "点检完成（演示）");
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-4 pb-24">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <p className="text-xs font-medium text-emerald-700">{task.taskNumber} · {task.type}</p>
        <h2 className="mt-1 text-lg font-bold text-slate-900">{device.name} · 现场点检</h2>
        <dl className="mt-4 grid gap-x-4 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <TaskInfo label="设备编号" value={device.code} />
          <TaskInfo label="设备类别" value={device.category} />
          <TaskInfo label="点检模板" value={template.name} />
          <TaskInfo label="执行人员" value={task.assignee} />
          <TaskInfo label="计划日期" value={task.planDate} />
        </dl>
      </section>

      <section aria-label="检查项目">
        <div className="mb-3"><h2 className="text-base font-bold text-slate-900">检查项目</h2><p className="mt-1 text-sm text-slate-500">请逐项选择结果。选择异常后需填写异常描述。</p></div>
        <div className="space-y-4">
          {template.items.map((item) => {
            const result = results[item.id];
            const showDescription = result === "异常";
            const showMissingResult = Boolean(validationMessage) && !result;
            const showMissingDescription = Boolean(validationMessage) && showDescription && !descriptions[item.id]?.trim();

            return (
              <fieldset key={item.id} className={`rounded-xl border bg-white p-4 shadow-sm sm:p-5 ${showMissingResult || showMissingDescription ? "border-rose-300" : "border-slate-200"}`}>
                <legend className="px-1 text-base font-semibold text-slate-900">{item.order}. {item.name}</legend>
                <div className="mt-3 space-y-3 text-sm">
                  <DetailLine label="检查内容" value={item.content} />
                  <DetailLine label="判断标准" value={item.criterion} />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3" role="radiogroup" aria-label={`${item.name}检查结果`}>
                  <label className={`flex min-h-12 cursor-pointer items-center justify-center rounded-lg border text-sm font-medium transition ${result === "正常" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-600 hover:border-emerald-200"}`}><input className="sr-only" type="radio" name={`result-${item.id}`} checked={result === "正常"} onChange={() => updateResult(item.id, "正常")} />○ 正常</label>
                  <label className={`flex min-h-12 cursor-pointer items-center justify-center rounded-lg border text-sm font-medium transition ${result === "异常" ? "border-rose-500 bg-rose-50 text-rose-700" : "border-slate-200 text-slate-600 hover:border-rose-200"}`}><input className="sr-only" type="radio" name={`result-${item.id}`} checked={result === "异常"} onChange={() => updateResult(item.id, "异常")} />○ 异常</label>
                </div>
                {showMissingResult && <p className="mt-2 text-sm text-rose-600">请选择检查结果。</p>}

                {showDescription && <div className="mt-4 rounded-lg bg-rose-50/60 p-3 sm:p-4"><label className="block text-sm font-medium text-slate-800">异常描述<textarea value={descriptions[item.id] ?? ""} onChange={(event) => { setDescriptions((current) => ({ ...current, [item.id]: event.target.value })); setValidationMessage(""); setSubmitMessage(""); }} className="mt-2 min-h-24 w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-800 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100" placeholder="请描述现场发现的异常情况" /></label>{showMissingDescription && <p className="mt-2 text-sm text-rose-600">异常描述不能为空。</p>}<div className="mt-3 flex flex-wrap items-center gap-3"><button type="button" onClick={() => setPhotoNotice("添加照片（演示）：演示功能暂未开放。") } className="min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-rose-200">添加照片（演示）</button><span className="text-xs text-slate-500">不支持真实图片上传</span></div></div>}
              </fieldset>
            );
          })}
        </div>
      </section>

      {photoNotice && <p role="status" className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">{photoNotice}</p>}
      {validationMessage && <p role="alert" className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{validationMessage}</p>}
      {submitMessage && <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-700">{submitMessage}</p>}

      <div className="sticky bottom-3 z-10 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur sm:flex sm:items-center sm:justify-between"><p className="mb-3 text-xs text-slate-500 sm:mb-0">本次提交仅为前端演示，不会修改任务状态或保存数据。</p><button type="submit" className="min-h-12 w-full rounded-lg bg-[#167864] px-5 text-sm font-semibold text-white hover:bg-[#116653] focus:outline-none focus:ring-2 focus:ring-emerald-300 sm:w-auto">提交点检</button></div>
    </form>
  );
}

function TaskInfo({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-xs text-slate-500">{label}</dt><dd className="mt-1 font-medium text-slate-800">{value}</dd></div>;
}

function DetailLine({ label, value }: { label: string; value: string }) {
  return <div><p className="text-xs text-slate-500">{label}</p><p className="mt-1 leading-6 text-slate-700">{value}</p></div>;
}
