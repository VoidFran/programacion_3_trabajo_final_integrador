import { useState } from "react";
import Axios from "axios";
import { useContext, useEffect } from 'react';
import { UserContext } from './UserContext';

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
  
  const [archivo, setArchivo] = useState(null);


  const { userData, setUserData } = useContext(UserContext);
  // datos del usuario logueado

  const add = () => {
    const formdata = new FormData();
    formdata.append("imagen", archivo)
    formdata.append("idFutbolista", idFutbolista)
    formdata.append("dni", dni)
    formdata.append("nombre", nombre)
    formdata.append("apellido", apellido)
    formdata.append("posicion", posicion)
    formdata.append("apodo", apodo)
    formdata.append("foto", foto)
    formdata.append("pieHabil", pieHabil)
    formdata.append("activo", "1")
    setFoto(formdata)

    if (dni !== "" && nombre !== "" && apellido !== "" && apodo !== "" && posicion !== "" && pieHabil !== "") {
      alert("Jugador agregado");
      Axios.post("http://localhost:3005/api/futbolistas/agregar", formdata, {
        headers:{
          Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
      },
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
    const formdata = new FormData();
    formdata.append("imagen", archivo)
    formdata.append("idFutbolista", idFutbolista)
    formdata.append("dni", dni)
    formdata.append("nombre", nombre)
    formdata.append("apellido", apellido)
    formdata.append("posicion", posicion)
    formdata.append("apodo", apodo)
    formdata.append("foto", foto)
    formdata.append("pieHabil", pieHabil)
    formdata.append("activo", "1")
    setFoto(formdata)

    if (dni !== "" && nombre !== "" && apellido !== "" && apodo !== "" && archivo !== null) {
      alert("Jugador editado")
      Axios.put(`http://localhost:3005/api/futbolistas/editar`, formdata, {
        headers:{
          Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
      }
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
      headers:{
      Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
      },
      activo: "0"
    }).then(() => {
      alert(8)
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
    Axios.get("http://localhost:3005/api/futbolistas/buscar",{
      headers:{
          Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
      }
  }).then((response) => {
      if (jugadoresLista.length !== response.data.length) {
        setJugadores(response.data);
      }
    }).catch(error => {
        alert("Error al cargar jugadores", error)
    })
  };

  getJugador();

  const cambiar_archivo = (e) => {
    setArchivo(e.target.files[0]);
  };

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
        <label>Foto:</label>
        
        <input type="file" className="archivo" accept=".jpg, jpeg, .png, .mbp, .gif" onChange={cambiar_archivo}></input>
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
                      <td className="futbolista_imagen"><img alt="error" src={`http://localhost:3005/imagenes/` + val.foto}/></td>
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
  );
}
