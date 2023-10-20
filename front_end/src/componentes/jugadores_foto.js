import {Link} from "react-router-dom"

export default function Convocatoria() {
    
    function guardar(nombre){
        return (
            localStorage.setItem("jugador", nombre)
        )
    }

    return (
        <div>                
            <div className="jugadores_foto">
                <Link to="/jugadores">
                    <img onClick={()=>{guardar("jugador_1.png")}} alt="" src={require(`../imagenes/jugador_1.png`)}/>
                    <img onClick={()=>{guardar("jugador_2.png")}} alt="" src={require(`../imagenes/jugador_2.png`)}/>
                    <img onClick={()=>{guardar("jugador_3.png")}} alt="" src={require(`../imagenes/jugador_3.png`)}/>
                    <img onClick={()=>{guardar("jugador_4.png")}} alt="" src={require(`../imagenes/jugador_4.png`)}/>
                    <img onClick={()=>{guardar("jugador_5.png")}} alt="" src={require(`../imagenes/jugador_5.png`)}/>
                    <img onClick={()=>{guardar("jugador_6.png")}} alt="" src={require(`../imagenes/jugador_6.png`)}/>
                    <img onClick={()=>{guardar("jugador_7.png")}} alt="" src={require(`../imagenes/jugador_7.png`)}/>
                    <img onClick={()=>{guardar("jugador_8.png")}} alt="" src={require(`../imagenes/jugador_8.png`)}/>
                </Link>
            </div>
        </div>
    )
}