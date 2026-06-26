"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCustomAlert } from "../../components/CustomAlert";
import "../gallery.css";

const CASES = [
  {
    id: 1,
    name: "판타지 말투",
    category: "창작",
    purpose: "소설과 세계관 문장에 어울리는 어조를 만드는 예시",
    description:
      "일반적인 인사를 조금 과장된 판타지 어조로 바꾸는 방식입니다. 짧은 치환과 접미 패턴을 섞어 분위기를 유지합니다.",
    rules: [
      { from: "안녕하세요", to: "안녕하신가요, 여행자여" },
      { from: "습니다", to: "옵니다" },
      { from: "요", to: "여" },
      { from: "친구", to: "동료" },
      { from: "오늘", to: "이날" },
      { from: "같이", to: "함께" },
      { from: "가자", to: "나아가자" },
      { from: "좋아", to: "좋도다" },
    ],
    sampleInput: "안녕하세요 오늘 같이 가자",
    sampleOutput: "안녕하신가요, 여행자여 이날 함께 나아가자",
    notes: [
      "짧은 문장 테스트에 적합",
      "캐릭터 말투 실험용",
      "접미 규칙과 잘 맞음",
    ],
  },
  {
    id: 2,
    name: "은어 치환",
    category: "메신저",
    purpose: "친구끼리만 이해할 수 있는 가벼운 표현 변형 예시",
    description:
      "반복되는 단어를 약어와 기호로 바꾸어 빠르게 입력할 수 있게 만드는 구조입니다.",
    rules: [
      { from: "오늘", to: "ㅇㄴ" },
      { from: "저녁", to: "ㅈㄴ" },
      { from: "만날래", to: "ㅁㄴㄹ" },
      { from: "너", to: "ㄴ" },
      { from: "나", to: "ㄴㅏ" },
      { from: "같이", to: "ㄱㅊ" },
      { from: "어때", to: "ㅇㄸ" },
      { from: "가능", to: "ㄱㄴ" },
    ],
    sampleInput: "오늘 저녁에 만날래?",
    sampleOutput: "ㅇㄴ ㅈㄴ에 ㅁㄴㄹ?",
    notes: [
      "메신저 문장에 적합",
      "짧은 치환 비중이 큼",
      "기호 규칙과 함께 쓰기 좋음",
    ],
  },
  {
    id: 3,
    name: "암호풍 텍스트",
    category: "보안",
    purpose: "일부 문자만 바꿔도 낯설게 보이도록 만드는 예시",
    description:
      "원문을 완전히 숨기기보다, 외형을 바꾸어 메시지를 구분하기 어렵게 만드는 스타일입니다.",
    rules: [
      { from: "e", to: "3" },
      { from: "a", to: "4" },
      { from: "s", to: "5" },
      { from: "o", to: "0" },
      { from: "t", to: "7" },
      { from: "i", to: "1" },
      { from: "Secret", to: "5ecr3t" },
      { from: "message", to: "m3ss4g3" },
    ],
    sampleInput: "Secret message",
    sampleOutput: "5ecr3t m3ss4g3",
    notes: [
      "학습용으로 이해하기 쉬움",
      "대체 문자 규칙 확인",
      "가볍게 변형하는 사례",
    ],
  },
  {
    id: 4,
    name: "이모지 룩업",
    category: "표현",
    purpose: "감정이나 단어를 이모지로 바꾸어 시각적 효과를 주는 예시",
    description:
      "텍스트를 거의 줄이지 않고도 분위기를 바꾸는 방식입니다. 읽기 쉬움과 시각적 재미를 같이 노립니다.",
    rules: [
      { from: "기분이 좋아", to: "기분이 😄 좋아" },
      { from: "행복", to: "😊" },
      { from: "축하", to: "🎉" },
      { from: "사랑", to: "❤️" },
      { from: "여행", to: "✈️" },
      { from: "맛있다", to: "😋" },
      { from: "고마워", to: "🙏" },
      { from: "최고", to: "🌟" },
    ],
    sampleInput: "기분이 좋아 오늘은 여행 가자",
    sampleOutput: "기분이 😄 좋아 오늘은 ✈️ 가자",
    notes: [
      "SNS 문구에 적합",
      "시각적 변환 강조",
      "간단한 규칙으로 구성",
    ],
  },
  {
    id: 5,
    name: "가역 변환",
    category: "연습",
    purpose: "encode와 decode를 모두 확인하기 위한 연습용 예시",
    description:
      "변형 후 다시 원문으로 돌아오는지 확인하는 데 초점을 둡니다. 복잡한 규칙보다 역변환 가능성이 중요합니다.",
    rules: [
      { from: "H", to: "S" },
      { from: "E", to: "V" },
      { from: "L", to: "O" },
      { from: "O", to: "L" },
      { from: "W", to: "D" },
      { from: "R", to: "I" },
      { from: "D", to: "W" },
      { from: "HELLO", to: "SVOOL" },
    ],
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
    rules: [
      { from: "회의는 오후 3시입니다", to: "ㅎㅇ는 ㅇㅎ 3시입니다" },
      { from: "감사합니다", to: "ㄳ" },
      { from: "확인했습니다", to: "ㅎㅇ" },
      { from: "잠시만요", to: "ㅈㅁ" },
      { from: "도와주세요", to: "ㄷㅈ" },
      { from: "가능할까요", to: "ㄱㄴ?" },
      { from: "내일 봐요", to: "ㄴㅇ ㅂㅇ" },
      { from: "지금 갑니다", to: "ㅈㄱ ㄱㄴ" },
    ],
    sampleInput: "회의는 오후 3시입니다",
    sampleOutput: "ㅎㅇ는 ㅇㅎ 3시입니다",
    notes: ["문장 단축용", "반복 입력에 유리", "실전 사용 예시로 보기 좋음"],
  },
];

