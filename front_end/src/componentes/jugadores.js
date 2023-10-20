import { useState } from "react";
import {Link} from "react-router-dom"
import Axios from "axios";

export default function Jugadores() {
  const [idFutbolista, setIdFutbolista] = useState();
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [posicion, setPosicion] = useState("");
  const [apodo, setApodo] = useState("");
  const [foto, setFoto] = useState("jugador_ninguna.png");
  const [pieHabil, setPieHabil] = useState("");
  const [activo, setActivo] = useState("");

  const [jugadoresLista, setJugadores] = useState([]);
  
  const [editar, setEditar] = useState(false);

  const add = () => {
    if (dni !== "" && nombre !== "" && apellido !== "" && apodo !== "" && activo !== "") {
      alert("Jugador agregado");
      Axios.post("http://localhost:3005/create", {
        dni: dni,
        nombre: nombre,
        apellido: apellido,
        posicion: posicion,
        apodo: apodo,
        foto: foto,
        pieHabil: pieHabil,
        activo: activo,
      }).then(() => {
        getJugador();
        limpiar();
        setFoto("jugador_ninguna.png")
        localStorage.removeItem("jugador")
      });
    }
    else {
      alert("Jugador no agregado");
    }
  };

  
  const update = () => {
    if (dni !== "" && nombre !== "" && apellido !== "" && apodo !== "" && activo !== "") {
      alert("Jugador editado");
      Axios.put("http://localhost:3005/update", {
        idFutbolista: idFutbolista,
        dni: dni,
        nombre: nombre,
        apellido: apellido,
        posicion: posicion,
        apodo: apodo,
        foto: foto,
        pieHabil: pieHabil,
        activo: activo,
      }).then(() => {
        getJugador();
        limpiar();
      });
    }
    else {
      alert("Jugador no editado");
    }
  };

  const eliminar = (id) => {
    alert("Jugador eliminado");
    Axios.delete(`http://localhost:3005/delete/${id}`, {
    }).then(() => {
      getJugador();
      limpiar();
    });
  };



  const editarJugador = (val)=>{
    setEditar(true);
    setDni(val.dni)
    setNombre(val.nombre)
    setApellido(val.apellido)
    setPosicion(val.posicion)
    setApodo(val.apodo)
    setPieHabil(val.pieHabil)
    setActivo(val.activo)
    setIdFutbolista(val.idFutbolista)
  
  }

  const limpiar = () => {
    setDni("")
    setNombre("")
    setApellido("")
    setPosicion("")
    setApodo("")
    setPieHabil("")
    setActivo("")
    setIdFutbolista("")
    setEditar(false);
  }

  const getJugador = () => {
    Axios.get("http://localhost:3005/jugador").then((response) => {
      setJugadores(response.data);
    })
    .catch(error => {
        alert("Error al cargar jugadores", error)
    })
 
    if (localStorage.getItem("jugador") !== null) {
      setFoto(localStorage.getItem("jugador"))
      localStorage.removeItem("jugador")
    }
  };

  getJugador();

  function casteo(tipo, valor) {
    if (tipo === "pie_habil") {
      if (valor === 0) {
        return "Derecho"
      }
      else {
        return "Izquierdo"
      }
    }
    else if (tipo === "posicion") {
      if (valor === 0) {
        return "Arquero"
      }
      else if (valor === 1) {
        return "Defensor"
      }
      else if (valor === 2) {
        return "Medio"
      }
      else if (valor === 3) {
        return "Delantero"
      }
    }
 }

  return (
    <div>
      <div className="contacto_celda">
        <label>Dni:</label><input type="number" placeholder="Ingrese dni" value={dni} onChange={(evento) => {setDni(evento.target.value)}}></input>
      </div>

      <div className="contacto_celda">
        <label>Nombre:</label><input type="text" placeholder="Ingrese nombre" value={nombre} onChange={(evento) => {setNombre(evento.target.value)}}></input>
      </div>

      <div className="contacto_celda">
        <label>Apellido:</label><input type="text" placeholder="Ingrese apellido" value={apellido} onChange={(evento) => {setApellido(evento.target.value)}}></input>
      </div>

      <div className="contacto_celda">
        <label>Posición:</label><select value={posicion} onChange={(evento) => {setPosicion(evento.target.value)}}>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>

      <div className="contacto_celda">
        <label>Apodo:</label><input type="text" placeholder="Ingrese apodo" value={apodo} onChange={(evento) => {setApodo(evento.target.value)}}></input>
      </div>

      <div className="contacto_celda">
        <label>Foto:</label><img alt = "" src={require(`../imagenes/${foto}`)}/>
          <Link to="/jugadores_foto">
                <button>Foto</button>
            </Link>
      </div>

      <div className="contacto_celda">
        <label>Pie Hábil:</label><select value={pieHabil} onChange={(evento) => {setPieHabil(evento.target.value)}}>
          <option>0</option>
          <option>1</option>
        </select>
      </div>

      <div className="contacto_celda">
        <label>Activo:</label>
        <select value={activo} onChange={(evento) => {setActivo(evento.target.value)}}>
          <option>0</option>
          <option>1</option>
        </select>
      </div>

      {
        editar?
        <div>
          <button className="boton_1" onClick={update}>Editar jugador</button> 
          <button onClick={limpiar}>Cancelar</button>
        </div>
          :<button onClick={add}>Agregar jugador</button>
      }
        
      <div className="grid_contenedor">
        <table>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Foto</th>
              <th scope="col">Dni</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Posicion</th>
              <th scope="col">Apodo</th>
              <th scope="col">Pie Habil</th>
              <th scope="col">Activo</th>
            </tr>
          </thead>
          
          <tbody>
            {jugadoresLista.map((val, key) => {
                return <tr key ={val.idFutbolista}>
                        <th scope="row">{val.idFutbolista}</th>
                        <td><img alt = "" src={require(`../imagenes/${val.foto}`)}/></td>
                        <td>{val.dni}</td>
                        <td>{val.nombre}</td>
                        <td>{val.apellido}</td>
                        <td>{casteo("posicion", val.posicion)}</td>
                        <td>{val.apodo}</td>
                        <td>{casteo("pie_habil", val.pieHabil)}</td>
                        <td>{val.activo}</td>
                        <td>
                          <button type="button" className="boton_1"
                          onClick={()=>{
                            editarJugador(val);
                          }}
                          >Editar</button>
                          <button onClick={() =>{eliminar(val.idFutbolista)}} className="btn btn-danger">Eliminar</button>
                          

                        </td>
                        </tr>

              })}
          
          </tbody>
        </table>
      </div>
    </div>
  );
}
