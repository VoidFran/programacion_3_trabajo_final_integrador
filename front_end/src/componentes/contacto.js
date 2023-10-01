import {useState} from "react";

export default function Contacto() {
    const [formulario, setFormulario] = useState({ 
        titulo: "", 
        correo: "", 
        mensaje: ""
    })
  
    const sendEmail = async () => {
        let dataSend = {
        titulo: formulario.titulo,
        correo: formulario.correo,
        mensaje: formulario.mensaje,
        }

        if (formulario.titulo !== "" && formulario.correo !== "" && formulario.mensaje !== ""){
            alert("Correo enviado");

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

    return (
        <div>
            <form>
                <fieldset>
                    <div className="contacto_celda">
                        <label>Titulo:<br></br></label>
                        <input type="text" size="40" placeholder="Ingrese nombre" value={formulario.titulo} onChange={(evento) => setFormulario({ ...formulario, "titulo": evento.target.value })}></input>
                    </div>

                    <div className="contacto_celda">
                        <label>Correo:</label>
                        <input type="text" size="40" placeholder="Ingrese correo" value={formulario.correo} onChange={(evento) => setFormulario({ ...formulario, "correo": evento.target.value })}></input>
                    </div>

                    <div className="contacto_celda">
                        <label>Mensaje:</label>
                        <input type="text" size="40" placeholder="Ingrese mensaje" value={formulario.mensaje} onChange={(e) => setFormulario({ ...formulario, "mensaje": e.target.value })}></input>
                    </div>

                    <button className="contacto_boton" onClick={() => sendEmail()}>Enviar</button>
                </fieldset>
            </form>

            <h1>Contactanos</h1>
            <p>Monseñor Tavella 1424. Concordia-ER</p>
            <p>Tel: +54-345-4231400 </p>
            <p>Fax: +54-345-4231410</p>
            <p>E-mail: informes.fcad@uner.edu.ar</p>
        </div>
    )
}
