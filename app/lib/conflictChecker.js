/**
 * 🔍 언어 규칙 충돌 검사기
 * 규칙 간의 충돌을 자동으로 감지하고 해결 방안을 제시합니다.
 */

/**
 * 충돌 타입 정의
 */
export const CONFLICT_TYPES = {
  DUPLICATE: 'duplicate',           // 완전 중복
  OVERLAP: 'overlap',               // 부분 중복 (substring)
  CIRCULAR: 'circular',             // 순환 참조
  AMBIGUOUS: 'ambiguous',           // 애매한 변환
  EMPTY: 'empty',                   // 빈 값
};

/**
 * 충돌 심각도
 */
export const SEVERITY = {
  CRITICAL: 'critical',   // 심각 (즉시 수정 필요)
  WARNING: 'warning',     // 경고 (권장 수정)
  INFO: 'info',          // 정보 (참고)
};

/**
 * 규칙 충돌 전체 검사
 * @param {Array} rules - 검사할 규칙 배열
 * @returns {Object} 충돌 결과
 */
export function checkAllConflicts(rules) {
  const conflicts = [];
  
  // 1. 중복 검사
  conflicts.push(...checkDuplicates(rules));
  
  // 2. 겹침 검사 (substring overlap)
  conflicts.push(...checkOverlaps(rules));
  
  // 3. 순환 참조 검사
  conflicts.push(...checkCircularReferences(rules));
  
  // 4. 빈 값 검사
  conflicts.push(...checkEmptyValues(rules));
  
  // 5. 애매한 변환 검사
  conflicts.push(...checkAmbiguousTranslations(rules));
  
  // 통계 생성
  const stats = generateConflictStats(conflicts);
  
  return {
    conflicts,
    stats,
    hasConflicts: conflicts.length > 0,
    criticalCount: conflicts.filter(c => c.severity === SEVERITY.CRITICAL).length,
    warningCount: conflicts.filter(c => c.severity === SEVERITY.WARNING).length,
    infoCount: conflicts.filter(c => c.severity === SEVERITY.INFO).length,
  };
}

/**
 * 1. 완전 중복 검사
 */
function checkDuplicates(rules) {
  const conflicts = [];
  const seen = new Map();
  
  rules.forEach((rule, index) => {
    if (!rule.from) return;
    
    const key = `${rule.from}→${rule.to}`;
    
    if (seen.has(rule.from)) {
      const firstIndex = seen.get(rule.from);
      const firstRule = rules[firstIndex];
      
      if (firstRule.to === rule.to) {
        // 완전 중복
        conflicts.push({
          type: CONFLICT_TYPES.DUPLICATE,
          severity: SEVERITY.WARNING,
          indices: [firstIndex, index],
          rules: [firstRule, rule],
          message: `"${rule.from}" → "${rule.to}" 규칙이 중복되었습니다.`,
          suggestion: `중복된 규칙 중 하나를 삭제하세요.`,
          autoFix: {
            action: 'delete',
            targetIndex: index,
          }
        });
      } else {
        // 같은 입력, 다른 출력 (더 심각)
        conflicts.push({
          type: CONFLICT_TYPES.AMBIGUOUS,
          severity: SEVERITY.CRITICAL,
          indices: [firstIndex, index],
          rules: [firstRule, rule],
          message: `"${rule.from}"에 대해 서로 다른 변환이 존재합니다: "${firstRule.to}" vs "${rule.to}"`,
          suggestion: `하나의 변환 규칙만 유지하세요. 마지막 규칙이 우선 적용됩니다.`,
          autoFix: {
            action: 'choose',
            options: [
              { index: firstIndex, value: firstRule.to },
              { index: index, value: rule.to }
            ]
          }
        });
      }
    } else {
      seen.set(rule.from, index);
    }
  });
  
  return conflicts;
}

/**
 * 2. 부분 겹침 검사 (substring overlap)
 */
