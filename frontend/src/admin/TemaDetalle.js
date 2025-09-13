import React, { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config"; // si exportaste db; si no usa getFirestore
import { useParams, useNavigate } from "react-router-dom";
import { createCapitulo, createEjercicio, getTemas } from "../firebase/admin";

export default function TemaDetalle() {
  const { id } = useParams(); // temaId
  const [tema, setTema] = useState(null);
  const [capitulos, setCapitulos] = useState([]);
  const [newCapTitle, setNewCapTitle] = useState("");
  const [newCapContent, setNewCapContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    const docRef = doc(db, "temas", id);
    const snap = await getDoc(docRef);
    setTema({ id: snap.id, ...snap.data() });

    const capsSnap = await getDocs(collection(db, `temas/${id}/capitulos`));
    setCapitulos(capsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const addCapitulo = async () => {
    const capId = await createCapitulo(id, { title: newCapTitle, content: newCapContent });
    setNewCapTitle(""); setNewCapContent("");
    load();
  };

  // Para agregar ejercicio: se podría abrir modal; aquí ejemplo funcional simple
  const addEjercicio = async (capId) => {
    const ejercicio = {
      question: "Pregunta demo",
      choices: [
        { id: "a", text: "Op A", isCorrect: false },
        { id: "b", text: "Op B", isCorrect: true },
      ],
      multipleCorrect: false
    };
    await createEjercicio(id, capId, ejercicio);
    load();
  };

  if (!tema) return <div>Cargando...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{tema.title}</h2>
      <p>{tema.description}</p>
      <img src={tema.imageUrl} alt="" style={{ maxWidth: 400 }} />

      <h3>Capítulos</h3>
      <ul>
        {capitulos.map(c => (
          <li key={c.id}>
            <strong>{c.title}</strong>
            <button onClick={() => addEjercicio(c.id)}>+ Crear ejercicio demo</button>
          </li>
        ))}
      </ul>

      <h4>Crear nuevo capítulo</h4>
      <input placeholder="Título de capítulo" value={newCapTitle} onChange={e=>setNewCapTitle(e.target.value)} />
      <br />
      <textarea placeholder="Contenido (Markdown o HTML)" value={newCapContent} onChange={e=>setNewCapContent(e.target.value)} />
      <br />
      <button onClick={addCapitulo}>Finalizar capítulo</button>
    </div>
  );
}
