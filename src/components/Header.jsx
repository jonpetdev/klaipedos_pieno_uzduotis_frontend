import './Header.css';
import logo from "../assets/logo2.png";

const Header=()=>{

    return(
        <div className={"header-container"}>
            <div className="logo-container">
                <img src={logo} alt="Logo" className="footer-logo"/>
            </div>
        </div>
    )
}
export default Header;