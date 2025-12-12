"use client";

import { useState, useEffect } from "react";
import { useEscapeKey } from "../hooks/useEscapeKey";
import {
  getHistory,
  removeFromHistory,
  clearHistory,
  searchHistory,
  groupHistoryByDate
} from "../lib/translationHistory";

/**
 * 번역 히스토리 모달
 */
export default function TranslationHistory({ onClose, onRestore }) {
  useEscapeKey(onClose);
  
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list"); // list | grouped
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    setHistory(getHistory());
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setHistory(searchHistory(query));
    } else {
      loadHistory();
    }
  };

  const handleDelete = (id) => {
    if (confirm("이 히스토리를 삭제하시겠습니까?")) {
      removeFromHistory(id);
      loadHistory();
    }
  };

  const handleClearAll = () => {
    if (confirm("전체 히스토리를 삭제하시겠습니까?")) {
      clearHistory();
      loadHistory();
    }
  };

  const handleRestore = (item) => {
    if (onRestore) {
      onRestore(item);
    }
    onClose();
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "방금 전";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  const getDirectionIcon = (direction) => {
    return direction === 'encode' ? '🔐' : '🔓';
  };

  const getEngineLabel = (version) => {
    return version === 'v3' ? 'v3⚡' : 'v2';
  };

  const groupedHistory = viewMode === 'grouped' ? groupHistoryByDate() : null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-slate-800/98 to-slate-900/98 backdrop-blur-xl rounded-3xl p-8 w-full max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border-2 border-cyan-500/30 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">📜</div>
            <div>
              <h2 className="text-3xl font-extrabold text-white">번역 히스토리</h2>
              <p className="text-sm text-slate-400 mt-1">
                최근 {history.length}개 번역 기록
              </p>
            </div>
          </div>
          <button
            className="text-slate-400 hover:text-white transition-colors text-2xl leading-none hover:rotate-90 transition-transform duration-300"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* 검색 & 필터 */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="input-3d flex-1"
            placeholder="히스토리 검색..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            className={`btn-3d btn-compact ${viewMode === 'list' ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => setViewMode('list')}
            title="목록 보기"
          >
            📋
          </button>
          <button
            className={`btn-3d btn-compact ${viewMode === 'grouped' ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => setViewMode('grouped')}
            title="날짜별 보기"
          >
            📅
          </button>
          <button
            className="btn-3d btn-red btn-compact"
            onClick={handleClearAll}
            title="전체 삭제"
          >
            🗑️
          </button>
        </div>

        {/* 히스토리 목록 */}
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
          {history.length === 0 ? (
            <div className="text-center py-20 opacity-70">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-slate-400">히스토리가 없습니다</p>
              <p className="text-xs text-slate-500 mt-2">
                번역을 실행하면 자동으로 기록됩니다
              </p>
            </div>
          ) : viewMode === 'list' ? (
            // 목록 보기
            history.map((item) => (
              <div
                key={item.id}
                className="bg-slate-700/50 border border-slate-600/50 rounded-xl p-4 hover:bg-slate-700/70 hover:border-slate-500/50 transition-all group"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    {/* 헤더 */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{getDirectionIcon(item.direction)}</span>
                      <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                        {item.mode}
                      </span>
                      <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                        {getEngineLabel(item.engineVersion)}
                      </span>
                      <span className="text-xs text-slate-500">
                        {formatDate(item.timestamp)}
                      </span>
                    </div>

                    {/* 텍스트 */}
                    <div className="space-y-1">
                      <div className="text-sm text-slate-300 truncate">
                        <strong className="text-white">입력:</strong> {item.input}
                      </div>
                      <div className="text-sm text-slate-300 truncate">
                        <strong className="text-white">출력:</strong> {item.output}
                      </div>
                      <div className="text-xs text-slate-500">
                        규칙 {item.rulesCount}개 사용
                      </div>
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="btn-3d text-xs px-3 py-1"
                      onClick={() => handleRestore(item)}
                      title="복원"
                    >
                      ↶
                    </button>
                    <button
                      className="btn-3d btn-red text-xs px-2 py-1"
                      onClick={() => handleDelete(item.id)}
                      title="삭제"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // 날짜별 보기
            Object.entries(groupedHistory).map(([date, items]) => (
              <div key={date} className="space-y-2">
                <div className="text-sm font-bold text-cyan-300 sticky top-0 bg-slate-800/90 backdrop-blur-sm py-2 px-3 rounded-lg">
                  📅 {date} ({items.length}개)
                </div>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-700/50 border border-slate-600/50 rounded-xl p-3 hover:bg-slate-700/70 transition-all ml-4"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <span>{getDirectionIcon(item.direction)}</span>
                      <span className="text-slate-300 truncate flex-1">
                        {item.input} → {item.output}
                      </span>
                      <span className="text-xs text-slate-500">
                        {new Date(item.timestamp).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* 닫기 버튼 */}
        <button 
          className="btn-3d w-full mt-6 text-lg" 
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

