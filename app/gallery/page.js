"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomAlert } from "../components/CustomAlert";
import Logo3D from "../components/Logo3D";
import { safeLocalStorageGet } from "../utils/storage";
import "./gallery.css";

const CASES = [
  {
    id: 1,
    name: "판타지 말투",
    category: "창작",
    purpose: "소설과 세계관 문장에 어울리는 어조를 만드는 예시",
    description:
      "일반적인 인사를 조금 과장된 판타지 어조로 바꾸는 방식입니다. 짧은 치환과 접미 패턴을 섞어 분위기를 유지합니다.",
    rulesCount: 10,
    sampleInput: "안녕하세요",
    sampleOutput: "안녕하신가요, 여행자여",
    notes: ["짧은 문장 테스트에 적합", "캐릭터 말투 실험용", "접미 규칙과 잘 맞음"],
  },
  {
    id: 2,
    name: "은어 치환",
    category: "메신저",
    purpose: "친구끼리만 이해할 수 있는 가벼운 표현 변형 예시",
    description:
      "반복되는 단어를 약어와 기호로 바꾸어 빠르게 입력할 수 있게 만드는 구조입니다.",
    rulesCount: 14,
    sampleInput: "오늘 저녁에 만날래?",
    sampleOutput: "ㅇㄴ ㅈㄴㅇ ㅁㄴㄹ?",
    notes: ["메신저 문장에 적합", "짧은 치환 비중이 큼", "기호 규칙과 함께 쓰기 좋음"],
  },
  {
    id: 3,
    name: "암호풍 텍스트",
    category: "보안",
    purpose: "일부 문자만 바꿔도 낯설게 보이도록 만드는 예시",
    description:
      "원문을 완전히 숨기기보다, 외형을 바꾸어 메시지를 구분하기 어렵게 만드는 스타일입니다.",
    rulesCount: 18,
    sampleInput: "Secret message",
    sampleOutput: "5ecr3t m3ss4g3",
    notes: ["학습용으로 이해하기 쉬움", "대체 문자 규칙 확인", "가볍게 변형하는 사례"],
  },
  {
    id: 4,
    name: "이모지 룩업",
    category: "표현",
    purpose: "감정이나 단어를 이모지로 바꾸어 시각적 효과를 주는 예시",
    description:
      "텍스트를 거의 줄이지 않고도 분위기를 바꾸는 방식입니다. 읽기 쉬움과 시각적 재미를 같이 노립니다.",
    rulesCount: 12,
    sampleInput: "기분이 좋아",
    sampleOutput: "기분이 😄 좋아",
    notes: ["SNS 문구에 적합", "시각적 변환 강조", "간단한 규칙으로 구성"],
  },
  {
    id: 5,
    name: "가역 변환",
    category: "연습",
    purpose: "encode와 decode를 모두 확인하기 위한 연습용 예시",
    description:
      "변형 후 다시 원문으로 돌아오는지 확인하는 데 초점을 둡니다. 복잡한 규칙보다 역변환 가능성이 중요합니다.",
    rulesCount: 20,
    sampleInput: "HELLO WORLD",
    sampleOutput: "SVOOL DLIOW",
    notes: ["되돌리기 테스트용", "규칙 순서 검증", "연습에 가장 안전함"],
  },
  {
    id: 6,
    name: "짧은 약어집",
    category: "학습",
    purpose: "반복 문장을 줄여 입력 시간을 아끼는 예시",
    description:
      "자주 쓰는 문장을 짧은 기호나 초성으로 바꾸는 구조입니다. 실사용성 측면에서 가장 많이 응용됩니다.",
    rulesCount: 16,
    sampleInput: "회의는 오후 3시입니다",
    sampleOutput: "ㅎㅇ는 ㅇㅎ 3시입니다",
    notes: ["문장 단축용", "반복 입력에 유리", "실전 사용 예시로 보기 좋음"],
  },
];

const CATEGORIES = ["전체", "창작", "메신저", "보안", "표현", "연습", "학습"];

