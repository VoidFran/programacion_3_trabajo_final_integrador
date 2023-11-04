import {useState} from "react"
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import {useParams} from 'react-router-dom'
import axios from "axios"

export default function Convocados() {
    const {idConvocatoria} = useParams();

    const [convocados_lista, estado_convocados_lista] = useState([])
    const [titulares_lista, estado_titulares_lista] = useState([])
    const [arquero, estado_arquero] = useState([])
    const [capitan, estado_capitan] = useState([])
    const [dorsal, estado_dorsal] = useState("0")

    const navigate = useNavigate()

    const titulares = (idFutbolistaConvocatoria, posicion) => {
        if (titulares_lista.includes(idFutbolistaConvocatoria)) {
            // Si ya está seleccionado, quito de la lista de convocados
            estado_titulares_lista(titulares_lista.filter((rowId) => rowId !== idFutbolistaConvocatoria));
            arquero.splice([0], 1)
        }
        else {
            if (posicion === "Arquero") {
                estado_arquero([...arquero, posicion])
            }
            if (titulares_lista.length <= 10) {
                // Si no está seleccionada, agrego a la lista de convocados
                estado_titulares_lista([...titulares_lista, idFutbolistaConvocatoria]);
            }
        }
    }

    const _capitan = (idFutbolistaConvocatoria) => {
        if (capitan.includes(idFutbolistaConvocatoria)) {
            // Si ya está seleccionado, quito de la lista de convocados
            estado_capitan(capitan.filter((rowId) => rowId !== idFutbolistaConvocatoria))
        }
        else {
            // Si no está seleccionada, agrego a la lista de convocados
            estado_capitan([...capitan, idFutbolistaConvocatoria])
        }
    }
    const _dorsal = (idFutbolistaConvocatoria) => {
        if (dorsal !== "") {
            alert("Dorsal agregado")
            axios.put(`http://localhost:3005/api/convocados/dorsal/${idFutbolistaConvocatoria}`, {
                dorsal: dorsal,
            })
            estado_dorsal("0")
        }
        else {
            alert("Dorsal no agregado")
        }
    }

    const enviar_informacion = () => {
        if (titulares_lista.length === 11 && arquero.length === 1 && capitan.length === 1) {
            alert("Titulares agregados");
            axios.put("http://localhost:3005/api/convocados/editar", {
                idConvocatoria: idConvocatoria,
                titulares_lista: titulares_lista,
                capitan: capitan,
            }).then(() => {
            })
            navigate("/convocatorias")
        }
        else if (titulares_lista.length <= 11 && arquero.length > 1 && capitan.length <= 1) {
            alert("Titulares no agregados, se necesita solo 1 arquero")
        }
        else if (titulares_lista.length <= 11 && capitan.length > 1 && arquero.length <= 1) {
            alert("Titulares no agregados, se necesita solo 1 capitan")
        }
        else if (titulares_lista.length <= 11 && arquero.length > 1 && capitan.length > 1) {
            alert("Titulares no agregados, se necesita solo 1 arquero y capitan")
        }
        else if (titulares_lista.length <= 11 && arquero.length <= 0) {
            alert("Titulares no agregados, falta 1 arquero")
        }
        else if (titulares_lista.length <= 11 && capitan.length <= 0) {
            alert("Titulares no agregados, falta 1 capitan")
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
                            <th>{indice.idFutbolista}</th><td className="futbolista_imagen"><img alt="error" src={`http://localhost:3005/imagenes/` + indice.foto}/></td>
                            <td>{indice.nombre}</td>
                            <td>{indice.apellido}</td>
                            <td>{indice.posicion}</td>
                            <td>{indice.pieHabil}</td>
                            <td className="convocados"><input type="tel" maxlength="2" placeholder={indice.dorsal} onChange={(evento)=>{estado_dorsal(evento.target.value)}}></input><button className="boton_4" onClick={()=>{_dorsal(indice.idFutbolistaConvocatoria)}}>Agregar</button></td>
                            <td><input type="checkbox" className="checkbox" checked={capitan.includes(indice.idFutbolistaConvocatoria)} onChange={() => _capitan(indice.idFutbolistaConvocatoria)}></input></td>
                            <td><input type="checkbox" className="checkbox" checked={titulares_lista.includes(indice.idFutbolistaConvocatoria)} onChange={() => titulares(indice.idFutbolistaConvocatoria, indice.posicion)}></input></td>
                        </tr>
                    }))}
                </tbody>
            </table>
        </div>
    )
}