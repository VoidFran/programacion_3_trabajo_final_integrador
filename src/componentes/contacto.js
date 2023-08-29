import {useState} from "react";
import "../estilos/contacto.css"
export default function Contacto() {
    const [formulario, setFormulario] = useState({ nombre: "", apellido: "" });

    return (
        <div>
            <form onSubmit={() => alert("Hola " + formulario.nombre + " " + formulario.apellido)}>
                <fieldset>
                    <div class="contacto_celda">
                        <label>Nombre:</label>
                        <input className="input-nombre" type="text" size="40" placeholder="Ingrese nombre" value={formulario.nombre} onChange={(e) => setFormulario({ ...formulario, "nombre": e.target.value })}></input>
                    </div>

                    <div class="contacto_celda">
                        <label>Apellido:</label>
                        <input className="input-nombre" type="text" size="40" placeholder="Ingrese apellido" value={formulario.apellido} onChange={(e) => setFormulario({ ...formulario, "apellido": e.target.value })}></input>
                    </div>

                    <button class="contacto_boton">Enviar</button>
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
