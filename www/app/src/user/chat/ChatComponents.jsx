import React, { Component } from 'react';
import './chat.css';
import 'antd/dist/antd.css'
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
// import 'emoji-mart/css/emoji-mart.css'
// import { Emoji } from 'emoji-mart'
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;
class ChatComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: true,
            userLogin: props.login
        };
    }

    render() {
        return (
            <div id="wrapper" className="chatComponent">
                <div className="sidebar">
                    <div className="profile-img">
                        <img className="http://img.vikna.if.ua/gallery_2017/80228/188771_102584486582505_1540861915_n-e1489585794754__large.jpg" alt=""/>
                    </div>
                    <ul className="sidebar-menu">
                        <li><a href="#" className="sidebar-menu__links active"><img src="http://muhammederdem.com.tr/sms/img/send.png" alt=""/></a></li>
                        <li><a href="#" className="sidebar-menu__links"><img src="http://muhammederdem.com.tr/sms/img/trash.png" alt=""/></a></li>
                    </ul>

                    <a href="#" className="btn-menu"><img src="img/menu.png" alt=""/></a>
                </div>

                <div className="messages">

                    {/*<div class="seacrh-bar">*/}

                        {/*<img src="img/search.png" alt=""/>*/}
                            {/*<input type="text" placeholder="Search"/>*/}

                    {/*</div>*/}

                    <a href="#" className="messages__item">
                        <div className="name">
                            <b> Алежа Винник</b>
                        </div>
                        <div className="date">
                            1h ago
                        </div>

                        <div className="content">
                            Я люблю вас волчицы...
                        </div>
                    </a>

                    <a href="#" className="messages__item unread">
                        <div className="name">
                           <b> Коленька Басков</b>
                        </div>
                        <div className="date">
                            1h ago
                        </div>

                        <div className="content">
                            Я всех вас люблю, мои дорогие волчицы...
                        </div>
                    </a>

                    <a href="#" className="messages__item unread">
                        <div className="name">
                           <b> Стасик Михайлов</b>
                        </div>
                        <div className="date">
                            4h ago
                        </div>

                        <div className="content">
                            Я люблю вас. Я всех вас люблю.
                        </div>
                    </a>
                </div>

                <div className="message-content">

                    <div className="message-content__item">
                            <div className="message-content-header">
                                <div className="name"><NavLink to="/userID">Алежа Винник </NavLink></div>
                            <div className="status">В активной роли</div>
                            <img src="img/message-more.png" alt=""/>
                        </div>
                    </div>

                    <div className="message-box">
                        <div className="message-box__item incoming">
                            <div className="name"><b>Алежа</b></div>

                            <div className="box-text">
                                Падав безжалісно град,
                                Била блискавиця...
                                <div className="time">18:36</div>
                            </div>
                        </div>

                        <div className="message-box__item outgoing">

                            <div className="box-text">
                                Гріла під серцем вовчат,
                                Молода вовчиця
                                <div className="time">18:36</div>
                            </div>
                        </div>

                        <div className="message-box__item outgoing">

                            <div className="box-text">
                                Знаю про вірну любов,
                                Лісове озерце
                                <div className="time">18:36</div>
                            </div>
                        </div>

                        <div className="message-box__item incoming">
                            <div className="name"><b>Алежа</b></div>

                            <div className="box-text">
                                Плаче нічної пори
                                Одиноке серце.

                                <div className="time">18:36</div>
                            </div>
                        </div>
                    </div>

                    <div className="message-form">
                        <input type="text" placeholder="Write smth for young female wolves..."/>
                        <Button type="primary">send</Button>
                    </div>

                </div>
            </div>

        );
    }
}
export default ChatComponents;