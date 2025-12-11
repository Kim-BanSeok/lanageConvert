/**
 * 언어 규칙 충돌 검사 유틸리티
 */

/**
 * 규칙 배열에서 모든 충돌을 감지합니다.
 * @param {Array} rules - 규칙 배열 [{from, to}, ...]
 * @returns {Object} 충돌 정보
 */
export function detectConflicts(rules) {
  const conflicts = {
    fromDuplicates: [], // from 중복
    toDuplicates: [], // to 중복 (경고)
    circularReferences: [], // 순환 참조
    selfReferences: [], // 자기 자신 참조
    emptyRules: [], // 빈 규칙
  };

  // 유효한 규칙만 필터링
  const validRules = rules.filter(
    (r, idx) => {
      if (!r || !r.from || !r.from.trim()) {
        conflicts.emptyRules.push({ index: idx, rule: r });
        return false;
      }
      return true;
    }
  );

  // 1. From 중복 체크
  const fromMap = new Map();
  validRules.forEach((rule, idx) => {
    const from = rule.from.trim();
    if (fromMap.has(from)) {
      fromMap.get(from).push(idx);
    } else {
      fromMap.set(from, [idx]);
    }
  });

  fromMap.forEach((indices, from) => {
    if (indices.length > 1) {
      conflicts.fromDuplicates.push({
        from,
        indices,
        rules: indices.map(i => validRules[i]),
      });
    }
  });

  // 2. To 중복 체크 (경고만, 에러 아님)
  const toMap = new Map();
  validRules.forEach((rule, idx) => {
    const to = rule.to?.trim();
    if (to) {
      if (toMap.has(to)) {
        toMap.get(to).push(idx);
      } else {
        toMap.set(to, [idx]);
      }
    }
  });

  toMap.forEach((indices, to) => {
    if (indices.length > 1) {
      conflicts.toDuplicates.push({
        to,
        indices,
        rules: indices.map(i => validRules[i]),
      });
    }
  });

  // 3. 자기 자신 참조 체크 (a → a)
  validRules.forEach((rule, idx) => {
    if (rule.from.trim() === rule.to?.trim()) {
      conflicts.selfReferences.push({
        index: idx,
        rule,
      });
    }
  });

  // 4. 순환 참조 체크 (a → b, b → a)
  const fromToMap = new Map();
  validRules.forEach((rule) => {
    const from = rule.from.trim();
    const to = rule.to?.trim();
    if (to) {
      fromToMap.set(from, to);
    }
  });

  const checked = new Set();
  validRules.forEach((rule, idx) => {
    const from = rule.from.trim();
    const to = rule.to?.trim();
    
    if (!to || checked.has(from)) return;

    // 순환 참조 확인
    const reverseTarget = fromToMap.get(to);
    if (reverseTarget === from) {
      const reverseIdx = validRules.findIndex(
        r => r.from.trim() === to && r.to?.trim() === from
      );
      
      if (reverseIdx !== -1 && !checked.has(to)) {
        conflicts.circularReferences.push({
          rule1: { index: idx, rule },
          rule2: { index: reverseIdx, rule: validRules[reverseIdx] },
        });
        checked.add(from);
        checked.add(to);
      }
    }
  });

  return conflicts;
}

/**
 * 충돌이 있는지 확인
 */
export function hasConflicts(conflicts) {
  return (
    conflicts.fromDuplicates.length > 0 ||
    conflicts.circularReferences.length > 0 ||
    conflicts.selfReferences.length > 0
  );
}

/**
 * 충돌 요약 텍스트 생성
 */
export function getConflictSummary(conflicts) {
  const warnings = [];
  
  if (conflicts.fromDuplicates.length > 0) {
    warnings.push(`From 중복: ${conflicts.fromDuplicates.length}개`);
  }
  
  if (conflicts.circularReferences.length > 0) {
    warnings.push(`순환 참조: ${conflicts.circularReferences.length}개`);
  }
  
  if (conflicts.selfReferences.length > 0) {
    warnings.push(`자기 참조: ${conflicts.selfReferences.length}개`);
  }
  
  if (conflicts.toDuplicates.length > 0) {
    warnings.push(`To 중복(경고): ${conflicts.toDuplicates.length}개`);
  }

  return warnings.join(", ");
}

/**
 * 충돌 자동 수정
 */
export function autoFixConflicts(rules, conflicts) {
  let fixedRules = [...rules];

  // 1. 빈 규칙 제거
  fixedRules = fixedRules.filter(
    (r, idx) => !conflicts.emptyRules.some(e => e.index === idx)
  );

  // 2. From 중복 제거 (첫 번째만 유지)
  const toRemove = new Set();
  conflicts.fromDuplicates.forEach(({ indices }) => {
    // 첫 번째를 제외한 나머지 제거
    indices.slice(1).forEach(idx => toRemove.add(idx));
  });

  fixedRules = fixedRules.filter((_, idx) => !toRemove.has(idx));

  // 3. 자기 참조 제거
  conflicts.selfReferences.forEach(({ index }) => {
    if (fixedRules[index]) {
      fixedRules[index] = { ...fixedRules[index], to: "" };
    }
  });

  return fixedRules;
}

