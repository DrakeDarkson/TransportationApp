import "./styles.css";

const username = "Usuário 1"

function Header() {
    return (
        <header className="pageHeader">
            <h3 className="appNameHeader"> Skylines </h3>
            <div className="userImageHeader"></div>
            <h3 className="userNameHeader"> {username} </h3>
        </header>
    )
}

export default Header