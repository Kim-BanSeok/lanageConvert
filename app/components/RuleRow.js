"use client";

export default function RuleRow({ index, rule, onChange, onDelete }) {
  const safeRule = rule || { from: "", to: "" };

  const setField = (key, value) => {
    onChange(index, { ...safeRule, [key]: value });
  };

  return (
    <tr className="row-3d">
      <td>
        <input
          value={safeRule.from || ""}
          onChange={(e) => setField("from", e.target.value)}
          placeholder="예: 사랑"
          className="input-3d w-full text-base font-medium"
        />
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
