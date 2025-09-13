// src/firebase/admin.js
import { getFirestore, collection, addDoc, doc, setDoc, getDocs, query, orderBy, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./config"; // si exportaste app; si no, usa getApp()
import { v4 as uuidv4 } from "uuid";

const db = getFirestore();
const storage = getStorage();

export const uploadImage = async (file, path = "tema-images") => {
  if (!file) return null;
  const id = uuidv4();
  const storageRef = ref(storage, `${path}/${id}-${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export const createTema = async ({ title, description, imageFile }) => {
  const imageUrl = imageFile ? await uploadImage(imageFile) : "https://via.placeholder.com/600x300?text=Quimica+%2B+Didactica";
  const temasRef = collection(db, "temas");
  const docRef = await addDoc(temasRef, {
    title,
    description,
    imageUrl,
    createdAt: new Date(),
    order: Date.now()
  });
  return docRef.id;
};

export const getTemas = async () => {
  const q = query(collection(db, "temas"), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const deleteTema = async (temaId) => {
  await deleteDoc(doc(db, "temas", temaId));
};

// Capitulos
export const createCapitulo = async (temaId, { title, content }) => {
  const capRef = await addDoc(collection(db, `temas/${temaId}/capitulos`), {
    title,
    content,
    order: Date.now(),
    createdAt: new Date()
  });
  return capRef.id;
};

// Ejercicios
export const createEjercicio = async (temaId, capId, ejercicio) => {
  const ejRef = await addDoc(collection(db, `temas/${temaId}/capitulos/${capId}/ejercicios`), {
    ...ejercicio,
    order: Date.now(),
    createdAt: new Date()
  });
  return ejRef.id;
};

// reordenar: simple swap de orders (implementación de ejemplo)
// recibiendo lista con ids en nuevo orden: actualizar order con índices
export const reorderTemas = async (orderedIds) => {
  for (let i = 0; i < orderedIds.length; i++) {
    const id = orderedIds[i];
    await updateDoc(doc(db, "temas", id), { order: i });
  }
};
