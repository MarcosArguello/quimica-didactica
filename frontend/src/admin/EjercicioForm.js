import React, { useState } from "react";

export default function EjercicioForm({ onSave }) {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([
    { id: 1, text: "", isCorrect: false },
    { id: 2, text: "", isCorrect: false },
  ]);
  const [multipleCorrect, setMultipleCorrect] = useState(false);

  const addChoice = () => {
    setChoices(prev => [...prev, { id: Date.now(), text: "", isCorrect: false }]);
  };

  const updateChoice = (id, field, value) => {
    setChoices(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const removeChoice = (id) => {
    setChoices(prev => prev.filter(c => c.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validaciones mínimas
    if (!question || choices.length < 2) { alert("Pregunta y al menos 2 opciones"); return; }
    onSave({ question, choices, multipleCorrect });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Pregunta" required />
      <div>
        {choices.map((c, i) => (
          <div key={c.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input value={c.text} onChange={e=>updateChoice(c.id, "text", e.target.value)} placeholder={`Opción ${i+1}`} />
            <label>
              <input type="checkbox" checked={c.isCorrect} onChange={e=>updateChoice(c.id, "isCorrect", e.target.checked)} />
              Correcta
            </label>
            <button type="button" onClick={()=>removeChoice(c.id)}>Eliminar</button>
          </div>
        ))}
      </div>
      <button type="button" onClick={addChoice}>+</button>
      <div>
        <label>
          <input type="checkbox" checked={multipleCorrect} onChange={e=>setMultipleCorrect(e.target.checked)} />
          Permitir varias respuestas correctas
        </label>
      </div>
      <button type="submit">Terminar el ejercicio</button>
    </form>
  );
}
