import React, { useState, useContext } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import {useNavigate} from "react-router-dom"
import { UserContext } from './UserContext';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate()
  const {setUserData} = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!correo || !clave) {
      setMensaje('Por favor, complete ambos campos.');
      return;
    }
  
    const data = {
      correo: correo,
      clave: clave
    };
  
    // Obtiene el token del localStorage
    const token = localStorage.getItem('token');
  
    // Agrega el token al encabezado de autorización
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  
    axios.post('http://localhost:3005/api/usuario', data, config)
      .then(response => {
        navigate("/dashboard")
        console.log(response.data)
        setUserData({user: response.data.usuario, token: response.data.token})
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          setMensaje('Inicio de sesión exitoso');
          
        } else {
          setMensaje(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
        setMensaje('Error al iniciar sesión');
      });
  };
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Iniciar Sesión</h2>
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={(e) => { setCorreo(e.target.value) }}
                    type="text"
                    className="form-control"
                    placeholder="Ingrese su correo:"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="clave">Clave</label>
                  <input
                    onChange={(e) => { setClave(e.target.value) }}
                    type="password"
                    className="form-control"
                    placeholder="Ingrese su clave:"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleLogin}
                >
                  Ingresar
                </button>
              </form>
              <div className="message mt-3">
                {mensaje && <p>{mensaje}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
