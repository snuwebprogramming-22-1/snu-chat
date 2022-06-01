# snu-chat


## 채팅 클라이언트 구현

주어진 채팅 서버( https://snu-chat2.herokuapp.com/ )를 이용하여, 채팅 클라이언트를 구현한다.
서버 endpoint는 다음과 같다.

### signup
:POST /signup { name }

-> { key, name, createdAt }

### login
:POST /login (auth_required)
-> {success: true, name }

### get rooms
:GET /rooms { name }
-> [
  { id, name, users },
  { id, name, users },
  { id, name, users }
]

### create room (auth_required)
:POST /rooms { name }
-> { id, name }

### chatting list (auth_required)
:GET /rooms/:room_id/chats { lastChatId }

-> [
  { user, message, createdAt, },
  { user, message, createdAt, },
  { user, message, createdAt, },
  ...
]

maximum 50 messages are loaded. You must use lastChatId to load more messages.

for example, 
```
{"_id":"5ddfae935f3e3500043a8da8","message":"","createdAt":1574940307945,"userName":"hihihihiihi"}
```
when last message is like that, you can load more messages by sending

https://snu-chat2.herokuapp.com/rooms/dfoi39412451/chats?lastChatId=5ddfae935f3e3500043a8da8


### send message (auth_required)
:POST /rooms/:room_id/chats  { meessage }

-> { roomId, meesage, created }


* auth_required 의 경우, /login 시 얻은 key를 http request header에 첨부하면 된다. 
```
Authorization: Key sdfsdlfkje23rdsfsi9fergi
```

## 스펙

### 라이브러리
- react 사용
- react functional component 사용
- axios 사용
- ui framework 1개 이상 사용.(material design, bootstrap...)


### 기능
- 가벼운 카카오 오픈채팅방이라고 보면 됨
- 화면 로딩이 완료되고, localStorage 에 key가 저장되있을 시 /login으로 키가 valid한지 확인.
- valid시 로그인 처리
- 로그인 안 한 상태에서는 현재 방 목록을 볼 수 있음.(채팅방 입장은 불가)
- 회원가입 버튼을 누르면, name을 입력할 수 있고 입력하면. 회원가입 및 로그인 완료.
- 로그인 완료 시 방에 채팅 기능 활성화, 방 create 버튼 활성화.
- 방 입장 시 채팅이 가능. 
- 3초에 한 번씩 서버 채팅 목록을 가져와, 새로운것이 있으면 업데이트 해줌.
- 메시지 입력 완료 시, 서버에서 바로 채팅 목록 가져와서 refresh.


### 추가스펙
- 로그아웃 기능
- 방에 채팅이 50개 이상 쌓였을 경우, 스크롤 할 시에 대화 추가 로드.
- 채팅 입력시 enter 와 shift+enter 구분해서 핸들링(enter -> 채팅 전송. shift + enter -> 엔터입력)


### 일정
- 6월 4일 23:59:59 까지 etl을 통해 제출
- 1일 늦을시 마다 5%씩 감점.

