"use client";

import { useState } from "react";

/**
 * 📱 모바일 단어 학습기
 */
export default function MobileLearnRule({ setRules, showAlert, onBack }) {
  const [step, setStep] = useState(1);
  const [original, setOriginal] = useState("");
  const [translated, setTranslated] = useState("");
  const [learnedRules, setLearnedRules] = useState([]);

  // 학습 실행
  const handleLearn = () => {
    if (!original.trim()) {
      showAlert("원문 문장을 입력해주세요", "warning");
      return;
    }

    if (!translated.trim()) {
      showAlert("변환된 문장을 입력해주세요", "warning");
      return;
    }

    const oWords = original.trim().split(/\s+/);
    const tWords = translated.trim().split(/\s+/);

    if (oWords.length !== tWords.length) {
      showAlert("두 문장의 단어 개수가 일치해야 합니다", "error");
      return;
    }

    const learned = oWords.map((w, i) => ({
      from: w,
      to: tWords[i],
    }));

    setLearnedRules(learned);
    setStep(2);
  };

  // 규칙 적용
  const handleApply = async () => {
    setRules(learnedRules, "🧠 단어 규칙 학습");
    await showAlert(`${learnedRules.length}개 규칙이 학습되었습니다!`, "success");
    onBack();
  };

  // 단계 1: 입력
  if (step === 1) {
    return (
      <div className="mobile-learn-container">
        <div className="mobile-section-header">
          <button className="mobile-back-btn" onClick={onBack}>
            ← 돌아가기
          </button>
          <h2 className="mobile-section-title">단어 학습기</h2>
        </div>

        <div className="mobile-learn-guide">
          <div className="mobile-learn-guide-icon">🧠</div>
          <h3>문장에서 규칙 학습하기</h3>
          <p>원문과 변환된 문장을 입력하면 자동으로 단어별 규칙을 학습합니다</p>
        </div>

        <div className="mobile-learn-example">
          <strong>예시:</strong>
          <div className="mobile-learn-example-text">
            원문: <code>나는 오늘 커피를 마신다</code>
          </div>
          <div className="mobile-learn-example-text">
            변환: <code>do rafa kema lozi</code>
          </div>
          <div className="mobile-learn-example-arrow">↓</div>
          <div className="mobile-learn-example-result">
            자동 학습: 나는→do, 오늘→rafa, 커피를→kema, 마신다→lozi
          </div>
        </div>

        <div className="mobile-form-group">
          <label className="mobile-form-label">원문 문장</label>
          <textarea
            className="mobile-form-textarea"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="예: 나는 오늘 커피를 마신다"
            rows={3}
          />
        </div>

        <div className="mobile-form-group">
          <label className="mobile-form-label">변환된 문장</label>
          <textarea
            className="mobile-form-textarea"
            value={translated}
            onChange={(e) => setTranslated(e.target.value)}
            placeholder="예: do rafa kema lozi"
            rows={3}
          />
        </div>

        <button
          className="mobile-btn mobile-btn-primary"
          onClick={handleLearn}
        >
          🧠 규칙 학습하기
        </button>
      </div>
    );
  }

  // 단계 2: 결과 확인 및 적용
  return (
    <div className="mobile-learn-container">
      <div className="mobile-section-header">
        <button className="mobile-back-btn" onClick={() => setStep(1)}>
          ← 다시 입력
        </button>
        <h2 className="mobile-section-title">학습 결과</h2>
      </div>

      <div className="mobile-learn-success">
        <div className="mobile-learn-success-icon">✅</div>
        <h3>{learnedRules.length}개 규칙 학습 완료!</h3>
      </div>

      <div className="mobile-learn-results">
        {learnedRules.map((rule, idx) => (
          <div key={idx} className="mobile-learn-result-item">
            <span className="mobile-learn-result-num">#{idx + 1}</span>
            <span className="mobile-learn-result-from">{rule.from}</span>
            <span className="mobile-learn-result-arrow">→</span>
            <span className="mobile-learn-result-to">{rule.to}</span>
          </div>
        ))}
      </div>

      <button
        className="mobile-btn mobile-btn-primary"
        onClick={handleApply}
      >
        ✨ 규칙 적용하기
      </button>
    </div>
  );
}

