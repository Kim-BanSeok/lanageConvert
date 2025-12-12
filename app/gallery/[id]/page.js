"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCustomAlert } from "../../components/CustomAlert";
import Logo3D from "../../components/Logo3D";
import "../gallery.css";

/**
 * 🖼️ 갤러리 프리셋 상세 페이지
 */

// 샘플 프리셋 데이터 (실제로는 API에서 가져올 데이터)
const SAMPLE_PRESETS = {
  1: {
    id: 1,
    name: "엘프어",
    description: "판타지 엘프들이 사용하는 우아한 언어. 모음에 특별한 변형을 주어 신비로운 느낌을 연출합니다.",
    author: "FantasyLover",
    authorAvatar: "🧙‍♂️",
    rulesCount: 26,
    downloads: 342,
    rating: 4.8,
    category: "판타지",
    tags: ["엘프", "판타지", "우아함"],
    preview: "Hello → Hëllö, World → Wörld",
    createdAt: "2024-12-10",
    rules: [
      { from: "a", to: "ä" },
      { from: "e", to: "ë" },
      { from: "i", to: "ï" },
      { from: "o", to: "ö" },
      { from: "u", to: "ü" },
      { from: "Hello", to: "Hëllö" },
      { from: "World", to: "Wörld" },
      { from: "Love", to: "Lövë" },
      { from: "Peace", to: "Pëäcë" },
      { from: "Magic", to: "Mägïc" },
    ],
    fullDescription: `
이 언어는 판타지 소설 속 엘프들의 언어에서 영감을 받았습니다. 
모든 모음에 움라우트(¨)를 추가하여 우아하고 신비로운 느낌을 줍니다.

특징:
- 모음 변형을 통한 독특한 발음
- 읽기 쉬우면서도 이국적인 느낌
- 판타지 RPG, 소설, 게임에 적합

사용 예시:
"안녕하세요" → "ännyëönghäsëyö"
"사랑해요" → "säränghäëyö"
    `,
    reviews: [
      {
        author: "DragonSlayer",
        rating: 5,
        comment: "완벽해요! 제 판타지 소설에 딱 맞는 언어입니다.",
        date: "2024-12-11",
      },
      {
        author: "ElfFan123",
        rating: 5,
        comment: "정말 우아하고 아름다운 언어네요. 강력 추천!",
        date: "2024-12-10",
      },
      {
        author: "RPGMaster",
        rating: 4,
        comment: "좋은데 자음 변형도 있었으면 더 좋았을 것 같아요.",
        date: "2024-12-09",
      },
    ],
  },
  // 다른 프리셋들...
};

