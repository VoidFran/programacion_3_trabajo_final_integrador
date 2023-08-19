import he from "he"

export function NoticiasTabla({ items }) {
    return (
        <div>
            {
                items.map((value, index) =>
                    <div key={index}>
                        <img style={{ width: '200px' }} src={value.urlToImage} alt = ""/>
                        <h2><a href={value.url}>{value.title}</a></h2>
                        <p style={{ padding: '1rem 0.5rem' }}>
                            {he.decode(value.description)}
                        </p>
                    </div>
                )
            }
        </div>
    )
}