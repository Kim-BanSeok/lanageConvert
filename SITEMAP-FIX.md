# 🔧 Sitemap 오류 해결 가이드

## 🚨 문제 상황

Google Search Console에서 **"가져올 수 없음"** 오류 발생

```
Sitemap: /Sitemap.xml
상태: 가져올 수 없음 ❌
발견한 페이지: 0
```

## 🔍 원인

1. **대소문자 오류**: `/Sitemap.xml` vs `/sitemap.xml`
2. **사이트맵 파일이 실제로 없음**
3. **robots.txt와 불일치**

## ✅ 해결 방법

### 1단계: 사이트맵 URL 확인

**브라우저에서 직접 접속해서 확인:**

```
https://lanage-convert.vercel.app/sitemap.xml
```

**✅ 정상 케이스:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://lanage-convert.vercel.app</loc>
    <lastmod>2025-12-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://lanage-convert.vercel.app/gallery</loc>
    ...
  </url>
</urlset>
```

**❌ 오류 케이스:**
```
404 Page Not Found
```

### 2단계: Google Search Console에서 수정

#### A. 잘못된 사이트맵 삭제

1. Google Search Console 접속
2. 좌측 메뉴 → **"Sitemaps"** 클릭
3. `/Sitemap.xml` 옆의 **점 3개 (⋮)** 메뉴 클릭
4. **"사이트맵 삭제"** 선택

#### B. 올바른 사이트맵 추가

1. "새 사이트맵 추가" 입력창에 입력:
   ```
   sitemap.xml
   ```
   
2. **"제출"** 버튼 클릭

3. 상태 확인 (몇 분~몇 시간 소요):
   - ⏳ "가져올 수 없음" → 처리 중
   - ✅ "성공" → 정상!

### 3단계: robots.txt 확인

**robots.txt가 올바르게 설정되었는지 확인:**

```
https://lanage-convert.vercel.app/robots.txt
```

**내용이 이렇게 되어야 함:**
```txt
User-agent: *
Allow: /

Sitemap: https://lanage-convert.vercel.app/sitemap.xml
```

### 4단계: 강제 재크롤링 요청

1. Google Search Console
2. 좌측 메뉴 → **"URL 검사"**
3. URL 입력:
   ```
   https://lanage-convert.vercel.app
   ```
4. **"색인 생성 요청"** 클릭

## 🔧 추가 확인 사항

### sitemap.js 파일 확인

**파일 위치:** `app/sitemap.js`

**현재 코드:**
```javascript
export default function sitemap() {
  const baseUrl = 'https://lanage-convert.vercel.app';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/offline`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
```

**✅ 코드는 정상입니다!**

### Next.js sitemap 라우트 확인

Next.js 13+ App Router에서는 `app/sitemap.js`가 자동으로 `/sitemap.xml` 라우트를 생성합니다.

**확인 방법:**
1. 로컬에서 개발 서버 실행: `npm run dev`
2. 브라우저에서 접속: `http://localhost:3000/sitemap.xml`
3. XML이 보이면 정상!

## 📊 예상 타임라인

| 단계 | 소요 시간 | 상태 |
|------|----------|------|
| 사이트맵 제출 | 즉시 | ⏳ |
| Google 검증 | 몇 분~몇 시간 | ⏳ |
| 첫 크롤링 | 1-3일 | ⏳ |
| 페이지 발견 | 3-7일 | ⏳ |
| 검색 노출 | 1-2주 | 🎯 |

## ✅ 성공 확인

### 사이트맵 정상 작동 확인

Google Search Console → Sitemaps에서:

```
✅ 성공
마지막 읽기: [날짜]
발견한 URL: 3개
```

이렇게 표시되면 성공!

### URL 검사로 확인

1. Google Search Console → URL 검사
2. 각 페이지 검사:
   - `https://lanage-convert.vercel.app`
   - `https://lanage-convert.vercel.app/gallery`
   - `https://lanage-convert.vercel.app/offline`

3. 결과 확인:
   ```
   ✅ URL이 Google에 등록되어 있음
   ```

## 🚨 여전히 오류가 나면

### 방법 1: 수동으로 URL 제출

사이트맵 없이 각 페이지를 수동으로 제출:

1. Google Search Console → URL 검사
2. 각 URL 입력 후 "색인 생성 요청"
   - `https://lanage-convert.vercel.app`
   - `https://lanage-convert.vercel.app/gallery`

### 방법 2: Vercel 빌드 확인

1. [Vercel Dashboard](https://vercel.com) 접속
2. 프로젝트 선택
3. 최근 배포 확인
4. "Visit" 클릭 → `/sitemap.xml` 접속 테스트

### 방법 3: 캐시 문제

브라우저 캐시 때문에 안 보일 수 있음:
- 시크릿 모드에서 접속
- 또는 `Cmd+Shift+R` (강력 새로고침)

## 📝 체크리스트

완료하면 체크:

- [ ] `/sitemap.xml` URL 직접 접속 확인
- [ ] 잘못된 사이트맵(`/Sitemap.xml`) 삭제
- [ ] 올바른 사이트맵(`sitemap.xml`) 제출
- [ ] `robots.txt` 확인
- [ ] Google Search Console에서 "성공" 상태 확인
- [ ] 각 페이지 URL 검사 및 색인 생성 요청
- [ ] 1주일 후 다시 확인

## 🔗 관련 링크

- [Google Search Console](https://search.google.com/search-console)
- [사이트맵 테스트](https://lanage-convert.vercel.app/sitemap.xml)
- [robots.txt 확인](https://lanage-convert.vercel.app/robots.txt)
- [Next.js Sitemap 문서](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)

---

**마지막 업데이트:** 2025-12-13
**예상 해결 시간:** 1-3일

