"use client";

import { useState } from "react";

export default function RuleRow({ index, rule, onChange, onDelete, onDragStart, onDragOver, onDrop }) {
  const safeRule = rule || { from: "", to: "" };
  const [isDragging, setIsDragging] = useState(false);

  const setField = (key, value) => {
    onChange(index, { ...safeRule, [key]: value });
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    if (onDragStart) onDragStart(e, index);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (onDragOver) onDragOver(e, index);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (onDrop) onDrop(e, index);
  };

  return (
    <tr 
      className={`row-3d ${isDragging ? 'opacity-50' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <td>
        <div className="flex items-center gap-2">
          <div className="text-slate-400 cursor-move" title="드래그하여 순서 변경">
            ⋮⋮
          </div>
          <input
            value={safeRule.from || ""}
            onChange={(e) => setField("from", e.target.value)}
            placeholder="예: 사랑"
            className="input-3d w-full text-base font-medium"
          />
        </div>
      </td>

      <td>
        <input
          value={safeRule.to || ""}
          onChange={(e) => setField("to", e.target.value)}
          placeholder="예: LOVE"
          className="input-3d w-full text-base font-medium"
        />
      </td>

      <td className="text-center">
        <button 
          className="btn-3d btn-red text-sm px-4 py-2" 
          onClick={() => onDelete(index)}
          title="이 규칙 삭제"
        >
          ✕
        </button>
      </td>
    </tr>
  );
}
