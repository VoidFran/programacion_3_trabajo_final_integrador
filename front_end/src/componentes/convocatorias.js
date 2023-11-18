import {useState} from "react"
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { useContext } from 'react';
import { UserContext } from './UserContext';


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
 
    const { userData, setUserData } = useContext(UserContext);
    // datos del usuario logueado

    const agregar_convocatoria = () => {
        if (fecha !== "" && rival !== "") {
            alert("Convocatoria agregado")
            axios.post("http://localhost:3005/api/convocatorias/agregar", {
                headers:{
                    Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
                }
            }, {
                fecha: fecha,
                rival: rival,
                golesRecibidos: 0,
                golesConvertidos: 0,
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
            axios.put("http://localhost:3005/api/convocatorias/editar", {
                headers:{
                    Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
                }
            }, {
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

    const eliminar_convocatoria = (idConvocatoria) => {
        alert("Convocatoria eliminada")
        axios.delete(`http://localhost:3005/api/convocatorias/eliminar/${idConvocatoria}`, {
            headers:{
                Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
            }
        }).then(() => {
            convocatorias()
            limpiar()
            estado_convocatorias_lista([])
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

    const convocar = (idConvocatoria) => {
        navigate(`/convocatorias_convocar/${idConvocatoria}`)
    }

    const convocados = (idConvocatoria, idRival) => {
        navigate(`/convocatorias_convocados/${idConvocatoria}/${idRival}`)
    }

    const convocatorias = () => {
        axios.get("http://localhost:3005/api/convocatorias/buscar", {
            headers:{
                Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
            }
        }).then((response) => {
            estado_convocatorias_lista(response.data)
        })
        .catch(error => {
            alert("Error al cargar convocatorias", error)
        })
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

        })
    }

    convocatorias()
    rivales()

    return (
        <div>
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
                                    <button onClick={()=>{convocar(indice.idConvocatoria)}} className="boton_1">Convocar</button>
                                    <button onClick={()=>{convocados(indice.idConvocatoria, indice.rival)}} className="boton_1">Convocados</button>
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