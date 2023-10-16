import { useState } from "react";
import Axios from "axios";

export default function Jugadores() {
  const [idFutbolista, setIdFutbolista] = useState();
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [posicion, setPosicion] = useState("");
  const [apodo, setApodo] = useState("");
  const [pieHabil, setPieHabil] = useState("");
  const [activo, setActivo] = useState("");

  const [jugadoresLista, setJugadores] = useState([]);
  
  const [editar, setEditar] = useState(false);

  const add = () => {
    if (dni !== "" && nombre !== "" && apellido !== "" && posicion !== "" && apodo !== "" && pieHabil !== "" && activo !== "") {
      alert("Jugador agregado");
      Axios.post("http://localhost:3005/create", {
        dni: dni,
        nombre: nombre,
        apellido: apellido,
        posicion: posicion,
        apodo: apodo,
        pieHabil: pieHabil,
        activo: activo,
      }).then(() => {
        getJugador();
        limpiar();
      });
    }
    else {
      alert("Jugador no agregado");
    }
  };

  
  const update = () => {
    if (dni !== "" && nombre !== "" && apellido !== "" && posicion !== "" && apodo !== "" && pieHabil !== "" && activo !== "") {
      alert("Jugador editado");
      Axios.put("http://localhost:3005/update", {
        idFutbolista: idFutbolista,
        dni: dni,
        nombre: nombre,
        apellido: apellido,
        posicion: posicion,
        apodo: apodo,
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
  };

  getJugador();

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
        <label>Pie Hábil:</label><select value={pieHabil} onChange={(evento) => {setPieHabil(evento.target.value)}}>
          <option>0</option>
          <option>1</option>
        </select>
      </div>

      <div className="contacto_celda">
        <label>Activo:</label><select value={activo} onChange={(evento) => {setActivo(evento.target.value)}}>
          <option>0</option>
          <option>1</option>
        </select>
      </div>

      {
        editar?
        <div>
        <button className="boton_ingreso" onClick={update}>Editar jugador</button> 
        <button className="boton_ingreso" onClick={limpiar}>Cancelar</button>
        </div>
        : <button className="boton_ingreso" onClick={add}>Agregar jugador</button>
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
                        <td><img className= "jugador"  alt = "" src={require(`../imagenes/jugador.png`)}/></td>
                        <td>{val.dni}</td>
                        <td>{val.nombre}</td>
                        <td>{val.apellido}</td>
                        <td>{val.posicion}</td>
                        <td>{val.apodo}</td>
                        <td>{val.pieHabil}</td>
                        <td>{val.activo}</td>
                        <td>
                          <button type="button"
                          onClick={()=>{
                            editarJugador(val);
                          }}
                          className="boton_editar">Editar</button>
                          <button type="button" onClick={() =>{eliminar(val.idFutbolista)}} className="btn btn-danger">Eliminar</button>
                          

                        </td>
                        </tr>

              })}
          
          </tbody>
        </table>
      </div>
    </div>
  );
}
