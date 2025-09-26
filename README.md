# OpqO

[https://opqo.kr](https://opqo.kr)

<img width="720" alt="OpqO 홈 페이지" src="https://github.com/user-attachments/assets/c4be9c5a-9136-490d-98bc-2d025867bbce" />

<img width="720" alt="OpqO 동영상 플레이어" src="https://github.com/user-attachments/assets/84af1066-e13b-4e6e-9aef-ce541c7bf474" />

<img width="720" alt="라이브 스트리밍" src="https://github.com/user-attachments/assets/1155b0fe-6960-43e6-8e47-68f3fd6a39ce" />

## 소개

동영상을 업로드하고 스트리밍할 수 있는 동영상 공유 플랫폼입니다.
지속적으로 기능을 추가시켜 나가고 있습니다.

## 주요 기능

### 구글 로그인

- Google OAuth2 로그인 방식을 사용하여 간편하게 채널을 생성하고 관리할 수 있습니다.

### 동영상 업로드

- 동영상을 청크 단위로 분리하여 업로드합니다.
- 동영상의 임의 구간 장면을 가져와 썸네일을 자동 지정하거나, 원하는 썸네일 장면을 선택하여 업로드 할 수 있습니다.

### 동영상 화질 조절

- 업로드 된 동영상은 후처리를 거쳐 다양한 화질로 변환됩니다.
- HTTP Live Streaming 프로토콜을 사용하여 네트워크 환경에 따라 동적으로 동영상의 화질을 조절하고 안정적인 시청 환경을 제공합니다.
- 사용자는 자동 화질 또는 원하는 화질을 직접 선택하여 동영상을 시청할 수 있습니다.

### 동영상 시청 기록

- 동영상 시청 기록을 저장하여 마지막으로 시청한 시점부터 이어서 시청할 수 있습니다.
- 동영상 썸네일에 시청 여부를 표시하여 제공합니다.

### 라이브 스트리밍

- RTMP 프로토콜 및 HLS 프토콜을 통해 라이브 스트리밍을 송출하고 시청할 수 있습니다.
- 스트림 키를 사용하여 사용자 별로 라이브 스트리밍 송출 권한을 관리합니다.

### 실시간 채팅

- Socket.IO 라이브러리를 사용하여 라이브 스트리밍 시청 페이지에서 실시간으로 다른 사용자들과 소통할 수 있습니다.

## 사용 기술

- [**React**](https://react.dev/): 컴포넌트 기반 아키텍처로 UI를 구축합니다.
- [**Next.js**](https://nextjs.org/): 페이지 기반 라우팅, Server-Side Rendering 및 미들웨어 등의 기능을 사용하여 보다 견고한 아키텍처를 구성합니다.
- [**TypeScript**](https://www.typescriptlang.org/): 정적 타입 검사를 통해 버그 발생 확률을 낮춥니다.
- [**vanilla-extract**](https://vanilla-extract.style/): 빌드 타임 CSS 라이브러리를 사용하여 Server-Component에서 사용성을 높이고, 스타일 재사용성 및 확장성을 높입니다.
- [**Jotai**](https://jotai.org/): 클라이언트 상태 관리를 통해 안정적인 UI를 제공합니다.
- [**Ky**](https://github.com/sindresorhus/ky): Fetch API 기반 HTTP 클라이언트를 사용하여 웹 표준 및 Next.js의 Data Cache 등 다양한 기능과의 호환성을 높입니다.
- [**React Hook Form**](https://react-hook-form.com/): 사용자 입력을 검증하여 신뢰성을 높이고 입력 시 불필요한 렌더링을 최소화하여 페이지 성능을 향상시킵니다.
- [**JWT**](https://github.com/auth0/node-jsonwebtoken): 인증 토큰을 검증하고 디코딩합니다.
- [**HTTP Live Streaming**](https://github.com/video-dev/hls.js): 네트워크 환경에 따른 동적 화질을 지원하여 안정적인 시청 환경을 제공합니다.
- [**Socket.IO**](https://socket.io/): WebSocket 기반의 실시간 양방향 통신을 지원합니다.
- [**ESLint**](https://eslint.org/): 코드 컨벤션을 일정하게 유지하여 개발 생산성을 높입니다.
- **[webpack](https://webpack.kr/), [SWC](https://swc.rs/)**: 빠른 빌드 및 배포로 개발 생산성을 높입니다.
- [**Github Actions**](https://github.com/features/actions): release 시 자동으로 빌드를 수행하여 개발 생산성을 높입니다.
- [**Docker**](https://www.docker.com/): 컨테이너 기반 가상화 기술을 통해 빠르고 안정적인 배포를 제공합니다.
