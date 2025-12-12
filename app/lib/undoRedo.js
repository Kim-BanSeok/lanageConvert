// 🔄 Undo/Redo 시스템

/**
 * 작업 히스토리 관리 클래스
 */
export class HistoryManager {
  constructor(maxSize = 50) {
    this.maxSize = maxSize;
    this.history = [];
    this.currentIndex = -1;
  }

  /**
   * 새로운 상태 추가
   * @param {Object} state - 저장할 상태
   * @param {string} action - 작업 설명
   */
  push(state, action = "변경") {
    // 현재 위치 이후의 히스토리 제거 (새로운 분기)
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    // 새 상태 추가
    const entry = {
      state: JSON.parse(JSON.stringify(state)), // Deep copy
      action,
      timestamp: Date.now()
    };

    this.history.push(entry);

    // 최대 크기 초과 시 오래된 항목 제거
    if (this.history.length > this.maxSize) {
      this.history.shift();
    } else {
      this.currentIndex++;
    }

    return this.currentIndex;
  }

  /**
   * Undo - 이전 상태로 되돌리기
   * @returns {Object|null} 이전 상태
   */
  undo() {
    if (!this.canUndo()) {
      return null;
    }

    this.currentIndex--;
    return this.history[this.currentIndex];
  }

  /**
   * Redo - 다음 상태로 전진
   * @returns {Object|null} 다음 상태
   */
  redo() {
    if (!this.canRedo()) {
      return null;
    }

    this.currentIndex++;
    return this.history[this.currentIndex];
  }

  /**
   * Undo 가능 여부
   * @returns {boolean}
   */
  canUndo() {
    return this.currentIndex > 0;
  }

  /**
   * Redo 가능 여부
   * @returns {boolean}
   */
  canRedo() {
    return this.currentIndex < this.history.length - 1;
  }

  /**
   * 현재 상태 가져오기
   * @returns {Object|null}
   */
  getCurrent() {
    if (this.currentIndex >= 0 && this.currentIndex < this.history.length) {
      return this.history[this.currentIndex];
    }
    return null;
  }

  /**
   * 히스토리 전체 보기
   * @returns {Array}
   */
  getHistory() {
    return this.history.map((entry, index) => ({
      ...entry,
      isCurrent: index === this.currentIndex
    }));
  }

  /**
   * 히스토리 초기화
   */
  clear() {
    this.history = [];
    this.currentIndex = -1;
  }

  /**
   * 히스토리 정보
   * @returns {Object}
   */
  getInfo() {
    return {
      total: this.history.length,
      currentIndex: this.currentIndex,
      canUndo: this.canUndo(),
      canRedo: this.canRedo(),
      maxSize: this.maxSize
    };
  }
}

/**
 * React Hook으로 사용하기 위한 헬퍼
 */
export function createHistoryHook() {
  let manager = null;

  return {
    init(maxSize = 50) {
      if (!manager) {
        manager = new HistoryManager(maxSize);
      }
      return manager;
    },
    
    getManager() {
      return manager;
    }
  };
}