function checkOverlaps(rules) {
  const conflicts = [];
  
  for (let i = 0; i < rules.length; i++) {
    for (let j = i + 1; j < rules.length; j++) {
      const rule1 = rules[i];
      const rule2 = rules[j];
      
      if (!rule1.from || !rule2.from) continue;
      
      // rule1.from이 rule2.from에 포함되는 경우
      if (rule1.from !== rule2.from && rule2.from.includes(rule1.from)) {
        conflicts.push({
          type: CONFLICT_TYPES.OVERLAP,
          severity: SEVERITY.WARNING,
          indices: [i, j],
          rules: [rule1, rule2],
          message: `"${rule1.from}"이(가) "${rule2.from}"에 포함되어 있습니다.`,
          suggestion: `순서에 따라 예상치 못한 변환이 발생할 수 있습니다. 더 긴 규칙을 먼저 배치하세요.`,
          detail: `예: "${rule2.from}"을 변환할 때 "${rule1.from}"이 먼저 적용될 수 있습니다.`,
          autoFix: {
            action: 'reorder',
            targetIndices: [i, j],
            suggestion: 'longer-first'
          }
        });
      }
      
      // rule2.from이 rule1.from에 포함되는 경우
      if (rule1.from !== rule2.from && rule1.from.includes(rule2.from)) {
        conflicts.push({
          type: CONFLICT_TYPES.OVERLAP,
          severity: SEVERITY.WARNING,
          indices: [i, j],
          rules: [rule1, rule2],
          message: `"${rule2.from}"이(가) "${rule1.from}"에 포함되어 있습니다.`,
          suggestion: `순서에 따라 예상치 못한 변환이 발생할 수 있습니다. 더 긴 규칙을 먼저 배치하세요.`,
          detail: `예: "${rule1.from}"을 변환할 때 "${rule2.from}"이 먼저 적용될 수 있습니다.`,
          autoFix: {
            action: 'reorder',
            targetIndices: [i, j],
            suggestion: 'longer-first'
          }
        });
      }
    }
  }
  
  return conflicts;
}

/**
 * 3. 순환 참조 검사
 */
function checkCircularReferences(rules) {
  const conflicts = [];
  
  for (let i = 0; i < rules.length; i++) {
    const rule1 = rules[i];
    if (!rule1.from || !rule1.to) continue;
    
    for (let j = 0; j < rules.length; j++) {
      if (i === j) continue;
      
      const rule2 = rules[j];
      if (!rule2.from || !rule2.to) continue;
      
      // A → B, B → A 패턴
      if (rule1.from === rule2.to && rule1.to === rule2.from) {
        conflicts.push({
          type: CONFLICT_TYPES.CIRCULAR,
          severity: SEVERITY.CRITICAL,
          indices: [i, j],
          rules: [rule1, rule2],
          message: `순환 참조 발견: "${rule1.from}" ↔ "${rule1.to}"`,
          suggestion: `암호화와 복호화가 무한 루프를 발생시킬 수 있습니다.`,
          detail: `규칙 ${i + 1}: "${rule1.from}" → "${rule1.to}"\n규칙 ${j + 1}: "${rule2.from}" → "${rule2.to}"`,
          autoFix: null // 자동 수정 불가
        });
      }
      
      // A → B, B → C, C → A 패턴 (간접 순환)
      for (let k = 0; k < rules.length; k++) {
        if (k === i || k === j) continue;
        
        const rule3 = rules[k];
        if (!rule3.from || !rule3.to) continue;
        
        if (rule1.to === rule2.from && rule2.to === rule3.from && rule3.to === rule1.from) {
          conflicts.push({
            type: CONFLICT_TYPES.CIRCULAR,
            severity: SEVERITY.CRITICAL,
            indices: [i, j, k],
            rules: [rule1, rule2, rule3],
            message: `3단계 순환 참조 발견: "${rule1.from}" → "${rule2.from}" → "${rule3.from}" → "${rule1.from}"`,
            suggestion: `복잡한 순환 구조를 단순화하세요.`,
            autoFix: null
          });
        }
      }
    }
  }
  
  return conflicts;
}

/**
 * 4. 빈 값 검사
 */
function checkEmptyValues(rules) {
  const conflicts = [];
  
  rules.forEach((rule, index) => {
    if (!rule.from || rule.from.trim() === '') {
      conflicts.push({
        type: CONFLICT_TYPES.EMPTY,
        severity: SEVERITY.WARNING,
        indices: [index],
        rules: [rule],
        message: `규칙 ${index + 1}: FROM 값이 비어있습니다.`,
        suggestion: `유효한 값을 입력하거나 이 규칙을 삭제하세요.`,
        autoFix: {
          action: 'delete',
          targetIndex: index
        }
      });
    }
    
    if (rule.from && (!rule.to || rule.to.trim() === '')) {
      conflicts.push({
        type: CONFLICT_TYPES.EMPTY,
        severity: SEVERITY.INFO,
        indices: [index],
        rules: [rule],
        message: `규칙 ${index + 1}: TO 값이 비어있습니다. "${rule.from}"이(가) 삭제됩니다.`,
        suggestion: `의도한 것이 아니라면 TO 값을 입력하세요.`,
        autoFix: null
      });
    }
  });
  
  return conflicts;
}

/**
 * 5. 애매한 변환 검사
 */
