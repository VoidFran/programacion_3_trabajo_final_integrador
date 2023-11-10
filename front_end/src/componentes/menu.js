import {Link} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';

export default function Menu() {
      return (
        <div className="menu">
            <ul>
                <li><Link to="">Inicio</Link></li>
                <li><Link to="institucional">Institucional</Link></li>
                <li><Link to="contacto">Contacto</Link></li>
            </ul>

            <ul>
                <li className="login-link">
                    <Link to="login">Iniciar Sesión</Link>
                </li>
            </ul>
        </div>
    )
}