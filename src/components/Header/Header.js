import React, {Component} from 'react';
import logo from '../../static/images/logo.png';
import '../../static/styles.css';

class Header extends Component {
    render() {
        return (
            <div className="container">
                <header>
                    <div style={{fontFamily: "Roboto-Bold"}}>
                        <img src={logo} alt="Logo" /> Restros
                        <button className="btn login">Login</button>
                    </div>                    
                </header>
            </div>
        )
    }
}

export default Header;