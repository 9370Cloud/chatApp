import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap"; // react-bootstrap에서 Container, Row, Col을 불러옵니다.
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

// 하드코딩된 예제 데이터 (채팅방 리스트)
const chatRooms = [
  {
    id: 1,
    name: "Room 1",
    lastMessage: "Hello!",
    lastUser: "User1",
    timestamp: "2023-08-05T12:30:00",
  },
  {
    id: 2,
    name: "Room 2",
    lastMessage: "Hi there!",
    lastUser: "User2",
    timestamp: "2023-08-05T13:15:00",
  },
  {
    id: 3,
    name: "Room 3",
    lastMessage: "Hey!",
    lastUser: "User3",
    timestamp: "2023-08-05T14:00:00",
  },
];

function ChatList(){
  const [chatRoomList, setChatRoomList] = useState(chatRooms);
  let navigate = useNavigate();

  return (
    <Container>
      {" "}
      {/* Container로 컨텐츠를 감쌉니다. */}
      <h2 className="mb-3 mt-3">채팅방 목록</h2>
      <Row>
        {" "}
        {/* Row로 새로운 행을 생성합니다. */}
        {chatRoomList.map((chatRoom) => (
          <Col key={chatRoom.id} xs={12} md={6} lg={4}>
            {" "}
            {/* Col로 컬럼을 생성합니다. */}
            {/* xs, md, lg 속성으로 다른 화면 크기에 따른 컬럼 크기를 조정할 수 있습니다. */}
            <div className="chat-room-item">
              <div>채팅방이름</div>
              <div>Last Message: {chatRoom.lastMessage}</div>
              <div>Last User: {chatRoom.lastUser}</div>
              <div>
                Last Updated: {new Date(chatRoom.timestamp).toLocaleString()}
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Button
        variant="danger"
        className="mt-3"
        onClick={() => {
          const jwtToken = document.cookie
            .split("; ")
            .find((cookie) => cookie.startsWith("jwt="))
            .split("=")[1]; // 쿠키 스토리지에서 jwtToken 값을 가져옴
          console.log(jwtToken);
          axios
            .get("http://localhost:8080/createchatroom", {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            })
            .then((결과) => {
              navigate("/createchatroom");
            });
        }}
      >
        만들기
      </Button>{" "}
    </Container>
  );
};

export { ChatList };

// import React, { useState } from 'react';

// // 하드코딩된 예제 데이터 (채팅방 리스트)
// const chatRooms = [
//   { id: 1, name: 'Room 1', lastMessage: 'Hello!', lastUser: 'User1', timestamp: '2023-08-05T12:30:00' },
//   { id: 2, name: 'Room 2', lastMessage: 'Hi there!', lastUser: 'User2', timestamp: '2023-08-05T13:15:00' },
//   { id: 3, name: 'Room 3', lastMessage: 'Hey!', lastUser: 'User3', timestamp: '2023-08-05T14:00:00' },
// ];

// const ChatList = () => {
//   const [chatRoomList, setChatRoomList] = useState(chatRooms);

//   return (
//     <div>
//       <h2>Chat Room List</h2>
//       <ul>
//         {chatRoomList.map((chatRoom) => (
//           <li key={chatRoom.id}>
//             <div>
//               <strong>{chatRoom.name}</strong>
//             </div>
// <div>Last Message: {chatRoom.lastMessage}</div>
// <div>Last User: {chatRoom.lastUser}</div>
// <div>Last Updated: {new Date(chatRoom.timestamp).toLocaleString()}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export {ChatList};
