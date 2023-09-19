export default function Institucional() {
    return (
        <div>
            <div className="grid_contenedor">
                <div className="institucional_texto_1">
                    <ul>
                        <li><p>La Asociación del Fútbol Argentino AFA <br></br> es la más antigua de Sudamérica y la octava del mundo.</p></li>
                        <li><p>En 1912, la AFA se convirtió en el primer <br></br>miembro de la FIFA en América y desde entonces <br></br> ha liderado el desarrollo del fútbol en el continente.</p></li>
                        <li><p>La AFA ha sido reconocida por su dirigencia <br></br> adelantada y visionaria, dejando una huella <br></br> imborrable en el fútbol mundial.</p></li>
                    </ul>
                </div>

                <div className="institucional_imagenes">
                    <Fotos imagen="institucional_1"/>
                    <Fotos imagen="institucional_2"/>
                    <Fotos imagen="institucional_3"/>
                </div>
            </div>
        </div>
    )
}

function Fotos(props){
    return(        
     <img className= "imagen-afa" alt = "" src={require(`../imagenes/${props.imagen}.jpg`)}/>
    );
}