/**
 * 🔒 입력 검증 유틸리티
 * XSS 및 DoS 공격 방지
 */

// 최대 입력 길이 제한 (10KB)
export const MAX_INPUT_LENGTH = 10000;
export const MAX_RULE_COUNT = 1000;
export const MAX_RULE_FROM_LENGTH = 100;
export const MAX_RULE_TO_LENGTH = 100;

/**
 * 텍스트 입력 검증
 * @param {string} text - 검증할 텍스트
 * @returns {{valid: boolean, error?: string}}
 */
export function validateTextInput(text) {
  if (text === null || text === undefined) {
    return { valid: false, error: '입력값이 없습니다.' };
  }

  if (typeof text !== 'string') {
    return { valid: false, error: '유효하지 않은 입력 형식입니다.' };
  }

  if (text.length > MAX_INPUT_LENGTH) {
    return { 
      valid: false, 
      error: `입력 길이는 ${MAX_INPUT_LENGTH}자를 초과할 수 없습니다.` 
    };
  }

  // null 바이트 체크 (파일 업로드 공격 방지)
  if (text.includes('\0')) {
    return { valid: false, error: '유효하지 않은 문자가 포함되어 있습니다.' };
  }

  return { valid: true };
}

/**
 * 규칙 검증
 * @param {Object} rule - 검증할 규칙 {from: string, to: string}
 * @returns {{valid: boolean, error?: string}}
 */
export function validateRule(rule) {
  if (!rule || typeof rule !== 'object') {
    return { valid: false, error: '유효하지 않은 규칙 형식입니다.' };
  }

  const { from, to } = rule;

  // from 필드 검증
  if (from === null || from === undefined) {
    return { valid: false, error: '규칙의 "from" 필드가 필요합니다.' };
  }

  if (typeof from !== 'string') {
    return { valid: false, error: '규칙의 "from" 필드는 문자열이어야 합니다.' };
  }

  if (from.length > MAX_RULE_FROM_LENGTH) {
    return { 
      valid: false, 
      error: `"from" 필드는 ${MAX_RULE_FROM_LENGTH}자를 초과할 수 없습니다.` 
    };
  }

  // to 필드 검증
  if (to === null || to === undefined) {
    return { valid: false, error: '규칙의 "to" 필드가 필요합니다.' };
  }

  if (typeof to !== 'string') {
    return { valid: false, error: '규칙의 "to" 필드는 문자열이어야 합니다.' };
  }

  if (to.length > MAX_RULE_TO_LENGTH) {
    return { 
      valid: false, 
      error: `"to" 필드는 ${MAX_RULE_TO_LENGTH}자를 초과할 수 없습니다.` 
    };
  }

  // null 바이트 체크
  if (from.includes('\0') || to.includes('\0')) {
    return { valid: false, error: '유효하지 않은 문자가 포함되어 있습니다.' };
  }

  return { valid: true };
}

/**
 * 규칙 배열 검증
 * @param {Array} rules - 검증할 규칙 배열
 * @returns {{valid: boolean, error?: string}}
 */
export function validateRules(rules) {
  if (!Array.isArray(rules)) {
    return { valid: false, error: '규칙은 배열이어야 합니다.' };
  }

  if (rules.length > MAX_RULE_COUNT) {
    return { 
      valid: false, 
      error: `규칙은 최대 ${MAX_RULE_COUNT}개까지 가능합니다.` 
    };
  }

  for (let i = 0; i < rules.length; i++) {
    const ruleValidation = validateRule(rules[i]);
    if (!ruleValidation.valid) {
      return { 
        valid: false, 
        error: `규칙 ${i + 1}: ${ruleValidation.error}` 
      };
    }
  }

  return { valid: true };
}

/**
 * 프리셋 이름 검증
 * @param {string} name - 검증할 프리셋 이름
 * @returns {{valid: boolean, error?: string}}
 */
export function validatePresetName(name) {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: '프리셋 이름이 필요합니다.' };
  }

  if (name.trim().length === 0) {
    return { valid: false, error: '프리셋 이름은 공백일 수 없습니다.' };
  }

  if (name.length > 100) {
    return { valid: false, error: '프리셋 이름은 100자를 초과할 수 없습니다.' };
  }

  // 특수 문자 제한 (파일명으로 사용될 수 있으므로)
  const invalidChars = /[<>:"/\\|?*\x00-\x1f]/;
  if (invalidChars.test(name)) {
    return { valid: false, error: '프리셋 이름에 사용할 수 없는 문자가 포함되어 있습니다.' };
  }

  return { valid: true };
}

/**
 * HTML 태그 제거 (XSS 방지)
 * @param {string} text - 정제할 텍스트
 * @returns {string} 정제된 텍스트
 */
export function sanitizeText(text) {
  if (typeof text !== 'string') {
    return '';
  }

  // HTML 태그 제거
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}

