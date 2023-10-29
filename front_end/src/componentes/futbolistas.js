import { useState } from "react";
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

  const [jugadoresLista, setJugadores] = useState([]);
  
  const [editar, setEditar] = useState(false);

  const [modal_abierto, modal_cerrado] = useState(false)

  const ModalFoto = ({abierto, cerrado}) => {
    if (!abierto) return null
    
    return (
    <div>
        <div className="contenedor">
            <div className="jugadores_foto">
              <img onClick={()=>{setFoto("jugador_ninguna.png")}} alt="" src={require(`../imagenes/jugador_ninguna.png`)}/>
              <img onClick={()=>{setFoto("jugador_1.png")}} alt="" src={require(`../imagenes/jugador_1.png`)}/>
              <img onClick={()=>{setFoto("jugador_2.png")}} alt="" src={require(`../imagenes/jugador_2.png`)}/>
              <img onClick={()=>{setFoto("jugador_3.png")}} alt="" src={require(`../imagenes/jugador_3.png`)}/>
              <img onClick={()=>{setFoto("jugador_4.png")}} alt="" src={require(`../imagenes/jugador_4.png`)}/>
              <img onClick={()=>{setFoto("jugador_5.png")}} alt="" src={require(`../imagenes/jugador_5.png`)}/>
              <img onClick={()=>{setFoto("jugador_6.png")}} alt="" src={require(`../imagenes/jugador_6.png`)}/>
              <img onClick={()=>{setFoto("jugador_7.png")}} alt="" src={require(`../imagenes/jugador_7.png`)}/>
              <img onClick={()=>{setFoto("jugador_8.png")}} alt="" src={require(`../imagenes/jugador_8.png`)}/>
            </div>
            <button onClick={cerrado}>cerrar</button>
        </div>
    </div>)
  }

  const add = () => {
    if (dni !== "" && nombre !== "" && apellido !== "" && apodo !== "" && foto !== "jugador_ninguna.png" && posicion !== "" && pieHabil !== "") {
      alert("Jugador agregado");
      modal_cerrado(false)
      Axios.post("http://localhost:3005/api/futbolistas/agregar", {
        dni: dni,
        nombre: nombre,
        apellido: apellido,
        posicion: posicion,
        apodo: apodo,
        foto: foto,
        pieHabil: pieHabil,
        activo: "1",
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
    if (dni !== "" && nombre !== "" && apellido !== "" && apodo !== "" && foto !== "jugador_ninguna.png") {
      alert("Jugador editado")
      modal_cerrado(false)
      Axios.put("http://localhost:3005/api/futbolistas/editar", {
        idFutbolista: idFutbolista,
        dni: dni,
        nombre: nombre,
        apellido: apellido,
        posicion: posicion,
        apodo: apodo,
        foto: foto,
        pieHabil: pieHabil,
        activo: "1",
      }).then(() => {
        setJugadores([]);
        getJugador();
        limpiar();
      });
    }
    else {
      alert("Jugador no editado");
    }
  };

  const eliminar = (idFutbolista) => {
    alert("Jugador eliminado");
    Axios.put(`http://localhost:3005/api/futbolistas/eliminar/${idFutbolista}`, {
      activo: "0",
    }).then(() => {
      setJugadores([]);
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
    setFoto(val.foto)
    setPieHabil(val.pieHabil)
    setIdFutbolista(val.idFutbolista)
  }

  const limpiar = () => {
    setDni("")
    setNombre("")
    setApellido("")
    setPosicion("")
    setApodo("")
    setPieHabil("")
    setIdFutbolista("")
    setEditar(false);
  }

  const getJugador = () => {
    Axios.get("http://localhost:3005/api/futbolistas/buscar").then((response) => {
      if (jugadoresLista.length !== response.data.length) {
        setJugadores(response.data);
      }
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
          <option>ninguno</option>
          <option value="0">Arquero</option>
          <option value="1">Defensor</option>
          <option value="2">Medio</option>
          <option value="3">Delantero</option>
        </select>
      </div>

      <div className="contacto_celda">
        <label>Apodo:</label><input type="text" placeholder="Ingrese apodo" value={apodo} onChange={(evento) => {setApodo(evento.target.value)}}></input>
      </div>

      <div className="contacto_celda">
        <label>Foto:</label><img alt = "" src={require(`../imagenes/${foto}`)}/>
        
        <button onClick={() => modal_cerrado(true)}>abrir</button>
        <ModalFoto abierto={modal_abierto} cerrado={() => modal_cerrado(false)}></ModalFoto>
      </div>

      <div className="contacto_celda">
        <label>Pie Hábil:</label><select value={pieHabil} onChange={(evento) => {setPieHabil(evento.target.value)}}>
          <option>ninguno</option>
          <option value="0">Derecho</option>
          <option value="1">Izquierdo</option>
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
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          
          <tbody>
            {jugadoresLista.map((val, key) => {
                return <tr key ={val.idFutbolista}>
                        <th>{val.idFutbolista}</th>
                        <td><img alt = "" src={require(`../imagenes/${val.foto}`)}/></td>
                        <td>{val.dni}</td>
                        <td>{val.nombre}</td>
                        <td>{val.apellido}</td>
                        <td>{val.posicion}</td>
                        <td>{val.apodo}</td>
                        <td>{val.pieHabil}</td>
                        <td>
                          <button type="button" className="boton_1"
                          onClick={()=>{
                            editarJugador(val);
                          }}
                          >Editar</button>
                          <button onClick={()=>{eliminar(val.idFutbolista)}} className="btn btn-danger">Eliminar</button>
                          

                        </td>
                        </tr>

              })}
          
          </tbody>
        </table>
      </div>
    </div>
  );
}
