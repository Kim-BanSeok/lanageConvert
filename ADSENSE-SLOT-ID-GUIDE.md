# 📍 AdSense Slot ID 확인 방법

## Slot ID란?

**Slot ID**는 AdSense에서 생성한 각 광고 단위를 식별하는 고유 번호입니다.
- 예: `4329998296`
- 광고 단위마다 고유한 Slot ID가 부여됩니다.

## 🔍 Slot ID 확인 방법

### 방법 1: 광고 단위 페이지에서 확인 (가장 쉬움)

1. **AdSense 대시보드 접속**
   - https://www.google.com/adsense 접속
   - Google 계정으로 로그인

2. **광고 메뉴 클릭**
   - 왼쪽 사이드바에서 **"광고"** 메뉴 클릭
   - 또는 상단 메뉴에서 **"광고"** 선택

3. **광고 단위 페이지로 이동**
   - "광고 단위" 또는 "Ad units" 클릭
   - 또는 직접 URL: https://www.google.com/adsense/new/u/0/pub-7373977880685678/adunits

4. **광고 단위 목록 확인**
   - 생성한 광고 단위 목록이 표시됩니다
   - 예: "사이트_배너광고", "디스플레이 광고" 등

5. **Slot ID 확인**
   - 각 광고 단위 옆에 **"ID"** 또는 **"Slot ID"** 표시
   - 또는 광고 단위 이름을 클릭하면 상세 정보에서 확인 가능

### 방법 2: 광고 단위 코드에서 확인

1. **광고 단위 페이지 접속**
   - AdSense > 광고 > 광고 단위

2. **광고 단위 클릭**
   - 확인하고 싶은 광고 단위 이름 클릭

3. **코드 보기**
   - "코드 생성기" 또는 "Get code" 버튼 클릭
   - HTML 코드가 표시됩니다

4. **Slot ID 찾기**
   ```html
   <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-7373977880685678"
        data-ad-slot="4329998296"  <!-- 👈 여기가 Slot ID -->
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
   ```
   - `data-ad-slot="4329998296"` 부분의 숫자가 Slot ID입니다

### 방법 3: 광고 단위 생성 시 확인

1. **새 광고 단위 생성**
   - AdSense > 광고 > 광고 단위
   - "+ 새 광고 단위" 또는 "New ad unit" 클릭

2. **광고 단위 설정**
   - 이름 입력 (예: "사이트_배너광고")
   - 광고 형식 선택
   - 크기 선택

3. **생성 완료**
   - 생성 완료 후 Slot ID가 표시됩니다
   - 또는 코드 생성기에서 확인 가능

## 📋 현재 프로젝트에서 사용 중인 Slot ID

- **Slot ID**: `4329998296`
- **광고 단위 이름**: "사이트_배너광고" (추정)
- **사용 위치**: 
  - `app/page.js` (3곳)
  - 환경 변수: `NEXT_PUBLIC_ADSENSE_SLOT`

## 🔧 Slot ID 변경 방법

### 1. 환경 변수 변경

**로컬 개발 환경** (`.env.local`):
```env
NEXT_PUBLIC_ADSENSE_SLOT=4329998296
```

**Vercel 배포 환경**:
1. Vercel 대시보드 > Settings > Environment Variables
2. `NEXT_PUBLIC_ADSENSE_SLOT` 찾기
3. 값 변경 후 재배포

### 2. 코드에서 직접 변경

`app/page.js` 파일에서:
```jsx
<Adsense 
  slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT || "4329998296"} 
  style={{ display: "block", minHeight: "90px" }}
/>
```

## ⚠️ 주의사항

### Slot ID는 광고 단위마다 다름
- 각 광고 단위마다 고유한 Slot ID가 부여됩니다
- 여러 광고를 사용하려면 각각의 Slot ID를 사용해야 합니다

### Slot ID 형식
- 숫자로만 구성 (예: `4329998296`)
- `ca-pub-`로 시작하지 않음 (이건 Publisher ID)
- 보통 10자리 숫자

### 광고 단위 삭제 시
- 광고 단위를 삭제하면 Slot ID도 함께 삭제됩니다
- 삭제된 Slot ID는 더 이상 사용할 수 없습니다

## 🎯 빠른 확인 체크리스트

- [ ] AdSense 대시보드 접속
- [ ] 광고 > 광고 단위 메뉴 클릭
- [ ] 광고 단위 목록에서 Slot ID 확인
- [ ] 또는 광고 단위 클릭 > 코드 생성기에서 확인
- [ ] `data-ad-slot="숫자"` 부분 확인

## 📸 스크린샷 가이드

AdSense 대시보드에서 Slot ID를 찾는 위치:

```
AdSense 대시보드
├── 광고 (Ads)
│   └── 광고 단위 (Ad units)
│       ├── 광고 단위 목록
│       │   ├── 사이트_배너광고 [ID: 4329998296]  👈 여기!
│       │   └── 다른 광고 단위 [ID: ...]
│       └── + 새 광고 단위
```

## 💡 팁

### 여러 광고 단위 사용하기
- 각 광고 위치마다 다른 Slot ID를 사용할 수 있습니다
- 예: 상단 광고, 중간 광고, 하단 광고 각각 다른 Slot ID

### Slot ID 백업
- Slot ID를 메모해두면 나중에 찾기 쉽습니다
- 환경 변수나 문서에 기록해두세요

## 🔗 관련 링크

- **AdSense 대시보드**: https://www.google.com/adsense
- **광고 단위 페이지**: https://www.google.com/adsense/new/u/0/pub-7373977880685678/adunits
- **코드 생성기**: 광고 단위 > 코드 생성기

