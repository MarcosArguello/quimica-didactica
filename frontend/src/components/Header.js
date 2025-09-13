import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#282c34",
      color: "white",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      {/* Izquierda */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "white", fontWeight: "bold", fontSize: "20px" }}>
          Q+D
        </Link>
        <Link to="/teoria" style={{ textDecoration: "none", color: "white" }}>
          Explorar temas
        </Link>
      </div>

      {/* Derecha */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px", position: "relative" }}>
        <input
          type="text"
          placeholder="Buscar tema..."
          style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        {!user ? (
          <Link to="/auth" style={{ textDecoration: "none", color: "white", fontWeight: "bold" }}>
            Iniciar sesión
          </Link>
        ) : (
          <>
            {/* Avatar circular */}
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                overflow: "hidden",
                cursor: "pointer",
                border: "2px solid white"
              }}
            >
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="Avatar"
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            {/* Menú desplegable */}
            {menuOpen && (
              <div style={{
                position: "absolute",
                top: "50px",
                right: 0,
                background: "white",
                color: "black",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                width: "200px",
                padding: "10px",
                zIndex: 1001
              }}>
                <div style={{ marginBottom: "10px" }}>
                  <strong>{user.displayName || user.email}</strong>
                  <br />
                  <small>{user.email}</small>
                </div>
                <hr />
                <div
                  style={{ padding: "5px 0", cursor: "pointer" }}
                  onClick={() => navigate("/mi-aprendizaje")}
                >
                  Mi aprendizaje
                </div>
                <div
                  style={{ padding: "5px 0", cursor: "pointer", color: "red" }}
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

