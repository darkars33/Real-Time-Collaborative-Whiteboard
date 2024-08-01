import React from "react";
import { useKeycloak } from "@react-keycloak/web";

const Navbar: React.FC = () => {
  const { keycloak, initialized } = useKeycloak();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-center">
          {keycloak.authenticated && (
            <a
              href="/"
              className="text-center m-2 mr-3 bg-success p-2 rounded-lg text-white"
            >
              Home
            </a>
          )}
          {!keycloak.authenticated && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => keycloak.login()}
            >
              Login
            </button>
          )}
          {keycloak.authenticated && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => keycloak.logout()}
            >
              Logout ({keycloak.tokenParsed?.preferred_username})
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
