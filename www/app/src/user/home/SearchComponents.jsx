import React, { Component } from 'react';
import './search.css';
import 'antd/dist/antd.css';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import EditableTagGroup from './TagComponents.jsx';
import UsersCards from "./UsersCards";
import jwtDecode from 'jwt-decode';
import { PostData } from '../main/components/PostData';
import {findDOMNode} from 'react-dom';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { Pagination } from 'antd';

class SearchComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: props.age,
            distance: props.distance,
            fameRate: props.fameRate,
            res: '',
            searchAge: { min: 18, max: 30 },
            searchDistance: 10,
            searchFR: {
                min: 0,
                max: 100,
            },
        }
        this.updateSearchRes = this.updateSearchRes.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    componentWillMount() {
        const token = localStorage.getItem('token')
        if (token !== null)
        {
            let user = jwtDecode(token)
            if (user.userLogin !== '')
                user = user.userId
            console.log(user);
            PostData('user/search', {userId: user, searchFR: this.state.searchFR, searchAge: this.state.searchAge, searchDistance: this.state.searchDistance}).then
            ((result) => {
                console.log('result before change param ', result);
                this.setState({
                    res: result.userData
                })
            })
        }
    }
    updateData = (value) => {
        this.setState({ tags : value })
    }
    updateSearchRes(event) {
        console.log("changed value: ", this.state)
        const token = localStorage.getItem('token')
        if (token !== null) {
            let user = jwtDecode(token)
            if (user.userLogin !== '')
                user = user.userId
            PostData('user/search', {userId: user, searchFR: this.state.searchFR, searchAge: this.state.searchAge, searchDistance: this.state.searchDistance, tags: this.state.tags}).then
            ((result) => {
                console.log('result', result);
                this.setState({
                    res: result.userData
                })
            })
        }

    }

    render() {
        return (
<div>
            <div id="wrapper1">
                <div className="sliders">
                <p>Age</p>
                    <InputRange
                        maxValue={55}
                        minValue={18}
                        value={this.state.searchAge}
                        onChange={value => this.setState({ searchAge : value })}
                    />
                <p>Distance</p>
                    <InputRange
                        maxValue={100}
                        minValue={0}
                        value={this.state.searchDistance}
                         onChange={value => this.setState({ searchDistance : value })} />
                <p>Fame rating</p>
                    <InputRange step={10}
                    maxValue={100}
                    minValue={0}
                    value={this.state.searchFR}
                    onChange={value => this.setState({ searchFR : value })} />
                </div>
                <div className="tags">
                <EditableTagGroup updateData={this.updateData}/>
                </div>
                <div className="btn-search">
                <Button id= "search" type="submit" onClick={this.updateSearchRes} icon="search">Search</Button>
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