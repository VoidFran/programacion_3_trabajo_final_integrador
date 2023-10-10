import { useState } from "react";
import Axios from "axios";

export default function Jugadores() {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [posicion, setPosicion] = useState("");
  const [apodo, setApodo] = useState("");
  const [pieHabil, setPieHabil] = useState("");
  const [activo, setActivo] = useState("");

  const [jugadoresLista, setJugadores] = useState([]);
  const [id, setId] = useState();
  
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
        id:id,
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
    setId(val.id)
  
  }

  const limpiar = () => {
    setDni("")
    setNombre("")
    setApellido("")
    setPosicion("")
    setApodo("")
    setPieHabil("")
    setActivo("")
    setId("")
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
        <label> Dni :<input value={dni} onChange={(event) => {setDni(event.target.value);
            }}
            type="number"/></label>
        <label> Nombre :<input value={nombre} onChange={(event) => {setNombre(event.target.value);
            }}
            type="text"/></label>
        <label> Apellido :<input value={apellido} onChange={(event) => {setApellido(event.target.value);
            }}
            type="text"/></label>
        <label> Posición :<input value={posicion} min = "0" max = "3" onChange={(event) => {setPosicion(event.target.value);
            }}
            type="number"/></label>
        <label> Apodo :<input value={apodo} onChange={(event) => {setApodo(event.target.value);
            }}
            type="text"/></label>
        <label> Pie Hábil :<input value={pieHabil} min = "0" max = "1" onChange={(event) => {setPieHabil(event.target.value);
            }}
            type="number"/></label>
        <label> Activo :<input value={activo} min = "0" max = "1" onChange={(event) => {setActivo(event.target.value);
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
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button"
                      onClick={()=>{
                        editarJugador(val);
                      }}
                      className="btn btn-info">Editar</button>
                      <button type="button" onClick={() =>{eliminar(val.idFutbolista)}} className="btn btn-danger">Eliminar</button>
                      
                    </div>

                    </td>
                    </tr>

          })}
       
      </tbody>
    </table>

    </div>
  );
}
