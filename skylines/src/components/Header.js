import "../css/reset.css"
import "../css/index.css"

const username = "Usuário 1"

function Header() {
    const handleCircleClick = () => {
        console.log("Círculo clicado!");
    };

    return (
        <header className="pageHeader">
            <div className="userImage" onClick={handleCircleClick}></div>
            <h3 className="userHeader"> {username} </h3>
        </header>
    )
}

export default Header