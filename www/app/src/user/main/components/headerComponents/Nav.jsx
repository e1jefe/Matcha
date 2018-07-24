import React, { Component } from 'react';
import './header.css';
import '../../../fonts/fonts.css';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Badge } from 'antd';
import Badge from 'antd/lib/badge';
import 'antd/dist/antd.css';
import jwtDecode from 'jwt-decode';

class ForUnauthor extends Component{
    render() {
        return (
            <li className="item">
                <NavLink to="/signin">
                    <img className="userImage" src="http://i63.tinypic.com/259vjpk.png" alt="login"/>
                </NavLink>
            </li>
        )
    }
}

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: false,
            userLogin: ''
        };
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        localStorage.removeItem('token');
        this.setState({author: false});
        // this.context.router.replace('/home');
    }

    componentWillMount() {
        let token = localStorage.getItem('token');
        if (token !== null)
        {
            let user = jwtDecode(token);
            console.log(user);
            if (user.user_login !== '')
            {
                this.setState({
                    author: true,
                    userLogin: user.login
                });
            }
        }
    }

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
                            <ForUnauthor/>
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
                            <input type="checkbox" />
                            <span></span>
                            <span></span>
                            <span></span>
                            <ul id="menu">
                                <li className="item">
                                    <NavLink to="/myProfile">
                                        <p>{this.props.userLogin}</p>
                                        <img className="userImage" src="http://i64.tinypic.com/2nl4p5v.png" alt="myProfile"/>
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
                                    <NavLink to="/home" onClick={this.handleLogout.bind(this)}>
                                        <img className="notificationImage" src="http://i68.tinypic.com/2ly5q36.png" alt="logout"/>
                                    </NavLink>
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