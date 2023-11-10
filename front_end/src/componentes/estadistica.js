import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext} from 'react';
import { UserContext } from './UserContext';

export default function Estadistica() {
  const [jugadorCount, setJugadorCount] = useState(0);
  const [convocatoriaCount, setConvocatoriaCount] = useState(0);

  const { userData } = useContext(UserContext);

  useEffect(() => {
    console.log("userdata estad",userData)
    // Realiza la solicitud GET y cuenta los jugadores utilizando Axios
    axios.get('http://localhost:3005/api/estadistica/buscarFub', {
      headers:{
          Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
      }})
      .then(response => {
        const count = response.data.length; // Cuenta los jugadores
        setJugadorCount(count);
      })
      .catch(error => {
        console.error('Error al obtener datos de jugadores:', error);
      });
  }, [userData]);

  useEffect(() => {
    // Realiza la solicitud GET y cuenta las convocatorias utilizando Axios
    axios.get('http://localhost:3005/api/estadistica/buscarConv', {
      headers:{
          Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
      }})
      .then(response => {
        const count = response.data.length; // Cuenta las convocatorias
        setConvocatoriaCount(count);
      })
      .catch(error => {
        console.error('Error al obtener datos de convocatorias:', error);
      });
  }, [userData]);

  const [nextConvocationDate, setNextConvocationDate] = useState(null);

  useEffect(() => {
    // Realiza una solicitud GET para obtener las convocatorias
    axios.get('http://localhost:3005/api/estadistica/buscarConv', {
      headers:{
          Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
      }})
      .then(response => {
        // Supongamos que la respuesta es un array de objetos con propiedades "fecha"
        const convocatorias = response.data;

        // Filtra las convocatorias futuras
        const futureConvocations = convocatorias.filter(convocatoria => new Date(convocatoria.fecha) > new Date());

        // Ordena las convocatorias futuras por fecha ascendente
        futureConvocations.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

        if (futureConvocations.length > 0) {
          // Obtiene la fecha de la próxima convocatoria
          const nextDate = new Date(futureConvocations[0].fecha);
          setNextConvocationDate(nextDate);
        } else {
          // No hay convocatorias futuras
          setNextConvocationDate(null);
        }
      })
      .catch(error => {
        console.error('Error al obtener las convocatorias:', error);
      });
  }, [userData]);

  // Función para formatear la fecha en "dd/mm/aaaa"
  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  };

  return (
    <div>
      <h2>¡Bienvenido Chiqui!</h2>
      <h1>Estadísticas de Scaloneta App</h1>

      <p>Total de Jugadores Registrados: {jugadorCount}</p>
      <p>Total de Convocatorias: {convocatoriaCount}</p>
      <div>
        {nextConvocationDate ? (
          <p>Fecha del próximo partido: {formatDate(nextConvocationDate)}</p>
        ) : (
          <p>¡No hay fechas proximas!.</p>
        )}
      </div>
    </div>
  );
}
