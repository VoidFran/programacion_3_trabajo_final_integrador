import React from "react"

import Menu from "./componentes/menu.js";
import Inicio from "./componentes/inicio.js"
import Jugadores from "./componentes/jugadores.js"
import Convocatoria from "./componentes/convocatoria.js"
import EquipoTitular from "./componentes/equipo_titular.js"
import Institucional from "./componentes/institucional.js"
import Contacto from "./componentes/contacto.js"
import NoEncontrado from "./componentes/no_encontrado.js"

import {Routes, Route} from "react-router-dom"

import "./App.css";

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
        <Routes>
          <Route path="" element={<Inicio/>}/>
          <Route path="jugadores" element={<Jugadores/>}/>
          <Route path="convocatoria" element={<Convocatoria/>}/>
          <Route path="equipo_titular" element={<EquipoTitular/>}/>
          <Route path="institucional" element={<Institucional/>}/>
          <Route path="contacto" element={<Contacto/>}/>
          <Route path="*" element={<NoEncontrado/>}/>
        </Routes>
      </div>

      <div className="footer">            
        <div>
            <p>Copyright© 2023 AFA / Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  )
}