import {Noticias} from "./inicio_noticias.js"

export default function Inicio() {
    return (
        <div>
            <div className="grid_contenedor">
                <div className="inicio_noticias">
                    <Noticias/>
                </div>
            </div>
        </div>
    )
}