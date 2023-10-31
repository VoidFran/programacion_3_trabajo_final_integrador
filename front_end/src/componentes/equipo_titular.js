import {useState} from "react"
import {Link} from "react-router-dom"
import {useParams} from 'react-router-dom'
import axios from "axios"

export default function EquipoTitular() {
    
    const [idConvocatoria, estado_idConvocatoria] = useState("")
    const [convocatorias_lista, estado_convocatorias_lista] = useState([])
    const [rivales_lista, estado_rivales_lista] = useState([])
    const [equipo_titular_lista, estado_equipo_titular_lista] = useState([])

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

    const convocatorias = () => {
        axios.get("http://localhost:3005/api/convocatorias/buscar").then((response) => {
            estado_convocatorias_lista(response.data)
        })
        .catch(error => {
            alert("Error al cargar convocatorias", error)
        })
    }

    const rivales = () => {
        axios.get("http://localhost:3005/api/rivales/buscar").then((response) => {
            estado_rivales_lista(response.data)
        })
        .catch(error => {
            alert("Error al cargar rivales", error)
        })
    }
    
    const convocados = () => {
        if (idConvocatoria !== "") {
            axios.get(`http://localhost:3005/api/equipo_titular/buscar/${idConvocatoria}`).then((response) => {
                estado_equipo_titular_lista(response.data)
            })
            .catch(error => {
                alert("Error al cargar convocados", error)
            })
        }
    }

    convocatorias()
    rivales()
    convocados()

    return (
        <div>{idConvocatoria}
            <h1>equipo_titular</h1>

            <select onChange={(evento)=>{estado_idConvocatoria(evento.target.value)}}>
                <option>ninguno</option>
                    {convocatorias_lista.map((indice)=>{
                        return <option value={indice.idConvocatoria}>
                            <option>Id: {indice.idConvocatoria} / </option>
                            <option>Fecha: {formato_fecha(indice.fecha)} / </option>
                            <option>Rival: {casteo(indice.rival)}</option>
                        </option>
                    })}
                </select>

            {(equipo_titular_lista.map((indice) => {
                return <tr key = {indice.idFutbolista}>
                    <th>{indice.idFutbolista}</th>
                    <td><img alt = "" src={require(`../imagenes/${indice.foto}`)}/></td>
                    <td>{indice.nombre}</td>
                    <td>{indice.apellido}</td>
                    <td>{indice.posicion}</td>
                    <td>{indice.pieHabil}</td>
                    <td>{indice.dorsal}</td>
                    <td><input type="radio" className="checkbox"></input></td>
                    <td><input type="checkbox" className="checkbox"></input></td>
                </tr>
            }))}
        </div>
    )
}