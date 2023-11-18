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
import {BrowserRouter} from "react-router-dom"

export default function App() {
  return (
    <div className="grid_cuardicula">
      <BrowserRouter>
        <UserProvider>
          <div className="nav">
            <div className="grid_item">
              <div className="grid_contenedor">
                <Menu/>
              </div>
            </div>
          </div>

          <div className="section">
              <Routes>
                <Route path="" element={<Inicio/>}/>
                <Route path="login" element={<Login />} />

                <Route path='futbolistas' element={<ProtectedRoute mustBeEntrenador={true}> {<Futbolistas/>}</ProtectedRoute>}/>
                <Route path='convocatorias' element={<ProtectedRoute mustBeEntrenador={true}> {<Convocatorias/>}</ProtectedRoute>}/>
                <Route path='convocatorias_rivales' element={<ProtectedRoute mustBeEntrenador={true}> {<ConvocatoriasRivales/>}</ProtectedRoute>}/>
                <Route path='convocatorias_convocar/:idConvocatoria' element={<ProtectedRoute mustBeEntrenador={true}> {<ConvocatoriasConvocar/>}</ProtectedRoute>}/>
                <Route path='convocatorias_convocados/:idConvocatoria/:idRival' element={<ProtectedRoute mustBeEntrenador={true}> {<ConvocatoriasConvocados/>}</ProtectedRoute>}/>
                <Route path='equipo_titular' element={<ProtectedRoute mustBeEntrenador={true}> {<EquipoTitular/>}</ProtectedRoute>}/>

                <Route path="institucional" element={<Institucional/>}/>
                <Route path="contacto" element={<Contacto/>}/>
                <Route path="dashboard" element={<Dashboard/>}/>

                <Route path='estadistica' 
                  element={
                    // ruta protegida para usuarios logueados de tipo entrenador
                    <ProtectedRoute mustBePresidente={true}>
                      {<Estadistica/>}
                    </ProtectedRoute>
                }/>
                
                <Route path="*" element={<NoEncontrado/>}/>
              </Routes>
          </div>

          <div className="footer">            
            <div>
                <p>Copyright© 2023 AFA / Todos los derechos reservados</p>
            </div>
          </div>
        </UserProvider>
      </BrowserRouter>
    </div>
  )
}