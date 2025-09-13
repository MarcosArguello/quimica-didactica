import React from "react";

function Footer() {
  return (
    <footer style={{
      backgroundColor: "#282c34",
      color: "white",
      padding: "30px 20px",
      marginTop: "40px",
      textAlign: "center"
    }}>
      {/* Enlaces de navegación */}
      <div style={{ marginBottom: "20px" }}>
        <a href="/sobre" style={{ color: "white", margin: "0 10px", textDecoration: "none" }}>Sobre Q+D</a>
        <a href="/terminos" style={{ color: "white", margin: "0 10px", textDecoration: "none" }}>Términos</a>
      </div>

      {/* Logos de instituciones */}
      <div style={{ marginBottom: "20px" }}>
        <a href="https://institucion1.com" target="_blank" rel="noopener noreferrer">
          <img src="https://via.placeholder.com/100x50?text=Inst1" alt="Institución 1" style={{ margin: "0 10px" }} />
        </a>
        <a href="https://institucion2.com" target="_blank" rel="noopener noreferrer">
          <img src="https://via.placeholder.com/100x50?text=Inst2" alt="Institución 2" style={{ margin: "0 10px" }} />
        </a>
        <a href="https://institucion3.com" target="_blank" rel="noopener noreferrer">
          <img src="https://via.placeholder.com/100x50?text=Inst3" alt="Institución 3" style={{ margin: "0 10px" }} />
        </a>
      </div>

      {/* Redes sociales */}
      <div>
        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" style={{ color: "white", margin: "0 10px" }}>YouTube</a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style={{ color: "white", margin: "0 10px" }}>LinkedIn</a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{ color: "white", margin: "0 10px" }}>Twitter</a>
      </div>

      <p style={{ marginTop: "15px", fontSize: "14px" }}>© 2025 Química + Didáctica. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
