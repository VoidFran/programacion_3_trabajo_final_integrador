import {useState} from "react";

export default function Contacto() {
    const [titulo, colocar_titulo] = useState("");
    const [correo, colocar_correo] = useState("");
    const [mensaje, colocar_mensaje] = useState("");
  
    const sendEmail = async () => {
        let dataSend = {
        titulo: titulo,
        correo: correo,
        mensaje: mensaje,
        }

        if (titulo !== "" && correo !== "" && mensaje !== ""){
            alert("Correo enviado");
            limpiar()

            await fetch(`http://localhost:3005/contacto`, {
                method: "POST",
                body: JSON.stringify(dataSend),
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                }
            })
        }
        else {
            alert("Correo no enviado");
        }
    }

    const limpiar = () => {
        colocar_titulo("")
        colocar_correo("")
        colocar_mensaje("")
      }

    return (
        <div>
            <div className="contacto_celda">
                <label>Titulo:</label><input type="text" placeholder="Ingrese titulo" value={titulo} onChange={(evento) => {colocar_titulo(evento.target.value)}}></input>
            </div>

            <div className="contacto_celda">
                <label>Correo:</label><input type="text" placeholder="Ingrese correo" value={correo} onChange={(evento) => {colocar_correo(evento.target.value)}}></input>
            </div>

            <div className="contacto_celda">
                <label>Mensaje:</label><input type="text"placeholder="Ingrese mensaje" value={mensaje} onChange={(evento) => {colocar_mensaje(evento.target.value)}}></input>
            </div>

            <button className="contacto_boton" onClick={() => sendEmail()}>Enviar</button>

            <h1>Contactanos</h1>
            <p>Monseñor Tavella 1424. Concordia-ER</p>
            <p>Tel: +54-345-4231400 </p>
            <p>Fax: +54-345-4231410</p>
            <p>E-mail: informes.fcad@uner.edu.ar</p>
        </div>
    )
}
