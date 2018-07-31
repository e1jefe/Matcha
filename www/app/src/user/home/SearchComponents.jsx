import React, { Component } from 'react';
import './search.css';
import 'antd/dist/antd.css';
import { NavLink } from 'react-router-dom';
import { Slider, Switch } from 'antd';
import { Button } from 'antd';
import EditableTagGroup from './TagComponents.jsx';
import UsersCards from "./UsersCards";

class SearchComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: true,
            userLogin: props.login
        };
    }
    state = {
        disabled: false,
    };

    handleDisabledChange = (disabled) => {
        this.setState({disabled});
    }

    render() {
        const { disabled } = this.state;

        return (
<div>
            <div id="wrapper1">
                <div className="sliders">
                <p>Age</p>
                <Slider  min={18} range defaultValue={[18, 40]} />
                <p>Distance</p>
                <Slider   min={2} defaultValue={30}  />
                <p>Fame rating</p>
                <Slider range step={10} defaultValue={[10, 50]} />
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