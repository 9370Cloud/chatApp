import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import axios from "axios";

const CreateChatRoom = () => {
  const [chatRoomName, setChatRoomName] = useState('');
  const [invitee, setInvitee] = useState('');

  const handleCreateChatRoom = (e) => {
    e.preventDefault();
    console.log(`Chat Room Name: ${chatRoomName}`);
    console.log(`Invitees: ${invitee}`);
    const jwtToken = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("jwt="))
    .split("=")[1]; // 쿠키 스토리지에서 jwtToken 값을 가져옴
    axios.post('createchatroom', { room_name: chatRoomName, user_id: invitee }, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        // 요청이 성공한 경우
        console.log('채팅방 생성 성공:', response.data);
        // 추가로 할 작업이 있다면 여기에 작성하세요.
      })
      .catch((error) => {
        // 요청이 실패한 경우
        console.error('채팅방 생성 실패:', error);
        if (error.response && error.response.data && error.response.data.message) {
          console.error('에러 메시지:', error.response.data.message);
        }
        // 추가로 할 작업이 있다면 여기에 작성하세요.
      });
  };
  

  return (
    <div>
      <br/>
      <h2>채팅방 만들기</h2>
      <div>
        <div><label>채팅방명</label></div>
        <input
          type="text"
          value={chatRoomName}
          onChange={(e) => setChatRoomName(e.target.value)}
        />
      </div>
      <br/>
      <div>
        <div><label>초대할 사람 아이디</label></div>
        <input
          type="text"
          value={invitee}
          onChange={(e) => setInvitee(e.target.value)}
        />
      </div>
      <br/>
      <Button
        variant="danger"
        onClick={handleCreateChatRoom}>만들기</Button>
    </div>
  );
};

export {CreateChatRoom};
