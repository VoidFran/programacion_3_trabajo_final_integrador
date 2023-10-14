import {useState} from "react"
import Axios from "axios"

export default function Convocatoria() {
    const [idConvocatoria, estado_idConvocatoria] = useState()
    const [fecha, estado_fecha] = useState("")
    const [rival, estado_rival] = useState("")
    const [golesRecibidos, estado_golesRecibidos] = useState("")
    const [golesConvertidos, estado_golesConvertidos] = useState("")

    const [convocatoria_lista, estado_convocatoria_lista] = useState([])
    const [editar, estado_editar] = useState(false)

    const agregar_convocatoria = () => {
        if (fecha !== "" && rival !== "" && golesRecibidos !== "" && golesConvertidos !== "") {
            alert("Convocatoria agregado");
            Axios.post("http://localhost:3005/convocatoria_agregar", {
            fecha: fecha,
            rival: rival,
            golesRecibidos: golesRecibidos,
            golesConvertidos: golesConvertidos,
            }).then(() => {
                convocatorias()
                limpiar()
            })
        }
        else {
            alert("Convocatoria no agregado")
        }
    }

    const editar_convocatoria = (indice) => {
        estado_editar(true)
        estado_fecha(indice.fecha)
        estado_rival(indice.rival)
        estado_golesRecibidos(indice.golesRecibidos)
        estado_golesConvertidos (indice.golesConvertidos)
    }

    const eliminar_convocatoria = (id) => {
        alert("Convocatoria eliminada")
        Axios.delete(`http://localhost:3005/convocatoria_eliminar/${id}`, {
        }).then(() => {
            convocatorias()
            limpiar()
        })
    }

    const limpiar = () => {
        estado_fecha("")
        estado_fecha("")
        estado_rival("")
        estado_golesRecibidos("")
        estado_golesConvertidos("")
        estado_editar(false)
    }

    const convocatorias = () => {
        Axios.get("http://localhost:3005/convocatoria").then((response) => {
            estado_convocatoria_lista(response.data)
        })
        .catch(error => {
            alert("Error al cargar convocatorias", error)
        })
    }

    convocatorias()

    return (
        <div>
            <div className = "contacto_celda">
                <label>Fecha:</label><input type = "date" placeholder = "Ingrese fecha" value = {fecha} onChange = {(evento) => {estado_fecha(evento.target.value)}}></input>
            </div>

            <div className = "contacto_celda">
                <label>Rival:</label><input type = "number" placeholder = "Ingrese rival" value = {rival} onChange = {(evento) => {estado_rival(evento.target.value)}}></input>
            </div>

            <div className = "contacto_celda">
                <label>Goles recibidos:</label><input type = "number" placeholder = "Ingrese goles recibidos" value = {golesRecibidos} onChange = {(evento) => {estado_golesRecibidos(evento.target.value)}}></input>
            </div>

            <div className = "contacto_celda">
                <label>Goles convertidos:</label><input type = "number" placeholder = "Ingrese goles convertidos" value = {golesConvertidos} onChange = {(evento) => {estado_golesConvertidos(evento.target.value)}}></input>
            </div>

            {
                editar?
                <div>
                    <button className="boton_ingreso" onClick={editar_convocatoria}>Editar convocatoria</button> 
                    <button className="boton_ingreso" onClick={limpiar}>Cancelar</button>
                </div>
                : <button className="boton_ingreso" onClick={agregar_convocatoria}>Agregar convocatoria</button>
            }




            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Fecha</th>
                        <th>Rival</th>
                        <th>Goles recibidos</th>
                        <th>Goles convertidos</th>
                    </tr>
                </thead>

                <tbody>
                    {convocatoria_lista.map((indice) => {
                        return <tr key = {indice.idConvocatoria}>
                            <th>{indice.idConvocatoria}</th>
                            <td>{indice.fecha}</td>
                            <td>{indice.rival}</td>
                            <td>{indice.golesRecibidos}</td>
                            <td>{indice.golesConvertidos}</td>
                            <td>
                                <div>
                                    <button className = "contacto_boton" onClick = {() => {editar_convocatoria(indice)}}>Editar</button>
                                    <button className = "contacto_boton" onClick = {() => {eliminar_convocatoria(indice.idConvocatoria)}}>Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}