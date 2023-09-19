import {useState} from "react"
import {NoticiasTabla} from "./inicio_noticias_tabla.js"

export function Noticias() {
    const [tema] = useState("futbol")
    const [noticias, colocar_noticias] = useState([])
    const [valor, colocar_valor] = useState(4)

    const apiKey = "1b30c8a8cfc941faab7715052e3aa5cb"

    const url = `https://newsapi.org/v2/everything?q=${tema}&sortBy=publishedAt&pageSize=${valor}&apiKey=${apiKey}&language=es`

    fetch(url).then(res => {
        res.json().then((datos) => {
            colocar_noticias(datos.articles)
        })
    })
    .catch(error => {
        alert("Error al cargar noticias", error)
    })

    return (
        <div>
            {noticias.length ? <NoticiasTabla items={noticias} />: ""}

            <button onClick={() => colocar_valor(valor + 4)}>Mostrar mas resultados</button>
        </div>
    )
}