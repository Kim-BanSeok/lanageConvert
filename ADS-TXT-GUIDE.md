# 📄 ads.txt 파일 가이드

## ✅ 생성 완료

`public/ads.txt` 파일을 생성했습니다.

### 파일 내용
```
google.com, pub-7373977880685678, DIRECT, f08c47fec0942fa0
```

### 파일 위치
- 경로: `/public/ads.txt`
- 접근 URL: `https://lanage-convert.vercel.app/ads.txt`

## 📋 ads.txt란?

ads.txt는 **Authorized Digital Sellers**의 약자로:
- 사이트의 광고 판매자 정보를 명시하는 파일
- Google AdSense에서 권장하는 파일
- 사이트 소유권 확인에 도움이 됨

## 🔍 확인 방법

### 배포 후 확인
1. 배포 완료 대기 (1-3분)
2. 다음 URL 접속: https://lanage-convert.vercel.app/ads.txt
3. 파일 내용이 표시되는지 확인

### 예상 결과
```
google.com, pub-7373977880685678, DIRECT, f08c47fec0942fa0
```

## ⏱️ AdSense 확인 시간

ads.txt 파일이 생성되면:
- AdSense 크롤러가 파일을 확인하는 데 **몇 시간** 걸릴 수 있습니다
- 보통 **24시간 이내**에 상태가 업데이트됩니다
- AdSense 대시보드에서 "Ads.txt 상태"가 변경될 때까지 대기하세요

## 📝 참고사항

### 파일 형식
- 각 줄은 `도메인, Publisher ID, 관계, 인증 ID` 형식
- `google.com`: Google의 도메인
- `pub-7373977880685678`: 당신의 AdSense Publisher ID
- `DIRECT`: 직접 관계
- `f08c47fec0942fa0`: Google의 인증 ID (고정값)

### 파일 요구사항
- ✅ 루트 경로(`/ads.txt`)에서 접근 가능해야 함
- ✅ HTTP/HTTPS로 접근 가능해야 함
- ✅ 텍스트 파일 형식이어야 함
- ✅ UTF-8 인코딩

## 🚀 다음 단계

1. **배포 완료 대기** (1-3분)
2. **ads.txt 파일 확인**: https://lanage-convert.vercel.app/ads.txt
3. **AdSense 대시보드 확인**: 24시간 이내 상태 업데이트 대기
4. **검토 요청**: ads.txt 상태가 업데이트되면 검토 요청

## ✅ 체크리스트

- [x] ads.txt 파일 생성 완료
- [x] GitHub에 푸시 완료
- [ ] 배포 완료 대기
- [ ] 배포된 사이트에서 ads.txt 접근 확인
- [ ] AdSense 대시보드에서 상태 업데이트 대기

