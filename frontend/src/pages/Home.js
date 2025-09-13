import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const recursos = [
    { titulo: "📘 Teoría", descripcion: "Explora conceptos básicos y avanzados de química.", ruta: "/teoria" },
    { titulo: "🛠️ Herramientas", descripcion: "Utiliza simuladores y calculadoras interactivas.", ruta: "/herramientas" },
    { titulo: "📂 Material complementario", descripcion: "Encuentra recursos extra para profundizar.", ruta: "/extras" },
  ];

  const temas = [
    { titulo: "Átomos y moléculas", descripcion: "Estructura y propiedades de la materia.", ruta: "/teoria/atomos" },
    { titulo: "Reacciones químicas", descripcion: "Cómo ocurren y cómo se representan.", ruta: "/teoria/reacciones" },
    { titulo: "Tabla periódica", descripcion: "Elementos y su organización.", ruta: "/teoria/tabla-periodica" },
  ];

  return (
    <div className="home-container" style={{ padding: "20px" }}>
      <h2>Bienvenido a Química + Didáctica</h2>
      <p>Explora recursos interactivos para aprender química de manera divertida y práctica.</p>

      {/* Recursos destacados */}
      <section style={{ marginTop: "40px" }}>
        <h3>Recursos destacados</h3>
        <div style={{ display: "flex", gap: "20px", marginTop: "15px" }}>
          {recursos.map((recurso, index) => (
            <Link
              key={index}
              to={recurso.ruta}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "20px",
                  borderRadius: "8px",
                  width: "220px",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <h4>{recurso.titulo}</h4>
                <p>{recurso.descripcion}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Temas principales */}
      <section style={{ marginTop: "40px" }}>
        <h3>Temas principales</h3>
        <div style={{ display: "flex", gap: "20px", marginTop: "15px" }}>
          {temas.map((tema, index) => (
            <Link
              key={index}
              to={tema.ruta}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "20px",
                  borderRadius: "8px",
                  width: "220px",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <h4>{tema.titulo}</h4>
                <p>{tema.descripcion}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

