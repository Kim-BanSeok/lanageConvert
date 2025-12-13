"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useHistory } from "./hooks/useHistory";
import { useIsMobile } from "./hooks/useMediaQuery";
import RuleRow from "./components/RuleRow";
import Logo3D from "./components/Logo3D";
import MobilePage from "./components/mobile/MobilePage";
import AIGeneratorModal from "./components/AIGeneratorModal";
import LearnRuleModal from "./components/LearnRuleModal";
import ConflictCheckerModal from "./components/ConflictCheckerModal";
import TestTranslatorModal from "./components/TestTranslatorModal";
import TTSPlayer from "./components/TTSPlayer";
import NameGenerator from "./components/NameGenerator";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";
import LanguageIdentityModal from "./components/LanguageIdentityModal";
import EvolutionModal from "./components/EvolutionModal";
import EvolutionRecommendBanner from "./components/EvolutionRecommendBanner";
import TutorialModal from "./components/TutorialModal";
import QuickGuideModal from "./components/QuickGuideModal";
import BackupRestoreModal from "./components/BackupRestoreModal";
import StorageIndicator from "./components/StorageIndicator";
import RuleSearch from "./components/RuleSearch";
import ShortcutsHelpModal from "./components/ShortcutsHelpModal";
import TranslationHistory from "./components/TranslationHistory";
import RuleStatistics from "./components/RuleStatistics";
import NavigationBar from "./components/NavigationBar";
import { useCustomAlert } from "./components/CustomAlert";
import Adsense from "./components/Adsense";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { useTheme } from "./hooks/useTheme";
import { addToHistory } from "./lib/translationHistory";
import { recordRuleUsage } from "./lib/ruleStatistics";
import { translateText } from "./lib/translationEngine";
import { translateTextV3, clearTranslationCache, getTranslationCacheSize } from "./lib/translationEngineV3";
import { addSample, loadSamples } from "./lib/evolutionEngine";
import {
  shouldRecommendEvolution,
  markRecommended,
  resetRecommendState,
} from "./lib/evolutionRecommend";
import {
  encodeText,
  decodeText,
  getLastEncodeRules,
  saveLastEncodeRules,
  getEncodeOrderFromRules,
} from "./utils/encodeDecode";
import { safeLocalStorageGet, safeLocalStorageSet } from "./utils/storage";
import { setupGlobalErrorHandler } from "./lib/errorHandler";