function checkAmbiguousTranslations(rules) {
  const conflicts = [];
  
  // TO 값이 다른 규칙의 FROM 값과 겹치는 경우
  for (let i = 0; i < rules.length; i++) {
    const rule1 = rules[i];
    if (!rule1.to) continue;
    
    for (let j = 0; j < rules.length; j++) {
      if (i === j) continue;
      
      const rule2 = rules[j];
      if (!rule2.from) continue;
      
      if (rule1.to === rule2.from) {
        conflicts.push({
          type: CONFLICT_TYPES.AMBIGUOUS,
          severity: SEVERITY.INFO,
          indices: [i, j],
          rules: [rule1, rule2],
          message: `연쇄 변환 가능: "${rule1.from}" → "${rule1.to}" → "${rule2.to}"`,
          suggestion: `의도한 것인지 확인하세요. 복호화 시 문제가 발생할 수 있습니다.`,
          detail: `"${rule1.from}"을 암호화하면 "${rule1.to}"가 되고, 다시 암호화하면 "${rule2.to}"가 될 수 있습니다.`,
          autoFix: null
        });
      }
    }
  }
  
  return conflicts;
}

/**
 * 통계 생성
 */
function generateConflictStats(conflicts) {
  const byType = {};
  const bySeverity = {};
  
  conflicts.forEach(conflict => {
    // 타입별 집계
    byType[conflict.type] = (byType[conflict.type] || 0) + 1;
    
    // 심각도별 집계
    bySeverity[conflict.severity] = (bySeverity[conflict.severity] || 0) + 1;
  });
  
  return {
    total: conflicts.length,
    byType,
    bySeverity,
  };
}

/**
 * 자동 수정 적용
 */
export function applyAutoFix(rules, conflict) {
  if (!conflict.autoFix) return rules;
  
  const newRules = [...rules];
  
  switch (conflict.autoFix.action) {
    case 'delete':
      // 규칙 삭제
      newRules.splice(conflict.autoFix.targetIndex, 1);
      break;
      
    case 'reorder':
      // 규칙 재정렬 (긴 것 우선)
      const [idx1, idx2] = conflict.autoFix.targetIndices;
      if (newRules[idx1].from.length < newRules[idx2].from.length) {
        [newRules[idx1], newRules[idx2]] = [newRules[idx2], newRules[idx1]];
      }
      break;
      
    case 'choose':
      // 선택된 옵션만 유지
      // UI에서 사용자가 선택한 옵션을 받아야 함
      break;
  }
  
  return newRules;
}

/**
 * 모든 자동 수정 일괄 적용
 */
export function applyAllAutoFixes(rules, conflicts) {
  let fixedRules = [...rules];
  
  // 삭제는 역순으로 처리 (인덱스 꼬임 방지)
  const deleteConflicts = conflicts
    .filter(c => c.autoFix?.action === 'delete')
    .sort((a, b) => b.autoFix.targetIndex - a.autoFix.targetIndex);
  
  deleteConflicts.forEach(conflict => {
    fixedRules = applyAutoFix(fixedRules, conflict);
  });
  
  // 재정렬은 정순으로
  const reorderConflicts = conflicts
    .filter(c => c.autoFix?.action === 'reorder');
  
  reorderConflicts.forEach(conflict => {
    fixedRules = applyAutoFix(fixedRules, conflict);
  });
  
  return fixedRules;
}

/**
 * 충돌을 사람이 읽기 쉬운 텍스트로 변환
 */
export function formatConflictReport(conflictResult) {
  const { conflicts, stats } = conflictResult;
  
  let report = `📊 규칙 충돌 검사 결과\n\n`;
  report += `총 ${stats.total}개의 문제가 발견되었습니다.\n\n`;
  
  if (stats.bySeverity[SEVERITY.CRITICAL]) {
    report += `🔴 심각: ${stats.bySeverity[SEVERITY.CRITICAL]}개\n`;
  }
  if (stats.bySeverity[SEVERITY.WARNING]) {
    report += `🟡 경고: ${stats.bySeverity[SEVERITY.WARNING]}개\n`;
  }
  if (stats.bySeverity[SEVERITY.INFO]) {
    report += `🔵 정보: ${stats.bySeverity[SEVERITY.INFO]}개\n`;
  }
  
  report += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  conflicts.forEach((conflict, idx) => {
    const icon = conflict.severity === SEVERITY.CRITICAL ? '🔴' :
                 conflict.severity === SEVERITY.WARNING ? '🟡' : '🔵';
    
    report += `${icon} 문제 ${idx + 1}: ${conflict.message}\n`;
    report += `   💡 ${conflict.suggestion}\n`;
    if (conflict.detail) {
      report += `   📝 ${conflict.detail}\n`;
    }
    report += `\n`;
  });
  
  return report;
}

