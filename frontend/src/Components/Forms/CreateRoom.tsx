import React, {useState} from "react";

const CreateRoom = ({uniqueId, socket, setUser}) => {

          const [roomId, setRoomId] = useState(uniqueId);
          const [name, setName] = useState("");

          const handleCreateRoom = (e:any) =>{
                    e.preventDefault();

                    const roomData = {
                          name,
                          roomId,
                          userId: uniqueId,
                          host: true,
                          presenter: true  
                    }

                    console.log(roomData)

                    setUser(roomData);

                    socket.emit("userJoined", roomData);
          }

  return (
    <form className="form col-md-12 mt-5">
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
            <button className="btn btn-primary btn-sm" type="button" onClick={() => setRoomId(uniqueId)}>
              Generate
            </button>
            <button className="btn btn-outline-danger btn-sm" type="button">Copy</button>
          </div>
        </div>
      </div>
      <button type="submit" className="mt-4 btn-primary btn-block form-control" onClick={handleCreateRoom}>
          Generate Room
      </button>
    </form>
  );
};

export default CreateRoom;
