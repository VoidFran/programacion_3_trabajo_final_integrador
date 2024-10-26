import {Link} from "react-router-dom"
import { ProtectedElement } from './ProtectedElement';
import { UserProvider } from './UserContext';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';

export default function Dashboard() {

    const { userData, setUserData } = useContext(UserContext);

    const getJugador = () => {
        console.log("usedata11: ", userData.user)
        if(userData.user.tipoUsuario === 0){
            alert(userData.user)
        }
        if(userData.user.tipoUsuario === 1){
            console.log(userData.user)
        }
      };
    
      return (
        <div className="menu">
            <ul>
                <ProtectedElement mustBeEntrenador={true}>
                    <h2>¡Bienvenido {userData.user.nombre}!</h2>
                    <li><Link to="../futbolistas">Futbolistas</Link></li>
                    <li><Link to="../convocatorias">Convocatorias</Link></li>
                    <li><Link to="../equipo_titular">Equipo Titular</Link></li>
                </ProtectedElement>
                <ProtectedElement mustBePresidente={true}>
                    <h2>¡Bienvenido {userData.user.nombre}!</h2>
                    <li><Link to="../estadistica">Estadistica</Link></li>
                </ProtectedElement>
            </ul>
        </div>
    )
}