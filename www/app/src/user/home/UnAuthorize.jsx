import React, { Component } from 'react';
import './home.css';
import Home from './Home';

class UnAuthorize extends Component {
    render() {
        return(
            <div className="index">
            	<div className="index-holder">
            		<h1 className="index-title">
                        Purrfect Match
                    </h1>
                    <h3 className="index-sub-title">
                        The Only Human-Feline Dating App
                    </h3>
                    <hr/>
                    <a href="/signin" className="index-btn">
                        <i className="paw" aria-hidden="true"></i>
                        Get Started!
                    </a>
            	</div>
            </div>
        );
    }
}

export default UnAuthorize;