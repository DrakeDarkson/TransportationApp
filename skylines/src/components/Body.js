import "../css/reset.css"
import "../css/index.css"

function Body() {
    return (
        <body className="pageBody">
            <div>
                <input className="inputLocation" type="text" placeholder="Origem"></input><br/>
                <input className="inputLocation" type="text" placeholder="Destino"></input>
            </div>
        </body>
    )
}

export default Body