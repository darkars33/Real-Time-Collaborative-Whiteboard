import React, { ReactNode } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();
  const isLogged = keycloak.authenticated;

  if (isLogged) {
    return <>{children}</>;
  } else {
    navigate('/');
    return null;
  }
};

export default PrivateRoute;
