import React, { Component } from 'react';
import './header.css'
import '../../../fonts/fonts.css'

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {author: false};
        //this.handleChange = this.handleChange.bind(this) - some func call;
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleChange(event) {
    //     this.setState({value: event.target.value});
    // }

    /*Somewhere here should be func which changes author for true
    if the user is logged in or false when he logged out */

    render() {
        if (this.state.author === false) {
            return(
                <nav className="menu">
                    <ul>
                        <li className="item">
                            <a href="/home" className="logo">
                                Purrfect Matcha
                            </a>
                        </li>
                        <div className="menu-right">
                            <li className="item">
                                <a href="/login">
                                    <img className="userImage" src="http://i63.tinypic.com/259vjpk.png" alt="login"/>
                                </a>
                            </li>
                        </div>
                        <div className="clearfix"></div>
                    </ul>
                </nav>
            )
        }
        else {
            return(
                <nav className="menu">
                    <ul>
                        <li className="item">
                            <a href="/home" className="logo">
                                Matcha
                            </a>
                        </li>
                        <div className="menu-right">
                            <li className="item">
                                <a href="/myProfile">
                                    <img className="userImage" src="http://i64.tinypic.com/2nl4p5v.png" alt="myProfile"/>
                                </a>
                            </li>
                            <li className="item">
                                <a href="/msg">
                                    <img className="shopaImage" src="http://i66.tinypic.com/xnw035.png" alt="messagies"/>
                                </a>
                            </li>
                            <li className="item">
                                <a href="/notification">
                                    <img className="notificationImage" src="http://i66.tinypic.com/qod01l.png" alt="notifications"/>
                                </a>
                            </li>
                            <li className="item">
                                <a href="/logout">
                                    <img className="notificationImage" src="http://i68.tinypic.com/2ly5q36.png" alt="logout"/>
                                </a>
                            </li>
                        </div>
                        <div className="clearfix"></div>
                    </ul>
                </nav>
            )
        }
    }
}

export default Nav;