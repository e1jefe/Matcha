import React, { Component } from 'react';
import './userscards.css';
import { NavLink } from 'react-router-dom';
import { Card, CardText, CardBody,
    CardTitle, CardSubtitle, CardLink} from 'reactstrap';
import { Row, Col, Button } from 'antd';



class UsersCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.toShow
        }
        // this.onChange = this.onChange.bind(this);
    }

    render() {
        const users = this.state.show
        const users2 = this.props.toShow

        console.log("in component to show ", users);
        console.log("in ", users2);

    return(
        <div>
            <div className="CardHolder">
                {Object.keys(users).map((user, i) => <div> key={i}>{user.toString()}</div>)}
                <Row>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>  <Card>
                <CardBody>
                    <CardTitle><NavLink to="/userID">, </NavLink> 34</CardTitle>
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