export default function PresetDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { showAlert, AlertComponent } = useCustomAlert();
  const [preset, setPreset] = useState(null);
  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState("");

  const id = useMemo(() => Number(params.id), [params.id]);

  useEffect(() => {
    const found = CASES.find((item) => item.id === id);
    if (!found) {
      showAlert("사례를 찾을 수 없습니다.", "error");
      router.push("/gallery");
      return;
    }
    setPreset(found);
    setTestInput(found.sampleInput);
    setTestOutput(found.sampleOutput);
  }, [id, router, showAlert]);

  const handleTest = () => {
    if (!preset) return;

    let result = testInput;
    preset.rules.forEach((rule) => {
      result = result.split(rule.from).join(rule.to);
    });
    setTestOutput(result);
  };

  if (!preset) {
    return (
      <div className="gallery-page">
        {AlertComponent}
        <div className="max-w-4xl mx-auto p-6">
          <div className="card-3d p-6">사례를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      {AlertComponent}

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="gallery-detail-header">
          <button className="btn-3d btn-secondary" onClick={() => router.push("/gallery")}>
            사례 목록으로
          </button>
        </div>

        <div className="card-3d gallery-detail-card">
          <div className="gallery-detail-info">
            <h1 className="gallery-detail-title">{preset.name}</h1>
            <div className="gallery-detail-meta">
              <span>{preset.category}</span>
              <span>규칙 {preset.rules.length}개</span>
            </div>
          </div>
          <p className="gallery-detail-description">{preset.description}</p>
          <p className="text-sm opacity-80 mt-4">{preset.purpose}</p>
          <div className="gallery-detail-tags mt-4">
            {preset.notes.map((note) => (
              <span key={note} className="gallery-tag">
                {note}
              </span>
            ))}
          </div>
        </div>

        <div className="card-3d p-6 space-y-4">
          <h2 className="section-title">예시 테스트</h2>
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
          <div className="gallery-test-output">
            <strong>출력:</strong> {testOutput}
          </div>
        </div>

        <div className="card-3d p-6">
          <h2 className="section-title">규칙 목록</h2>
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
                {preset.rules.map((rule) => (
                  <tr key={`${rule.from}-${rule.to}`}>
                    <td>{rule.from}</td>
                    <td>→</td>
                    <td className="gallery-rule-to">{rule.to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="gallery-share-section">
          <div className="gallery-share-card">
            <h3>이 사례를 활용하는 방법</h3>
            <p>
              비슷한 예시를 직접 만들어 보려면, 먼저 3~5개의 핵심 규칙만 복사해 테스트하고, 그 다음에
              접두/접미 규칙을 추가하는 방식이 안전합니다.
            </p>
            <button
              className="btn-3d btn-primary"
              onClick={() => showAlert("이 예시를 메인 규칙집의 출발점으로 활용해 보세요.", "info")}
            >
              활용 팁 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
