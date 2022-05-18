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
  { id, name, usersCount },
  { id, name, usersCount },
  { id, name, usersCount }
]

### create room
:POST /rooms { name }
-> { id, name }

<del> ### join room </del>
따로 사용하실 필요 없이, 처음 채팅을 해당방에 칠 경우 자동으로 조인이 됩니다.
### chatting list
:GET /rooms/:room_id/chats { createdAtFrom, createdAtTo, order }

-> [
  { user, message, createdAt, },
  { user, message, createdAt, },
  { user, message, createdAt, },
  ...
]

maximum 30 messages are loaded. You must use createdFrom, createdTo, order=(asc,desc) to load more messages.

for example, 
```
{"_id":"5ddfae935f3e3500043a8da8","message":"","createdAt":1574940307945,"userName":"hihihihiihi"}
```
when last message is like that, you can load more messages by sending

https://snu-chat2.herokuapp.com/chats?createdAtFrom=1574940307945

When user is null, that message is special message. There are two types of special message, 'create room' and 'join room'. You must handle this message appropriately.

### send message
:POST /rooms/:room_id/chats  (auth_required)

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
- dayjs 등 날짜 관련 라이브러리를 사용해도 되나, 사용하지 않아도 무방.
- ui framework 1개 이상 사용.(material design, bootstrap...)
- eslint 사용. airbnb | google (npx eslint --init)

### 기능
- 가벼운 카카오 오픈채팅방이라고 보면 됨
- 화면 로딩이 완료되고, localStorage 에 key가 저장되있을 시 /login으로 키가 valid한지 확인.
- valid시 로그인 처리
- 로그인 안 한 상태에서는 현재 방 목록을 보여주고 방에 들어갈 수 있음.(채팅은 불가)
- 회원가입 버튼을 누르면, name을 입력할 수 있고 입력하면. 회원가입 및 로그인 완료.
- 로그인 완료 시 방에 채팅 기능 활성화, 방 create 버튼 활성화.
- 방 입장 시 채팅이 가능. 
- 3초에 한 번씩 서버 채팅 목록을 가져와, 새로운것이 있으면 업데이트 해줌.
- 메시지 입력 완료 시, 서버에서 바로 채팅 목록 가져와서 refresh.


### 추가스펙
- 로그아웃 기능
- 방에 채팅이 30개 이상 쌓였을 경우, 스크롤 할 시에 대화 추가 로드.
- 오프라인 모드에서 적절한 에러 핸들링
- 채팅 입력시 enter 와 shift+enter 구분해서 핸들링(enter -> 채팅 전송. shift + enter -> 엔터입력)


### 일정
- 6월 1일 23:59:59 까지 etl을 통해 제출
- 1일 늦을시 마다 5%씩 감점.

