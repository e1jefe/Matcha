import React, { Component } from 'react';
import './chat.css';
import 'antd/dist/antd.css'
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
// import 'emoji-mart/css/emoji-mart.css'
// import { Picker } from 'emoji-mart'
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
            <div id="wrapper">
                <div class="sidebar">
                    <div class="profile-img">
                        <img src="http://img.vikna.if.ua/gallery_2017/80228/188771_102584486582505_1540861915_n-e1489585794754__large.jpg" alt=""/>
                    </div>
                    <ul class="sidebar-menu">
                        <li><a href="#" class="sidebar-menu__links active"><img src="http://muhammederdem.com.tr/sms/img/send.png" alt=""/></a></li>
                        <li><a href="#" class="sidebar-menu__links"><img src="http://muhammederdem.com.tr/sms/img/trash.png" alt=""/></a></li>
                    </ul>

                    <a href="#" class="btn-menu"><img src="img/menu.png" alt=""/></a>
                </div>

                <div class="messages">

                    {/*<div class="seacrh-bar">*/}

                        {/*<img src="img/search.png" alt=""/>*/}
                            {/*<input type="text" placeholder="Search"/>*/}

                    {/*</div>*/}

                    <a href="#" class="messages__item">
                        <div class="name">
                            <b> Алежа Винник</b>
                        </div>
                        <div class="date">
                            1h ago
                        </div>

                        <div class="content">
                            Я люблю вас волчицы...
                        </div>
                    </a>

                    <a href="#" class="messages__item unread">
                        <div class="name">
                           <b> Коленька Басков</b>
                        </div>
                        <div class="date">
                            1h ago
                        </div>

                        <div class="content">
                            Я всех вас люблю, мои дорогие волчицы...
                        </div>
                    </a>

                    <a href="#" class="messages__item unread">
                        <div class="name">
                           <b> Стасик Михайлов</b>
                        </div>
                        <div class="date">
                            4h ago
                        </div>

                        <div class="content">
                            Я люблю вас. Я всех вас люблю.
                        </div>
                    </a>
                </div>

                <div class="message-content">

                    <div class="message-content__item">
                            <div class="message-content-header">
                                <div class="name"><NavLink to="/userID">Алежа Винник </NavLink></div>
                            <div class="status">В активной роли</div>
                            <img src="img/message-more.png" alt=""/>
                        </div>
                    </div>

                    <div class="message-box">
                        <div class="message-box__item incoming">
                            <div class="name"><b>Алежа</b></div>

                            <div class="box-text">
                                Падав безжалісно град,
                                Била блискавиця...
                                <div class="time">18:36</div>
                            </div>
                        </div>

                        <div class="message-box__item outgoing">

                            <div class="box-text">
                                Гріла під серцем вовчат,
                                Молода вовчиця
                                <div class="time">18:36</div>
                            </div>
                        </div>

                        <div class="message-box__item outgoing">

                            <div class="box-text">
                                Знаю про вірну любов,
                                Лісове озерце
                                <div class="time">18:36</div>
                            </div>
                        </div>

                        <div class="message-box__item incoming">
                            <div class="name"><b>Алежа</b></div>

                            <div class="box-text">
                                Плаче нічної пори
                                Одиноке серце.

                                <div class="time">18:36</div>
                            </div>
                        </div>
                    </div>

                    <div class="message-form">
                        <input type="text" placeholder="Write smth for young female wolves..."/>
                        <Button type="primary">send</Button>
                    </div>

                </div>
            </div>

        );
    }
}
export default ChatComponents;