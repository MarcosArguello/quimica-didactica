import React, { useEffect, useState } from "react";
import { getTemas, createTema, deleteTema, reorderTemas } from "../firebase/admin";
import { Link, useNavigate } from "react-router-dom";

export default function AdminTeoria() {
  const [temas, setTemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const data = await getTemas();
    setTemas(data);
    setLoading(false);
  };

  const handleNew = () => {
    navigate("/admin/teoria/nuevo");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar tema?")) return;
    await deleteTema(id);
    load();
  };

  const move = (index, dir) => {
    const newTemas = [...temas];
    const swapIndex = dir === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newTemas.length) return;
    [newTemas[index], newTemas[swapIndex]] = [newTemas[swapIndex], newTemas[index]];
    setTemas(newTemas);
    // actualizar orden en backend
    reorderTemas(newTemas.map(t => t.id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin - Teoría</h2>
      {!loading && temas.length === 0 ? (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>No hay temas generados</div>
          <div><button onClick={handleNew}>Generar Tema Principal</button></div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
          <div style={{ flex: 1 }}>
            <h3>Listado de temas principales</h3>
            <ul>
              {temas.map((t, i) => (
                <li key={t.id} style={{ marginBottom: 8 }}>
                  <strong>{t.title}</strong>
                  <div style={{ display: "inline-block", marginLeft: 10 }}>
                    <button onClick={() => move(i, "up")}>↑</button>
                    <button onClick={() => move(i, "down")}>↓</button>
                    <button onClick={() => navigate(`/admin/teoria/${t.id}`)}>Ver/Editar</button>
                    <button onClick={() => handleDelete(t.id)}>Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button onClick={handleNew}>Generar Tema Principal</button>
          </div>
        </div>
      )}
    </div>
  );
}
