import React from "react"
import {Routes, Route} from "react-router-dom"

import Menu from "./componentes/menu.js";
import Inicio from "./componentes/inicio.js"
import Jugadores from "./componentes/jugadores.js"
import Convocatorias from "./componentes/convocatorias.js"
import ConvocatoriasRivales from "./componentes/convocatorias_rivales.js"
import EquipoTitular from "./componentes/equipo_titular.js"
import Institucional from "./componentes/institucional.js"
import Contacto from "./componentes/contacto.js"
import NoEncontrado from "./componentes/no_encontrado.js"

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
          <Route path="convocatorias" element={<Convocatorias/>}/>
          <Route path="convocatorias_rivales" element={<ConvocatoriasRivales/>}/>
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