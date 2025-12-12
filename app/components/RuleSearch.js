"use client";

import { useState, useMemo } from "react";

/**
 * 규칙 검색/필터 컴포넌트
 */
export default function RuleSearch({ rules, onFilteredRulesChange }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState("all"); // all, from, to, empty

  // 필터링된 규칙
  const filteredRules = useMemo(() => {
    let filtered = rules;

    // 빈 규칙 필터
    if (filterMode === "empty") {
      filtered = filtered.filter(
        r => !r.from || !r.from.trim() || !r.to || !r.to.trim()
      );
    } else if (filterMode === "valid") {
      filtered = filtered.filter(
        r => r.from && r.from.trim() && r.to && r.to.trim()
      );
    }

    // 검색 쿼리 적용
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      
      if (filterMode === "from") {
        filtered = filtered.filter(r => 
          r.from && r.from.toLowerCase().includes(query)
        );
      } else if (filterMode === "to") {
        filtered = filtered.filter(r => 
          r.to && r.to.toLowerCase().includes(query)
        );
      } else {
        filtered = filtered.filter(r => 
          (r.from && r.from.toLowerCase().includes(query)) ||
          (r.to && r.to.toLowerCase().includes(query))
        );
      }
    }

    return filtered;
  }, [rules, searchQuery, filterMode]);

  // 필터 변경 시 부모에게 알림
  useMemo(() => {
    if (onFilteredRulesChange) {
      onFilteredRulesChange(filteredRules);
    }
  }, [filteredRules, onFilteredRulesChange]);

  const handleClear = () => {
    setSearchQuery("");
    setFilterMode("all");
  };

  const validRuleCount = rules.filter(
    r => r.from && r.from.trim() && r.to && r.to.trim()
  ).length;

  const emptyRuleCount = rules.filter(
    r => !r.from || !r.from.trim() || !r.to || !r.to.trim()
  ).length;

  return (
    <div className="bg-slate-700/30 border-2 border-slate-600/50 rounded-xl p-4 mb-4 space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">🔍</span>
        <h3 className="font-bold text-white">규칙 검색 & 필터</h3>
      </div>

      {/* 검색 입력 */}
      <div className="flex gap-2">
        <input
          type="text"
          className="input-3d flex-1"
          placeholder="규칙 검색... (From 또는 To)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            className="btn-3d btn-compact px-4" 
            onClick={handleClear}
            title="검색 초기화"
          >
            ✕
          </button>
        )}
      </div>

      {/* 필터 버튼 그룹 */}
      <div className="flex flex-wrap gap-2">
        <button
          className={`btn-3d btn-compact text-xs ${
            filterMode === "all" ? "ring-2 ring-blue-400" : ""
          }`}
          onClick={() => setFilterMode("all")}
        >
          전체 ({rules.length})
        </button>
        <button
          className={`btn-3d btn-compact text-xs ${
            filterMode === "from" ? "ring-2 ring-blue-400" : ""
          }`}
          onClick={() => setFilterMode("from")}
        >
          From 검색
        </button>
        <button
          className={`btn-3d btn-compact text-xs ${
            filterMode === "to" ? "ring-2 ring-blue-400" : ""
          }`}
          onClick={() => setFilterMode("to")}
        >
          To 검색
        </button>
        <button
          className={`btn-3d btn-compact text-xs ${
            filterMode === "valid" ? "ring-2 ring-green-400" : ""
          }`}
          onClick={() => setFilterMode("valid")}
        >
          ✓ 유효 ({validRuleCount})
        </button>
        <button
          className={`btn-3d btn-compact text-xs ${
            filterMode === "empty" ? "ring-2 ring-red-400" : ""
          }`}
          onClick={() => setFilterMode("empty")}
        >
          ⚠ 빈 규칙 ({emptyRuleCount})
        </button>
      </div>

      {/* 검색 결과 */}
      {(searchQuery || filterMode !== "all") && (
        <div className="text-sm text-slate-300 bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2">
          {filteredRules.length === 0 ? (
            <span className="text-red-300">❌ 검색 결과가 없습니다</span>
          ) : (
            <span>
              ✓ <strong className="text-white">{filteredRules.length}개</strong> 규칙 표시 중
              {filteredRules.length !== rules.length && (
                <span className="text-slate-400"> (전체 {rules.length}개 중)</span>
              )}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

