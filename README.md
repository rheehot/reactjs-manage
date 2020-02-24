## 고객관리 프로그램 소개
이 프로젝트는 나동빈(안경잡이개발자,https://www.youtube.com/channel/UChflhu32f5EUHlY7_SetNWw) 님의<br/>
React와 Node.js로 만드는 고객관리프로그램 프론트엔드 + React와 Firebase로 만드는 단어장 웹앱 백앤드를 합쳐둔 프로젝트입니다.
## 이 프로젝트를 만들게 된 이유
이 프로젝트는 개인적인 공부목적으로 강좌글을 보며 시작하였으나 강좌를 시청하던 도중 MySQL를 이용하는 파트에서 막혀 진행이 불가능한 상황이었습니다.<br/>
그런데, 나동빈님의 다른 강좌를 보니 Firebase를 이용하여 만드는 단어장 웹앱을 찾게 되어 이 웹앱의 백앤드와 고객관리프로그램의 프론트엔드를 합치면 어떨까 해서 제작하게 되었습니다.
## To-Do List
### 공통사항
- [ ] 파일추출(엑셀,워드/구글 스프레드시트/네이버 오피스 등)
- [ ] 프론트엔드 디자인
- [ ] 데이터베이스 추가
- [x] 항목 추가/삭제 시 알림
### 고객관리
- [x] 고객정보 추가
- [x] 고객정보 삭제
- [x] 삭제 시 경고 다이얼로그
- [ ] 고객정보 검색/재정렬
- [ ] 고객정보 편집
- [ ] 3/6개월 지날 경우 자동삭제
### 제품관리
- [x] 제품정보 추가
- [ ] 제품정보 삭제
- [ ] 제품정보 검색/재정렬
- [ ] 제품정보 편집
- [ ] 제품정보 자동계산
### 캘린더
- [ ] TOAST API 혹은 @Material-UI/core로 캘린더 불러오기
- [ ] 일정추가
- [ ] 일정삭제
- [ ] 고객관리 연동
## 현재까지 발견된 버그
- [x] 고객관리 탭에서 삭제버튼 추가 후 전화번호 일부 누락, 버튼 클릭 시 다이얼로그 다중호출됨(해결됨)
