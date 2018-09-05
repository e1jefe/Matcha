import React, { Component } from 'react';
import './userscards.css';
import { Card, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import { Row, Col, Button } from 'antd';
import Like from '../profile/components/Like'
import Block from '../profile/components/Block'
import OpenProfile from '../profile/components/OpenProfile'
import { Rate } from 'antd'


class UsersCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.toShow,

        }
    }

    render() {
        const users2 = this.props.toShow
    return(
        <div>
            <div className="CardHolder">

                <Row>
                    {Object.keys(users2).map((i) => <div key={i}>{
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>  <Card>
                <CardBody>
                    <CardTitle>  {users2[i].fname} {users2[i].lname}, {users2[i].age}</CardTitle>
                    <CardSubtitle><Rate allowHalf disabled defaultValue={users2[i].stars} />  {users2[i].distance} km</CardSubtitle>
                </CardBody>
                        <img src={users2[i].profilePic} alt="user avatar"/>
                <CardBody>
                    <Button.Group size="large" className="my-card-search">
                        <OpenProfile target={users2[i].userId} className="my-card-btn-width"/>
                        <Like who={this.props.me} target={users2[i].userId} className="my-card-btn-width"/>
                        <Block who={this.props.me} target={users2[i].userId} className="my-card-btn-width"/>
                    </Button.Group>
                </CardBody>
            </Card></Col>}
                </div>)}
                    </Row>
                </div>
        </div>
    );
    }
    }
    export default UsersCards;