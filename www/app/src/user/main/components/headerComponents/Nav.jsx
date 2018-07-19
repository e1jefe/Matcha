import React, { Component } from 'react';
import './header.css';
import '../../../fonts/fonts.css';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Badge } from 'antd';
import Badge from 'antd/lib/badge';
import 'antd/dist/antd.css';
import jwtDecode from 'jwt-decode';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: false,
            userLogin: ''
        };
    }

    componentWillMount() {
        let token;
        localStorage.getItem('token') !== null ? token = localStorage.getItem('token') : token = '';
        // let token = localStorage.getItem('token');
        if (token !== '')
        {
            let user = jwtDecode(token);
            console.log(user);
            if (user.login !== '')
            {
                this.setState({
                    author: true,
                    userLogin: user.login
                });
            }
        }
    }


    /*Somewhere here should be func which changes author for true
    if the user is logged in or false when he logged out */

    render() {
        if (this.state.author === false
        ) {
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
                                {/*<NavLink to="/login" onClick={this.SigninForm}activeClassName="linkActive">*/}
                                <NavLink to="/signin">
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
                            <NavLink to="/home" className="logo">
                                Matcha
                            </NavLink>
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
                                <li className="item">
                                    <NavLink to="/myProfile">
                                        <p>{this.state.userLogin}</p>
                                        {/*<img className="userImage" src="http://i64.tinypic.com/2nl4p5v.png" alt="myProfile"/>*/}

                                    </NavLink>
                                </li>
                                <li className="item">
                                    <NavLink to="/msg">
                                        <Badge count={42}>
                                            <img className="shopaImage" src="http://i66.tinypic.com/xnw035.png" alt="messagies"/>
                                        </Badge>
                                    </NavLink>
                                </li>
                                <li className="item">
                                    <NavLink to="/notification">
                                        <Badge count={7}>
                                        <img className="notificationImage" src="http://i66.tinypic.com/qod01l.png" alt="notifications"/>
                                        </Badge>
                                    </NavLink>
                                </li>
                                <li className="item">
                                    {/*<NavLink to="/logout" onClick={this.handleLogout.bind(this)}>*/}
                                        {/*<img className="notificationImage" src="http://i68.tinypic.com/2ly5q36.png" alt="logout"/>*/}
                                    {/*</NavLink>*/}
                                </li>
                            </ul>
                        </div>
                    </ul>
                </nav>                            
            )
        }
    }
}

export default Nav;