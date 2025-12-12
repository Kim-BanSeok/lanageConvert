"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomAlert } from "../components/CustomAlert";
import { useIsMobile } from "../hooks/useMediaQuery";
import Logo3D from "../components/Logo3D";
import "./gallery.css";

/**
 * 🖼️ 언어 갤러리 페이지
 * 사용자가 만든 언어 프리셋을 공유하고 탐색
 */

// 샘플 갤러리 데이터 (실제로는 백엔드 API에서 가져올 데이터)
const SAMPLE_PRESETS = [
  {
    id: 1,
    name: "엘프어",
    description: "판타지 엘프들이 사용하는 우아한 언어",
    author: "FantasyLover",
    rulesCount: 26,
    downloads: 342,
    rating: 4.8,
    category: "판타지",
    tags: ["엘프", "판타지", "우아함"],
    preview: "Hello → Hëllö, World → Wörld",
    createdAt: "2024-12-10",
  },
  {
    id: 2,
    name: "사이버펑크 슬랭",
    description: "미래 도시의 길거리 은어",
    author: "CyberNinja",
    rulesCount: 45,
    downloads: 521,
    rating: 4.9,
    category: "SF",
    tags: ["미래", "슬랭", "사이버펑크"],
    preview: "Hello → H3ll0, Friend → Fr13nd",
    createdAt: "2024-12-09",
  },
  {
    id: 3,
    name: "고대 룬 문자",
    description: "북유럽 신화에서 영감을 받은 룬 문자",
    author: "RuneMaster",
    rulesCount: 24,
    downloads: 287,
    rating: 4.7,
    category: "고대",
    tags: ["룬", "신화", "고대"],
    preview: "Love → ᛚᛟᚡᛖ, Power → ᛈᛟᚹᛖᚱ",
    createdAt: "2024-12-08",
  },
  {
    id: 4,
    name: "귀여운 이모지 언어",
    description: "모든 단어를 이모지로 변환",
    author: "EmojiQueen",
    rulesCount: 52,
    downloads: 892,
    rating: 5.0,
    category: "재미",
    tags: ["이모지", "귀여움", "재미"],
    preview: "Hello → 👋😊, Love → 💖💕",
    createdAt: "2024-12-11",
  },
  {
    id: 5,
    name: "비밀 암호",
    description: "군사 암호에서 영감을 받은 강력한 암호 체계",
    author: "CodeBreaker",
    rulesCount: 89,
    downloads: 645,
    rating: 4.6,
    category: "보안",
    tags: ["암호", "보안", "군사"],
    preview: "Secret → X3cR3t, Message → M3$$@g3",
    createdAt: "2024-12-07",
  },
  {
    id: 6,
    name: "K-Pop 팬 언어",
    description: "K-Pop 팬들을 위한 특별한 언어",
    author: "KpopStan",
    rulesCount: 31,
    downloads: 756,
    rating: 4.9,
    category: "문화",
    tags: ["K-Pop", "팬덤", "한국"],
    preview: "Love → 사랑, Star → 별",
    createdAt: "2024-12-12",
  },
];

const CATEGORIES = ["전체", "판타지", "SF", "고대", "재미", "보안", "문화"];

