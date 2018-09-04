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
import { Radio } from 'antd'
const RadioGroup = Radio.Group;

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
                max: 80,
            },
        }
        this.updateSearchRes = this.updateSearchRes.bind(this);
        this.updateData = this.updateData.bind(this);
        this.sortByAge = this.sortByAge.bind(this);
        this.sortByDistance = this.sortByDistance.bind(this);
        this.sortByRate = this.sortByRate.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    componentWillMount() {
        const token = localStorage.getItem('token')
        if (token !== null)
        {
            let user = jwtDecode(token)
            if (user.userLogin !== '')
                user = user.userId
            PostData('user/search', {userId: user, searchFR: this.state.searchFR, searchAge: this.state.searchAge, searchDistance: this.state.searchDistance}).then
            ((result) => {
                this.setState({
                    res: result.userData,
                    currentUserId: user
                })
            })
        }
    }
    updateData = (value) => {
        this.setState({ tags : value })
    }

    sortByAge(result)
    {
        result.sort((a, b) => {
            return a['age'] > b['age'] ? 1 : -1;
        });
    }

    sortByDistance(result)
    {
        result.sort((a, b) => {
            return a['distance'] > b['distance'] ? 1 : -1;
        });
    }

    sortByRate(result)
    {
        result.sort((a, b) => {
            return a['fameRate'] > b['fameRate'] ? 1 : -1;
        });
    }

    state = {
        value: 1,
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    updateSearchRes(event) {
        const token = localStorage.getItem('token')
        if (token !== null) {
            let user = jwtDecode(token)
            if (user.userLogin !== '')
                user = user.userId
            PostData('user/search', {userId: user, searchFR: this.state.searchFR, searchAge: this.state.searchAge, searchDistance: this.state.searchDistance, tags: this.state.tags}).then
            ((result) => {
                if(this.state.value === 1) {
                    this.sortByAge(result.userData);
                }
                else if(this.state.value === 2) {
                    this.sortByDistance(result.userData);
                }
                else if(this.state.value === 3) {
                    this.sortByRate(result.userData);
                }
                this.setState({
                    res: result.userData
                })
            })
        }


    }

    render() {
        return (
            <div id="search-all">
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
                    <div className="Radio">
                        <RadioGroup onChange={this.onChange} defaultValue={this.state.value}>
                            <Radio value={1}>Age</Radio>
                            <Radio value={2}>Distance</Radio>
                            <Radio value={3}>Rating</Radio>
                            <Radio value={4}>Tags</Radio>
                        </RadioGroup>
                    </div>
                    <div className="btn-search">
                        <Button id= "search" type="submit" onClick={this.updateSearchRes} icon="search">Search</Button>
                    </div>
                </div>
                <div className="Cards">
                    <UsersCards toShow={this.state.res} me={this.state.currentUserId}/>
                </div>
            </div>
        );
    }
}
export default SearchComponents;