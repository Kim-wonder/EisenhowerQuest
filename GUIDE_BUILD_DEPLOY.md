# 🚀 Eisenhower Quest: 로컬 빌드 및 배포 가이드

이 문서는 프로젝트의 안정적인 실행과 배포를 위해 오늘 학습한 로컬 빌드 및 관리 프로세스를 정리한 가이드입니다.

---

## 1. 로컬 빌드 및 실행 방법

### 👨‍💻 개발 모드 실행 (Development)
코드를 수정하면서 실시간으로 변경 사항을 확인할 때 사용합니다.
*   **명령어**: `npm run dev`
*   **특징**: Hot Reloading 지원 (코드 수정 시 즉시 반영), 상세한 에러 로그 출력.

### 🏗️ 프로덕션 빌드 (Static/Production Build)
실제 배포 전, 최적화된 상태로 코드를 컴파일하고 오류가 없는지 최종 검사합니다.
*   **명령어**: `npm run build`
*   **결과**: `.next` 폴더에 최적화된 파일들이 생성되며, 컴파일 단계의 에러(TypeScript, Lint 등)를 잡아낼 수 있습니다.

---

## 2. 현황 파악 및 배포 체크리스트

배포 전이나 서버 문제 발생 시 아래 리스트를 순서대로 확인하세요.

1.  **[ ] 의존성 설치 확인**: `node_modules` 폴더가 있고 `npm install`이 완료되었는가?
2.  **[ ] 포트 점유 확인**: `3000`번 포트가 이미 다른 프로세스에서 사용 중이지 않은가?
3.  **[ ] 빌드 에러 확인**: `npm run build` 시 터미널에 빨간색 에러 메시지가 없는가?
4.  **[ ] Git 상태 확인**: `git status`를 통해 커밋되지 않은 중요한 변경 사항이 없는가?
5.  **[ ] 원격 저장소 연결**: `git remote -v`로 올바른 GitHub 저장소(`EisenhowerQuest.git`)가 연결되었는가?

---

## 3. 실패 사례 및 예외 케이스 정리 (Troubleshooting)

### ❌ 케이스 1: `Port 3000 is in use` (포트 충돌)
*   **현상**: 서버 실행 시 "연결을 거부함" 혹은 "이미 사용 중" 메시지 발생.
*   **해결 방법**: 기존에 돌아가고 있는 서버 프로세스를 강제 종료해야 합니다.

### ❌ 케이스 2: `Unable to acquire lock`
*   **현상**: Next.js 개발 서버가 중복 실행되어 파일 접근 속도가 잠기거나 충돌함.
*   **해결 방법**: 터미널을 모두 닫거나 현재 실행 중인 모든 `node`, `next` 프로세스를 종료 후 재시도.

### ❌ 케이스 3: 빌드 실패 (Build Error)
*   **현상**: `npm run build` 중 특정 파일에서 에러 발생 및 중단.
*   **해결 방법**: 에러 로그의 파일 경로와 라인 번호를 확인하여 구문 오류나 타입(TypeScript) 에러를 수정.

---

## 4. 환경별 터미널 명령어 (Mac/Linux vs Windows)

오늘 사용한 주요 도구들의 환경별 명령어 비교표입니다.

| 기능 | Mac / Linux (Zsh/Bash) | Windows (Command Prompt/CMD) |
| :--- | :--- | :--- |
| **서버 실행** | `npm run dev` | `npm run dev` |
| **포트 확인 (3000)** | `lsof -i :3000` | `netstat -ano \| findstr :3000` |
| **프로세스 종료** | `kill -9 <PID>` | `taskkill /F /PID <PID>` |
| **디렉토리 이동** | `cd path/to/folder` | `cd path\to\folder` |
| **Git 설정 (이메일)** | `git config user.email "이메일"` | `git config user.email "이메일"` |
| **원격 저장소 추가**| `git remote add origin <URL>` | `git remote add origin <URL>` |

---

## 5. Firebase 연결 및 배포 과정

이번에 추가된 Firebase 연동 및 배포 단계입니다.

### 🔗 연결 및 초기 설정
*   **파일 위치**: `src/lib/firebase.ts` (Firebase SDK 초기화 및 Analytics 설정)
*   **환경 설정**: `next.config.ts`에서 `basePath: '/app/app260204'`, `output: 'export'` 설정 완료.

### 🚀 배포 방법
1.  **빌드**: `npm run build` (정적인 `out` 폴더 생성)
2.  **로그인**: `npx firebase login` (로그인이 필요할 경우)
3.  **배포**: `npx firebase deploy --only hosting`

### 📋 배포 관련 체크리스트
*   **[ ] Firebase 로그인**: `npx firebase login`이 되어 있는가?
*   **[ ] 하위 경로 확인**: 배포 후 `project-260204.web.app/app/app260204` 경로로 접속되는가?
*   **[ ] 정적 에셋**: 이미지나 폰트가 `basePath` 경로를 포함하여 정상적으로 로드되는가?

---

> **Tip**: 이미 다른 웹이 있는 프로젝트이므로 `firebase.json`의 `rewrites` 설정을 통해 `/app/app260204` 경로에 대한 접근을 보장하도록 설정되었습니다.
