import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { obtenerProgreso } from "../firebase/firestore";

function Perfil() {
  const { user } = useAuth();
  const [progreso, setProgreso] = useState({});

  useEffect(() => {
    const fetchProgreso = async () => {
      if (user) {
        const data = await obtenerProgreso(user.uid);
        setProgreso(data);
      }
    };
    fetchProgreso();
  }, [user]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 Perfil de {user.displayName || user.email}</h2>
      <h3>Progreso en los temas:</h3>

      {Object.keys(progreso).length === 0 ? (
        <p>Aún no hay avances registrados.</p>
      ) : (
        <ul>
          {Object.entries(progreso).map(([tema, capitulos]) => (
            <li key={tema}>
              <strong>{tema}</strong>
              <ul>
                {Object.entries(capitulos).map(([cap, done]) => (
                  <li key={cap}>
                    {cap}: {done ? "✅ Completado" : "❌ Pendiente"}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Perfil;

