import React from "react"
import {Routes, Route} from "react-router-dom"

import Menu from "./componentes/menu.js";
import Inicio from "./componentes/inicio.js"
import Futbolistas from "./componentes/futbolistas.js"
import Convocatorias from "./componentes/convocatorias.js"
import ConvocatoriasRivales from "./componentes/convocatorias_rivales.js"
import ConvocatoriasConvocar from "./componentes/convocatorias_convocar.js"
import ConvocatoriasConvocados from "./componentes/convocatorias_convocados.js"
import EquipoTitular from "./componentes/equipo_titular.js"
import Institucional from "./componentes/institucional.js"
import Contacto from "./componentes/contacto.js"
import Estadistica from "./componentes/estadistica.js";
import Login from "./componentes/login.js";
import Dashboard from "./componentes/dashboard.js";
import NoEncontrado from "./componentes/no_encontrado.js"

import "./App.css";

import { UserProvider } from './componentes/UserContext';
import { ProtectedRoute } from './componentes/ProtectedRoute.jsx';

export default function App() {
  return (
    <div className="grid_cuardicula">
      <div className="nav">
        <div className="grid_item">
          <div className="grid_contenedor">
            <Menu/>
          </div>
        </div>
      </div>

      <div className="section">
        <UserProvider>
          <Routes>
            <Route path="" element={<Inicio/>}/>
            <Route path="login" element={<Login />} />

            <Route path="futbolistas" element={<Futbolistas/>}/>

            <Route path="convocatorias" element={<Convocatorias/>}/>
            <Route path="convocatorias_rivales" element={<ConvocatoriasRivales/>}/>
            <Route path="convocatorias_convocar/:idConvocatoria" element={<ConvocatoriasConvocar/>}/>
            <Route path="convocatorias_convocados/:idConvocatoria/:idRival" element={<ConvocatoriasConvocados/>}/>
            <Route path="equipo_titular" element={<EquipoTitular/>}/>
            <Route path="institucional" element={<Institucional/>}/>
            <Route path="contacto" element={<Contacto/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>

            <Route path='estadistica' 
              element={
                // ruta protegida para usuarios logueados de tipo entrenador
                <ProtectedRoute mustBeEntrenador={true}>
                  {<Estadistica/>}
                </ProtectedRoute>
            }/>
            
            <Route path="*" element={<NoEncontrado/>}/>
          </Routes>
        </UserProvider>
      </div>

      <div className="footer">            
        <div>
            <p>Copyright© 2023 AFA / Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  )
}