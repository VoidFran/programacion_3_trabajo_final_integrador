import { useState } from "react";
import Axios from "axios";

export default function Jugadores() {
  const [nombre, setNombre] = useState("");
  const [posicion, setPosicion] = useState("");
  const [pierna, setPierna] = useState("");
  const [edad, setEdad] = useState();
  const [camiseta, setCamiseta] = useState();
  const [jugadoresLista, setJugadores] = useState([]);
  const [id, setId] = useState();
  
  const [editar, setEditar] = useState(false);

  const add = () => {
    if (nombre !== "" && edad !== "" && camiseta !== "" && pierna !== "" && posicion !== "") {
      alert("Jugador agregado");
      Axios.post("http://localhost:3005/create", {
        nombre: nombre,
        edad: edad,
        camiseta: camiseta,
        pierna: pierna,
        posicion: posicion,
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
    if (nombre !== "" && edad !== "" && camiseta !== "" && pierna !== "" && posicion !== "") {
      alert("Jugador editado");
      Axios.put("http://localhost:3005/update", {
        id:id,
        nombre: nombre,
        edad: edad,
        camiseta: camiseta,
        pierna: pierna,
        posicion: posicion,
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
    setNombre(val.nombre)
    setEdad(val.edad)
    setCamiseta(val.camiseta)
    setPierna(val.pierna)
    setPosicion(val.posicion)
    setId(val.id)
  
  }

  const limpiar = () => {
    setEdad("");
    setNombre("");
    setCamiseta("");
    setPosicion("");
    setPierna("");
    setId("");
    setEditar(false);
  }

  const getJugador = () => {
    Axios.get("http://localhost:3005/jugador").then((response) => {
      setJugadores(response.data);
    });
  };
  getJugador();
  return (
    <div class="container">
    <div>
      <div className="datos">
        <label> Nombre y apellido :<input value={nombre} onChange={(event) => {
              setNombre(event.target.value);
            }}
            type="text"/></label>
        <label> Posicion de jugada:<input value={posicion} onChange={(event) => {
              setPosicion(event.target.value);
            }}
            type="text"/></label>
        <label>Pierna del jugador:<input value={pierna} onChange={(event) => {
              setPierna(event.target.value);
            }}type="text"
          /></label>
        <label>Edad del jugador :<input value={edad} onChange={(event) => {
              setEdad(event.target.value);
            }}
            type="number"/></label>
        <label>Numero de camiseta :<input value={camiseta} onChange={(event) => {
              setCamiseta(event.target.value);
            }}
            type="number"/></label>
          {
            editar?
            <div>
            <button className="btn btn-warning m-2" onClick={update} style={{ marginTop: '20px' }}>Actualizar jugador</button> 
            <button className="btn btn-info m-2 " onClick={limpiar} style={{ marginTop: '20px' }}>Cancelar</button>
            </div>
            : <button className="btn btn-success" onClick={add} style={{ marginTop: '20px' }}>Agregar jugador</button>
           
          }
        

      </div>
    </div>
    <table className="table table-striped" style={{ marginTop: '25px' }}>
          
        
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre y apellido</th>
          <th scope="col">Edad</th>
          <th scope="col">Posicion</th>
          <th scope="col" >Numero de camiseta</th>
          <th scope="col">Pierna</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {jugadoresLista.map((val, key) => {
            return <tr key ={val.id}>
                    <th scope="row">{val.id}</th>
                    <td>{val.nombre}</td>
                    <td>{val.edad}</td>
                    <td>{val.posicion}</td>
                    <td>{val.camiseta}</td>
                    <td>{val.pierna}</td>
                    <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button"
                      onClick={()=>{
                        editarJugador(val);
                      }}
                      className="btn btn-info">Editar</button>
                      <button type="button" onClick={() =>{eliminar(val.id)}} className="btn btn-danger">Eliminar</button>
                      
                    </div>

                    </td>
                    </tr>

          })}
       
      </tbody>
    </table>

    </div>
  );
}
