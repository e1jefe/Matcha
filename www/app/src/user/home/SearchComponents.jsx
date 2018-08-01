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

class SearchComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: props.login,
            userId: props.userId,
            fullProfile: props.access,
        }
        // this.handleSubmitInfo = this.handleSubmitInfo.bind(this)
        // this.handleSubmitAbout = this.handleSubmitAbout.bind(this)
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
                    // Age: result.userData.age,
                    // Distance: result.userData.distance,
                    // bio: result.userData.bio,
                    // fameRate: result.userData.fameRate,
                    // tags: result.userData.tags,
                    // avatar: result.userData.profilePic,
                    // whoLikedMe: result.whoLikesUser
                })
            })
        }
    }

    // handleDisabledChange = (disabled) => {
    //     this.setState({disabled});
    // }
    onChange(value) {
        console.log('onChange: ', value);
    }

    render() {
        const { disabled } = this.state;

        return (
<div>
            <div id="wrapper1">
                <div className="sliders">
                <p>Age</p>
                <Slider  min={18} range defaultValue={[18, 40]} onChange={this.onChange}/>
                <p>Distance</p>
                <Slider   min={2} defaultValue={30}  onChange={this.onChange}/>
                <p>Fame rating</p>
                <Slider range step={10} defaultValue={[10, 50]} onChange={this.onChange}/>
                </div>
                <div className="tags">
                <EditableTagGroup />
                </div>
                <div className="btn-search">
                <Button type="primary" icon="search">Search</Button>
                </div>
            </div>
    <div className="Cards">
        <UsersCards />
    </div>
</div>
        );

    }
}
export default SearchComponents;