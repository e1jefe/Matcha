import React, { Component } from 'react';
import './header.css';
import '../../../fonts/fonts.css';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'antd';
import Badge from 'antd/lib/badge';
import 'antd/dist/antd.css';
import jwtDecode from 'jwt-decode';
import history from "../../../history/history";
import { PostData } from '../PostData';

// class Menu1 extends Component{
//     constructor(props) {
//         super(props);
//         let notifArray = localStorage.getItem('notification');
//         if (notifArray != null)
//         {
//             if (notifArray.includes('}{')){
//                 this.state = {
//                     notifications: notifArray.split('}{')
//                 };
//             }
//             else{
//                 this.state = {
//                     notifications: notifArray
//                 }
//             }
//         }
//     }

//     render(){
//         return(
//             <Menu>
//                 {this.state.notifications.map( (notification, i) => 
//                     <Menu.Item key={i}>
//                       <a href="http://www.alipay.com/">{notification}</a>
//                     </Menu.Item>
//                 )}
//             </Menu>
//         )
//     }
// }



class ForUnauthor extends Component{
    render() {
        return (
            <li className="item">
                <NavLink to="/signin" title="log in">
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
        this.handleNotif = this.handleNotif.bind(this);
    }

    handleLogout() {
        localStorage.removeItem('token');
        this.setState({author: false});
        PostData('auth/logOut', {uLogin: this.state.userLogin}).then ((result) => {
            if (result == true)
                history.push('/home');
        })
    }

    handleNotif() {
        setTimeout(()=> {
            this.setState(()=> ({ notifications: null }))
        }, 5000);
        localStorage.removeItem('notification');
    }

    componentWillMount() {
        let token = localStorage.getItem('token');
        let notifArray = localStorage.getItem('notification');
        console.log("notif array ", notifArray)

        if (notifArray != null)
        {
            if (notifArray.includes('}{')) {
                notifArray = notifArray.split('}{');
                for (let i = 0; i < notifArray.length; i++) {
                    if (i == 0)
                        notifArray[i] = notifArray[i] + '}'
                    else if (i == notifArray.length - 1)
                        notifArray[i] = '{' + notifArray[i]
                    else
                        notifArray[i] = '{' + notifArray[i] + '}'
                    // notifArray[i] = notifArray[i].replace('":"', '": "')
                    notifArray[i] = JSON.parse(notifArray[i])
                }
            }
            else
                notifArray = new Array(JSON.parse(notifArray));
        }
        if (token !== null)
        {
            let user = jwtDecode(token);
            console.log(user);
            if (user.user_login !== '')
            {
                this.setState({
                    author: true,
                    userLogin: user.login,
                    notifications: notifArray
                });
            }
        }
    }

    componentDidUpdate() {
        let notifArray = localStorage.getItem('notification');
        console.log("test")
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
            const menu = (
                <Menu>
                    {this.state.notifications != null ?
                        this.state.notifications.map((notif, i) => 
                            <Menu.Item key={i}>
                                <NavLink to={"profile/:" + notif.user_id}>
                                    <img className="notifImg" src={notif.ava} alt="Who done this" />
                                    <p className="notifTxt">{notif.payload}</p>
                                </NavLink>
                            </Menu.Item>
                        )
                        : 
                        <Menu.Item key="0">
                            <p id="notifTxt-null">No unread notifications</p>
                        </Menu.Item>
                    }
                </Menu>
            )
            
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
                                    <NavLink to="/home/cabinet">
                                        <p>{this.props.userLogin}</p>
                                        <img className="userImage" src="http://i64.tinypic.com/2nl4p5v.png" alt="myProfile"/>
                                    </NavLink>
                                </li>
                                <li className="item">
                                    <NavLink to="/chat">
                                        <Badge count={42}>
                                            <img className="shopaImage" src="http://i66.tinypic.com/xnw035.png" alt="messagies"/>
                                        </Badge>
                                    </NavLink>
                                </li>
                                <li className="item">
                                <Dropdown overlay={menu} trigger={['click']} onClick={this.handleNotif} >
                                    <a className="ant-dropdown-link" href="_">
                                        <Badge count={this.state.notifications != null ? this.state.notifications.length : 0}>
                                            <img className="notificationImage" src="http://i66.tinypic.com/qod01l.png" alt="notifications"/>
                                        </Badge>
                                    </a>
                                </Dropdown>
                                    
                                </li>
                                <li className="item">
                                    <NavLink to="" onClick={this.handleLogout.bind(this)}>
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