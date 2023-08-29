import {useEffect, useState } from "react"
import {NoticiasTabla} from "../componentes/noticias_tabla.js"

export function Noticias() {
    const [tema] = useState("");
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        if (tema) {
            const apiKey= "1b30c8a8cfc941faab7715052e3aa5cb";
            const tema= "football";

            const url = `https://newsapi.org/v2/everything?q=${tema}&sortBy=publishedAt&pageSize=6&apiKey=${apiKey}&language=es`;

            fetch(url).then(res => {
                res.json().then((data) => {
                    setNoticias(data.articles);
                });
            });
        } else {
            setNoticias([]);
        }
    }, [tema]);





    return (
        <div>
            {noticias.length ? <NoticiasTabla items={noticias} />: ""}
        </div>
    )
}