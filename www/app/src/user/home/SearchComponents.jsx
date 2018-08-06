import React, { Component } from 'react';
import './search.css';
import 'antd/dist/antd.css';
import { NavLink } from 'react-router-dom';
import { Slider, Switch } from 'antd';
import { Button } from 'antd';
import EditableTagGroup from './TagComponents.jsx';
import UsersCards from "./UsersCards";
import jwtDecode from 'jwt-decode';
import { PostData } from '../main/components/PostData';
import {findDOMNode} from 'react-dom';

class SearchComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: props.age,
            distance: props.distance,
            fameRate: props.fameRate,
            res: ''
        }
        // this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        const token = localStorage.getItem('token')
        if (token !== null)
        {
            let user = jwtDecode(token)
            if (user.userLogin !== '')
                user = user.userId
            PostData('user/search', {userId: user}).then ((result) => {
                this.setState({
                    res: result.userData
                    // Age: result.userData.age,
                    // Distance: result.userData.distance,
                })
            })
        }
    }

    onChange(event) {
        console.log('event: ', event);
        let age = findDOMNode(this.refs.age)
        console.log('age: ', age);

        if(age){
            this.setState({
                age: event.value
            })
        }
        console.log('onChange: ', this.state);
    }

    render() {
        // const { disabled } = this.state;
console.log("in state our users ", this.state.res)
        return (
<div>
            <div id="wrapper1">
                <div className="sliders">
                <p>Age</p>
                <Slider ref="age" id="age" min={18} range defaultValue={[18, 40]} onChange={this.onChange.bind(this)}/>
                <p>Distance</p>
                <Slider name="distance"  min={2} defaultValue={30}  onChange={this.onChange}/>
                <p>Fame rating</p>
                <Slider name="fameRate" range step={10} defaultValue={[10, 50]} onChange={this.onChange}/>
                </div>
                <div className="tags">
                <EditableTagGroup />
                </div>
                <div className="btn-search">
                <Button id= "search" type="primary" icon="search">Search</Button>
                </div>
            </div>
    <div className="Cards">
        <UsersCards toShow={this.state.res}/>
    </div>
</div>
        );

    }
}
export default SearchComponents;