import React from "react";
import JoinRoom from "../Components/Forms/JoinRoom";
import CreateRoom from "../Components/Forms/CreateRoom";
import Navbar from "../Components/Navbar/Navbar";

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
    <>
    <div className="bg-light overflow-hidden" style={{ width: "100vw", height: "100vh" }}>
    <Navbar />
      <div className=" container">
        <h1 className="text-center text-uppercase pt-5 mt-10">WellCome to the RTCWB</h1>
        <div className="row h-100 pt-5">
          <div
            className="col-md-4 mt-5 bg-white border p-3 mx-auto rounded-2 border-2 d-flex flex-column align-items-center border rounded shadow gap-2"
            style={{ height: "400px" }}
          >
            <h1 className="font-weight-bold" style={{color: "#c29fff"}}>Create Room</h1>
            <CreateRoom uniqueId={uniqueId} socket={socket} setUser={setUser} />
          </div>
          <div
            className="col-md-4 mt-5 bg-white border p-3 mx-auto rounded-2 border-2 d-flex flex-column align-items-center border rounded shadow gap-2"
            style={{ height: "400px" }}
          >
            <h1 className="font-weight-bold" style={{color: "#c29fff"}}>Join Room</h1>
            <JoinRoom socket={socket} setUser={setUser} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Form;
