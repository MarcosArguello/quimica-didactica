import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";


const db = getFirestore();

export const crearUsuarioFirestore = async (user) => {
  const userRef = doc(db, "usuarios", user.uid);
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      nombre: user.displayName || "",
      progreso: {}
    });
  }
};

export const actualizarProgreso = async (uid, tema, capitulo) => {
  const userRef = doc(db, "usuarios", uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    const progreso = docSnap.data().progreso || {};
    if (!progreso[tema]) progreso[tema] = {};
    progreso[tema][capitulo] = true;
    await updateDoc(userRef, { progreso });
  }
};

export const obtenerProgreso = async (uid) => {
  const userRef = doc(db, "usuarios", uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) return docSnap.data().progreso || {};
  return {};
};
