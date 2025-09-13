import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { obtenerProgreso } from "../firebase/firestore";

function MiAprendizaje() {
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

  // Función para calcular % de avance de cada tema
  const calcularAvance = (capitulos) => {
    const total = Object.keys(capitulos).length;
    if (total === 0) return 0;
    const completados = Object.values(capitulos).filter(v => v).length;
    return Math.round((completados / total) * 100);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mi Aprendizaje</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {Object.entries(progreso).map(([tema, capitulos]) => (
          <div key={tema} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px" }}>
            <h3>{tema}</h3>
            <div style={{ height: "10px", background: "#eee", borderRadius: "5px", marginTop: "10px" }}>
              <div style={{
                width: `${calcularAvance(capitulos)}%`,
                height: "100%",
                background: "#4caf50",
                borderRadius: "5px"
              }} />
            </div>
            <p>{calcularAvance(capitulos)}% completado</p>
          </div>
        ))}
        {Object.keys(progreso).length === 0 && <p>Aún no hay avances registrados.</p>}
      </div>
    </div>
  );
}

export default MiAprendizaje;
