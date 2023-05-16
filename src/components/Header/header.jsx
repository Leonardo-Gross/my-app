import React, {Component} from "react";
import logo from "../../Images/money.png"
import "../Header/header.css"


class Header extends Component {
    render() {
        return(
            <div className='header-container'>
                <div className='header'>
                    <img className='header-image' src={logo} alt="cabeçalho imagem" />
                    <span className='header-title'>App Envio de Dinheiro</span>
                </div>
            </div>
        );
    }
}


export default Header;