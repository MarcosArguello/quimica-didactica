import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { crearUsuarioFirestore } from "../firebase/firestore";

const googleProvider = new GoogleAuthProvider();

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (isLogin) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // ✅ Verificamos si el correo está validado
      if (!userCredential.user.emailVerified) {
        alert("Debes verificar tu correo antes de acceder.");
        return;
      }

      // ✅ Crear usuario en Firestore si no existe
      await crearUsuarioFirestore(userCredential.user);

      // ✅ Redirigir a perfil
      navigate("/perfil");
    } else {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await sendEmailVerification(userCredential.user);
      alert("Se ha enviado un correo de verificación. Revisa tu bandeja de entrada.");
      setIsLogin(true);
    }
  } catch (error) {
    alert(error.message);
  }
};

  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    // Google automáticamente considera verificado el email
    await crearUsuarioFirestore(result.user);

    navigate("/perfil");
  } catch (error) {
    alert("Error al iniciar sesión con Google: " + error.message);
  }
};

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "50px auto", textAlign: "center", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">{isLogin ? "Entrar" : "Registrarse"}</button>
      </form>

      <button onClick={handleGoogleLogin} style={{ marginTop: "10px" }}>
        Iniciar sesión con Google
      </button>

      <p style={{ marginTop: "15px" }}>
        {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
        <span onClick={toggleMode} style={{ color: "blue", cursor: "pointer" }}>
          {isLogin ? "Registrarse" : "Iniciar sesión"}
        </span>
      </p>
    </div>
  );
}

export default Auth;
