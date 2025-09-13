import "./App.css";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Perfil from "./pages/Perfil";
import Practica from "./pages/Practica";
import Teoria from "./pages/Teoria";
import Home from "./pages/Home";
import Header from "./components/Header";
import Herramientas from "./pages/Herramientas";
import Extras from "./pages/Extras";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import MiAprendizaje from "./pages/MiAprendizaje";
import AdminRoute from "./components/AdminRoute";



function App() {
  return (
    <div className="App">
      <Header />
      <main style={{ marginTop: "20px" }}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/teoria" element={<Teoria />} />
            <Route path="/practica" element={<Practica />} />
            <Route path="/mi-aprendizaje" element={<MiAprendizaje />} />
          </Route>

          {/* Rutas públicas */}
          <Route path="/herramientas" element={<Herramientas />} />
          <Route path="/extras" element={<Extras />} />
          <Route path="/auth" element={<Auth />} />          
          <Route path="/" element={<Home />} />
        </Routes>

        {/* otras rutas admin */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/teoria" element={<AdminTeoria />} />
          <Route path="/admin/teoria/nuevo" element={<NuevoTema />} />
          <Route path="/admin/teoria/:id" element={<TemaDetalle />} />
        </Route>
      </main>
      <Footer />
    </div>
  );
}

export default App;


