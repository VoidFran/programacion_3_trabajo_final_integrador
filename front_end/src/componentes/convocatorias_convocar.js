import {useState} from "react"
import {Link} from "react-router-dom"
import {useParams} from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import axios from "axios"

export default function Convocados() {
    const {idConvocatoria} = useParams()

    const [jugadores_lista, estado_jugadores_lista] = useState([])
    const [convocados_lista, estado_convocados_lista] = useState([])

    const navigate = useNavigate()

    const convocar = (idFutbolista) => {
        if (convocados_lista.includes(idFutbolista)) {
            // Si ya está seleccionado, quito de la lista de convocados
            estado_convocados_lista(convocados_lista.filter((rowId) => rowId !== idFutbolista));
        }
        else {
            if (convocados_lista.length <= 25) {
                // Si no está seleccionada, agrego a la lista de convocados
                estado_convocados_lista([...convocados_lista, idFutbolista]);
            }
        }        
    }

    const enviar_informacion = () => {
        if (convocados_lista.length === 26) {
            alert("Convocados agregados");
            axios.post(`http://localhost:3005/api/convocar/agregar`, {
                idConvocatoria: idConvocatoria,
                convocados_lista: convocados_lista,
                fecha: fecha_buscar(),
            }).then(() => {

            })
            navigate("/convocatorias")
        }
        else {
            alert("Convocados no agregados, se necesitan 26, actual = " + convocados_lista.length)
        }
    }

    function fecha_buscar() {
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        
        return date
    }

    const jugadores = () => {
        axios.get("http://localhost:3005/api/futbolistas/buscar").then((response) => {
            estado_jugadores_lista(response.data)
        })
        .catch(error => {
            alert("Error al cargar jugadores", error)
        })
    }

    jugadores()

    return (
        <div>
            <button onClick={enviar_informacion} className="boton_1">Convocar</button>

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
                        <th>Convocar</th>
                    </tr>
                </thead>

                <tbody>
                    {(jugadores_lista.map((indice) => {
                        return <tr key = {indice.idFutbolista}>
                            <th>{indice.idFutbolista}</th>
                            <td><img alt = "" src={require(`../imagenes/${indice.foto}`)}/></td>
                            <td>{indice.nombre}</td>
                            <td>{indice.apellido}</td>
                            <td>{indice.posicion}</td>
                            <td>{indice.pieHabil}</td>
                            <td><input type="checkbox" className="checkbox" checked={convocados_lista.includes(indice.idFutbolista)} onChange={() => convocar(indice.idFutbolista)}></input></td>
                        </tr>
                    }))}
                </tbody>
            </table>
        </div>
    )
}