import React from "react";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { currentUser, logout } = useAuth();

  return (
    <div style={{ textAlign: "center" }}>
      {currentUser ? (
        <>
          <h2>Hola, {currentUser.displayName || currentUser.email}</h2>
          <p>Email: {currentUser.email}</p>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <p>No hay usuario logueado</p>
      )}
    </div>
  );
}

export default Profile;
