import {Link} from "react-router-dom";

export default function Menu() {
    return (
        <div>
            <ul>
                <li><Link to="">Inicio</Link></li>
                <li><Link to="jugadores">Jugadores</Link></li>
                <li><Link to="convocatoria">Convocatoria</Link></li>
                <li><Link to="equipo_titular">Equipo Titular</Link></li>
                <li><Link to="institucional">Institucional</Link></li>
                <li><Link to="contacto">Contacto</Link></li>
            </ul>
        </div>
    )
}