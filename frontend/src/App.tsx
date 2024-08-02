import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Whiteboard from './Pages/Whiteboard';
import Form from './Pages/Form';
import { v4 as uuidv4 } from 'uuid';
import io, { Socket } from 'socket.io-client';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import PrivateRoute from './Helper/PrivateRoute';

const server = "http://localhost:3000";

const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts:  Infinity,
  timeout: 10000,
  transports: ["websocket"],
};

const socket: Socket = io(server, connectionOptions);


interface User {
  name: string;
  roomId: string;
  userId: string;
  host: boolean;
  presenter: boolean;
}

const App: React.FC = () => {
  const uniqueId = uuidv4();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    socket.on("userIsJoined", (data: { success: boolean }) => {
      if (data.success) {
        console.log("userJoined");
      } else {
        console.log("something went wrong");
      }
    });
    return () => {
      socket.off("userIsJoined");
    };
  }, []);

  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Form uniqueId={uniqueId} socket={socket} setUser={setUser} />} />
          <Route path='/:roomId' element={<PrivateRoute><Whiteboard user={user} socket={socket} /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
};

export default App;
