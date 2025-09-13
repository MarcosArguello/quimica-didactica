import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const cards = [
    { title: "Teoría", route: "/admin/teoria" },
    { title: "Herramientas", route: "/admin/herramientas" },
    { title: "Material complementario", route: "/admin/extras" },
    { title: "Ejercicios", route: "/admin/ejercicios" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Panel de Administración</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20, marginTop: 20 }}>
        {cards.map(c => (
          <div key={c.title}
            onClick={() => navigate(c.route)}
            style={{ border: "1px solid #ccc", padding: 20, borderRadius: 8, cursor: "pointer" }}>
            <h3>{c.title}</h3>
            <p>Gestionar contenido de {c.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
