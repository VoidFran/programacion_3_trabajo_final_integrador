import {useState} from "react"
import {Link} from "react-router-dom"
import Axios from "axios"

export default function Convocatoria() {
    const [idRival, estado_idRival] = useState()
    const [nombre, estado_nombre] = useState("")
    const [activo, estado_activo] = useState("")

    const [rivales_lista, estado_rivales_lista] = useState([])
    const [editar, estado_editar] = useState(false)

    const agregar_rival = () => {
        if (nombre !== "" && activo !== "") {
            alert("Rival agregado");
            Axios.post("http://localhost:3005/rivales_agregar", {
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
            Axios.post("http://localhost:3005/rivales_editar", {
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

    const eliminar_rival = (id) => {
        alert("Rival eliminado")
        Axios.delete(`http://localhost:3005/rivales_eliminar/${id}`, {
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
        Axios.get("http://localhost:3005/rivales").then((response) => {
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

            <div className="contacto_celda">
                <label>Activo:</label>
                <select value={activo} onChange={(evento) => {estado_activo(evento.target.value)}}>
                    <option>0</option>
                    <option>1</option>
                </select>
            </div>

            {
                editar?
                <div>
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
                                    <button className="boton_1" onClick={() => {mostrar_editar_rival(indice)}}>Editar</button>
                                    <button onClick={() => {eliminar_rival(indice.idRival)}}>Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}