export default function GalleryPage() {
  const router = useRouter();
  const { showAlert, AlertComponent } = useCustomAlert();
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [savedPresets, setSavedPresets] = useState([]);

  useEffect(() => {
    try {
      const saved = safeLocalStorageGet("language-presets", "[]");
      const parsed = saved ? JSON.parse(saved) : [];
      if (Array.isArray(parsed)) {
        setSavedPresets(parsed);
      }
    } catch (error) {
      console.warn("저장 프리셋 로드 실패:", error);
      setSavedPresets([]);
    }
  }, []);

  const filteredCases = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return [...CASES]
      .filter((item) => {
        if (selectedCategory !== "전체" && item.category !== selectedCategory) {
          return false;
        }

        if (!query) return true;

        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.purpose.toLowerCase().includes(query) ||
          item.notes.some((note) => note.toLowerCase().includes(query))
        );
      })
      .sort((a, b) => {
        if (sortBy === "rules") return b.rulesCount - a.rulesCount;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return a.id - b.id;
      });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="gallery-page">
      {AlertComponent}

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="gallery-header">
          <button className="btn-3d btn-secondary" onClick={() => router.push("/")}>
            메인으로
          </button>

          <Logo3D
            title="Example Gallery"
            subtitle="실제 사용 예시와 규칙 설계 방식을 살펴보는 사례 라이브러리"
          />
        </div>

        <section className="card-3d p-6 space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-2">Gallery</p>
            <h1 className="text-3xl font-black text-slate-900 mb-3">사례 라이브러리</h1>
            <p className="text-slate-700 leading-7 max-w-3xl">
              이 페이지는 다운로드 수나 순위처럼 가짜 지표를 보여주지 않습니다. 어떤 목적의 규칙집이 어떤 식으로
              동작하는지 보여주는 편집형 사례 모음입니다.
            </p>
          </div>

          <div className="gallery-controls">
            <div className="gallery-search">
              <input
                type="text"
                className="gallery-search-input"
                placeholder="예시 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="gallery-search-icon">검색</span>
            </div>

            <select
              className="gallery-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">기본 순서</option>
              <option value="rules">규칙 수 많은 순</option>
              <option value="name">이름순</option>
            </select>
          </div>

          <div className="gallery-categories">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`gallery-category-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="card-3d p-6 space-y-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-2">Saved data</p>
              <h2 className="text-2xl font-black text-slate-900">내가 저장한 프리셋</h2>
            </div>
            <button
              className="btn-3d btn-secondary"
              onClick={() => router.push("/")}
            >
              메인에서 불러오기
            </button>
          </div>

          {savedPresets.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-700 leading-7">
              아직 저장된 프리셋이 없습니다. 메인 화면에서 규칙을 저장한 뒤 다시 오면 실제 데이터가 표시됩니다.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {savedPresets.slice(0, 4).map((preset) => (
                <article key={`${preset.name}-${preset.createdAt || ""}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{preset.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {preset.createdAt ? new Date(preset.createdAt).toLocaleDateString() : "날짜 정보 없음"}
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {preset.rules?.length || 0}개 규칙
                    </span>
                  </div>

                  <p className="mt-4 text-slate-700 leading-7">
                    {preset.rules?.length
                      ? `저장된 규칙을 기반으로 빠르게 다시 불러올 수 있는 실제 사용자 데이터입니다.`
                      : "규칙 데이터가 비어 있습니다."}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <button
                      className="btn-3d btn-primary"
                      onClick={() => router.push("/")}
                    >
                      홈에서 사용
                    </button>
                    <button
                      className="btn-3d"
                      onClick={() => showAlert("메인 화면의 프리셋 모달에서 저장된 규칙을 확인할 수 있습니다.", "info")}
                    >
                      확인 방법
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <div className="gallery-results-count">
          {filteredCases.length}개의 사례를 표시합니다
        </div>

        <div className="gallery-grid">
          {filteredCases.map((item) => (
            <article key={item.id} className="gallery-card">
              <div className="gallery-card-header">
                <div className="gallery-card-category">{item.category}</div>
                <div className="gallery-card-rating">규칙 {item.rulesCount}개</div>
              </div>

              <h3 className="gallery-card-title">{item.name}</h3>
              <p className="gallery-card-description">{item.description}</p>

              <div className="gallery-card-preview">
                <strong>목적:</strong>
                <p>{item.purpose}</p>
              </div>

              <div className="gallery-card-preview">
                <strong>미리보기</strong>
                <div className="text-sm mt-2 space-y-1">
                  <div>
                    <span className="font-semibold">입력:</span> {item.sampleInput}
                  </div>
                  <div>
                    <span className="font-semibold">출력:</span> {item.sampleOutput}
                  </div>
                </div>
              </div>

              <div className="gallery-card-tags">
                {item.notes.map((note) => (
                  <span key={note} className="gallery-tag">
                    {note}
                  </span>
                ))}
              </div>

              <div className="gallery-card-actions">
                <button
                  className="btn-3d btn-primary gallery-btn"
                  onClick={() =>
                    showAlert(`"${item.name}" 예시를 기준으로 규칙을 구성해 보세요.`, "info")
                  }
                >
                  참고하기
                </button>
                <button
                  className="btn-3d gallery-btn"
                  onClick={() => router.push(`/gallery/${item.id}`)}
                >
                  상세 보기
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="gallery-empty">
            <div className="gallery-empty-icon">검색</div>
            <h3>일치하는 사례가 없습니다</h3>
            <p>카테고리를 바꾸거나 검색어를 지워 보세요.</p>
          </div>
        )}

        <section className="gallery-share-section">
          <div className="gallery-share-card">
            <h3>이런 사례를 더 추가할 수 있습니다</h3>
            <p>
              실제 사용한 규칙집을 정리해 두면, 창작용/학습용/메신저용으로 나누어 재사용하기 쉬워집니다.
            </p>
            <button
              className="btn-3d btn-primary"
              onClick={() => showAlert("사례를 추가하려면 실제 규칙과 사용 목적이 함께 있어야 합니다.", "info")}
            >
              사례 작성 팁 보기
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
