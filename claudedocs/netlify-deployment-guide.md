# Netlify 배포 가이드

## 프로젝트 개요
- **프레임워크**: Next.js 16.0.4
- **React**: 19.2.0
- **백엔드**: Supabase

## 배포 전 체크리스트

### 1. 환경 변수 설정 필요
Netlify 대시보드에서 다음 환경 변수를 설정해야 합니다:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**설정 방법**:
1. Netlify 대시보드 → Site settings → Environment variables
2. 위 변수들을 `.env.local` 파일에서 복사하여 추가
3. 모든 환경(Production, Deploy previews)에 적용

### 2. Git 저장소 연결

#### GitHub/GitLab 연결 배포 (권장)
1. Netlify 대시보드에서 "Add new site" → "Import an existing project"
2. Git 저장소 연결 (GitHub, GitLab, Bitbucket)
3. 저장소 선택
4. 빌드 설정은 `netlify.toml`에서 자동으로 감지됨
5. 환경 변수 설정 후 "Deploy site" 클릭

#### 수동 배포 (CLI)
```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 로그인
netlify login

# 배포
netlify deploy --prod
```

## 배포 설정 (자동 감지됨)

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### next.config.ts
```typescript
const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: false,
  },
};
```

## 배포 후 확인 사항

1. **빌드 로그 확인**: 빌드가 성공적으로 완료되었는지 확인
2. **환경 변수 검증**: Supabase 연결이 정상 작동하는지 확인
3. **라우팅 테스트**: 모든 페이지(/admin, /api 등)가 정상 작동하는지 확인
4. **이미지 최적화**: Next.js Image 컴포넌트가 정상 작동하는지 확인

## 문제 해결

### 빌드 실패 시
- Node.js 버전 확인 (Netlify 기본값: Node 18)
- `package-lock.json` 커밋 확인
- 환경 변수 설정 확인

### 404 에러 발생 시
- `netlify.toml` 설정 확인
- Next.js 플러그인 설치 확인

### API 라우트 오류 시
- 환경 변수가 올바르게 설정되었는지 확인
- Supabase URL과 Key가 유효한지 확인

## 커스텀 도메인 설정 (선택사항)

1. Netlify 대시보드 → Domain management
2. "Add custom domain" 클릭
3. 도메인 입력 및 DNS 설정 안내 따르기

## 자동 배포 설정

Git 저장소에 푸시할 때마다 자동으로 배포됩니다:
- `main` 브랜치 → Production 배포
- 다른 브랜치 → Deploy preview (미리보기)

## 성능 최적화 팁

1. **이미지 최적화**: Next.js Image 컴포넌트 사용
2. **캐싱**: Netlify는 자동으로 정적 자산 캐싱
3. **분석**: Netlify Analytics 활성화로 성능 모니터링