export default function PresetDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { showAlert, AlertComponent } = useCustomAlert();
  const [preset, setPreset] = useState(null);
  const [testInput, setTestInput] = useState("Hello World");
  const [testOutput, setTestOutput] = useState("");

  useEffect(() => {
    // ID로 프리셋 로드
    const id = parseInt(params.id);
    const loadedPreset = SAMPLE_PRESETS[id];
    
    if (loadedPreset) {
      setPreset(loadedPreset);
    } else {
      showAlert("프리셋을 찾을 수 없습니다", "error");
      router.push("/gallery");
    }
  }, [params.id]);

  // 테스트 변환
  const handleTest = () => {
    if (!preset || !testInput.trim()) return;
    
    let result = testInput;
    preset.rules.forEach(rule => {
      result = result.split(rule.from).join(rule.to);
    });
    setTestOutput(result);
  };

  // 프리셋 불러오기
  const handleImport = async () => {
    if (!preset) return;
    
    try {
      // localStorage에 저장
      const presets = JSON.parse(localStorage.getItem("language-presets") || "[]");
      
      const newPreset = {
        name: `${preset.name} (갤러리)`,
        rules: preset.rules,
        importedFrom: "gallery",
        importedAt: new Date().toISOString(),
      };
      
      presets.push(newPreset);
      localStorage.setItem("language-presets", JSON.stringify(presets));
      
      await showAlert(`"${preset.name}" 프리셋을 불러왔습니다!`, "success");
      
      // 메인 페이지로 이동하여 적용
      setTimeout(() => {
        router.push("/?preset=" + encodeURIComponent(preset.name));
      }, 1500);
      
    } catch (error) {
      await showAlert("프리셋 불러오기에 실패했습니다", "error");
    }
  };

  if (!preset) {
    return (
      <div className="gallery-page">
        {AlertComponent}
        <div className="max-w-4xl mx-auto p-6">
          <div className="loading-spinner">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      {AlertComponent}
      
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* 헤더 */}
        <div className="gallery-detail-header">
          <button 
            className="btn-3d btn-secondary"
            onClick={() => router.push("/gallery")}
          >
            ← 갤러리로
          </button>
        </div>

        {/* 프리셋 정보 */}
        <div className="card-3d gallery-detail-card">
          <div className="gallery-detail-top">
            <div className="gallery-detail-avatar">
              {preset.authorAvatar || "👤"}
            </div>
            <div className="gallery-detail-info">
              <h1 className="gallery-detail-title">{preset.name}</h1>
              <div className="gallery-detail-meta">
                <span>by {preset.author}</span>
                <span>•</span>
                <span>{preset.category}</span>
                <span>•</span>
                <span>⭐ {preset.rating}</span>
                <span>•</span>
                <span>⬇️ {preset.downloads}</span>
              </div>
            </div>
            <button
              className="btn-3d btn-primary gallery-detail-import-btn"
              onClick={handleImport}
            >
              💾 불러오기
            </button>
          </div>

          <p className="gallery-detail-description">{preset.description}</p>

          <div className="gallery-detail-tags">
            {preset.tags.map((tag, idx) => (
              <span key={idx} className="gallery-tag">#{tag}</span>
            ))}
          </div>
        </div>

        {/* 테스트 영역 */}
        <div className="card-3d">
          <h2 className="section-title">🧪 미리보기 테스트</h2>
          <div className="gallery-test-area">
            <input
              type="text"
              className="gallery-test-input"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="테스트할 문장을 입력하세요"
            />
            <button className="btn-3d" onClick={handleTest}>
              변환
            </button>
          </div>
          {testOutput && (
            <div className="gallery-test-output">
              <strong>결과:</strong> {testOutput}
            </div>
          )}
        </div>

        {/* 규칙 목록 */}
        <div className="card-3d">
          <h2 className="section-title">📋 변환 규칙 ({preset.rulesCount}개)</h2>
          <div className="gallery-rules-table">
            <table className="table-3d w-full">
              <thead>
                <tr>
                  <th>FROM</th>
                  <th>→</th>
                  <th>TO</th>
                </tr>
              </thead>
              <tbody>
                {preset.rules.map((rule, idx) => (
                  <tr key={idx}>
                    <td>{rule.from}</td>
                    <td>→</td>
                    <td className="gallery-rule-to">{rule.to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 상세 설명 */}
        {preset.fullDescription && (
          <div className="card-3d">
            <h2 className="section-title">📖 상세 설명</h2>
            <div className="gallery-full-description">
              {preset.fullDescription.split('\n').map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        )}

        {/* 리뷰 */}
        {preset.reviews && preset.reviews.length > 0 && (
          <div className="card-3d">
            <h2 className="section-title">💬 사용자 리뷰 ({preset.reviews.length})</h2>
            <div className="gallery-reviews">
              {preset.reviews.map((review, idx) => (
                <div key={idx} className="gallery-review-item">
                  <div className="gallery-review-header">
                    <span className="gallery-review-author">{review.author}</span>
                    <span className="gallery-review-rating">
                      {"⭐".repeat(review.rating)}
                    </span>
                  </div>
                  <p className="gallery-review-comment">{review.comment}</p>
                  <span className="gallery-review-date">{review.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 하단 액션 */}
        <div className="gallery-detail-actions">
          <button
            className="btn-3d btn-primary btn-large"
            onClick={handleImport}
          >
            💾 이 언어 불러오기
          </button>
          <button
            className="btn-3d btn-large"
            onClick={() => router.push("/gallery")}
          >
            ← 다른 언어 보기
          </button>
        </div>
      </div>
    </div>
  );
}