export default function GalleryPage() {
  const router = useRouter();
  const { showAlert, AlertComponent } = useCustomAlert();
  const isMobile = useIsMobile();
  
  const [presets, setPresets] = useState(SAMPLE_PRESETS);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular"); // popular, recent, rating

  // 필터링 및 정렬
  const filteredPresets = presets
    .filter(preset => {
      // 카테고리 필터
      if (selectedCategory !== "전체" && preset.category !== selectedCategory) {
        return false;
      }
      
      // 검색 필터
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          preset.name.toLowerCase().includes(query) ||
          preset.description.toLowerCase().includes(query) ||
          preset.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "popular") return b.downloads - a.downloads;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "recent") return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  // 프리셋 불러오기
  const handleImportPreset = async (preset) => {
    await showAlert(`"${preset.name}" 프리셋을 불러오는 기능은 곧 추가됩니다!`, "info");
    // TODO: 실제 프리셋 데이터를 가져와서 localStorage에 저장
  };

  return (
    <div className="gallery-page">
      {AlertComponent}
      
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* 헤더 */}
        <div className="gallery-header">
          <button 
            className="btn-3d btn-secondary"
            onClick={() => router.push("/")}
          >
            ← 돌아가기
          </button>
          
          <Logo3D 
            title="Language Gallery"
            subtitle="다른 사용자들이 만든 언어를 탐색하고 사용해보세요"
          />
        </div>

        {/* 검색 및 필터 */}
        <div className="gallery-controls">
          {/* 검색 */}
          <div className="gallery-search">
            <input
              type="text"
              className="gallery-search-input"
              placeholder="언어 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="gallery-search-icon">🔍</span>
          </div>

          {/* 정렬 */}
          <select
            className="gallery-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popular">인기순</option>
            <option value="recent">최신순</option>
            <option value="rating">평점순</option>
          </select>
        </div>

        {/* 카테고리 필터 */}
        <div className="gallery-categories">
          {CATEGORIES.map(category => (
            <button
              key={category}
              className={`gallery-category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 결과 개수 */}
        <div className="gallery-results-count">
          {filteredPresets.length}개의 언어를 찾았습니다
        </div>

        {/* 프리셋 그리드 */}
        <div className="gallery-grid">
          {filteredPresets.map(preset => (
            <div key={preset.id} className="gallery-card">
              <div className="gallery-card-header">
                <div className="gallery-card-category">{preset.category}</div>
                <div className="gallery-card-rating">
                  ⭐ {preset.rating}
                </div>
              </div>

              <h3 className="gallery-card-title">{preset.name}</h3>
              <p className="gallery-card-description">{preset.description}</p>

              <div className="gallery-card-preview">
                <strong>미리보기:</strong>
                <code>{preset.preview}</code>
              </div>

              <div className="gallery-card-tags">
                {preset.tags.map((tag, idx) => (
                  <span key={idx} className="gallery-tag">#{tag}</span>
                ))}
              </div>

              <div className="gallery-card-meta">
                <div className="gallery-meta-item">
                  <span className="gallery-meta-icon">👤</span>
                  <span>{preset.author}</span>
                </div>
                <div className="gallery-meta-item">
                  <span className="gallery-meta-icon">📋</span>
                  <span>{preset.rulesCount}개 규칙</span>
                </div>
                <div className="gallery-meta-item">
                  <span className="gallery-meta-icon">⬇️</span>
                  <span>{preset.downloads}</span>
                </div>
              </div>

              <div className="gallery-card-actions">
                <button
                  className="btn-3d btn-primary gallery-btn"
                  onClick={() => handleImportPreset(preset)}
                >
                  💾 불러오기
                </button>
                <button
                  className="btn-3d gallery-btn"
                  onClick={() => router.push(`/gallery/${preset.id}`)}
                >
                  👁️ 상세
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 빈 상태 */}
        {filteredPresets.length === 0 && (
          <div className="gallery-empty">
            <div className="gallery-empty-icon">🔍</div>
            <h3>검색 결과가 없습니다</h3>
            <p>다른 키워드로 검색해보세요</p>
          </div>
        )}

        {/* 내 프리셋 공유 버튼 */}
        <div className="gallery-share-section">
          <div className="gallery-share-card">
            <h3>나만의 언어를 공유하세요!</h3>
            <p>당신이 만든 독특한 언어를 다른 사용자들과 함께 나눠보세요</p>
            <button
              className="btn-3d btn-primary"
              onClick={() => showAlert("공유 기능은 곧 추가됩니다!", "info")}
            >
              📤 내 언어 공유하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
