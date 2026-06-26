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
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ContentSection from "./components/ContentSection";
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
import { validateTextInput, validateRules, validateRule, validatePresetName, sanitizeText, MAX_INPUT_LENGTH } from "./utils/inputValidation";

export default function Home() {
  const router = useRouter();
  const { showAlert, AlertComponent } = useCustomAlert();
  const isMobile = useIsMobile(); // ?벑 紐⑤컮??媛먯?

  // ?썳截??꾩뿭 ?먮윭 ?몃뱾???ㅼ젙
  useEffect(() => {
    setupGlobalErrorHandler(showAlert);
  }, [showAlert]);
  
  // Undo/Redo history samples
  const {
    state: rules,
    setState: setRulesWithHistory,
    undo,
    redo,
    canUndo,
    canRedo
  } = useHistory(
    [
      { from: "가", to: "BODO" },
      { from: "나", to: "DO" },
      { from: "다", to: "BA" },
    ],
    50 // 理쒕? 50媛??덉뒪?좊━
  );

  // Keep history updates wrapped in one setter
  const setRules = useCallback((newRules, action = "규칙 변경") => {
    setRulesWithHistory(newRules, action);
  }, [setRulesWithHistory]);

  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  // v2 踰덉뿭 ?붿쭊 紐⑤뱶 ?좏깮
  const [engineMode, setEngineMode] = useState("hybrid"); // 'substring' | 'word' | 'hybrid'

  // ?꾨━??UI State
  const [showPresetModal, setShowPresetModal] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [presetList, setPresetList] = useState([]);

  // AI ?앹꽦湲?紐⑤떖 State
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLearnModal, setShowLearnModal] = useState(false);
  
  // AI 誘몃━蹂닿린 ?곹깭
  const [preview, setPreview] = useState({ mode: null, data: null });

  // ?몄뼱 吏꾪솕 & ?ㅼ씠諛?紐⑤떖 State
  const [showIdentityModal, setShowIdentityModal] = useState(false);
  const [showEvolutionModal, setShowEvolutionModal] = useState(false);
  const [showEvolutionRecommend, setShowEvolutionRecommend] = useState(false);
  const [sampleCount, setSampleCount] = useState(0);
  const [learnToast, setLearnToast] = useState(false);

  // ?쒗넗由ъ뼹 紐⑤떖 State
  const [showTutorial, setShowTutorial] = useState(false);
  const [showQuickGuide, setShowQuickGuide] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);

  // ?뵇 洹쒖튃 寃???꾪꽣 State
  const [filteredRules, setFilteredRules] = useState(rules);
  const [showSearch, setShowSearch] = useState(false);

  // ?륅툘 ?꾨━???몄쭛 State
  const [editingPresetIndex, setEditingPresetIndex] = useState(null);
  const [editingPresetName, setEditingPresetName] = useState("");

  // ?⑨툘 ?⑥텞???꾩?留?紐⑤떖
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);

  // ?뱶 踰덉뿭 ?덉뒪?좊━ 紐⑤떖
  const [showHistory, setShowHistory] = useState(false);

  // ?뱤 洹쒖튃 ?듦퀎 紐⑤떖
  const [showStatistics, setShowStatistics] = useState(false);

  // ?뵇 異⑸룎 寃?ш린 紐⑤떖
  const [showConflictChecker, setShowConflictChecker] = useState(false);

  // ?㎦ ?뚯뒪??踰덉뿭湲?紐⑤떖
  const [showTestTranslator, setShowTestTranslator] = useState(false);

  // ?뙎 ?뚮쭏
  const [theme, toggleTheme] = useTheme();

  // ?앹꽦???몄뼱 ?꾩씠?댄떚?????濡쒖뺄)
  const [languageIdentity, setLanguageIdentity] = useState(null);

  // ?뵏 援ш? ?좊뱶?쇱뒪 ?뺤콉 以?? 硫붿씤 ?섏씠吏??異⑸텇??肄섑뀗痢좉? ?덉쑝誘濡???긽 愿묎퀬 ?쒖떆
  // (硫붿씤 ?섏씠吏?먮뒗 濡쒓퀬, ?낅젰/異쒕젰 ?곸뿭, 洹쒖튃 ?몄쭛 ?곸뿭, ?ㅻ퉬寃뚯씠????異⑸텇??肄섑뀗痢좉? ?덉쓬)
  const shouldShowAds = useCallback(() => {
    // ?섍꼍 蹂?섍? ?놁쑝硫?愿묎퀬 ?쒖떆 ????
    if (!process.env.NEXT_PUBLIC_ADSENSE_SLOT) return false;
    
    // 硫붿씤 ?섏씠吏????긽 異⑸텇??肄섑뀗痢좉? ?덉쑝誘濡?愿묎퀬 ?쒖떆
    return true;
  }, []);

  // ?대씪?댁뼵?몄뿉?쒕쭔 localStorage?먯꽌 濡쒕뱶 (Hydration ?먮윭 諛⑹?)
  useEffect(() => {
    try {
      const saved = safeLocalStorageGet("language_identity_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        setLanguageIdentity(parsed);
      }
    } catch (error) {
      console.warn("?몄뼱 ?꾩씠?댄떚??濡쒕뱶 ?ㅽ뙣:", error);
    }

    // 泥?諛⑸Ц??泥댄겕
    const hasVisited = safeLocalStorageGet("has_visited");
    if (!hasVisited) {
      // 2珥??꾩뿉 ?쒗넗由ъ뼹 ?쒖떆
      setTimeout(() => {
        setShowTutorial(true);
        safeLocalStorageSet("has_visited", "true");
      }, 1500);
    }
  }, []);

  // ?먮룞 ?숈뒿???곹깭
  const [lastSourceText, setLastSourceText] = useState("");
  const [lastAutoTranslated, setLastAutoTranslated] = useState("");
  const [userEditedOutput, setUserEditedOutput] = useState(false);
  const [lastSavedKey, setLastSavedKey] = useState("");

  // 洹쒖튃 異붽?
  const addRule = () => {
    // ?뵏 洹쒖튃 媛쒖닔 ?쒗븳 寃利?
    if (rules.length >= 1000) {
      showAlert("洹쒖튃? 理쒕? 1000媛쒓퉴吏 異붽??????덉뒿?덈떎.", "error");
      return;
    }
    setRules([...rules, { from: "", to: "" }], "??洹쒖튃 異붽?");
    
    // ?렞 Quick Win 8: 洹쒖튃 異붽? ???ъ빱???먮룞 ?대룞
    setTimeout(() => {
      const inputs = document.querySelectorAll('input[placeholder*="?? ?щ옉"], input[placeholder*="??"]');
      if (inputs.length > 0) {
        const lastInput = inputs[inputs.length - 2]; // 留덉?留됱뿉????踰덉㎏ (from ?꾨뱶)
        if (lastInput) lastInput.focus();
      }
    }, 50);
  };

  // 洹쒖튃 ?섏젙
  const updateRule = (index, newRule) => {
    // ?뵏 洹쒖튃 寃利?
    const validation = validateRule(newRule);
    if (!validation.valid) {
      showAlert(validation.error || '洹쒖튃???좏슚?섏? ?딆뒿?덈떎.', 'error');
      return;
    }
    const updated = [...rules];
    updated[index] = newRule;
    setRules(updated, "?륅툘 洹쒖튃 ?섏젙");
  };

  // 洹쒖튃 ??젣
  const deleteRule = (index) => {
    const deleted = rules[index];
    setRules(
      rules.filter((_, i) => i !== index), 
      `?뿊截?"${deleted.from}" 洹쒖튃 ??젣`
    );
  };

  // ?렞 Phase 2-2: ?쒕옒洹????쒕∼ ?뺣젹
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

    setRules(newRules, `?뱥 洹쒖튃 ?쒖꽌 蹂寃?(${draggedIndex + 1} ??${dropIndex + 1})`);
    setDraggedIndex(null);
  };

  /* ---------------------------
   *   localStorage 愿??泥섎━
   * --------------------------- */

  // localStorage?먯꽌 ?꾨━??遺덈윭?ㅺ린
  useEffect(() => {
    try {
      const saved = safeLocalStorageGet("language-presets");
      if (saved) {
        try {
          setPresetList(JSON.parse(saved));
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error("?꾨━??遺덈윭?ㅺ린 ?ㅽ뙣:", error);
          }
        }
      }
    } catch (error) {
      // ?ㅽ넗由ъ? ?묎렐 遺덇? ??臾댁떆
      if (process.env.NODE_ENV === 'development') {
        console.warn("localStorage ?묎렐 ?ㅽ뙣:", error);
      }
    }
  }, []);

  // ?섑뵆 ???뺤씤 諛?吏꾪솕 異붿쿇 泥댄겕
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
      console.warn("?섑뵆 濡쒕뱶 ?ㅽ뙣:", error);
      setSampleCount(0);
    }
  }, [outputText]); // outputText 蹂寃???泥댄겕

  // ?ㅽ봽?쇱씤 ?곹깭 媛먯?
  useEffect(() => {
    const handleOffline = () => {
      showAlert("?꾩옱 ?ㅽ봽?쇱씤?낅땲?? 濡쒖뺄 ?곗씠?곕줈留??묒뾽 媛?ν빀?덈떎.", "info", 3000);
    };

    const handleOnline = () => {
      showAlert("?명꽣???곌껐??蹂듦뎄?섏뿀?듬땲??", "success", 2000);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [showAlert]);

  // AI ?앹꽦 誘몃━蹂닿린 ?앹꽦
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
      // 紐⑤뱶媛 ?녾굅??珥덇린?????곗씠???대━??
      if (preview.mode === null && preview.data) {
        setPreview({ mode: null, data: null });
      }
    }
  }, [preview.mode]);

  // ?꾨━?????
  const savePreset = async () => {
    // ?뵏 ?꾨━???대쫫 寃利?
    const nameValidation = validatePresetName(presetName);
    if (!nameValidation.valid) {
      await showAlert(nameValidation.error || "?꾨━???대쫫???좏슚?섏? ?딆뒿?덈떎.", "error");
      return;
    }

    if (!presetName.trim()) {
      await showAlert("?꾨━???대쫫???낅젰?댁＜?몄슂.", "warning");
      return;
    }

    // ?렞 Quick Win 1: ?꾨━???대쫫 以묐났 泥댄겕
    const trimmedName = presetName.trim();
    const isDuplicate = presetList.some(p => p.name === trimmedName);
    if (isDuplicate) {
      await showAlert(`"${trimmedName}" ?대쫫? ?대? ?ъ슜 以묒엯?덈떎. ?ㅻⅨ ?대쫫???낅젰?댁＜?몄슂.`, "warning");
      return;
    }

    // 鍮?洹쒖튃 ?꾪꽣留?
    const validRules = rules.filter(
      (rule) => rule && rule.from && rule.from.trim() !== ""
    );

    if (validRules.length === 0) {
      await showAlert("??ν븷 洹쒖튃???놁뒿?덈떎.", "warning");
      return;
    }

    // ?렞 Quick Win 3: localStorage ?⑸웾 泥댄겕
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
          `?좑툘 ??μ냼 ?ъ슜?? ${usagePercent}%\n?꾨━?뗭씠 ?덈Т 留롮쑝硫??곗씠?곌? ?먯떎?????덉뒿?덈떎. 諛깆뾽??沅뚯옣?⑸땲??`, 
          "warning",
          5000
        );
      }

      setPresetList(updatedList);
      safeLocalStorageSet("language-presets", JSON.stringify(updatedList));

      await showAlert("?꾨━?뗭씠 ??λ릺?덉뒿?덈떎!", "success");
      setPresetName("");
      setShowPresetModal(false);
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        await showAlert("?????怨듦컙??遺議깊빀?덈떎! ?쇰? ?꾨━?뗭쓣 ??젣?섍굅??諛깆뾽 ??珥덇린?뷀븯?몄슂.", "error", 6000);
      } else {
        throw error;
      }
    }
  };

  // ?꾨━??遺덈윭?ㅺ린
  const loadPreset = async (preset) => {
    if (preset.rules && preset.rules.length > 0) {
      setRules(preset.rules);
      setShowPresetModal(false);
      await showAlert(`"${preset.name}" ?꾨━?뗭쓣 遺덈윭?붿뒿?덈떎.`, "success");
    } else {
      await showAlert("?꾨━?뗭뿉 洹쒖튃???놁뒿?덈떎.", "warning");
    }
  };

  // ?꾨━????젣
  const deletePreset = async (idx) => {
    const confirmed = window.confirm(`"${presetList[idx].name}" ?꾨━?뗭쓣 ??젣?좉퉴??`);
    if (!confirmed) return;

    const updated = presetList.filter((_, i) => i !== idx);
    setPresetList(updated);
    safeLocalStorageSet("language-presets", JSON.stringify(updated));
    await showAlert("?꾨━?뗭씠 ??젣?섏뿀?듬땲??", "success");
  };

  // ?렞 Phase 2-3: ?꾨━???대쫫 蹂寃?
  const startEditPreset = (idx) => {
    setEditingPresetIndex(idx);
    setEditingPresetName(presetList[idx].name);
  };

  const savePresetName = async (idx) => {
    const newName = editingPresetName.trim();
    
    // ?뵏 ?꾨━???대쫫 寃利?
    const nameValidation = validatePresetName(newName);
    if (!nameValidation.valid) {
      await showAlert(nameValidation.error || "?꾨━???대쫫???좏슚?섏? ?딆뒿?덈떎.", "error");
      return;
    }
    
    if (!newName) {
      await showAlert("?꾨━???대쫫???낅젰?댁＜?몄슂.", "warning");
      return;
    }

    // 以묐났 泥댄겕 (?먯떊 ?쒖쇅)
    const isDuplicate = presetList.some((p, i) => i !== idx && p.name === newName);
    if (isDuplicate) {
      await showAlert(`"${newName}" ?대쫫? ?대? ?ъ슜 以묒엯?덈떎.`, "warning");
      return;
    }

    const updated = [...presetList];
    updated[idx] = { ...updated[idx], name: newName };
    setPresetList(updated);
    safeLocalStorageSet("language-presets", JSON.stringify(updated));
    
    setEditingPresetIndex(null);
    setEditingPresetName("");
    await showAlert("?꾨━???대쫫??蹂寃쎈릺?덉뒿?덈떎.", "success");
  };

  const cancelEditPreset = () => {
    setEditingPresetIndex(null);
    setEditingPresetName("");
  };

  // ?뷀샇??(v2/v3 ?붿쭊 ?먮룞 ?좏깮)
  const encode = async () => {
    try {
      // ?뵏 ?낅젰 寃利?
      const inputValidation = validateTextInput(inputText);
      if (!inputValidation.valid) {
        await showAlert(inputValidation.error || "?낅젰媛믪씠 ?좏슚?섏? ?딆뒿?덈떎.", "error");
        return;
      }

      if (!inputText.trim()) {
        await showAlert("?먮낯 ?띿뒪?몃? ?낅젰?댁＜?몄슂.", "warning");
        return;
      }

      // ?뵏 洹쒖튃 寃利?
      const rulesValidation = validateRules(rules);
      if (!rulesValidation.valid) {
        await showAlert(rulesValidation.error || "洹쒖튃???좏슚?섏? ?딆뒿?덈떎.", "error");
        return;
      }

      const validRules = rules.filter((r) => r && r.from && r.from.trim() !== "");
      if (validRules.length === 0) {
        await showAlert("蹂?섑븷 洹쒖튃???놁뒿?덈떎. 洹쒖튃??異붽??댁＜?몄슂.", "warning");
        return;
      }

      // ?? 100媛??댁긽 洹쒖튃 ??v3 ?붿쭊 ?먮룞 ?ъ슜
      const useV3 = validRules.length >= 100;
      const engineVersion = useV3 ? "v3 (理쒖쟻??" : "v2";

      // 蹂댁븞: ?꾨줈?뺤뀡?먯꽌???붾쾭源?濡쒓렇 ?쒓굅
      if (process.env.NODE_ENV === 'development') {
        console.log(`?뵍 [${engineVersion} ?붿쭊 ?뷀샇???쒖옉]`);
        console.log("?뱷 ?먮낯 ?띿뒪??", inputText);
        console.log("?뵩 ?붿쭊 紐⑤뱶:", engineMode);
        console.log("?뱥 ?꾩껜 洹쒖튃:", validRules.length);
      }

      // v2 ?먮뒗 v3 踰덉뿭 ?붿쭊 ?ъ슜
      const translationFn = useV3 ? translateTextV3 : translateText;
      const result = translationFn(inputText, validRules, {
        direction: "encode",
        mode: engineMode,
      });

      console.log("?렞 理쒖쥌 ?뷀샇??寃곌낵:", result);

      // ?섏쐞 ?명솚?깆쓣 ?꾪빐 湲곗〈 諛⑹떇??異붿쟻 (蹂듯샇?붿슜)
      const { appliedRules } = encodeText(inputText, validRules);
      if (appliedRules.length > 0) {
        saveLastEncodeRules(appliedRules);
      }

      // ?뵏 蹂댁븞: 異쒕젰 sanitization ?곸슜
      const sanitizedResult = sanitizeText(result);
      setOutputText(sanitizedResult);

      // ?뵦 ?먮룞 ?숈뒿??湲곕줉
      setLastSourceText(inputText.trim());
      setLastAutoTranslated(result);
      setUserEditedOutput(false);

      // ?뱶 ?덉뒪?좊━??異붽?
      addToHistory({
        direction: 'encode',
        mode: engineMode,
        input: inputText,
        output: result,
        rulesCount: validRules.length,
        engineVersion: useV3 ? 'v3' : 'v2'
      });

      // ?뱤 洹쒖튃 ?ъ슜 ?듦퀎 湲곕줉
      recordRuleUsage(validRules, 'encode');

      await showAlert(`?뷀샇???꾨즺! (${engineMode} 紐⑤뱶, ${validRules.length}媛?洹쒖튃, ${engineVersion})`, "success", 2000);
    } catch (error) {
      console.error("?뷀샇??以??ㅻ쪟 諛쒖깮:", error);
      // ?뵏 蹂댁븞: ?쇰컲?곸씤 ?먮윭 硫붿떆吏 (?곸꽭 ?뺣낫 ?④?)
      await showAlert("?뷀샇??以??ㅻ쪟媛 諛쒖깮?덉뒿?덈떎. ?ㅼ떆 ?쒕룄?댁＜?몄슂.", "error");
    }
  };

  // 蹂듯샇??(v2/v3 ?붿쭊 ?먮룞 ?좏깮)
  const decode = async () => {
    try {
      if (!inputText.trim()) {
        await showAlert("?먮낯 ?띿뒪?몃? ?낅젰?댁＜?몄슂.", "warning");
        return;
      }

      // ?뷀샇?????ㅼ젣濡??곸슜??洹쒖튃 遺덈윭?ㅺ린
      let appliedRules = getLastEncodeRules();

      // ??λ맂 洹쒖튃???놁쑝硫??꾩껜 洹쒖튃 ?ъ슜 (?섏쐞 ?명솚??
      if (appliedRules.length === 0) {
        appliedRules = getEncodeOrderFromRules(rules);
      }

      const validRules = appliedRules.filter((r) => r && ((r.from && r.from.trim()) || (r.to && r.to.trim())));
      if (validRules.length === 0) {
        await showAlert("蹂듯샇?뷀븷 洹쒖튃???놁뒿?덈떎. 洹쒖튃??異붽??댁＜?몄슂.", "warning");
        return;
      }

      // ?? 100媛??댁긽 洹쒖튃 ??v3 ?붿쭊 ?먮룞 ?ъ슜
      const useV3 = validRules.length >= 100;
      const engineVersion = useV3 ? "v3 (理쒖쟻??" : "v2";

      console.log(`?뵑 [${engineVersion} ?붿쭊 蹂듯샇???쒖옉]`);
      console.log("?뱷 ?뷀샇?붾맂 ?띿뒪??", inputText);
      console.log("?뵩 ?붿쭊 紐⑤뱶:", engineMode);
      console.log("?뱥 洹쒖튃 媛쒖닔:", validRules.length);

      // v2 ?먮뒗 v3 踰덉뿭 ?붿쭊 ?ъ슜
      const translationFn = useV3 ? translateTextV3 : translateText;
      const result = translationFn(inputText, validRules, {
        direction: "decode",
        mode: engineMode,
      });

      if (process.env.NODE_ENV === 'development') {
        console.log("?렞 理쒖쥌 蹂듯샇??寃곌낵:", result);
      }
      // ?뵏 蹂댁븞: 異쒕젰 sanitization ?곸슜
      const sanitizedResult = sanitizeText(result);
      setOutputText(sanitizedResult);

      // ?뱶 ?덉뒪?좊━??異붽?
      addToHistory({
        direction: 'decode',
        mode: engineMode,
        input: inputText,
        output: result,
        rulesCount: validRules.length,
        engineVersion: useV3 ? 'v3' : 'v2'
      });

      // ?뱤 洹쒖튃 ?ъ슜 ?듦퀎 湲곕줉
      recordRuleUsage(validRules, 'decode');

      await showAlert(`蹂듯샇???꾨즺! (${engineMode} 紐⑤뱶, ${validRules.length}媛?洹쒖튃, ${engineVersion})`, "success", 2000);
    } catch (error) {
      console.error("蹂듯샇??以??ㅻ쪟 諛쒖깮:", error);
      // ?뵏 蹂댁븞: ?쇰컲?곸씤 ?먮윭 硫붿떆吏 (?곸꽭 ?뺣낫 ?④?)
      await showAlert("蹂듯샇??以??ㅻ쪟媛 諛쒖깮?덉뒿?덈떎. ?ㅼ떆 ?쒕룄?댁＜?몄슂.", "error");
    }
  };

  // ?⑨툘 ?ㅻ낫???⑥텞???ㅼ젙 (encode/decode ?⑥닔 ?뺤쓽 ??
  useKeyboardShortcuts({
    onEncode: encode,
    onDecode: decode,
    onSavePreset: () => setShowPresetModal(true),
    onAddRule: addRule,
    onSearch: () => setShowSearch(prev => !prev),
    onHelp: () => setShowQuickGuide(true),
    onBackup: () => setShowBackupModal(true),
  });

  // 寃곌낵 蹂듭궗
  const copyResult = async () => {
    if (!outputText.trim()) {
      await showAlert("蹂듭궗??寃곌낵媛 ?놁뒿?덈떎.", "warning");
      return;
    }
    try {
      await navigator.clipboard.writeText(outputText);
      await showAlert("寃곌낵媛 蹂듭궗?섏뿀?듬땲??", "success", 2000);
    } catch (error) {
      console.error("蹂듭궗 ?ㅽ뙣:", error);
      await showAlert("蹂듭궗???ㅽ뙣?덉뒿?덈떎. 釉뚮씪?곗? 沅뚰븳???뺤씤?댁＜?몄슂.", "error");
    }
  };

  // ?띿뒪??swap
  const swapText = () => {
    setInputText(outputText);
    setOutputText(inputText);
  };

  // ?쒕뜡 ?몄뼱 ?앹꽦 (?곸뼱 + ?쒓?)
  const generateRandomAlphabet = () => {
    // ?곸뼱 ?뚰뙆踰?
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    
    // 자주 쓰는 기본 한글 음절
    const koreanChars = [
      "가", "나", "다", "라", "마", "바", "사", "아", "자", "차", "카", "타", "파", "하",
      "거", "너", "더", "러", "머", "버", "서", "어", "저", "처", "커", "터", "퍼", "허",
      "고", "노", "도", "로", "모", "보", "소", "오", "조", "초", "코", "토", "포", "호",
      "구", "누", "두", "루", "무", "부", "수", "우", "주", "추", "쿠", "투", "푸", "후",
      "기", "니", "디", "리", "미", "비", "시", "이", "지", "치", "키", "티", "피", "히",
    ];

    // ?꾩껜 臾몄옄 紐⑸줉
    const allChars = [...alphabet, ...koreanChars];
    
    // ?쇱뀛?볦삁?댁툩 ?뷀뵆
    const shuffled = [...allChars];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const newRules = allChars.map((ch, index) => ({
      from: ch,
      to: shuffled[index],
    }));

    setRules(newRules, "?렡 ?쒕뜡 ?앹꽦");
    showAlert(`${newRules.length}媛쒖쓽 洹쒖튃???앹꽦?섏뿀?듬땲?? (?곸뼱 ${alphabet.length}媛?+ ?쒓? ${koreanChars.length}媛?`, "success");
  };

  const clearRules = async () => {
    const confirmed = window.confirm("?뺣쭚 紐⑤뱺 洹쒖튃????젣?좉퉴??");
    if (confirmed) {
      setRules([], "?㏏ ?꾩껜 ??젣");
      await showAlert("紐⑤뱺 洹쒖튃????젣?섏뿀?듬땲??", "success");
    }
  };

  // 洹쒖튃 ?대낫?닿린
  const exportRules = async () => {
    const validRules = rules.filter(
      (rule) => rule && rule.from && rule.from.trim() !== ""
    );

    if (validRules.length === 0) {
      await showAlert("?대낫??洹쒖튃???놁뒿?덈떎.", "warning");
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

    await showAlert(`${validRules.length}媛쒖쓽 洹쒖튃???대낫?댁죱?듬땲??`, "success");
  };

  // 洹쒖튃 媛?몄삤湲?
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
          await showAlert("?섎せ???뚯씪 ?뺤떇?낅땲??", "error");
          return;
        }

        const validRules = data.rules.filter(
          (rule) => rule && rule.from && rule.from.trim() !== ""
        );

        if (validRules.length === 0) {
          await showAlert("媛?몄삱 洹쒖튃???놁뒿?덈떎.", "warning");
          return;
        }

        const confirmed = window.confirm(
          `${validRules.length}媛쒖쓽 洹쒖튃??媛?몄삤?쒓쿋?듬땲源?\n湲곗〈 洹쒖튃? ?좎??섍퀬 異붽??⑸땲??`
        );

        if (confirmed) {
          setRules([...rules, ...validRules]);
          await showAlert(`${validRules.length}媛쒖쓽 洹쒖튃??媛?몄?議뚯뒿?덈떎!`, "success");
        }
      } catch (error) {
        console.error("?뚯씪 ?쎄린 ?ㅽ뙣:", error);
        await showAlert("?뚯씪???쎈뒗 以??ㅻ쪟媛 諛쒖깮?덉뒿?덈떎.", "error");
      }
    };

    input.click();
  };

  // ========================================
  // AI ?몄뼱 ?앹꽦 ?뚭퀬由ъ쬁
  // ========================================

  // A) 臾몄옄 湲곕컲 ?뷀샇 ?몄뼱 ?앹꽦
  const generateAI_CharacterMap = () => {
    // ?곸뼱 ?뚰뙆踰?
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    
    // ?먯＜ ?곕뒗 ?쒓? 湲?먮뱾
    const koreanChars = [
      "가", "나", "다", "라", "마", "바", "사", "아", "자", "차",
      "카", "타", "파", "하", "거", "너", "더", "러", "머", "버",
      "서", "어", "저", "처", "커", "터", "퍼", "허", "고", "노",
      "도", "로", "모", "보", "소", "오", "조", "초", "코", "토",
      "포", "호", "구", "누", "두", "루", "무", "부", "수", "우",
      "주", "추", "쿠", "투", "푸", "후", "기", "니", "디", "리",
      "미", "비", "시", "이", "지", "치", "키", "티", "피", "히",
    ];
    
    const allChars = [...alphabet, ...koreanChars];
    const shuffled = [...allChars];

    // ?쇱뀛?볦삁?댁툩 ?뷀뵆
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return allChars.map((c, i) => ({
      from: c,
      to: shuffled[i] + (Math.random() > 0.7 ? shuffled[(i + 3) % allChars.length] : ""), // ?쎄컙 ?뺤옣
    }));
  };

  // B) ?뚯젅 湲곕컲 ?먰?吏 ?몄뼱 ?앹꽦
  const generateAI_SyllableLanguage = () => {
    const syllables = [
      "ka", "ra", "ma", "ta", "sha", "lo", "fi", "ze", "nu", "ki",
      "ba", "da", "ga", "la", "na", "sa", "wa", "ya", "ha", "pa",
    ];
    
    // ?곸뼱 + ?쒓?
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const koreanChars = [
      "가", "나", "다", "라", "마", "바", "사", "아", "자", "차",
      "카", "타", "파", "하", "거", "너", "더", "러", "머", "버",
      "서", "어", "저", "처", "커", "터", "퍼", "허", "고", "노",
      "도", "로", "모", "보", "소", "오", "조", "초", "코", "토",
      "포", "호", "구", "누", "두", "루", "무", "부", "수", "우",
      "주", "추", "쿠", "투", "푸", "후", "기", "니", "디", "리",
      "미", "비", "시", "이", "지", "치", "키", "티", "피", "히",
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

  // C) ?묐몢???묐???洹쒖튃 ?몄뼱 ?앹꽦
  const generateAI_PrefixSuffix = () => {
    const prefixes = ["xo", "va", "zi", "re", "mo", "qu", "fy", "lo"];
    const suffixes = ["-en", "-ar", "-um", "-iq", "-al", "-is", "-ox", "-yn"];

    // ?곸뼱 + ?쒓?
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const koreanChars = [
      "가", "나", "다", "라", "마", "바", "사", "아", "자", "차",
      "카", "타", "파", "하", "거", "너", "더", "러", "머", "버",
      "서", "어", "저", "처", "커", "터", "퍼", "허", "고", "노",
      "도", "로", "모", "보", "소", "오", "조", "초", "코", "토",
      "포", "호", "구", "누", "두", "루", "무", "부", "수", "우",
      "주", "추", "쿠", "투", "푸", "후", "기", "니", "디", "리",
      "미", "비", "시", "이", "지", "치", "키", "티", "피", "히",
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

  // D) ?쒖닔 湲곕컲 ?뷀샇 ?몄뼱 ?앹꽦
  const generateAI_Crypto = () => {
    // ?곸뼱 + ?쒓?
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const koreanChars = [
      "가", "나", "다", "라", "마", "바", "사", "아", "자", "차",
      "카", "타", "파", "하", "거", "너", "더", "러", "머", "버",
      "서", "어", "저", "처", "커", "터", "퍼", "허", "고", "노",
      "도", "로", "모", "보", "소", "오", "조", "초", "코", "토",
      "포", "호", "구", "누", "두", "루", "무", "부", "수", "우",
      "주", "추", "쿠", "투", "푸", "후", "기", "니", "디", "리",
      "미", "비", "시", "이", "지", "치", "키", "티", "피", "히",
    ];
    
    const allChars = [...alphabet, ...koreanChars];

    const randomChunk = () => {
      const length = Math.floor(Math.random() * 3) + 2; // 2~4湲??
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

  // AI ?몄뼱 ?앹꽦 硫붿씤 ?⑥닔???쒓굅?섏뿀?듬땲??
  // ???AIGeneratorModal 而댄룷?뚰듃瑜??ъ슜?섏꽭??

  // AI ?앹꽦 ?곸슜
  const applyAIGeneration = async () => {
    if (!preview.data || preview.data.length === 0) {
      await showAlert("?몄뼱 ?앹꽦 諛⑹떇???좏깮?섏꽭??", "warning");
      return;
    }
    const modeName = ["", "臾몄옄 湲곕컲", "?뚯젅 湲곕컲", "?묐몢/?묐?", "?쒖닔"][preview.mode] || "AI";
    setRules(preview.data, `?쨼 ${modeName} ?몄뼱 ?앹꽦`);
    setShowAIModal(false);
    setPreview({ mode: null, data: null });
    await showAlert(`?쨼 AI ?몄뼱媛 ?곸슜?섏뿀?듬땲?? (${preview.data.length}媛?洹쒖튃)`, "success");
  };

  // ?몄뼱 ?꾩씠?댄떚???곸슜
  const applyIdentity = (identity) => {
    setLanguageIdentity(identity);
    safeLocalStorageSet("language_identity_v1", JSON.stringify(identity));
    showAlert("???몄뼱 ?대쫫/?멸퀎愿????λ릺?덉뒿?덈떎!", "success");
  };

  // 吏꾪솕??洹쒖튃 ?곸슜
  const applyEvolvedRules = (nextRules) => {
    setRules(nextRules, "?쭬 ?몄뼱 吏꾪솕 ?곸슜");
    resetRecommendState();
  };

  // ?⑥뼱 洹쒖튃 ?숈뒿 ?뚭퀬由ъ쬁
  const learnWordRules = async (original, translated) => {
    const oWords = original.trim().split(/\s+/);
    const tWords = translated.trim().split(/\s+/);

    if (oWords.length !== tWords.length) {
      await showAlert("??臾몄옣???⑥뼱 媛쒖닔媛 ?쇱튂?댁빞 ?⑸땲??", "warning");
      return;
    }

    const learned = oWords.map((w, i) => ({
      from: w,
      to: tWords[i],
    }));

    setRules(learned, "?쭬 ?⑥뼱 洹쒖튃 ?숈뒿");
    setShowLearnModal(false);

    await showAlert(`?쭬 ?⑥뼱 洹쒖튃???먮룞 ?숈뒿?섏뿀?듬땲?? (${learned.length}媛?`, "success");
  };

  // ?쒓? ?먮룞 蹂??洹쒖튃 ?앹꽦
  const generateKoreanRules = async () => {
    if (!inputText.trim()) {
      await showAlert("癒쇱? ?먮낯 ?띿뒪?몃? ?낅젰?댁＜?몄슂.", "warning");
      return;
    }

    // ?쒓? 臾몄옄 異붿텧 (媛-??踰붿쐞)
    const koreanChars = new Set();
    const text = inputText;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      // ?쒓? ?좊땲肄붾뱶 踰붿쐞: 媛(0xAC00) ~ ??0xD7A3)
      if (char >= "\uAC00" && char <= "\uD7A3") {
        koreanChars.add(char);
      }
    }

    if (koreanChars.size === 0) {
      await showAlert("?낅젰???띿뒪?몄뿉 ?쒓????놁뒿?덈떎.", "warning");
      return;
    }

    // 湲곗〈 洹쒖튃?먯꽌 ?대? ?ъ슜??蹂??臾몄옄???뺤씤
    const usedToValues = new Set(rules.map((r) => r.to).filter((t) => t));
    
    // 媛??쒓? 臾몄옄??????쒕뜡 蹂??臾몄옄???앹꽦
    const newRules = [];
    const charsArray = Array.from(koreanChars);
    
    charsArray.forEach((char) => {
      // ?대? 洹쒖튃???덈뒗吏 ?뺤씤
      const existingRule = rules.find((r) => r.from === char);
      if (existingRule) {
        return; // ?대? 洹쒖튃???덉쑝硫??ㅽ궢
      }

      // ?쒕뜡 臾몄옄???앹꽦 (?臾몄옄 ?뚰뙆踰?2-4??
      let randomStr;
      let attempts = 0;
      const maxAttempts = 100; // 臾댄븳 猷⑦봽 諛⑹?
      
      do {
        const length = Math.floor(Math.random() * 3) + 2; // 2-4??
        randomStr = Array.from({ length }, () => {
          return String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
        }).join("");
        attempts++;
        
        // 異⑸룎???덈Т 留롮쑝硫??レ옄 異붽?
        if (attempts > 50 && !usedToValues.has(randomStr + "1")) {
          randomStr = randomStr + "1";
        }
      } while (usedToValues.has(randomStr) && attempts < maxAttempts);
      
      // 理쒕? ?쒕룄 ?잛닔 珥덇낵 ????꾩뒪?ы봽 異붽?
      if (attempts >= maxAttempts) {
        randomStr = randomStr + Date.now().toString().slice(-3);
      }
      
      usedToValues.add(randomStr);
      newRules.push({ from: char, to: randomStr });
    });

    if (newRules.length === 0) {
      await showAlert("紐⑤뱺 ?쒓? 臾몄옄?????洹쒖튃???대? 議댁옱?⑸땲??", "info");
      return;
    }

    // 湲곗〈 洹쒖튃??異붽?
    setRules([...rules, ...newRules]);
    await showAlert(`${newRules.length}媛쒖쓽 ?쒓? 蹂??洹쒖튃??異붽??섏뿀?듬땲??`, "success");
  };

  // ?벑 紐⑤컮??vs ?뮲 ?곗뒪?ы넲 遺꾧린
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

  // ?뮲 ?곗뒪?ы넲 UI
  return (
    <>
      {AlertComponent}
      <PWAInstallPrompt />
      <ServiceWorkerRegistration />
      <Navigation />
      
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* 3D 濡쒓퀬 + ??댄? ?곸뿭 */}
        <Logo3D
          title="My Secret Language"
          // 蹂댁븞: AdSense slot? ?섍꼍 蹂?섏뿉?쒕쭔 媛?몄삤湲?(湲곕낯媛??쒓굅)
          subtitle={
            languageIdentity
              ? `${languageIdentity.name} 쨌 ${languageIdentity.tagline}`
              : "나만의 언어 생성기 · 3D Crypto Text Lab"
          }
        />

        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 md:p-8 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.18),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.16),transparent_34%)]" />
          <div className="relative grid gap-4 md:grid-cols-3">
            {[
              {
                title: "짧은 인사말",
                input: "안녕하세요",
                output: "규칙에 따라 변형된 인사말",
                note: "가장 먼저 확인하기 좋은 기본 테스트",
              },
              {
                title: "메신저 문장",
                input: "오늘 저녁에 만날래?",
                output: "ㅇㄴ ㅈㄴ에 ㅁㄴㄹ?",
                note: "짧은 치환과 약어 규칙을 함께 점검",
              },
              {
                title: "가역 변환",
                input: "HELLO WORLD",
                output: "SVOOL DLIOW",
                note: "encode와 decode를 함께 시험하기 좋음",
              },
            ].map((example, index) => (
              <article
                key={example.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/8 backdrop-blur-xl p-5 md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 ${
                    index === 0
                      ? "bg-gradient-to-r from-sky-400 to-cyan-300"
                      : index === 1
                        ? "bg-gradient-to-r from-emerald-400 to-teal-300"
                        : "bg-gradient-to-r from-violet-400 to-fuchsia-300"
                  }`}
                />
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                  Example
                </p>
                <h3 className="text-lg font-bold text-white mb-3">{example.title}</h3>
                <div className="space-y-2 text-sm text-slate-300">
                  <p>
                    <span className="font-semibold text-white">입력:</span>{" "}
                    {example.input}
                  </p>
                  <p>
                    <span className="font-semibold text-white">출력:</span>{" "}
                    {example.output}
                  </p>
                  <p className="pt-2 text-slate-400 leading-6">{example.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* AdSense 愿묎퀬 ?곸뿭 - ?곷떒 */}
        {/* ?좑툘 援ш? ?뺤콉: 異⑸텇??肄섑뀗痢좉? ?덈뒗 寃쎌슦?먮쭔 愿묎퀬 ?쒖떆 */}
        {shouldShowAds() && (
          <div className="card-3d p-3 my-4">
            <Adsense 
              slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT || ""} 
              style={{ display: "block", minHeight: "90px" }}
            />
          </div>
        )}

        {/* 肄섑뀗痢??뱀뀡 */}
        <ContentSection />

      {/* ?렓 源붾걫?섍쾶 ?뺣━???ㅻ퉬寃뚯씠??諛?*/}
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
          <h2 className="text-xl font-semibold mb-3">텍스트 입력</h2>
          <textarea
            className="input-3d w-full min-h-[160px]"
            value={inputText}
            onChange={(e) => {
              const newValue = e.target.value;
              // 입력 검증
              const validation = validateTextInput(newValue);
              if (validation.valid) {
                setInputText(newValue);
              } else {
                showAlert(validation.error || "입력값이 유효하지 않습니다.", "error");
              }
            }}
            placeholder="여기에 문장을 입력하세요"
            maxLength={MAX_INPUT_LENGTH}
          />

          {/* 변환 엔진 선택 */}
          <div className="mt-4 mb-3">
            <label className="block text-sm font-medium mb-2 opacity-90">
              변환 모드
            </label>
            <select
              className="input-3d w-full py-2"
              value={engineMode}
              onChange={(e) => setEngineMode(e.target.value)}
              title="변환 방식을 선택하세요"
            >
              <option value="hybrid">Hybrid (단어 + 문자 추천)</option>
              <option value="word">Word (단어 단위)</option>
              <option value="substring">Substring (부분 문자열 치환)</option>
            </select>
          </div>

          {/* 蹂??踰꾪듉 洹몃９ */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <button className="btn-3d btn-encode flex-1" onClick={encode}>
                ?뵍 ?뷀샇??
              </button>
              <button className="btn-3d btn-decode flex-1" onClick={decode}>
                ?뵑 蹂듯샇??
              </button>
            </div>
            <button 
              className="btn-3d btn-korean w-full" 
              onClick={generateKoreanRules}
              title="?낅젰???띿뒪?몄쓽 ?쒓????먮룞?쇰줈 蹂??洹쒖튃 ?앹꽦"
            >
              ???쒓? ?먮룞 蹂??
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
              // 입력 sanitization 적용
              const newValue = sanitizeText(e.target.value);
              setOutputText(newValue);

              // 사용자가 직접 수정한 경우만 학습 샘플로 기록
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
                  // 학습 샘플 자동 저장
                  addSample({
                    original: lastSourceText,
                    translated: outputText,
                    mode: "word",
                  });

                  console.log("자동 학습 샘플 저장 완료");
                  setLearnToast(true);
                  setTimeout(() => setLearnToast(false), 2000);

                  // 중복 저장 방지
                  setUserEditedOutput(false);
                  setLastSavedKey(key);

                  // 샘플 업데이트 및 추천 체크
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
                복사
              </button>
              <button className="btn-3d btn-swap flex-1" onClick={swapText}>
                교환
              </button>
            </div>
            <div className="w-full">
              <TTSPlayer text={outputText} buttonText="음성 듣기" />
            </div>
          </div>
        </div>
      </div>

      {/* 異⑸룎 寃?ш린??紐⑤떖濡??대룞 */}
      {/* ?뚯뒪??踰덉뿭湲곕뒗 紐⑤떖濡??대룞 */}

      {/* AdSense 愿묎퀬 ?곸뿭 - 以묎컙 */}
      {/* ?좑툘 援ш? ?뺤콉: 異⑸텇??肄섑뀗痢좉? ?덈뒗 寃쎌슦?먮쭔 愿묎퀬 ?쒖떆 */}
      {shouldShowAds() && (
        <div className="card-3d p-3 my-4">
          <Adsense 
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT || ""} 
            style={{ display: "block", minHeight: "90px" }}
          />
        </div>
      )}

      {/* 洹쒖튃 ?몄쭛 移대뱶 */}
      <div className="card-3d">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">蹂??洹쒖튃</h2>
            {/* ?렞 Quick Win 5: 洹쒖튃 媛쒖닔 ?ㅼ떆媛??쒖떆 */}
            <span className="text-sm bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-bold">
              {rules.filter(r => r && r.from && r.from.trim()).length}媛?
            </span>
          </div>
        </div>

        {/* 踰꾪듉 洹몃９: 湲곕낯 ?묒뾽 */}
        <div className="button-group mb-3">
          <div className="button-group-label">湲곕낯 ?묒뾽</div>
          <div className="button-group-items">
            <button className="btn-3d btn-compact btn-add" onClick={addRule} title="??洹쒖튃 異붽?">
              ??洹쒖튃 異붽?
            </button>
            <button className="btn-3d btn-compact btn-red" onClick={clearRules} title="紐⑤뱺 洹쒖튃 ??젣">
              ?㏏ ??젣
            </button>
            {/* ?봽 Undo/Redo 踰꾪듉 */}
            <button 
              className="btn-3d btn-compact btn-undo" 
              onClick={undo} 
              disabled={!canUndo}
              title="?ㅽ뻾 痍⑥냼 (Ctrl+Z)"
            >
              ??Undo
            </button>
            <button 
              className="btn-3d btn-compact btn-redo" 
              onClick={redo} 
              disabled={!canRedo}
              title="?ㅼ떆 ?ㅽ뻾 (Ctrl+Shift+Z)"
            >
              ??Redo
            </button>
          </div>
        </div>

        {/* 踰꾪듉 洹몃９: AI ?앹꽦 */}
        <div className="button-group mb-3">
          <div className="button-group-label">AI ?앹꽦</div>
          <div className="button-group-items">
            <button 
              className="btn-3d btn-compact btn-ai" 
              onClick={() => setShowAIModal(true)}
              title="AI ?뚭퀬由ъ쬁?쇰줈 ?ㅼ뼇???몄뼱 ?⑦꽩 ?먮룞 ?앹꽦"
            >
              ?쨼 AI ?몄뼱 ?앹꽦
            </button>
            <button 
              className="btn-3d btn-compact btn-learn" 
              onClick={() => setShowLearnModal(true)}
              title="?먮Ц怨?蹂?섎Ц?쇰줈遺???⑥뼱 洹쒖튃 ?먮룞 ?숈뒿"
            >
              ?쭬 ?⑥뼱 洹쒖튃 ?숈뒿
            </button>
            <button className="btn-3d btn-compact btn-random" onClick={generateRandomAlphabet} title="?쒕뜡 ?뚰뙆踰?洹쒖튃 ?앹꽦">
              ?렡 ?쒕뜡 ?앹꽦
            </button>
          </div>
        </div>

        {/* 踰꾪듉 洹몃９: 怨좉툒 湲곕뒫 */}
        <div className="button-group mb-3">
          <div className="button-group-label">怨좉툒 湲곕뒫</div>
          <div className="button-group-items">
            <button 
              className="btn-3d btn-compact btn-naming" 
              onClick={() => setShowIdentityModal(true)}
              title="?몄뼱 ?대쫫 諛??멸퀎愿 ?앹꽦"
            >
              ???ㅼ씠諛??멸퀎愿
            </button>
            <button 
              className="btn-3d btn-compact btn-evolution" 
              onClick={() => {
                setShowEvolutionRecommend(false);
                setShowEvolutionModal(true);
              }}
              title="?숈뒿 ?섑뵆 湲곕컲 ?몄뼱 吏꾪솕"
            >
              ?㎚ ?몄뼱 吏꾪솕
            </button>
          </div>
        </div>

        {/* 踰꾪듉 洹몃９: ???遺덈윭?ㅺ린 */}
        <div className="button-group mb-3">
          <div className="button-group-label">???遺덈윭?ㅺ린</div>
          <div className="button-group-items">
            <button 
              className="btn-3d btn-compact" 
              onClick={exportRules}
              title="洹쒖튃??JSON ?뚯씪濡??대낫?닿린"
            >
              ?뱾 ?대낫?닿린
            </button>
            <button 
              className="btn-3d btn-compact" 
              onClick={importRules}
              title="JSON 파일에서 규칙 가져오기"
            >
              파일 가져오기
            </button>
            <button 
              className="btn-3d btn-compact btn-preset" 
              onClick={() => setShowPresetModal(true)}
              title="언어 프리셋 선택하기"
            >
              프리셋
            </button>
            <button 
              className="btn-3d btn-compact btn-search" 
              onClick={() => setShowSearch(!showSearch)}
              title="규칙 검색 토글"
            >
              {showSearch ? "검색 닫기" : "검색 열기"}
            </button>
          </div>
        </div>

        {/* 규칙 검색 필터 */}
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
                  <span className="text-lg">입</span>
                  <span>원문 (From)</span>
                </div>
              </th>
              <th className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-lg">출</span>
                  <span>변환 결과 (To)</span>
                </div>
              </th>
              <th className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">작</span>
                  <span>동작</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {(showSearch ? filteredRules : rules).filter(r => r && (r.from || r.to)).length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-8 opacity-60">
                  {showSearch ? "검색 결과가 없습니다." : "규칙이 없습니다. 위의 버튼을 사용해 규칙을 추가하세요."}
                </td>
              </tr>
            ) : (
              (showSearch ? filteredRules : rules).map((rule, index) => {
                // ?먮낯 ?몃뜳??李얘린
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
          洹쒖튃? ?꾩뿉???꾨옒 ?쒖꽌?濡??곸슜?⑸땲??  
          湲??⑥뼱瑜??꾩뿉 ?먮㈃ ?щ컮瑜?移섑솚???????쇱뼱?⑸땲??
        </p>
      </div>

      {/* AdSense 愿묎퀬 ?곸뿭 - ?섎떒 */}
      {/* ?좑툘 援ш? ?뺤콉: 異⑸텇??肄섑뀗痢좉? ?덈뒗 寃쎌슦?먮쭔 愿묎퀬 ?쒖떆 */}
      {shouldShowAds() && (
        <div className="card-3d p-3 my-4">
          <Adsense 
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT || ""} 
            style={{ display: "block", minHeight: "90px" }}
          />
        </div>
      )}

      {/* ?먮룞 ?숈뒿 ?좎뒪??*/}
      {learnToast && (
        <div className="fixed bottom-24 right-6 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg z-50 animate-pulse">
          ?쭬 ?몄뼱媛 ?숈뒿?섏뿀?듬땲??
        </div>
      )}

      {/* ?몄뼱 吏꾪솕 異붿쿇 諛곕꼫 */}
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
          AI ?앹꽦湲?紐⑤떖
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
          ?⑥뼱 洹쒖튃 ?숈뒿 紐⑤떖
      ------------------------- */}
      {showLearnModal && (
        <LearnRuleModal
          onClose={() => setShowLearnModal(false)}
          onLearn={learnWordRules}
        />
      )}

      {/* ------------------------
          ?꾨━??紐⑤떖
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
                <div className="text-4xl">언</div>
                <div>
                  <h2 className="text-2xl font-extrabold text-white">언어 프리셋</h2>
                  <p className="text-sm text-slate-400 mt-1">
                    저장한 프리셋을 불러오거나 새로 저장하세요.
                  </p>
                </div>
              </div>
              <button
                className="text-slate-400 hover:text-white transition-colors text-2xl leading-none hover:rotate-90 transition-transform duration-300"
                onClick={() => setShowPresetModal(false)}
              >
                ×
              </button>
            </div>

            {/* 프리셋 저장 섹션 */}
            <div className="bg-slate-700/30 border-2 border-slate-600/50 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">저</span>
                <h3 className="font-bold text-white">프리셋 저장</h3>
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
                프리셋 저장
              </button>
            </div>

            <hr />

            {/* 프리셋 목록 */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">목</span>
                  <h3 className="font-bold text-white">저장한 프리셋</h3>
                </div>
                <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full">
                  {presetList.length}개
                </span>
              </div>

              <div className="space-y-2 max-h-[350px] overflow-y-auto custom-scrollbar">
                {presetList.length === 0 ? (
                  <div className="text-center py-12 opacity-70">
                    <div className="text-5xl mb-3">비</div>
                    <p className="text-sm text-slate-400">저장한 프리셋이 없습니다</p>
                    <p className="text-xs text-slate-500 mt-1">
                      위에서 프리셋을 저장해보세요.
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
                          {/* 이름 편집 모드 */}
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
                                ??
                              </button>
                              <button
                                className="btn-3d btn-red text-xs px-2 py-1"
                                onClick={cancelEditPreset}
                              >
                                ??
                              </button>
                            </div>
                          ) : (
                            <div className="font-bold text-white mb-1 truncate group-hover:text-blue-300 transition-colors">
                              {preset.name}
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                              洹쒖튃 {preset.rules?.length || 0}媛?
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
                                불러오기
                              </button>
                              <button
                                className="btn-3d text-sm px-2 py-1"
                                onClick={() => startEditPreset(idx)}
                                title="이름 변경"
                              >
                                편집
                              </button>
                              <button
                                className="btn-3d btn-red text-sm px-3 py-1"
                                onClick={() => deletePreset(idx)}
                              >
                                삭제
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

      {/* ?몄뼱 ?ㅼ씠諛??멸퀎愿 紐⑤떖 */}
      {showIdentityModal && (
        <LanguageIdentityModal
          rules={rules}
          onClose={() => setShowIdentityModal(false)}
          onApply={applyIdentity}
        />
      )}

      {/* ?몄뼱 吏꾪솕 紐⑤떖 */}
      {showEvolutionModal && (
        <EvolutionModal
          baseRules={rules}
          onClose={() => setShowEvolutionModal(false)}
          onApplyRules={applyEvolvedRules}
        />
      )}

      {/* ?쒗넗由ъ뼹 紐⑤떖 (泥?諛⑸Ц?먯슜) */}
      {showTutorial && (
        <TutorialModal
          onClose={() => setShowTutorial(false)}
        />
      )}

      {/* 鍮좊Ⅸ 媛?대뱶 紐⑤떖 */}
      {showQuickGuide && (
        <QuickGuideModal
          onClose={() => setShowQuickGuide(false)}
        />
      )}

      {/* 諛깆뾽/蹂듭썝 紐⑤떖 */}
      {showBackupModal && (
        <BackupRestoreModal
          onClose={() => setShowBackupModal(false)}
          onRestore={() => {
            // 蹂듭썝 ???섏씠吏 ?덈줈怨좎묠
            window.location.reload();
          }}
        />
      )}

        {/* ?뵩 localStorage ?⑸웾 紐⑤땲?곕쭅 ?쒖떆湲?*/}
        <StorageIndicator onClick={() => setShowBackupModal(true)} />

        {/* 異⑸룎 寃?щ뒗 紐⑤떖濡??대룞 */}

      {/* ?⑨툘 ?ㅻ낫???⑥텞???꾩?留?紐⑤떖 */}
      {showShortcutsHelp && (
        <ShortcutsHelpModal onClose={() => setShowShortcutsHelp(false)} />
      )}

      {/* ?뱶 踰덉뿭 ?덉뒪?좊━ 紐⑤떖 */}
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

        {/* ?뱤 洹쒖튃 ?듦퀎 紐⑤떖 */}
        {showStatistics && (
          <RuleStatistics
            rules={rules}
            onClose={() => setShowStatistics(false)}
          />
        )}

        {/* ?뵇 異⑸룎 寃?ш린 紐⑤떖 */}
        {showConflictChecker && (
          <ConflictCheckerModal
            rules={rules}
            setRules={setRules}
            onClose={() => setShowConflictChecker(false)}
            showAlert={showAlert}
          />
        )}

        {/* ?㎦ ?뚯뒪??踰덉뿭湲?紐⑤떖 */}
        {showTestTranslator && (
          <TestTranslatorModal
            rules={rules}
            engineMode={engineMode}
            onClose={() => setShowTestTranslator(false)}
            showAlert={showAlert}
          />
        )}
      </div>
      <Footer />
    </>
  );
}
