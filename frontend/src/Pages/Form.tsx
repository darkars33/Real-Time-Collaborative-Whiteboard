import React from "react";
import JoinRoom from "../Components/Forms/JoinRoom";
import CreateRoom from "../Components/Forms/CreateRoom";

interface FormProps {
  uniqueId: string;
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

const Form: React.FC<FormProps> = ({ uniqueId, socket, setUser }) => {
  return (
    <div className="container">
      <div className="row h-100 pt-5">
        <div
          className="col-md-4 mt-5 border p-3 mx-auto rounded-2 border-2 d-flex flex-column align-items-center"
          style={{ height: '400px' }}
        >
          <h1 className="text-primary font-weight-bold">Create Room</h1>
          <CreateRoom uniqueId={uniqueId} socket={socket} setUser={setUser} />
        </div>
        <div
          className="col-md-4 mt-5 border p-3 mx-auto rounded-2 border-2 d-flex flex-column align-items-center"
          style={{ height: '400px' }}
        >
          <h1 className="text-primary font-weight-bold">Join Room</h1>
          <JoinRoom socket={socket} setUser={setUser} />
        </div>
      </div>
    </div>
  );
};

export default Form;
