import {useState} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import { useContext } from 'react';
import { UserContext } from './UserContext';


export default function Convocatoria() {
    const [idRival, estado_idRival] = useState()
    const [nombre, estado_nombre] = useState("")
    const [activo, estado_activo] = useState("1")

    const [rivales_lista, estado_rivales_lista] = useState([])
    const [editar, estado_editar] = useState(false)

    const { userData } = useContext(UserContext);
    // datos del usuario logueado

    const agregar_rival = () => {
        if (nombre !== "" && activo !== "") {
            alert("Rival agregado")
            axios.post("http://localhost:3005/api/rivales/agregar", {
                headers:{
                    Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
                }
            }, {
                nombre: nombre,
                activo: activo,
            }).then(() => {
                rivales()
                limpiar()
            })
        }
        else {
            alert("Rival no agregado")
        }
    }

    const editar_rival = () => {
        if (nombre !== "" && activo !== "") {
            axios.put("http://localhost:3005/api/rivales/editar", {
                headers:{
                    Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
                }
            }, {
                idRival: idRival,
                nombre: nombre,
                activo: activo,
            }).then(() => {
                rivales()
                limpiar()
                alert("Rival editado")
            })
        }
        else {
            alert("Rival no editado")
        }
    }

    const mostrar_editar_rival = (indice) => {
        estado_editar(true)
        estado_nombre(indice.nombre)
        estado_activo(indice.activo)
        estado_idRival(indice.idRival)
    }

    const eliminar_rival = (idRival) => {
        alert("Rival eliminado")
        axios.delete(`http://localhost:3005/api/rivales/eliminar/${idRival}`, {
            headers:{
                Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
            }
        }).then(() => {
            rivales()
            limpiar()
        })
    }

    const limpiar = () => {
        estado_nombre("")
        estado_activo("")
        estado_editar(false)
    }

    const rivales = () => {
        axios.get("http://localhost:3005/api/rivales/buscar", {
            headers:{
                Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
            }
    }).then((response) => {
            estado_rivales_lista(response.data)
        })
        .catch(error => {
            alert("Error al cargar rivales", error)
        })
    }

    rivales()

    return (
        <div>
            <div className="contacto_celda">
                <label>Nombre:</label><input type="text" placeholder="Ingrese nombre" value={nombre} onChange={(evento) => {estado_nombre(evento.target.value)}}></input>
            </div>

            {
                editar?
                <div>
                    <div className="contacto_celda">
                        <label>Activo:</label><input type="checkbox" checked={activo} onChange={(event) => estado_activo(event.target.checked)}></input>
                     </div>

                    <button className="boton_3" onClick={editar_rival}>Editar rival</button> 
                    <button className="boton_1" onClick={limpiar}>Cancelar</button>
                </div>: 
                    <button className="boton_1" onClick={agregar_rival}>Agregar rival</button>
            }

            <Link to="/convocatorias">
                <button>Convocatorias</button>
            </Link>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Activo</th>
                    </tr>
                </thead>

                <tbody>
                    {rivales_lista.map((indice) => {
                        return <tr key = {indice.idConvocatoria}>
                            <th>{indice.idRival}</th>
                            <td>{indice.nombre}</td>
                            <td>{indice.activo}</td>
                            <td>
                                <div>
                                    <button className="boton_1" onClick={()=>{mostrar_editar_rival(indice)}}>Editar</button>
                                    <button onClick={()=>{eliminar_rival(indice.idRival)}}>Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}