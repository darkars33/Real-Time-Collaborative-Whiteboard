import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

interface JoinRoomProps {
  socket: any; 
  setUser: (user: User) => void;
}

interface User {
  name: string;
  roomId: string;
  userId: string;
  host: boolean;
  presenter: boolean;
}

const JoinRoom: React.FC<JoinRoomProps> = ({ socket, setUser }) => {
  const [roomId, setRoomId] = useState<string>("");
  const [name, setName] = useState<string>("");

  const navigate = useNavigate();

  const handleRoomJoin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const roomData: User = {
      name,
      roomId,
      userId: uuidv4(),
      host: false,
      presenter: false,
    };

    setUser(roomData);
    navigate(`/${roomId}`);
    socket.emit("userJoined", roomData);
  };

  return (
    <form className="form col-md-12 mt-5" onSubmit={handleRoomJoin}>
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <div className="input-group d-flex align-items-center justify-content-center">
          <input
            type="text"
            className="form-control my-2"
            placeholder="Enter room code"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 btn-primary btn-block form-control border-0 text-white"
        style={{backgroundColor: "#c29fff"}}
      >
        Join Room
      </button>
    </form>
  );
};

export default JoinRoom;
