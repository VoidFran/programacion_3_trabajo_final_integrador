import he from "he"
import "../estilos/inicio.css"

export function NoticiasTabla({ items }) {
    return (
        <div>
            {
                items.map((value, index) =>
                    <div key={index}>
                        <img className="imagenes-noticias" style={{ width: '300px' }} src={value.urlToImage} alt = ""/>
                        <h2><a className="titulos-noticias" href={value.url}>{value.title}</a></h2>
                        <p className="descripcion-noticias" style={{ padding: '1rem 0.5rem' }}>
                            {he.decode(value.description)}
                        </p>
                    </div>
                )
            }
        </div>
    )
}