# 🚀 배포 체크리스트

## ✅ 배포 전 확인사항

### 1. 빌드 테스트
- [x] `npm run build` 성공
- [x] 모든 페이지 정상 빌드
- [x] PWA Service Worker 생성 확인

### 2. 기능 테스트
- [x] v2 번역 엔진 (Hybrid/Word/Substring) 동작 확인
- [x] 암호화/복호화 정상 작동
- [x] AI 언어 생성 기능
- [x] 단어 규칙 학습
- [x] 충돌 검사기
- [x] 프리셋 저장/불러오기
- [x] PWA 설치 프롬프트
- [x] 오프라인 상태 감지

### 3. PWA 기능
- [x] manifest.json 설정 완료
- [x] 아이콘 파일 준비 완료
- [x] Service Worker 자동 등록
- [x] 오프라인 캐싱 전략 설정
- [x] iOS Splash Screen 설정

### 4. AdSense 설정 (선택사항)
- [ ] Google AdSense 계정 생성
- [ ] 사이트 승인 완료
- [ ] 광고 단위 생성
- [ ] 환경 변수 설정 (Vercel)

### 5. 환경 변수 설정

#### Vercel 배포 시
1. Vercel 대시보드 > 프로젝트 설정 > Environment Variables
2. 다음 변수 추가:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXX
   NEXT_PUBLIC_ADSENSE_SLOT=1234567890
   ```

#### 로컬 개발 시
`.env.local` 파일 생성:
```env
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT=1234567890
```

### 6. Git 커밋 및 푸시
- [x] 모든 변경사항 커밋 완료
- [x] GitHub에 푸시 완료

### 7. 배포 후 확인사항

#### Vercel 배포
```bash
# Vercel CLI로 배포
vercel --prod

# 또는 GitHub 연동 시 자동 배포
```

#### 배포 후 테스트
- [ ] 메인 페이지 로드 확인
- [ ] PWA 설치 가능 확인
- [ ] 오프라인 모드 테스트
- [ ] 모든 기능 정상 작동 확인
- [ ] 모바일 반응형 확인
- [ ] Lighthouse PWA 감사 실행
- [ ] AdSense 광고 표시 확인 (설정한 경우)

### 8. SEO 확인
- [x] sitemap.xml 생성
- [x] robots.txt 설정
- [x] 메타 태그 설정
- [ ] Google Search Console 등록
- [ ] Naver Search Advisor 등록

## 📊 성능 최적화

### 캐싱 전략
- ✅ 이미지: CacheFirst (30일)
- ✅ 정적 리소스: StaleWhileRevalidate (7일)
- ✅ 네트워크: NetworkFirst (1일, 10초 타임아웃)

### 번들 크기
- ✅ First Load JS: ~102 KB (공유)
- ✅ 메인 페이지: ~115 KB
- ✅ 갤러리 페이지: ~105 KB

## 🔍 배포 후 모니터링

### 확인할 사항
1. **에러 로그**: Vercel 대시보드에서 에러 확인
2. **성능**: Lighthouse 점수 확인
3. **PWA**: Service Worker 등록 확인
4. **AdSense**: 광고 표시 및 수익 확인

### 개선 가능 사항
- [ ] 이미지 최적화 (WebP 변환)
- [ ] 코드 스플리팅 최적화
- [ ] 추가 캐싱 전략 적용
- [ ] 성능 모니터링 도구 추가

## 📝 배포 완료 후

1. **문서 업데이트**: 배포 URL을 README에 추가
2. **소셜 공유**: 배포 완료 알림
3. **피드백 수집**: 사용자 피드백 대기
4. **지속적 개선**: 사용 패턴 분석 및 개선

---

**마지막 업데이트**: 2024년 (현재 날짜)
**배포 상태**: ✅ 준비 완료

