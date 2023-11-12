import {Link} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import { UserContext } from './UserContext';
import { useContext } from 'react';
import { ProtectedElement } from './ProtectedElement';

export default function Menu() {

    const { userData, setUserData } = useContext(UserContext);

    const handleCerrar = async () => {
        setUserData(null)
    }

    return (
        <div className="menu">
            <ul>
                <li><Link to="">Inicio</Link></li>
                <li><Link to="institucional">Institucional</Link></li>
                <li><Link to="contacto">Contacto</Link></li>
            
                <ProtectedElement mustBeEntrenador={true}>
                    <li><Link to="../futbolistas">Futbolistas</Link></li>
                    <li><Link to="../convocatorias">Convocatorias</Link></li>
                    <li><Link to="../equipo_titular">Equipo Titular</Link></li>
                </ProtectedElement>
                <ProtectedElement mustBePresidente={true}>
                    <li><Link to="../estadistica">Estadistica</Link></li>
                </ProtectedElement>
            </ul>

            <ul>{ userData ? 
                <li className="login-link">
                    <Link to="login" onClick={handleCerrar}>Cerrar Sesión</Link>
                </li>
            :
                <li className="login-link">
                    <Link to="login">Iniciar Sesión</Link>
                </li>
            }
            </ul>
        </div>
    )
}