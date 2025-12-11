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
          placeholder="원래 문자열"
          className="w-full"
        />
      </td>

      <td>
        <input
          value={safeRule.to || ""}
          onChange={(e) => setField("to", e.target.value)}
          placeholder="변환 문자열"
          className="w-full"
        />
      </td>

      <td>
        <button className="btn-3d btn-red px-3 py-1" onClick={() => onDelete(index)}>
          삭제
        </button>
      </td>
    </tr>
  );
}
