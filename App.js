import Button from '@mui/material/Button';
import './App.css';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {getChats, getRooms, login, signup} from "./Api";
import Room from "./Room";

function App() {
    const [user, setUser] = useState(null);
    const [showSignup, setShowSignup] = useState(false);
    const [name, setName] = useState('');
    const [rooms, setRooms] = useState([]);
    const handleClose = () => {
        setShowSignup(false);
    }

    const showChats = (roomId) => {
        getChats(roomId);
    }

    const actSignup = () => {
        signup(name)
            .then(userInfo => {
                localStorage.setItem('key', userInfo.key);
                setUser(userInfo);
                handleClose();
            })
    }
    useEffect(() => {
        const key = localStorage.getItem('key');
        if (key) {
            login()
                .then(user => {
                    setUser(user);
                })
        }
    }, []);

    useEffect(() => {
        getRooms()
            .then(roomsInfo => {
                setRooms(roomsInfo);
            })
    }, []);

  return (
    <div id="chat">
        <div id="left-container">
            <div id="login-info">
            {user ? <span>{user.name}님 안녕하세요.</span>
                : <Button size="small" onClick={e => setShowSignup(true)}>회원가입</Button>
            }
            </div>
            <div id="rooms">
                {rooms.map(room => <Room key={room._id} onClick={e => showChats(room._id)} {...room}/>)}
            </div>
        </div>
        <div id="chats">
            <div id="chat-list">
                <div>ee: 안녕하세요</div>
                <div>dd: 안녕하세요</div>
                <div>cc: 안녕하세요</div>
                <div>aa: 안녕하세요</div>
                <div>bb: 안녕하세요</div>
            </div>
            <form id="chat-form">
                <Input type="text" />
                <Button type="submit" variant="contained">입력</Button>
            </form>
        </div>
        <Dialog open={showSignup} onClose={handleClose}>
            <DialogTitle>회원가입</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    사용하실 닉네임을 입력하세요.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="닉네임"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>취소</Button>
                <Button onClick={actSignup}>완료</Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}

export default App;


