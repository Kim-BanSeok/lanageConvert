/**
 * 프리셋 공유를 위한 URL 인코딩/디코딩 유틸리티
 */

/**
 * 프리셋을 URL 쿼리스트링으로 인코딩
 */
export function encodePresetToURL(preset) {
  try {
    const data = JSON.stringify({
      name: preset.name,
      rules: preset.rules,
    });
    const encoded = btoa(encodeURIComponent(data));
    return encoded;
  } catch (error) {
    console.error("프리셋 인코딩 실패:", error);
    return null;
  }
}

/**
 * URL 쿼리스트링에서 프리셋 디코딩
 */
export function decodePresetFromURL(encoded) {
  try {
    const decoded = decodeURIComponent(atob(encoded));
    const preset = JSON.parse(decoded);
    
    // 유효성 검증
    if (!preset.name || !Array.isArray(preset.rules)) {
      throw new Error("Invalid preset format");
    }
    
    return preset;
  } catch (error) {
    console.error("프리셋 디코딩 실패:", error);
    return null;
  }
}

/**
 * 공유 URL 생성
 */
export function generateShareURL(preset, baseURL) {
  const encoded = encodePresetToURL(preset);
  if (!encoded) return null;
  
  return `${baseURL}/gallery?preset=${encoded}`;
}

/**
 * 현재 URL에서 프리셋 추출
 */
export function getPresetFromURL() {
  if (typeof window === "undefined") return null;
  
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get("preset");
  
  if (!encoded) return null;
  
  return decodePresetFromURL(encoded);
}

