import {useState} from "react"
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import {useParams} from 'react-router-dom'
import axios from "axios"

export default function Convocados() {
    const {idConvocatoria} = useParams();

    const [convocados_lista, estado_convocados_lista] = useState([])
    const [titulares_lista, estado_titulares_lista] = useState([])

    const navigate = useNavigate()

    const titulares = (idFutbolistaConvocatoria) => {
        if (titulares_lista.includes(idFutbolistaConvocatoria)) {
            // Si ya está seleccionado, quito de la lista de convocados
            estado_titulares_lista(titulares_lista.filter((rowId) => rowId !== idFutbolistaConvocatoria));
        } else {
            // Si no está seleccionada, agrego a la lista de convocados
            estado_titulares_lista([...titulares_lista, idFutbolistaConvocatoria]);
        }        
    }

    const enviar_informacion = () => {
        if (titulares_lista.length === 11) {
            alert("Convocados agregados");
            axios.put("http://localhost:3005/api/convocados/editar", {
                titulares_lista: titulares_lista,
            }).then(() => {

            })
            navigate("/convocatorias")
        }
        else {
            alert("Titulares no agregados, se necesitan 11, actual = " + titulares_lista.length)
        }
    }

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
            <button onClick={enviar_informacion} className="boton_1">Confirmar</button>

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
                            <td>{indice.idFutbolistaConvocatoria}</td>
                            <td><input type="radio" className="checkbox"></input></td>
                            <td><input type="checkbox" className="checkbox" checked={titulares_lista.includes(indice.idFutbolistaConvocatoria)} onChange={() => titulares(indice.idFutbolistaConvocatoria)}></input></td>
                        </tr>
                    }))}
                </tbody>
            </table>
        </div>
    )
}