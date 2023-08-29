import "../estilos/institucional.css"

function Fotos(props){
    return(        
     <img className= "imagen-afa"
     src={require(`../imagenes/${props.imagen}.jpg`)}/>
    );
    
}


export default function Institucional() {
    return (
        <div>
            <div class="grid_contenedor">
                <div class="institucional_texto_1">
                    <a> La Asociación del Fútbol Argentino AFA es la más antigua de Sudamérica y 
                        la octava del mundo. En 1912, la AFA se convirtió en el primer miembro de la FIFA en América y 
                        desde entonces ha liderado el desarrollo del fútbol en el continente. La AFA ha sido reconocida por su 
                        dirigencia adelantada y visionaria, dejando una huella imborrable en el fútbol mundial La AFA es el organismo líder del fútbol en Argentina, cuya labor se 
                        extiende desde la organización de los campeonatos nacionales hasta la gestión de los equipos nacionales y la regulación del deporte en el país. La AFA trabaja 
                        incansablemente para promover el fútbol argentino y defender su integridad, en línea con los más altos estándares internacionales.</a>
                </div>
            </div>

            <div class="grid_contenedor">
                <Fotos imagen="institucional1"/>
                <Fotos imagen="institucional2"/>
                <Fotos imagen="institucional3"/>
            </div>
        </div>
    )
    
}