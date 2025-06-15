# 🏃 MoveOn: 게임처럼 즐기는 러닝, 건강한 습관의 시작

> GPS 기반 러닝 앱 + 게임 시스템 = **MoveOn**  
> 러닝을 하며 땅을 점령하고, 친구와 마라톤이나 땅따먹기 게임을 즐기세요!

---

## 📌 프로젝트 개요

**MoveOn**은 건강한 습관 형성을 돕는 위치 기반 러닝 게임 앱입니다.  
사용자가 달리거나 걸으면서 점령한 구역을 지도에 시각화하고, 이를 통해 순위 경쟁, 마라톤, 땅따먹기 등을 즐길 수 있습니다.

### 🎯 핵심 기능
- 지도 기반 **영역 점령**
- **1:1 실시간 땅따먹기 게임** (웹소켓 기반)
- **미니 마라톤** 챌린지
- 운동 데이터 기록 및 **리워드 시스템**
- **걸음 수, 칼로리, 이동 거리** 통계 제공
- AWS S3를 활용한 기록 이미지 저장

---

## ⚙️ 설치 환경 및 기술 스택

### 🧪 Frontend
- React Native
- react-native-maps
- react-native-geolocation-service
- Context API
- Debounce 처리 (API 과다 호출 방지)

### 🛠 Backend
- Spring Boot + JPA + QueryDSL
- WebSocket (Stomp)
- Oracle DB (OCI 기반, Wallet 사용)
- Swagger / Postman
- Prometheus + Grafana (모니터링)
- AWS EC2, S3, GitHub Actions
- Docker / Docker-compose

---

## 📲 설치 및 실행 방법

### ✅ 프론트엔드
```bash
git clone https://github.com/your-org/moveon-app.git
cd moveon-app/frontend
npm install
npx react-native run-ios  # 또는 run-android
```
---
## ✅ 백엔드 실행 방법

```bash
cd backend
./gradlew build
docker-compose up
```
💡 EC2 환경에서는 GitHub Actions 자동 배포가 설정되어 있습니다.

---
## 📊 모니터링 시스템 구성

- **Prometheus**:  
  Spring Boot 서버의 메트릭을 수집  
  예: `process_cpu_usage`, `jvm_live_threads`

- **Grafana**:  
  Prometheus로부터 수집된 데이터를 시각화  
  Slack 알림 기능을 통해 관리자에게 실시간 경고 전송

- **Docker-compose 구성**:  
  모니터링 시스템을 메인 서버와 **분리된 인스턴스**에서 실행  
  → 서버 장애 발생 시에도 모니터링 시스템은 **지속 운영 가능**

---

## ☁️ S3 기록 저장 구조

- 유저가 러닝 종료 시 **운동 기록 이미지 캡처** API 호출  
- 캡처된 이미지는 **AWS S3 버킷에 업로드**  
- S3 내부에서는 **유저 ID 또는 닉네임 기반으로 폴더 분리 저장**

---

## 🔐 Oracle DB Wallet 보안 처리 방식

- `wallet.zip` 파일을 **base64로 인코딩**하여 GitHub Secret에 저장  
- GitHub Actions 실행 시 EC2로 전송 → 자동 **디코딩 및 압축 해제**

```bash
echo "$ORACLE_WALLET_BASE64" | base64 -d > wallet.zip
scp wallet.zip ec2:/home/ubuntu/
ssh ec2 "unzip wallet.zip -d wallet && rm wallet.zip"
```
---
## 🧩 협업 툴

| 툴       | 용도                                |
|----------|-------------------------------------|
| GitHub   | 버전 관리, CI/CD 파이프라인 관리    |
| Slack    | 모니터링 알림 및 팀 커뮤니케이션    |
| Notion   | 회의록 작성, 일정 및 기능 정리       |
| Swagger  | API 문서 자동 생성 및 테스트 도구   |


---
## 🎮 기대 효과

- 운동 습관 형성과 **지속적인 동기 부여**
- 게임형 콘텐츠로 **MZ세대 친화적 UX 제공**
- **야외 활동 활성화** 및 탐험의 재미 유도
- **소셜 기능 강화**를 통한 커뮤니티 형성
- **브랜드 및 지자체 협업**을 통한 보상 기반 챌린지 운영 가능

---
## 🧠 팀원 소개

| 이름   | 전공               | 역할                                |
|--------|--------------------|-------------------------------------|
| 윤지석 | 인공지능 소프트웨어 | 백엔드 개발, DB 구성                |
| 전승우 | 인공지능 소프트웨어 | 프론트엔드 개발, 마라톤 기능 개발    |
| 이서정 | 인공지능 소프트웨어 | 프론트엔드 개발, 땅따먹기 기능 개발           |

