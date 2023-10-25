import {useState} from "react"
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import Axios from "axios"

export default function Convocatoria() {
    const [idConvocatoria, estado_idConvocatoria] = useState()
    const [fecha, estado_fecha] = useState("")
    const [rival, estado_rival] = useState("")
    const [golesRecibidos, estado_golesRecibidos] = useState("")
    const [golesConvertidos, estado_golesConvertidos] = useState("")

    const [convocatorias_lista, estado_convocatorias_lista] = useState([])
    const [rivales_lista, estado_rivales_lista] = useState([])

    const [editar, estado_editar] = useState(false)

    const navigate = useNavigate()

    const agregar_convocatoria = () => {
        if (fecha !== "" && rival !== "") {
            alert("Convocatoria agregado")
            Axios.post("http://localhost:3005/convocatorias_agregar", {
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

    const editar_convocatoria = () => {
        if (fecha !== "" && golesRecibidos !== "" && golesConvertidos !== "") {
            Axios.post("http://localhost:3005/convocatorias_editar", {
                idConvocatoria: idConvocatoria,
                fecha: fecha,
                rival: rival,
                golesRecibidos: golesRecibidos,
                golesConvertidos: golesConvertidos,
            }).then(() => {
                convocatorias()
                limpiar()
                alert("Convocatoria editada")
            })
        }
        else {
            alert("Convocatoria no editada")
        }
    }

    const mostrar_editar_convocatoria = (indice) => {
        estado_editar(true)
        estado_fecha(indice.fecha)
        estado_rival(indice.rival)
        estado_golesRecibidos(indice.golesRecibidos)
        estado_golesConvertidos (indice.golesConvertidos)
        estado_idConvocatoria (indice.idConvocatoria)
    }

    const eliminar_convocatoria = (id) => {
        alert("Convocatoria eliminada")
        Axios.delete(`http://localhost:3005/convocatorias_eliminar/${id}`, {
        }).then(() => {
            convocatorias()
            limpiar()
        })
    }

    const limpiar = () => {
        estado_fecha("")
        estado_rival("")
        estado_golesRecibidos("")
        estado_golesConvertidos("")
        estado_editar(false)
    }

    function formato_fecha(fecha_hora) {
        const fecha = new Date(fecha_hora)
        return fecha.toISOString().split("T")[0]
    }

    function casteo(valor) {
        for (let indice of rivales_lista) {
            if (valor === indice.idRival) {
                return indice.nombre
            }
        }
    }

    const convocar = (id) => {
        navigate(`/convocatorias_convocados/${id}`)
    }

    const convocatorias = () => {
        Axios.get("http://localhost:3005/convocatoria").then((response) => {
            estado_convocatorias_lista(response.data)
        })
        .catch(error => {
            alert("Error al cargar convocatorias", error)
        })
    }

    const rivales = () => {
        Axios.get("http://localhost:3005/rivales").then((response) => {
            estado_rivales_lista(response.data)
        })
    }

    convocatorias()
    rivales()

    return (
        <div>{rival}
            <div className="contacto_celda">
                <label>Fecha:</label><input type="date" placeholder="Ingrese fecha" value={fecha} onChange={(evento)=>{estado_fecha(evento.target.value)}}></input>
            </div>

            <div className="contacto_celda">
                <label>Rival:</label>
                <select onChange={(evento)=>{estado_rival(evento.target.value)}}>
                <option>ninguno</option>
                    {rivales_lista.map((indice)=>{
                        return <option value={indice.idRival}>
                            <option>{indice.nombre}</option>
                        </option>
                    })}
                </select>
            </div>

            {
                editar?
                <div>
                    <div className="contacto_celda">
                        <label>Goles recibidos:</label><input type="number" placeholder="Ingrese goles recibidos" value={golesRecibidos} onChange={(evento)=>{estado_golesRecibidos(evento.target.value)}}></input>
                    </div>
        
                    <div className="contacto_celda">
                        <label>Goles convertidos:</label><input type="number" placeholder="Ingrese goles convertidos" value={golesConvertidos} onChange={(evento)=>{estado_golesConvertidos(evento.target.value)}}></input>
                    </div>

                    <button className="boton_3" onClick={editar_convocatoria}>Editar convocatoria</button> 
                    <button className="boton_1" onClick={limpiar}>Cancelar</button>
                </div>: 
                    <button className="boton_1" onClick={agregar_convocatoria}>Agregar convocatoria</button>
            }

            <Link to="/convocatorias_rivales">
                <button>Rivales</button>
            </Link>

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
                    {convocatorias_lista.map((indice)=>{
                        return <tr key={indice.idConvocatoria}>
                            <th>{indice.idConvocatoria}</th>
                            <td>{formato_fecha(indice.fecha)}</td>
                            <td>{casteo(indice.rival)}</td>
                            <td>{indice.golesRecibidos}</td>
                            <td>{indice.golesConvertidos}</td>
                            <td>
                                <div>
                                    <button onClick={()=>{convocar(indice.idConvocatoria)}} className="boton_1">Convocados</button>
                                    <button className="boton_1" onClick={()=>{mostrar_editar_convocatoria(indice)}}>Editar</button>
                                    <button onClick={()=>{eliminar_convocatoria(indice.idConvocatoria)}}>Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}