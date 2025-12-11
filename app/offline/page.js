"use client";

import { useRouter } from "next/navigation";
import Logo3D from "../components/Logo3D";

export default function OfflinePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <Logo3D />

      <div className="card-3d max-w-lg text-center space-y-6 mt-8">
        <div className="text-6xl mb-4">📡</div>
        
        <h1 className="text-3xl font-bold">오프라인 모드</h1>
        
        <p className="text-lg opacity-90">
          인터넷 연결이 끊어졌지만, 언어 생성기는 계속 작동합니다!
        </p>

        <div className="bg-white/10 p-4 rounded-lg text-left text-sm space-y-2">
          <h3 className="font-semibold mb-2">✅ 오프라인에서 가능한 기능:</h3>
          <ul className="space-y-1 opacity-80">
            <li>• 언어 규칙 추가/수정/삭제</li>
            <li>• 텍스트 암호화/복호화</li>
            <li>• 저장된 프리셋 사용</li>
            <li>• AI 언어 자동 생성</li>
            <li>• 테스트 번역기 사용</li>
          </ul>
        </div>

        <div className="bg-yellow-500/20 border border-yellow-500/50 p-4 rounded-lg text-left text-sm">
          <h3 className="font-semibold mb-2">⚠️ 오프라인에서 제한되는 기능:</h3>
          <ul className="space-y-1 opacity-80">
            <li>• 프리셋 공유 (링크 생성)</li>
            <li>• 음성 재생 (일부 브라우저)</li>
          </ul>
        </div>

        <button
          className="btn-3d w-full"
          onClick={() => router.push("/")}
        >
          ← 메인으로 돌아가기
        </button>

        <p className="text-xs opacity-70 mt-4">
          인터넷 연결이 복구되면 모든 기능을 정상적으로 사용할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

