import React, { useState } from "react";
import { createTema } from "../firebase/admin";
import { useNavigate } from "react-router-dom";

export default function NuevoTema() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const temaId = await createTema({ title, description, imageFile });
    navigate(`/admin/teoria/${temaId}`); // ir a la vista del tema para crear capítulos
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Crear Tema Principal</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
        <br />
        <textarea placeholder="Descripción breve" value={description} onChange={e => setDescription(e.target.value)} />
        <br />
        <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
        <br />
        <button type="submit">Crear Tema</button>
      </form>
    </div>
  );
}
