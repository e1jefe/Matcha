import React, { Component } from 'react';
import './header.css';
import '../../../fonts/fonts.css';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'

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
                            
                            <NavLink to="/home" className="logo">
                                Matcha
                            </NavLink>

                        </li>
                        <div className="menu-right no-autho">
                            <li className="item">
                                <NavLink to="/login" onClick={this.toSigninForm}activeClassName="linkActive">
                                    <img className="userImage" src="http://i63.tinypic.com/259vjpk.png" alt="login"/>
                                </NavLink>
                            </li>
                        </div>
                        <div className="clearfix"></div>
                    </ul>
                </nav>
            )
        }
        else {
            return(
                <nav className="menu" role="navigation">
                    <ul>
                        <li className="item">
                            <a href="/home" className="logo">
                                Matcha
                            </a>
                        </li>
                        <div className="menu-right" id="menuToggle">

                            {/* A fake / hidden checkbox is used as click reciever,
                            so you can use the :checked selector on it. */}
                            <input type="checkbox" />
                            
                            {/* Some spans to act as a hamburger. */}
                            <span></span>
                            <span></span>
                            <span></span>
                        
                           {/* Too bad the menu has to be inside of the button
                            but hey, it's pure CSS magic.*/} 
                            <ul id="menu">
                                <NavLink to="/myProfile">
                                    <li className="item">
                                        <img className="userImage" src="http://i64.tinypic.com/2nl4p5v.png" alt="myProfile"/>
                                    </li>
                                </NavLink>
                                <NavLink to="/msg">
                                    <li className="item">
                                        <img className="shopaImage" src="http://i66.tinypic.com/xnw035.png" alt="messagies"/>
                                    </li>
                                </NavLink>
                                <NavLink to="/notification">
                                    <li className="item">
                                        <img className="notificationImage" src="http://i66.tinypic.com/qod01l.png" alt="notifications"/>
                                    </li>
                                </NavLink>
                                <NavLink to="/logout" onClick={this.handleLogout.bind(this)}>
                                    <li className="item">
                                        <img className="notificationImage" src="http://i68.tinypic.com/2ly5q36.png" alt="logout"/>
                                    </li>
                                </NavLink>
                            </ul>
                        </div>
                    </ul>
                </nav>                            
            )
        }
    }
}

export default Nav;