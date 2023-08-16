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
    <div class="grid_contenedor">
      <div class="nav">
        <div class="grid_item">
          <div class="contenedor">
            <Menu/>
          </div>
        </div>
      </div>

      <div class="section">
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

      <div class="footer">            
        <div class="caja_flexible">
            <p>Copyright© 2023 Misiotrónica / Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  )
}