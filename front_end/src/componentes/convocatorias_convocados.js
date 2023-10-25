import {useState} from "react"
import {Link} from "react-router-dom"
import {useParams} from 'react-router-dom';
import Axios from "axios"

export default function Convocatoria() {
    let parametro = useParams()

    const [jugadores_lista, estado_jugadores_lista] = useState([])
    const [convocados_lista, estado_convocados_lista] = useState([])

    const [futbolistas]  = useState([])

    const convocar = (idFutbolista) => {
        if (convocados_lista.includes(idFutbolista)) {
            // Si ya está seleccionado, quito de la lista de convocados
            estado_convocados_lista(convocados_lista.filter((rowId) => rowId !== idFutbolista));
        } else {
            // Si no está seleccionada, agrego a la lista de convocados
            estado_convocados_lista([...convocados_lista, idFutbolista]);
        }        
    }

    const enviar_informacion = () => {
        if (convocados_lista !== "") {
            Axios.post(`http://localhost:3005/convocados_agregar/${parametro.id}`, {
                convocados_lista: convocados_lista,
            }).then(() => {
                alert("Convocado agregado");
            })
        }
        else {
            alert("Rival no agregado")
        }
        
    }

    function casteo(texto, valor) {
        if (texto === "pie_habil") {
            if (valor === 0) {
                return "Derecho"
            }
            else {
                return "Izquierdo"
            }
        }
        else if (texto === "posicion") {
            if (valor === 0) {
                return "Arquero"
            }
            else if (valor === 1) {
                return "Defensor"
            }
            else if (valor === 2) {
                return "Medio"
            }
            else if (valor === 3) {
                return "Delantero"
            }
        }
    }
    
    const jugadores = () => {
        Axios.get("http://localhost:3005/jugador").then((response) => {
            estado_jugadores_lista(response.data)
        })
        .catch(error => {
            alert("Error al cargar jugadores", error)
        })
    }

    jugadores()

    return (
        <div>{convocados_lista}
            <Link to="/convocatorias">
                <button className="boton_1">Convocatorias</button>
            </Link>

            <button onClick={enviar_informacion} className="boton_1">Convocar</button>

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
                            <td>{casteo("posicion", indice.posicion)}</td>
                            <td>{casteo("pie_habil", indice.pieHabil)}</td>
                            <td><input type="checkbox" checked={convocados_lista.includes(indice.idFutbolista)} onChange={() => convocar(indice.idFutbolista)} className="checkbox"></input></td>
                        </tr>
                    }))}
                </tbody>
            </table>
        </div>
    )
}