export default function Home() {
  const router = useRouter();
  const { showAlert, AlertComponent } = useCustomAlert();
  const isMobile = useIsMobile(); // 📱 모바일 감지

  // 🛡️ 전역 에러 핸들러 설정
  useEffect(() => {
    setupGlobalErrorHandler(showAlert);
  }, [showAlert]);
  
  // 🔄 Undo/Redo 시스템 적용
  const {
    state: rules,
    setState: setRulesWithHistory,
    undo,
    redo,
    canUndo,
    canRedo
  } = useHistory(
    [
      { from: "사랑", to: "BODO" },
      { from: "나", to: "DO" },
      { from: "가", to: "BA" },
    ],
    50 // 최대 50개 히스토리
  );

  // 기존 setRules를 Wrapper로 대체
  const setRules = useCallback((newRules, action = "규칙 변경") => {
    setRulesWithHistory(newRules, action);
  }, [setRulesWithHistory]);

  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  // v2 번역 엔진 모드 선택
  const [engineMode, setEngineMode] = useState("hybrid"); // 'substring' | 'word' | 'hybrid'

  // 프리셋 UI State
  const [showPresetModal, setShowPresetModal] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [presetList, setPresetList] = useState([]);

  // AI 생성기 모달 State
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLearnModal, setShowLearnModal] = useState(false);
  
  // AI 미리보기 상태
  const [preview, setPreview] = useState({ mode: null, data: null });

  // 언어 진화 & 네이밍 모달 State
  const [showIdentityModal, setShowIdentityModal] = useState(false);
  const [showEvolutionModal, setShowEvolutionModal] = useState(false);
  const [showEvolutionRecommend, setShowEvolutionRecommend] = useState(false);
  const [sampleCount, setSampleCount] = useState(0);
  const [learnToast, setLearnToast] = useState(false);

  // 튜토리얼 모달 State
  const [showTutorial, setShowTutorial] = useState(false);
  const [showQuickGuide, setShowQuickGuide] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);

  // 🔍 규칙 검색/필터 State
  const [filteredRules, setFilteredRules] = useState(rules);
  const [showSearch, setShowSearch] = useState(false);

  // ✏️ 프리셋 편집 State
  const [editingPresetIndex, setEditingPresetIndex] = useState(null);
  const [editingPresetName, setEditingPresetName] = useState("");

  // ⌨️ 단축키 도움말 모달
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);

  // 📜 번역 히스토리 모달
  const [showHistory, setShowHistory] = useState(false);

  // 📊 규칙 통계 모달
  const [showStatistics, setShowStatistics] = useState(false);

  // 🔍 충돌 검사기 모달
  const [showConflictChecker, setShowConflictChecker] = useState(false);

  // 🧪 테스트 번역기 모달
  const [showTestTranslator, setShowTestTranslator] = useState(false);

  // 🌓 테마
  const [theme, toggleTheme] = useTheme();

  // 생성된 언어 아이덴티티 저장(로컬)
  const [languageIdentity, setLanguageIdentity] = useState(null);

  // 클라이언트에서만 localStorage에서 로드 (Hydration 에러 방지)
  useEffect(() => {
    try {
      const saved = safeLocalStorageGet("language_identity_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        setLanguageIdentity(parsed);
      }
    } catch (error) {
      console.warn("언어 아이덴티티 로드 실패:", error);
    }

    // 첫 방문자 체크
    const hasVisited = safeLocalStorageGet("has_visited");
    if (!hasVisited) {
      // 2초 후에 튜토리얼 표시
      setTimeout(() => {
        setShowTutorial(true);
        safeLocalStorageSet("has_visited", "true");
      }, 1500);
    }
  }, []);

  // 자동 학습용 상태
  const [lastSourceText, setLastSourceText] = useState("");
  const [lastAutoTranslated, setLastAutoTranslated] = useState("");
  const [userEditedOutput, setUserEditedOutput] = useState(false);
  const [lastSavedKey, setLastSavedKey] = useState("");

  // 규칙 추가
  const addRule = () => {
    // 🔒 규칙 개수 제한 검증
    if (rules.length >= 1000) {
      showAlert("규칙은 최대 1000개까지 추가할 수 있습니다.", "error");
      return;
    }
    setRules([...rules, { from: "", to: "" }], "➕ 규칙 추가");
    
    // 🎯 Quick Win 8: 규칙 추가 시 포커스 자동 이동
    setTimeout(() => {
      const inputs = document.querySelectorAll('input[placeholder*="예: 사랑"], input[placeholder*="예:"]');
      if (inputs.length > 0) {
        const lastInput = inputs[inputs.length - 2]; // 마지막에서 두 번째 (from 필드)
        if (lastInput) lastInput.focus();
      }
    }, 50);
  };

  // 규칙 수정
  const updateRule = (index, newRule) => {
    // 🔒 규칙 검증
    const validation = validateRule(newRule);
    if (!validation.valid) {
      showAlert(validation.error || '규칙이 유효하지 않습니다.', 'error');
      return;
    }
    const updated = [...rules];
    updated[index] = newRule;
    setRules(updated, "✏️ 규칙 수정");
  };

  // 규칙 삭제
  const deleteRule = (index) => {
    const deleted = rules[index];
    setRules(
      rules.filter((_, i) => i !== index), 
      `🗑️ "${deleted.from}" 규칙 삭제`
    );
  };

  // 🎯 Phase 2-2: 드래그 앤 드롭 정렬
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newRules = [...rules];
    const [draggedItem] = newRules.splice(draggedIndex, 1);
    newRules.splice(dropIndex, 0, draggedItem);

    setRules(newRules, `📋 규칙 순서 변경 (${draggedIndex + 1} → ${dropIndex + 1})`);
    setDraggedIndex(null);
  };

  /* ---------------------------
   *   localStorage 관련 처리
   * --------------------------- */

  // localStorage에서 프리셋 불러오기
  useEffect(() => {
    try {
      const saved = safeLocalStorageGet("language-presets");
      if (saved) {
        try {
          setPresetList(JSON.parse(saved));
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error("프리셋 불러오기 실패:", error);
          }
        }
      }
    } catch (error) {
      // 스토리지 접근 불가 시 무시
      if (process.env.NODE_ENV === 'development') {
        console.warn("localStorage 접근 실패:", error);
      }
    }
  }, []);

  // 샘플 수 확인 및 진화 추천 체크
  useEffect(() => {
    try {
      const samples = loadSamples();
      const count = Array.isArray(samples) ? samples.length : 0;
      setSampleCount(count);

      if (shouldRecommendEvolution(count, 20)) {
        setShowEvolutionRecommend(true);
        markRecommended(count);
      }
    } catch (error) {
      console.warn("샘플 로드 실패:", error);
      setSampleCount(0);
    }
  }, [outputText]); // outputText 변경 시 체크

  // 오프라인 상태 감지
  useEffect(() => {
    const handleOffline = () => {
      showAlert("현재 오프라인입니다. 로컬 데이터로만 작업 가능합니다.", "info", 3000);
    };

    const handleOnline = () => {
      showAlert("인터넷 연결이 복구되었습니다.", "success", 2000);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [showAlert]);

  // AI 생성 미리보기 생성
  useEffect(() => {
    if (preview.mode === 1) {
      setPreview((p) => ({ ...p, data: generateAI_CharacterMap() }));
    } else if (preview.mode === 2) {
      setPreview((p) => ({ ...p, data: generateAI_SyllableLanguage() }));
    } else if (preview.mode === 3) {
      setPreview((p) => ({ ...p, data: generateAI_PrefixSuffix() }));
    } else if (preview.mode === 4) {
      setPreview((p) => ({ ...p, data: generateAI_Crypto() }));
    } else {
      // 모드가 없거나 초기화 시 데이터 클리어
      if (preview.mode === null && preview.data) {
        setPreview({ mode: null, data: null });
      }
    }
  }, [preview.mode]);

  // 프리셋 저장
  const savePreset = async () => {
    // 🔒 프리셋 이름 검증
    const nameValidation = validatePresetName(presetName);
    if (!nameValidation.valid) {
      await showAlert(nameValidation.error || "프리셋 이름이 유효하지 않습니다.", "error");
      return;
    }

    if (!presetName.trim()) {
      await showAlert("프리셋 이름을 입력해주세요.", "warning");
      return;
    }

    // 🎯 Quick Win 1: 프리셋 이름 중복 체크
    const trimmedName = presetName.trim();
    const isDuplicate = presetList.some(p => p.name === trimmedName);
    if (isDuplicate) {
      await showAlert(`"${trimmedName}" 이름은 이미 사용 중입니다. 다른 이름을 입력해주세요.`, "warning");
      return;
    }

    // 빈 규칙 필터링
    const validRules = rules.filter(
      (rule) => rule && rule.from && rule.from.trim() !== ""
    );

    if (validRules.length === 0) {
      await showAlert("저장할 규칙이 없습니다.", "warning");
      return;
    }

    // 🎯 Quick Win 3: localStorage 용량 체크
    try {
      const newPreset = {
        name: trimmedName,
        rules: validRules,
        createdAt: new Date().toISOString(),
      };

      const updatedList = [...presetList, newPreset];
      const dataSize = JSON.stringify(updatedList).length;
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (dataSize > maxSize * 0.8) {
        const usagePercent = ((dataSize / maxSize) * 100).toFixed(1);
        await showAlert(
          `⚠️ 저장소 사용량: ${usagePercent}%\n프리셋이 너무 많으면 데이터가 손실될 수 있습니다. 백업을 권장합니다.`, 
          "warning",
          5000
        );
      }

      setPresetList(updatedList);
      safeLocalStorageSet("language-presets", JSON.stringify(updatedList));

      await showAlert("프리셋이 저장되었습니다!", "success");
      setPresetName("");
      setShowPresetModal(false);
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        await showAlert("❌ 저장 공간이 부족합니다! 일부 프리셋을 삭제하거나 백업 후 초기화하세요.", "error", 6000);
      } else {
        throw error;
      }
    }
  };

  // 프리셋 불러오기
  const loadPreset = async (preset) => {
    if (preset.rules && preset.rules.length > 0) {
      setRules(preset.rules);
      setShowPresetModal(false);
      await showAlert(`"${preset.name}" 프리셋을 불러왔습니다.`, "success");
    } else {
      await showAlert("프리셋에 규칙이 없습니다.", "warning");
    }
  };

  // 프리셋 삭제
  const deletePreset = async (idx) => {
    const confirmed = window.confirm(`"${presetList[idx].name}" 프리셋을 삭제할까요?`);
    if (!confirmed) return;

    const updated = presetList.filter((_, i) => i !== idx);
    setPresetList(updated);
    safeLocalStorageSet("language-presets", JSON.stringify(updated));
    await showAlert("프리셋이 삭제되었습니다.", "success");
  };

  // 🎯 Phase 2-3: 프리셋 이름 변경
  const startEditPreset = (idx) => {
    setEditingPresetIndex(idx);
    setEditingPresetName(presetList[idx].name);
  };

  const savePresetName = async (idx) => {
    const newName = editingPresetName.trim();
    
    // 🔒 프리셋 이름 검증
    const nameValidation = validatePresetName(newName);
    if (!nameValidation.valid) {
      await showAlert(nameValidation.error || "프리셋 이름이 유효하지 않습니다.", "error");
      return;
    }
    
    if (!newName) {
      await showAlert("프리셋 이름을 입력해주세요.", "warning");
      return;
    }

    // 중복 체크 (자신 제외)
    const isDuplicate = presetList.some((p, i) => i !== idx && p.name === newName);
    if (isDuplicate) {
      await showAlert(`"${newName}" 이름은 이미 사용 중입니다.`, "warning");
      return;
    }

    const updated = [...presetList];
    updated[idx] = { ...updated[idx], name: newName };
    setPresetList(updated);
    safeLocalStorageSet("language-presets", JSON.stringify(updated));
    
    setEditingPresetIndex(null);
    setEditingPresetName("");
    await showAlert("프리셋 이름이 변경되었습니다.", "success");
  };

  const cancelEditPreset = () => {
    setEditingPresetIndex(null);
    setEditingPresetName("");
  };

  // 암호화 (v2/v3 엔진 자동 선택)
  const encode = async () => {
    try {
      // 🔒 입력 검증
      const inputValidation = validateTextInput(inputText);
      if (!inputValidation.valid) {
        await showAlert(inputValidation.error || "입력값이 유효하지 않습니다.", "error");
        return;
      }

      if (!inputText.trim()) {
        await showAlert("원본 텍스트를 입력해주세요.", "warning");
        return;
      }

      // 🔒 규칙 검증
      const rulesValidation = validateRules(rules);
      if (!rulesValidation.valid) {
        await showAlert(rulesValidation.error || "규칙이 유효하지 않습니다.", "error");
        return;
      }

      const validRules = rules.filter((r) => r && r.from && r.from.trim() !== "");
      if (validRules.length === 0) {
        await showAlert("변환할 규칙이 없습니다. 규칙을 추가해주세요.", "warning");
        return;
      }

      // 🚀 100개 이상 규칙 시 v3 엔진 자동 사용
      const useV3 = validRules.length >= 100;
      const engineVersion = useV3 ? "v3 (최적화)" : "v2";

      // 보안: 프로덕션에서는 디버깅 로그 제거
      if (process.env.NODE_ENV === 'development') {
        console.log(`🔐 [${engineVersion} 엔진 암호화 시작]`);
        console.log("📝 원본 텍스트:", inputText);
        console.log("🔧 엔진 모드:", engineMode);
        console.log("📋 전체 규칙:", validRules.length);
      }

      // v2 또는 v3 번역 엔진 사용
      const translationFn = useV3 ? translateTextV3 : translateText;
      const result = translationFn(inputText, validRules, {
        direction: "encode",
        mode: engineMode,
      });

      console.log("🎯 최종 암호화 결과:", result);

      // 하위 호환성을 위해 기존 방식도 추적 (복호화용)
      const { appliedRules } = encodeText(inputText, validRules);
      if (appliedRules.length > 0) {
        saveLastEncodeRules(appliedRules);
      }

      setOutputText(result);

      // 🔥 자동 학습용 기록
      setLastSourceText(inputText.trim());
      setLastAutoTranslated(result);
      setUserEditedOutput(false);

      // 📜 히스토리에 추가
      addToHistory({
        direction: 'encode',
        mode: engineMode,
        input: inputText,
        output: result,
        rulesCount: validRules.length,
        engineVersion: useV3 ? 'v3' : 'v2'
      });

      // 📊 규칙 사용 통계 기록
      recordRuleUsage(validRules, 'encode');

      await showAlert(`암호화 완료! (${engineMode} 모드, ${validRules.length}개 규칙, ${engineVersion})`, "success", 2000);
    } catch (error) {
      console.error("암호화 중 오류 발생:", error);
      await showAlert("암호화 중 오류가 발생했습니다: " + error.message, "error");
    }
  };

  // 복호화 (v2/v3 엔진 자동 선택)
  const decode = async () => {
    try {
      if (!inputText.trim()) {
        await showAlert("원본 텍스트를 입력해주세요.", "warning");
        return;
      }

      // 암호화 시 실제로 적용된 규칙 불러오기
      let appliedRules = getLastEncodeRules();

      // 저장된 규칙이 없으면 전체 규칙 사용 (하위 호환성)
      if (appliedRules.length === 0) {
        appliedRules = getEncodeOrderFromRules(rules);
      }

      const validRules = appliedRules.filter((r) => r && ((r.from && r.from.trim()) || (r.to && r.to.trim())));
      if (validRules.length === 0) {
        await showAlert("복호화할 규칙이 없습니다. 규칙을 추가해주세요.", "warning");
        return;
      }

      // 🚀 100개 이상 규칙 시 v3 엔진 자동 사용
      const useV3 = validRules.length >= 100;
      const engineVersion = useV3 ? "v3 (최적화)" : "v2";

      console.log(`🔓 [${engineVersion} 엔진 복호화 시작]`);
      console.log("📝 암호화된 텍스트:", inputText);
      console.log("🔧 엔진 모드:", engineMode);
      console.log("📋 규칙 개수:", validRules.length);

      // v2 또는 v3 번역 엔진 사용
      const translationFn = useV3 ? translateTextV3 : translateText;
      const result = translationFn(inputText, validRules, {
        direction: "decode",
        mode: engineMode,
      });

      if (process.env.NODE_ENV === 'development') {
        console.log("🎯 최종 복호화 결과:", result);
      }
      setOutputText(result);

      // 📜 히스토리에 추가
      addToHistory({
        direction: 'decode',
        mode: engineMode,
        input: inputText,
        output: result,
        rulesCount: validRules.length,
        engineVersion: useV3 ? 'v3' : 'v2'
      });

      // 📊 규칙 사용 통계 기록
      recordRuleUsage(validRules, 'decode');

      await showAlert(`복호화 완료! (${engineMode} 모드, ${validRules.length}개 규칙, ${engineVersion})`, "success", 2000);
    } catch (error) {
      console.error("복호화 중 오류 발생:", error);
      await showAlert("복호화 중 오류가 발생했습니다: " + error.message, "error");
    }
  };

  // ⌨️ 키보드 단축키 설정 (encode/decode 함수 정의 후)
  useKeyboardShortcuts({
    onEncode: encode,
    onDecode: decode,
    onSavePreset: () => setShowPresetModal(true),
    onAddRule: addRule,
    onSearch: () => setShowSearch(prev => !prev),
    onHelp: () => setShowQuickGuide(true),
    onBackup: () => setShowBackupModal(true),
  });

  // 결과 복사
  const copyResult = async () => {
    if (!outputText.trim()) {
      await showAlert("복사할 결과가 없습니다.", "warning");
      return;
    }
    try {
      await navigator.clipboard.writeText(outputText);
      await showAlert("결과가 복사되었습니다!", "success", 2000);
    } catch (error) {
      console.error("복사 실패:", error);
      await showAlert("복사에 실패했습니다. 브라우저 권한을 확인해주세요.", "error");
    }
  };

  // 텍스트 swap
  const swapText = () => {
    setInputText(outputText);
    setOutputText(inputText);
  };

  // 랜덤 언어 생성 (영어 + 한글)
  const generateRandomAlphabet = () => {
    // 영어 알파벳
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    
    // 자주 쓰는 한글 글자들 (가나다순)
    const koreanChars = [
      "가", "나", "다", "라", "마", "바", "사", "아", "자", "차", "카", "타", "파", "하",
      "거", "너", "더", "러", "머", "버", "서", "어", "저", "처", "커", "터", "퍼", "허",
      "고", "노", "도", "로", "모", "보", "소", "오", "조", "초", "코", "토", "포", "호",
      "구", "누", "두", "루", "무", "부", "수", "우", "주", "추", "쿠", "투", "푸", "후",
      "그", "느", "드", "르", "므", "브", "스", "으", "즈", "츠", "크", "트", "프", "흐",
      "기", "니", "디", "리", "미", "비", "시", "이", "지", "치", "키", "티", "피", "히",
    ];

    // 전체 문자 목록
    const allChars = [...alphabet, ...koreanChars];
    
    // 피셔–예이츠 셔플
    const shuffled = [...allChars];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const newRules = allChars.map((ch, index) => ({
      from: ch,
      to: shuffled[index],
    }));

    setRules(newRules, "🎲 랜덤 생성");
    showAlert(`${newRules.length}개의 규칙이 생성되었습니다! (영어 ${alphabet.length}개 + 한글 ${koreanChars.length}개)`, "success");
  };

  const clearRules = async () => {
    const confirmed = window.confirm("정말 모든 규칙을 삭제할까요?");
    if (confirmed) {
      setRules([], "🧹 전체 삭제");
      await showAlert("모든 규칙이 삭제되었습니다.", "success");
    }
  };

  // 규칙 내보내기
  const exportRules = async () => {
    const validRules = rules.filter(
      (rule) => rule && rule.from && rule.from.trim() !== ""
    );

    if (validRules.length === 0) {
      await showAlert("내보낼 규칙이 없습니다.", "warning");
      return;
    }

    const dataStr = JSON.stringify(
      {
        version: "1.0",
        exportedAt: new Date().toISOString(),
        rules: validRules,
      },
      null,
      2
    );

    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `language-rules-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    await showAlert(`${validRules.length}개의 규칙이 내보내졌습니다!`, "success");
  };

  // 규칙 가져오기
  const importRules = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const text = await file.text();
        const data = JSON.parse(text);

        if (!data.rules || !Array.isArray(data.rules)) {
          await showAlert("잘못된 파일 형식입니다.", "error");
          return;
        }

        const validRules = data.rules.filter(
          (rule) => rule && rule.from && rule.from.trim() !== ""
        );

        if (validRules.length === 0) {
          await showAlert("가져올 규칙이 없습니다.", "warning");
          return;
        }

        const confirmed = window.confirm(
          `${validRules.length}개의 규칙을 가져오시겠습니까?\n기존 규칙은 유지되고 추가됩니다.`
        );

        if (confirmed) {
          setRules([...rules, ...validRules]);
          await showAlert(`${validRules.length}개의 규칙이 가져와졌습니다!`, "success");
        }
      } catch (error) {
        console.error("파일 읽기 실패:", error);
        await showAlert("파일을 읽는 중 오류가 발생했습니다.", "error");
      }
    };

    input.click();
  };

  // ========================================
  // AI 언어 생성 알고리즘
  // ========================================

  // A) 문자 기반 암호 언어 생성
  const generateAI_CharacterMap = () => {
    // 영어 알파벳
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    
    // 자주 쓰는 한글 글자들
    const koreanChars = [
      "가", "나", "다", "라", "마", "바", "사", "아", "자", "차", "카", "타", "파", "하",
      "거", "너", "더", "러", "머", "버", "서", "어", "저", "처", "커", "터", "퍼", "허",
      "고", "노", "도", "로", "모", "보", "소", "오", "조", "초", "코", "토", "포", "호",
      "구", "누", "두", "루", "무", "부", "수", "우", "주", "추", "쿠", "투", "푸", "후",
    ];
    
    const allChars = [...alphabet, ...koreanChars];
    const shuffled = [...allChars];

    // 피셔–예이츠 셔플
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return allChars.map((c, i) => ({
      from: c,
      to: shuffled[i] + (Math.random() > 0.7 ? shuffled[(i + 3) % allChars.length] : ""), // 약간 확장
    }));
  };

  // B) 음절 기반 판타지 언어 생성
  const generateAI_SyllableLanguage = () => {
    const syllables = [
      "ka", "ra", "ma", "ta", "sha", "lo", "fi", "ze", "nu", "ki",
      "ba", "da", "ga", "la", "na", "sa", "wa", "ya", "ha", "pa",
    ];
    
    // 영어 + 한글
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const koreanChars = [
      "가", "나", "다", "라", "마", "바", "사", "아", "자", "차", "카", "타", "파", "하",
      "거", "너", "더", "러", "머", "버", "서", "어", "저", "처", "커", "터", "퍼", "허",
      "고", "노", "도", "로", "모", "보", "소", "오", "조", "초", "코", "토", "포", "호",
      "구", "누", "두", "루", "무", "부", "수", "우", "주", "추", "쿠", "투", "푸", "후",
    ];
    
    const allChars = [...alphabet, ...koreanChars];

    return allChars.map((c) => ({
      from: c,
      to:
        syllables[Math.floor(Math.random() * syllables.length)] +
        (Math.random() > 0.5
          ? syllables[Math.floor(Math.random() * syllables.length)]
          : ""),
    }));
  };

  // C) 접두사/접미사 규칙 언어 생성
  const generateAI_PrefixSuffix = () => {
    const prefixes = ["xo", "va", "zi", "re", "mo", "qu", "fy", "lo"];
    const suffixes = ["-en", "-ar", "-um", "-iq", "-al", "-is", "-ox", "-yn"];

    // 영어 + 한글
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const koreanChars = [
      "가", "나", "다", "라", "마", "바", "사", "아", "자", "차", "카", "타", "파", "하",
      "거", "너", "더", "러", "머", "버", "서", "어", "저", "처", "커", "터", "퍼", "허",
      "고", "노", "도", "로", "모", "보", "소", "오", "조", "초", "코", "토", "포", "호",
      "구", "누", "두", "루", "무", "부", "수", "우", "주", "추", "쿠", "투", "푸", "후",
    ];
    
    const allChars = [...alphabet, ...koreanChars];

    return allChars.map((c) => ({
      from: c,
      to:
        prefixes[Math.floor(Math.random() * prefixes.length)] +
        c +
        suffixes[Math.floor(Math.random() * suffixes.length)],
    }));
  };

  // D) 난수 기반 암호 언어 생성
  const generateAI_Crypto = () => {
    // 영어 + 한글
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const koreanChars = [
      "가", "나", "다", "라", "마", "바", "사", "아", "자", "차", "카", "타", "파", "하",
      "거", "너", "더", "러", "머", "버", "서", "어", "저", "처", "커", "터", "퍼", "허",
      "고", "노", "도", "로", "모", "보", "소", "오", "조", "초", "코", "토", "포", "호",
      "구", "누", "두", "루", "무", "부", "수", "우", "주", "추", "쿠", "투", "푸", "후",
    ];
    
    const allChars = [...alphabet, ...koreanChars];

    const randomChunk = () => {
      const length = Math.floor(Math.random() * 3) + 2; // 2~4글자
      return Array(length)
        .fill(0)
        .map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
        .join("");
    };

    return allChars.map((c) => ({
      from: c,
      to: randomChunk() + (Math.random() > 0.6 ? randomChunk() : ""),
    }));
  };

  // AI 언어 생성 메인 함수는 제거되었습니다.
  // 대신 AIGeneratorModal 컴포넌트를 사용하세요.

  // AI 생성 적용
  const applyAIGeneration = async () => {
    if (!preview.data || preview.data.length === 0) {
      await showAlert("언어 생성 방식을 선택하세요.", "warning");
      return;
    }
    const modeName = ["", "문자 기반", "음절 기반", "접두/접미", "난수"][preview.mode] || "AI";
    setRules(preview.data, `🤖 ${modeName} 언어 생성`);
    setShowAIModal(false);
    setPreview({ mode: null, data: null });
    await showAlert(`🤖 AI 언어가 적용되었습니다! (${preview.data.length}개 규칙)`, "success");
  };

  // 언어 아이덴티티 적용
  const applyIdentity = (identity) => {
    setLanguageIdentity(identity);
    safeLocalStorageSet("language_identity_v1", JSON.stringify(identity));
    showAlert("✨ 언어 이름/세계관이 저장되었습니다!", "success");
  };

  // 진화된 규칙 적용
  const applyEvolvedRules = (nextRules) => {
    setRules(nextRules, "🧠 언어 진화 적용");
    resetRecommendState();
  };

  // 단어 규칙 학습 알고리즘
  const learnWordRules = async (original, translated) => {
    const oWords = original.trim().split(/\s+/);
    const tWords = translated.trim().split(/\s+/);

    if (oWords.length !== tWords.length) {
      await showAlert("두 문장의 단어 개수가 일치해야 합니다.", "warning");
      return;
    }

    const learned = oWords.map((w, i) => ({
      from: w,
      to: tWords[i],
    }));

    setRules(learned, "🧠 단어 규칙 학습");
    setShowLearnModal(false);

    await showAlert(`🧠 단어 규칙이 자동 학습되었습니다! (${learned.length}개)`, "success");
  };

  // 한글 자동 변환 규칙 생성
  const generateKoreanRules = async () => {
    if (!inputText.trim()) {
      await showAlert("먼저 원본 텍스트를 입력해주세요.", "warning");
      return;
    }

    // 한글 문자 추출 (가-힣 범위)
    const koreanChars = new Set();
    const text = inputText;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      // 한글 유니코드 범위: 가(0xAC00) ~ 힣(0xD7A3)
      if (char >= "\uAC00" && char <= "\uD7A3") {
        koreanChars.add(char);
      }
    }

    if (koreanChars.size === 0) {
      await showAlert("입력된 텍스트에 한글이 없습니다.", "warning");
      return;
    }

    // 기존 규칙에서 이미 사용된 변환 문자열 확인
    const usedToValues = new Set(rules.map((r) => r.to).filter((t) => t));
    
    // 각 한글 문자에 대해 랜덤 변환 문자열 생성
    const newRules = [];
    const charsArray = Array.from(koreanChars);
    
    charsArray.forEach((char) => {
      // 이미 규칙이 있는지 확인
      const existingRule = rules.find((r) => r.from === char);
      if (existingRule) {
        return; // 이미 규칙이 있으면 스킵
      }

      // 랜덤 문자열 생성 (대문자 알파벳 2-4자)
      let randomStr;
      let attempts = 0;
      const maxAttempts = 100; // 무한 루프 방지
      
      do {
        const length = Math.floor(Math.random() * 3) + 2; // 2-4자
        randomStr = Array.from({ length }, () => {
          return String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
        }).join("");
        attempts++;
        
        // 충돌이 너무 많으면 숫자 추가
        if (attempts > 50 && !usedToValues.has(randomStr + "1")) {
          randomStr = randomStr + "1";
        }
      } while (usedToValues.has(randomStr) && attempts < maxAttempts);
      
      // 최대 시도 횟수 초과 시 타임스탬프 추가
      if (attempts >= maxAttempts) {
        randomStr = randomStr + Date.now().toString().slice(-3);
      }
      
      usedToValues.add(randomStr);
      newRules.push({ from: char, to: randomStr });
    });

    if (newRules.length === 0) {
      await showAlert("모든 한글 문자에 대한 규칙이 이미 존재합니다.", "info");
      return;
    }

    // 기존 규칙에 추가
    setRules([...rules, ...newRules]);
    await showAlert(`${newRules.length}개의 한글 변환 규칙이 추가되었습니다.`, "success");
  };

  // 📱 모바일 vs 💻 데스크톱 분기
  if (isMobile) {
    return (
      <>
        {AlertComponent}
        <PWAInstallPrompt />
        <ServiceWorkerRegistration />
        
        <MobilePage
          rules={rules}
          setRules={setRules}
          inputText={inputText}
          setInputText={setInputText}
          outputText={outputText}
          setOutputText={setOutputText}
          engineMode={engineMode}
          setEngineMode={setEngineMode}
          encode={encode}
          decode={decode}
          copyResult={copyResult}
          swap={swapText}
          showAlert={showAlert}
          router={router}
          theme={theme}
          toggleTheme={toggleTheme}
          generateAI_CharacterMap={generateAI_CharacterMap}
          generateAI_SyllableLanguage={generateAI_SyllableLanguage}
          generateAI_PrefixSuffix={generateAI_PrefixSuffix}
          generateAI_Crypto={generateAI_Crypto}
        />
      </>
    );
  }

  // 💻 데스크톱 UI
  return (
    <>
      {AlertComponent}
      <PWAInstallPrompt />
      <ServiceWorkerRegistration />
      
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* 3D 로고 + 타이틀 영역 */}
        <Logo3D
          title="My Secret Language"
          // 보안: AdSense slot은 환경 변수에서만 가져오기 (기본값 제거)
          subtitle={
            languageIdentity
              ? `${languageIdentity.name} · ${languageIdentity.tagline}`
              : "나만의 언어 생성기 · 3D Crypto Text Lab"
          }
        />

        {/* AdSense 광고 영역 - 상단 */}
        <div className="card-3d p-3 my-4">
          <Adsense 
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT || ""} 
            style={{ display: "block", minHeight: "90px" }}
          />
        </div>

      {/* 🎨 깔끔하게 정리된 네비게이션 바 */}
      <NavigationBar
        theme={theme}
        onToggleTheme={toggleTheme}
        onBackup={() => setShowBackupModal(true)}
        onHistory={() => setShowHistory(true)}
        onStatistics={() => setShowStatistics(true)}
        onConflictCheck={() => setShowConflictChecker(true)}
        onTestTranslator={() => setShowTestTranslator(true)}
        onShortcuts={() => setShowShortcutsHelp(true)}
        onGuide={() => setShowQuickGuide(true)}
        onGallery={() => router.push("/gallery")}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
      />

      {/* 입력/출력 카드 영역 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 입력 카드 */}
        <div className="card-3d">
          <h2 className="text-xl font-semibold mb-3">원본 텍스트</h2>
          <textarea
            className="input-3d w-full min-h-[160px]"
            value={inputText}
            onChange={(e) => {
              const newValue = e.target.value;
              // 🔒 입력 검증
              const validation = validateTextInput(newValue);
              if (validation.valid) {
                setInputText(newValue);
              } else {
                showAlert(validation.error || '입력값이 유효하지 않습니다.', 'error');
              }
            }}
            placeholder="여기에 문장을 입력하세요"
            maxLength={MAX_INPUT_LENGTH}
          />

          {/* v2 번역 엔진 모드 선택 */}
          <div className="mt-4 mb-3">
            <label className="block text-sm font-medium mb-2 opacity-90">
              번역 엔진 모드
            </label>
            <select
              className="input-3d w-full py-2"
              value={engineMode}
              onChange={(e) => setEngineMode(e.target.value)}
              title="번역 방식을 선택하세요"
            >
              <option value="hybrid">Hybrid (단어+문자 추천)</option>
              <option value="word">Word (단어 단위만)</option>
              <option value="substring">Substring (부분문자열 치환)</option>
            </select>
          </div>

          {/* 변환 버튼 그룹 */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <button className="btn-3d btn-encode flex-1" onClick={encode}>
                🔐 암호화
              </button>
              <button className="btn-3d btn-decode flex-1" onClick={decode}>
                🔓 복호화
              </button>
            </div>
            <button 
              className="btn-3d btn-korean w-full" 
              onClick={generateKoreanRules}
              title="입력된 텍스트의 한글을 자동으로 변환 규칙 생성"
            >
              ✨ 한글 자동 변환
            </button>
          </div>
        </div>

        {/* 출력 카드 */}
        <div className="card-3d">
          <h2 className="text-xl font-semibold mb-3">결과 텍스트</h2>
          <textarea
            className="input-3d w-full min-h-[160px]"
            value={outputText}
            onChange={(e) => {
              const newValue = e.target.value;
              setOutputText(newValue);

              // 사용자가 자동 번역 결과를 수정한 경우만
              if (
                lastSourceText &&
                lastAutoTranslated &&
                newValue !== lastAutoTranslated
              ) {
                setUserEditedOutput(true);
              }
            }}
            onBlur={() => {
              if (
                userEditedOutput &&
                lastSourceText &&
                outputText.trim() &&
                lastSourceText.split(/\s+/).length >= 2
              ) {
                const key = lastSourceText + "||" + outputText;
                if (lastSavedKey !== key) {
                  // ✅ 자동 학습 샘플 저장
                  addSample({
                    original: lastSourceText,
                    translated: outputText,
                    mode: "word",
                  });

                  console.log("🧠 학습 샘플 자동 저장됨");
                  setLearnToast(true);
                  setTimeout(() => setLearnToast(false), 2000);

                  // 중복 저장 방지
                  setUserEditedOutput(false);
                  setLastSavedKey(key);

                  // 샘플 수 업데이트 및 추천 체크
                  try {
                    const samples = loadSamples();
                    const count = Array.isArray(samples) ? samples.length : 0;
                    setSampleCount(count);

                    if (shouldRecommendEvolution(count, 20)) {
                      setShowEvolutionRecommend(true);
                      markRecommended(count);
                    }
                  } catch (error) {
                    console.warn("샘플 로드 실패:", error);
                  }
                }
              }
            }}
            placeholder="결과가 여기에 표시됩니다"
          />

          {/* 결과 작업 버튼 그룹 */}
          <div className="mt-4 space-y-2">
            <div className="flex gap-2">
              <button className="btn-3d btn-copy flex-1" onClick={copyResult}>
                📋 복사
              </button>
              <button className="btn-3d btn-swap flex-1" onClick={swapText}>
                🔁 교환
              </button>
            </div>
            <div className="w-full">
              <TTSPlayer text={outputText} buttonText="🔊 음성 듣기" />
            </div>
          </div>
        </div>
      </div>

      {/* 충돌 검사기는 모달로 이동 */}
      {/* 테스트 번역기는 모달로 이동 */}

      {/* AdSense 광고 영역 - 중간 */}
      <div className="card-3d p-3 my-4">
        <Adsense 
          slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT || "4329998296"} 
          style={{ display: "block", minHeight: "90px" }}
        />
      </div>

      {/* 규칙 편집 카드 */}
      <div className="card-3d">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">변환 규칙</h2>
            {/* 🎯 Quick Win 5: 규칙 개수 실시간 표시 */}
            <span className="text-sm bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-bold">
              {rules.filter(r => r && r.from && r.from.trim()).length}개
            </span>
          </div>
        </div>

        {/* 버튼 그룹: 기본 작업 */}
        <div className="button-group mb-3">
          <div className="button-group-label">기본 작업</div>
          <div className="button-group-items">
            <button className="btn-3d btn-compact btn-add" onClick={addRule} title="새 규칙 추가">
              ➕ 규칙 추가
            </button>
            <button className="btn-3d btn-compact btn-red" onClick={clearRules} title="모든 규칙 삭제">
              🧹 삭제
            </button>
            {/* 🔄 Undo/Redo 버튼 */}
            <button 
              className="btn-3d btn-compact btn-undo" 
              onClick={undo} 
              disabled={!canUndo}
              title="실행 취소 (Ctrl+Z)"
            >
              ↶ Undo
            </button>
            <button 
              className="btn-3d btn-compact btn-redo" 
              onClick={redo} 
              disabled={!canRedo}
              title="다시 실행 (Ctrl+Shift+Z)"
            >
              ↷ Redo
            </button>
          </div>
        </div>

        {/* 버튼 그룹: AI 생성 */}
        <div className="button-group mb-3">
          <div className="button-group-label">AI 생성</div>
          <div className="button-group-items">
            <button 
              className="btn-3d btn-compact btn-ai" 
              onClick={() => setShowAIModal(true)}
              title="AI 알고리즘으로 다양한 언어 패턴 자동 생성"
            >
              🤖 AI 언어 생성
            </button>
            <button 
              className="btn-3d btn-compact btn-learn" 
              onClick={() => setShowLearnModal(true)}
              title="원문과 변환문으로부터 단어 규칙 자동 학습"
            >
              🧠 단어 규칙 학습
            </button>
            <button className="btn-3d btn-compact btn-random" onClick={generateRandomAlphabet} title="랜덤 알파벳 규칙 생성">
              🎲 랜덤 생성
            </button>
          </div>
        </div>

        {/* 버튼 그룹: 고급 기능 */}
        <div className="button-group mb-3">
          <div className="button-group-label">고급 기능</div>
          <div className="button-group-items">
            <button 
              className="btn-3d btn-compact btn-naming" 
              onClick={() => setShowIdentityModal(true)}
              title="언어 이름 및 세계관 생성"
            >
              ✨ 네이밍/세계관
            </button>
            <button 
              className="btn-3d btn-compact btn-evolution" 
              onClick={() => {
                setShowEvolutionRecommend(false);
                setShowEvolutionModal(true);
              }}
              title="학습 샘플 기반 언어 진화"
            >
              🧬 언어 진화
            </button>
          </div>
        </div>

        {/* 버튼 그룹: 저장/불러오기 */}
        <div className="button-group mb-3">
          <div className="button-group-label">저장/불러오기</div>
          <div className="button-group-items">
            <button 
              className="btn-3d btn-compact" 
              onClick={exportRules}
              title="규칙을 JSON 파일로 내보내기"
            >
              📤 내보내기
            </button>
            <button 
              className="btn-3d btn-compact" 
              onClick={importRules}
              title="JSON 파일에서 규칙 가져오기"
            >
              📥 가져오기
            </button>
            <button 
              className="btn-3d btn-compact btn-preset" 
              onClick={() => setShowPresetModal(true)}
              title="언어 프리셋 저장 및 불러오기"
            >
              💾 프리셋
            </button>
            <button 
              className="btn-3d btn-compact btn-search" 
              onClick={() => setShowSearch(!showSearch)}
              title="규칙 검색 및 필터"
            >
              {showSearch ? "🔍 검색 닫기" : "🔍 검색"}
            </button>
          </div>
        </div>

        {/* 🔍 규칙 검색/필터 */}
        {showSearch && (
          <RuleSearch 
            rules={rules}
            onFilteredRulesChange={setFilteredRules}
          />
        )}

        <table className="table-3d">
          <thead>
            <tr>
              <th className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📝</span>
                  <span>원본 (From)</span>
                </div>
              </th>
              <th className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔄</span>
                  <span>변환 (To)</span>
                </div>
              </th>
              <th className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">🗑️</span>
                  <span>작업</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {(showSearch ? filteredRules : rules).filter(r => r && (r.from || r.to)).length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-8 opacity-60">
                  {showSearch ? "검색 결과가 없습니다." : "규칙이 없습니다. 위의 버튼을 사용하여 규칙을 추가하세요."}
                </td>
              </tr>
            ) : (
              (showSearch ? filteredRules : rules).map((rule, index) => {
                // 원본 인덱스 찾기
                const originalIndex = rules.indexOf(rule);
                return (
                  <RuleRow
                    key={originalIndex}
                    index={originalIndex}
                    rule={rule}
                    onChange={updateRule}
                    onDelete={deleteRule}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  />
                );
              })
            )}
          </tbody>
        </table>

        <p className="text-gray-400 text-sm mt-4 opacity-80">
          규칙은 위에서 아래 순서대로 적용됩니다.  
          긴 단어를 위에 두면 올바른 치환이 더 잘 일어납니다.
        </p>
      </div>

      {/* AdSense 광고 영역 - 하단 */}
      <div className="card-3d p-3 my-4">
        <Adsense 
          slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT || "4329998296"} 
          style={{ display: "block", minHeight: "90px" }}
        />
      </div>

      {/* 자동 학습 토스트 */}
      {learnToast && (
        <div className="fixed bottom-24 right-6 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg z-50 animate-pulse">
          🧠 언어가 학습되었습니다
        </div>
      )}

      {/* 언어 진화 추천 배너 */}
      {showEvolutionRecommend && (
        <EvolutionRecommendBanner
          sampleCount={sampleCount}
          onEvolveClick={() => {
            setShowEvolutionRecommend(false);
            setShowEvolutionModal(true);
          }}
          onDismiss={() => setShowEvolutionRecommend(false)}
        />
      )}

      {/* ------------------------
          AI 생성기 모달
      ------------------------- */}
      {showAIModal && (
        <AIGeneratorModal
          onClose={() => {
            setShowAIModal(false);
            setPreview({ mode: null, data: null });
          }}
          onGenerate={applyAIGeneration}
          preview={preview}
          setPreview={setPreview}
        />
      )}

      {/* ------------------------
          단어 규칙 학습 모달
      ------------------------- */}
      {showLearnModal && (
        <LearnRuleModal
          onClose={() => setShowLearnModal(false)}
          onLearn={learnWordRules}
        />
      )}

      {/* ------------------------
          프리셋 모달
      ------------------------- */}
      {showPresetModal && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fade-in"
          onClick={() => setShowPresetModal(false)}
        >
          <div 
            className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl p-8 w-full max-w-[520px] max-h-[90vh] overflow-y-auto custom-scrollbar space-y-6 shadow-2xl border-2 border-indigo-500/30 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-4xl">💾</div>
                <div>
                  <h2 className="text-2xl font-extrabold text-white">언어 프리셋</h2>
                  <p className="text-sm text-slate-400 mt-1">
                    언어를 저장하고 불러오세요
                  </p>
                </div>
              </div>
              <button
                className="text-slate-400 hover:text-white transition-colors text-2xl leading-none hover:rotate-90 transition-transform duration-300"
                onClick={() => setShowPresetModal(false)}
              >
                ✕
              </button>
            </div>

            {/* 프리셋 저장 섹션 */}
            <div className="bg-slate-700/30 border-2 border-slate-600/50 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">✨</span>
                <h3 className="font-bold text-white">새 프리셋 저장</h3>
              </div>
              
              <div className="flex gap-2">
                <input
                  className="input-3d flex-1"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      savePreset();
                    }
                  }}
                  placeholder="프리셋 이름을 입력하세요"
                />
                
                <NameGenerator 
                  rules={rules} 
                  onSelectName={(name) => setPresetName(name)}
                />
              </div>

              <button className="btn-3d w-full" onClick={savePreset}>
                💾 저장하기
              </button>
            </div>

            <hr />

            {/* 프리셋 리스트 */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📚</span>
                  <h3 className="font-bold text-white">저장된 프리셋</h3>
                </div>
                <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full">
                  {presetList.length}개
                </span>
              </div>

              <div className="space-y-2 max-h-[350px] overflow-y-auto custom-scrollbar">
                {presetList.length === 0 ? (
                  <div className="text-center py-12 opacity-70">
                    <div className="text-5xl mb-3">📦</div>
                    <p className="text-sm text-slate-400">저장된 프리셋이 없습니다</p>
                    <p className="text-xs text-slate-500 mt-1">
                      위에서 프리셋을 저장해보세요
                    </p>
                  </div>
                ) : (
                  presetList.map((preset, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-700/50 border border-slate-600/50 rounded-xl p-4 hover:bg-slate-700/70 hover:border-slate-500/50 transition-all group"
                    >
                      <div className="flex justify-between items-center gap-3">
                        <div className="flex-1 min-w-0">
                          {/* ✏️ 편집 모드 */}
                          {editingPresetIndex === idx ? (
                            <div className="flex items-center gap-2 mb-1">
                              <input
                                className="input-3d flex-1 text-sm"
                                value={editingPresetName}
                                onChange={(e) => setEditingPresetName(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") savePresetName(idx);
                                  if (e.key === "Escape") cancelEditPreset();
                                }}
                                autoFocus
                              />
                              <button
                                className="btn-3d text-xs px-2 py-1"
                                onClick={() => savePresetName(idx)}
                              >
                                ✓
                              </button>
                              <button
                                className="btn-3d btn-red text-xs px-2 py-1"
                                onClick={cancelEditPreset}
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div className="font-bold text-white mb-1 truncate group-hover:text-blue-300 transition-colors">
                              {preset.name}
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                              규칙 {preset.rules?.length || 0}개
                            </span>
                            {preset.createdAt && (
                              <span className="text-xs text-slate-500">
                                {new Date(preset.createdAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 flex-shrink-0">
                          {editingPresetIndex !== idx && (
                            <>
                              <button
                                className="btn-3d text-sm px-3 py-1"
                                onClick={() => loadPreset(preset)}
                              >
                                📥 불러오기
                              </button>
                              <button
                                className="btn-3d text-sm px-2 py-1"
                                onClick={() => startEditPreset(idx)}
                                title="이름 변경"
                              >
                                ✏️
                              </button>
                              <button
                                className="btn-3d btn-red text-sm px-3 py-1"
                                onClick={() => deletePreset(idx)}
                              >
                                ✕
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
            </div>
          </div>

          {/* 닫기 버튼 */}
          <button className="btn-3d btn-red w-full text-lg" onClick={() => setShowPresetModal(false)}>
            닫기
          </button>
        </div>
      </div>
    )}

      {/* 언어 네이밍/세계관 모달 */}
      {showIdentityModal && (
        <LanguageIdentityModal
          rules={rules}
          onClose={() => setShowIdentityModal(false)}
          onApply={applyIdentity}
        />
      )}

      {/* 언어 진화 모달 */}
      {showEvolutionModal && (
        <EvolutionModal
          baseRules={rules}
          onClose={() => setShowEvolutionModal(false)}
          onApplyRules={applyEvolvedRules}
        />
      )}

      {/* 튜토리얼 모달 (첫 방문자용) */}
      {showTutorial && (
        <TutorialModal
          onClose={() => setShowTutorial(false)}
        />
      )}

      {/* 빠른 가이드 모달 */}
      {showQuickGuide && (
        <QuickGuideModal
          onClose={() => setShowQuickGuide(false)}
        />
      )}

      {/* 백업/복원 모달 */}
      {showBackupModal && (
        <BackupRestoreModal
          onClose={() => setShowBackupModal(false)}
          onRestore={() => {
            // 복원 후 페이지 새로고침
            window.location.reload();
          }}
        />
      )}

        {/* 🔧 localStorage 용량 모니터링 표시기 */}
        <StorageIndicator onClick={() => setShowBackupModal(true)} />

        {/* 충돌 검사는 모달로 이동 */}

      {/* ⌨️ 키보드 단축키 도움말 모달 */}
      {showShortcutsHelp && (
        <ShortcutsHelpModal onClose={() => setShowShortcutsHelp(false)} />
      )}

      {/* 📜 번역 히스토리 모달 */}
      {showHistory && (
        <TranslationHistory 
          onClose={() => setShowHistory(false)}
          onRestore={(item) => {
            setInputText(item.input);
            setOutputText(item.output);
            setEngineMode(item.mode);
          }}
        />
      )}

        {/* 📊 규칙 통계 모달 */}
        {showStatistics && (
          <RuleStatistics
            rules={rules}
            onClose={() => setShowStatistics(false)}
          />
        )}

        {/* 🔍 충돌 검사기 모달 */}
        {showConflictChecker && (
          <ConflictCheckerModal
            rules={rules}
            setRules={setRules}
            onClose={() => setShowConflictChecker(false)}
            showAlert={showAlert}
          />
        )}

        {/* 🧪 테스트 번역기 모달 */}
        {showTestTranslator && (
          <TestTranslatorModal
            rules={rules}
            engineMode={engineMode}
            onClose={() => setShowTestTranslator(false)}
            showAlert={showAlert}
          />
        )}
      </div>
    </>
  );
}
