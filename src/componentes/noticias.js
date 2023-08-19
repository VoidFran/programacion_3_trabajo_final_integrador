import { useEffect, useState } from "react"
import { NoticiasTabla } from "../componentes/noticias_tabla.js"

export function Noticias() {
    const [tema, setTema] = useState("");
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        if (tema) {
            const apiKey= "1b30c8a8cfc941faab7715052e3aa5cb";

            const url = `https://newsapi.org/v2/everything?q=${tema}&sortBy=publishedAt&apiKey=${apiKey}&language=es`;
            
            fetch(url).then(res => {
                res.json().then((data) => {
                    setNoticias(data.articles)
                })
            })
        } else {
            setNoticias([])
        }
    }, [tema])

    return (
        <div>
            <form>
                <label>Tema: </label>
                <select onChange={(e) => setTema(e.target.value)}>
                    <option value="">Seleccione una opción</option>
                    <option value="weather">Clima</option>
                    <option value="football">Fútbol</option>
                    <option value="basket">Basket</option>
                    <option value="tennis">Tennis</option>
                </select>
            </form>

            {noticias.length ? <NoticiasTabla items={noticias} />: ""}
        </div>
    )
}