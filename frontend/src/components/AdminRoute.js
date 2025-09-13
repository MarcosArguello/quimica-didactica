import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";

export default function AdminRoute() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);
  const db = getFirestore();

  useEffect(() => {
    if (!user) { setChecked(true); return; }
    (async () => {
      const ref = doc(db, "admins", user.uid);
      const snap = await getDoc(ref);
      setIsAdmin(!!snap.exists());
      setChecked(true);
    })();
  }, [user]);

  if (!checked) return <div>Cargando...</div>;
  if (!user) return <Navigate to="/auth" />;
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}
