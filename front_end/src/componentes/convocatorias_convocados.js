import {useState} from "react"
import {Link} from "react-router-dom"
import {useParams} from 'react-router-dom'
import axios from "axios"

export default function Convocados() {
    const {idConvocatoria} = useParams();

    const [convocados_lista, estado_convocados_lista] = useState([])
    
    const convocados = () => {
        axios.get(`http://localhost:3005/api/convocados/buscar/${idConvocatoria}`).then((response) => {
            estado_convocados_lista(response.data)
        })
        .catch(error => {
            alert("Error al cargar jugadores", error)
        })
    }

    convocados()

    return (
        <div>
            <Link to="/convocatorias">
                <button className="boton_1">Volver</button>
            </Link>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Foto</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Posicion</th>
                        <th>Pie Habil</th>
                        <th>Dorsal</th>
                        <th>Capitán</th>
                        <th>Titular</th>
                    </tr>
                </thead>

                <tbody>
                    {(convocados_lista.map((indice) => {
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
                </tbody>
            </table>
        </div>
    )
}