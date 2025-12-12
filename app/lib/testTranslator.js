/**
 * 🧪 테스트 번역기 엔진
 * 샘플 문장을 규칙으로 테스트하고 결과를 분석
 */

import { translateText } from "./translationEngine";
import { translateTextV3 } from "./translationEngineV3";

/**
 * 단일 샘플 테스트
 */
export function testSingleSample(sample, rules, engineMode = "hybrid") {
  const useV3 = rules.length >= 100;
  const translateFn = useV3 ? translateTextV3 : translateText;
  
  // 암호화
  const encoded = translateFn(sample, rules, {
    direction: "encode",
    mode: engineMode,
  });
  
  // 복호화 (암호화된 결과를 다시 복호화)
  const decoded = translateFn(encoded, rules, {
    direction: "decode",
    mode: engineMode,
  });
  
  // 결과 분석
  const isReversible = sample === decoded;
  const changedCount = countChanges(sample, encoded);
  const changeRate = (changedCount / sample.length) * 100;
  
  return {
    original: sample,
    encoded,
    decoded,
    isReversible,
    changedCount,
    changeRate: Math.round(changeRate * 10) / 10,
    appliedRules: getAppliedRules(sample, rules, engineMode),
  };
}

/**
 * 여러 샘플 일괄 테스트
 */
export function testMultipleSamples(samples, rules, engineMode = "hybrid") {
  return samples.map(sample => testSingleSample(sample, rules, engineMode));
}

/**
 * 변경된 문자 수 계산
 */
function countChanges(original, transformed) {
  let changes = 0;
  const maxLen = Math.max(original.length, transformed.length);
  
  for (let i = 0; i < maxLen; i++) {
    if (original[i] !== transformed[i]) {
      changes++;
    }
  }
  
  return changes;
}

/**
 * 적용된 규칙 찾기
 */
function getAppliedRules(text, rules, mode) {
  const applied = [];
  
  rules.forEach((rule, index) => {
    if (!rule.from) return;
    
    if (mode === "word") {
      // 단어 단위 검색
      const words = text.split(/\s+/);
      if (words.includes(rule.from)) {
        applied.push({ index, rule, count: words.filter(w => w === rule.from).length });
      }
    } else {
      // 부분 문자열 검색
      const count = (text.match(new RegExp(escapeRegex(rule.from), 'g')) || []).length;
      if (count > 0) {
        applied.push({ index, rule, count });
      }
    }
  });
  
  return applied;
}

/**
 * 정규식 특수문자 이스케이프
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 테스트 결과 통계
 */
export function analyzeTestResults(results) {
  const total = results.length;
  const reversible = results.filter(r => r.isReversible).length;
  const irreversible = total - reversible;
  
  const avgChangeRate = results.reduce((sum, r) => sum + r.changeRate, 0) / total;
  const totalAppliedRules = results.reduce((sum, r) => sum + r.appliedRules.length, 0);
  
  return {
    total,
    reversible,
    irreversible,
    reversibleRate: Math.round((reversible / total) * 100 * 10) / 10,
    avgChangeRate: Math.round(avgChangeRate * 10) / 10,
    totalAppliedRules,
    avgAppliedRules: Math.round((totalAppliedRules / total) * 10) / 10,
  };
}

/**
 * 문제 있는 규칙 찾기
 */
export function findProblematicRules(results, rules) {
  const problematic = [];
  
  // 복호화 실패한 샘플들에서 사용된 규칙 추출
  const failedResults = results.filter(r => !r.isReversible);
  
  failedResults.forEach(result => {
    result.appliedRules.forEach(({ index, rule }) => {
      const existing = problematic.find(p => p.index === index);
      if (existing) {
        existing.failures++;
      } else {
        problematic.push({
          index,
          rule,
          failures: 1,
        });
      }
    });
  });
  
  // 실패 횟수로 정렬
  return problematic.sort((a, b) => b.failures - a.failures);
}

/**
 * 커버리지 분석 (어떤 규칙이 많이 사용되는지)
 */
export function analyzeCoverage(results) {
  const ruleCoverage = new Map();
  
  results.forEach(result => {
    result.appliedRules.forEach(({ index, rule, count }) => {
      if (ruleCoverage.has(index)) {
        ruleCoverage.set(index, ruleCoverage.get(index) + count);
      } else {
        ruleCoverage.set(index, count);
      }
    });
  });
  
  // 배열로 변환하고 사용 횟수로 정렬
  const coverage = Array.from(ruleCoverage.entries())
    .map(([index, count]) => ({ index, count }))
    .sort((a, b) => b.count - a.count);
  
  return coverage;
}

/**
 * 테스트 보고서 생성
 */
export function generateTestReport(results, rules, stats) {
  let report = `📊 테스트 번역 보고서\n\n`;
  
  report += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  report += `📈 전체 통계\n`;
  report += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  report += `• 테스트 샘플: ${stats.total}개\n`;
  report += `• ✅ 복호화 성공: ${stats.reversible}개 (${stats.reversibleRate}%)\n`;
  report += `• ❌ 복호화 실패: ${stats.irreversible}개\n`;
  report += `• 평균 변환율: ${stats.avgChangeRate}%\n`;
  report += `• 평균 적용 규칙: ${stats.avgAppliedRules}개\n\n`;
  
  if (stats.irreversible > 0) {
    report += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    report += `⚠️ 복호화 실패 케이스\n`;
    report += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    const failed = results.filter(r => !r.isReversible);
    failed.slice(0, 5).forEach((result, idx) => {
      report += `${idx + 1}. 원본: "${result.original}"\n`;
      report += `   암호: "${result.encoded}"\n`;
      report += `   복호: "${result.decoded}"\n\n`;
    });
    
    if (failed.length > 5) {
      report += `... 외 ${failed.length - 5}개\n\n`;
    }
  }
  
  report += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  report += `📝 생성 시각: ${new Date().toLocaleString('ko-KR')}\n`;
  report += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  
  return report;
}

/**
 * CSV 형식으로 결과 내보내기
 */
export function exportToCSV(results) {
  let csv = "원본,암호화,복호화,복호화성공,변환율,적용규칙수\n";
  
  results.forEach(result => {
    csv += `"${result.original}",`;
    csv += `"${result.encoded}",`;
    csv += `"${result.decoded}",`;
    csv += `${result.isReversible ? 'O' : 'X'},`;
    csv += `${result.changeRate}%,`;
    csv += `${result.appliedRules.length}\n`;
  });
  
  return csv;
}

