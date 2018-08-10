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

        // console.log("in ", users2);
    return(
        <div>
            <div className="CardHolder">

                <Row>
                    {Object.keys(users2).map((i) => <div key={i}>{
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>  <Card>
                <CardBody>
                    <CardTitle><NavLink to="/userID"> {users2[i].fname} {users2[i].lname}</NavLink>, {users2[i].age}</CardTitle>
                    <CardSubtitle>Fame Rating: {users2[i].fameRate}</CardSubtitle>
                </CardBody>
                        <NavLink to="/userID"><img src={users2[i].profilePic} /> </NavLink>
                <CardBody>
                    <CardText>{users2[i].bio}</CardText>
                    <Button type="danger">Like</Button>
                    <CardLink href="#">Block user</CardLink>
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