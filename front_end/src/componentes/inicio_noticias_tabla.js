import he from "he"

export function NoticiasTabla({items}) {
    return (
        <div>
            {
                items.map((value, index) =>
                    <div className="inicio_noticia">
                        <img style={{ width: "300px" }} src={value.urlToImage} alt = ""/>
                        <h2><a href={value.url} target="_blank" rel="noopener noreferrer">{value.title} </a></h2>
                        <p style={{ padding: '10px' }}>
                            {he.decode(value.description)}
                        </p>
                    </div>
                )
            }
        </div>
    )
}