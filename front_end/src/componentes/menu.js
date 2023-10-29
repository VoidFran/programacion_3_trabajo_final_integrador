import {Link} from "react-router-dom"

export default function Menu() {
    return (
        <div className="menu">
            <ul>
                <li><Link to="">Inicio</Link></li>
                <li><Link to="futbolistas">Futbolistas</Link></li>
                <li><Link to="convocatorias">Convocatorias</Link></li>
                <li><Link to="equipo_titular">Equipo Titular</Link></li>
                <li><Link to="institucional">Institucional</Link></li>
                <li><Link to="contacto">Contacto</Link></li>
            </ul>
        </div>
    )
}