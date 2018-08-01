import React, { Component } from 'react';
import './userscards.css';
import { NavLink } from 'react-router-dom';
import { Card, CardText, CardBody,
    CardTitle, CardSubtitle, CardLink} from 'reactstrap';
import { Row, Col, Button } from 'antd';



class UsersCards extends Component {

    render() {
    return(
        <div>
            <div className="CardHolder">
                <Row>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>  <Card>
                <CardBody>
                    <CardTitle><NavLink to="/userID">Olga Virchenko, </NavLink> 34</CardTitle>
                    <CardSubtitle>Ukraine, Kyiv</CardSubtitle>
                </CardBody>
                        <NavLink to="/userID"><img src="https://scontent.fiev11-1.fna.fbcdn.net/v/t1.0-9/33900375_2108633922735576_1234385064138113024_n.jpg?_nc_cat=0&oh=50f4018fc45f729fdfdd9026e80206a3&oe=5C084579" /> </NavLink>
                <CardBody>
                    <CardText>About me...</CardText>
                    <Button type="danger">Like</Button>
                    <CardLink href="#">Block user</CardLink>
                </CardBody>
            </Card></Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>  <Card>
                        <CardBody>
                            <CardTitle><NavLink to="/userID">Olga Virchenko, </NavLink> 34</CardTitle>
                            <CardSubtitle>Ukraine, Kyiv</CardSubtitle>
                        </CardBody>
                        <NavLink to="/userID"><img src="https://scontent.fiev11-1.fna.fbcdn.net/v/t1.0-9/33900375_2108633922735576_1234385064138113024_n.jpg?_nc_cat=0&oh=50f4018fc45f729fdfdd9026e80206a3&oe=5C084579" /> </NavLink>
                        <CardBody>
                            <CardText>About me...</CardText>
                            <Button type="danger">Like</Button>
                            <CardLink href="#">Block user</CardLink>
                        </CardBody>
                    </Card></Col>
                </Row>
            </div>
        </div>
    );
    }
    }
    export default UsersCards;