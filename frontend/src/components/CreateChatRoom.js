import React, { useState } from 'react';
import { Button } from "react-bootstrap"; // react-bootstrap에서 Container, Row, Col을 불러옵니다.


const CreateChatRoom = () => {
  const [chatRoomName, setChatRoomName] = useState('');
  const [invitees, setInvitees] = useState('');

  const handleCreateChatRoom = () => {
    // 여기에서 채팅방 생성 및 초대 로직을 구현합니다.
    // chatRoomName과 invitees를 이용하여 채팅방을 생성하고 초대합니다.
    // 예: 채팅방 생성 API 호출 또는 상태 관리를 이용한 채팅방 데이터 추가 등
    console.log(`Chat Room Name: ${chatRoomName}`);
    console.log(`Invitees: ${invitees}`);
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
          value={invitees}
          onChange={(e) => setInvitees(e.target.value)}
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
