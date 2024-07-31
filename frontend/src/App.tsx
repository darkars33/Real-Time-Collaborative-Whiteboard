import React, {useState} from 'react'
import {Routes, Route, Navigate} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Whiteboard from './Pages/Whiteboard';
import Form from './Pages/Form';
import { v4 as uuidv4 } from 'uuid';
import io from "socket.io-client";


const server = "http://localhost:3000";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
}

const socket = io(server, connectionOptions);


const App = () => {

  const uniqueId = uuidv4();
  console.log(uniqueId);

  const [user, setUser] = useState(null);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Form uniqueId={uniqueId} socket={socket} setUser={setUser} />} />
        <Route path='/white' element={<Whiteboard />} />
      </Routes>
    </div>
  )
}

export default App
