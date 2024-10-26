import {useState} from "react"
import axios from "axios"
import { UserContext } from './UserContext';
import { useContext } from 'react';

export default function EquipoTitular() {
    const [idConvocatoria, estado_idConvocatoria] = useState("")
    const [convocatorias_lista, estado_convocatorias_lista] = useState([])
    const [rivales_lista, estado_rivales_lista] = useState([])
    const [equipo_titular_lista, estado_equipo_titular_lista] = useState([])
    
    const { userData, setUserData } = useContext(UserContext);

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
        axios.get("http://localhost:3005/api/convocatorias/buscar",{
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
        axios.get("http://localhost:3005/api/rivales/buscar",{
            headers:{
                Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
            }
        }).then((response) => {
            estado_rivales_lista(response.data)
        })
        .catch(error => {
            
        })
    }
    
    const titulares = () => {
        if (idConvocatoria !== "") {
            axios.get(`http://localhost:3005/api/equipo_titular/buscar/${idConvocatoria}`,{
                headers:{
                    Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
                }
            }).then((response) => {    
                if (equipo_titular_lista.length !== response.data) {
                    estado_equipo_titular_lista(response.data)
                }
            })
            .catch(error => {
                estado_equipo_titular_lista([])
            })
        }
    }

    convocatorias()
    rivales()
    titulares()

    return (
        <div>
            <div className="contacto_celda">
                <select onChange={(evento)=>{estado_idConvocatoria(evento.target.value)}}>
                    <option>ninguno</option>
                
                    {convocatorias_lista.map((indice)=>{
                        return <option value={indice.idConvocatoria}>
                            <option>Fecha: {formato_fecha(indice.fecha)} / </option>
                            <option>Rival: {casteo(indice.rival)}</option>
                        </option>
                    })}
                </select>
            
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Arquero</th>
                    </tr>
                </thead>
            
                <tbody>
                    {equipo_titular_lista.map((indice) => {
                        if (indice.posicion === "Arquero" && indice.capitan === "No") {
                            return <tr key={indice.idFutbolista}>
                                <td>{indice.nombre}</td>
                                <td>{indice.apellido}</td>
                                <td>{indice.dorsal}</td>
                            </tr>
                        }
                        else if (indice.posicion === "Arquero" && indice.capitan === "Si") {
                            return <tr key={indice.idFutbolista}>
                                <td>{indice.nombre}</td>
                                <td>{indice.apellido}</td>
                                <td>Capitan</td>
                                <td>{indice.dorsal}</td>
                            </tr>
                        }
                    })}
                </tbody>
            </table>
        
            <table>
                <thead>
                    <tr>
                        <th>Defensor</th>
                    </tr>
                </thead>
            
                <tbody>
                    {equipo_titular_lista.map((indice) => {
                        if (indice.posicion === "Defensor" && indice.capitan === "No") {
                            return <tr key = {indice.idFutbolista}>
                                <td>{indice.nombre}</td>
                                <td>{indice.apellido}</td>
                                <td>{indice.dorsal}</td>
                            </tr>
                        }
                        else if (indice.posicion === "Defensor" && indice.capitan === "Si") {
                            return <tr key={indice.idFutbolista}>
                                <td>{indice.nombre}</td>
                                <td>{indice.apellido}</td>
                                <td>Capitan</td>
                                <td>{indice.dorsal}</td>
                            </tr>
                        }
                    })}
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>Medio</th>
                    </tr>
                </thead>
            
                <tbody>
                    {equipo_titular_lista.map((indice) => {
                        if (indice.posicion === "Medio" && indice.capitan === "No") {
                            return <tr key = {indice.idFutbolista}>
                                <td>{indice.nombre}</td>
                                <td>{indice.apellido}</td>
                                <td>{indice.dorsal}</td>
                            </tr>
                        }
                        else if (indice.posicion === "Medio" && indice.capitan === "Si") {
                            return <tr key={indice.idFutbolista}>
                                <td>{indice.nombre}</td>
                                <td>{indice.apellido}</td>
                                <td>Capitan</td>
                                <td>{indice.dorsal}</td>
                            </tr>
                        }
                    })}
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>Delantero</th>
                    </tr>
                </thead>

                <tbody>
                    {equipo_titular_lista.map((indice) => {
                        if (indice.posicion === "Delantero" && indice.capitan === "No") {
                            return <tr key = {indice.idFutbolista}>
                                <td>{indice.nombre}</td>
                                <td>{indice.apellido}</td>
                                <td>{indice.dorsal}</td>
                            </tr>
                        }
                        else if (indice.posicion === "Delantero" && indice.capitan === "Si") {
                            return <tr key={indice.idFutbolista}>
                                <td>{indice.nombre}</td>
                                <td>{indice.apellido}</td>
                                <td>Capitan</td>
                                <td>{indice.dorsal}</td>
                            </tr>
                        }
                    })}
                </tbody>
            </table>
        </div>
    )
}