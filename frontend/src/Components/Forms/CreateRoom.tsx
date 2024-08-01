import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

interface CreateRoomProps {
  uniqueId: string;
  socket: any; 
  setUser: (user: RoomData) => void;
}

interface RoomData {
  name: string;
  roomId: string;
  userId: string;
  host: boolean;
  presenter: boolean;
}

const CreateRoom: React.FC<CreateRoomProps> = ({ uniqueId, socket, setUser }) => {
  const uniId= uuidv4();
  const [roomId, setRoomId] = useState<string>(uuidv4());
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();
  


  const handleCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const roomData: RoomData = {
      name,
      roomId,
      userId: uuidv4(),
      host: true,
      presenter: true,
    };
    console.log(roomData)
    setUser(roomData);
    navigate(`/${roomId}`)
    socket.emit("userJoined", roomData);
  };

  return (
    <form className="form col-md-12 mt-5" onSubmit={handleCreateRoom}>
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
            disabled
            placeholder="Generate room code"
            value={roomId}
          />
          <div className="input-group-append d-flex gap-1">
            <button
              className="btn btn-sm text-white"
              type="button"
              style={{backgroundColor: "#c29fff"}}
              onClick={() => setRoomId(uuidv4())}
            >
              Generate
            </button>
            <button className="btn btn-outline-success btn-sm" type="button">
              Copy
            </button>
          </div>
        </div>
      </div>
      <button type="submit" className="mt-4 text-white btn-block form-control" style={{backgroundColor: "#c29fff"}}>
        Generate Room
      </button>
    </form>
  );
};

export default CreateRoom;
