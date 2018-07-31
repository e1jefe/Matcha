import React, { Component } from 'react';
import './search.css';
import Header from '../main/components/headerComponents/Header.jsx';
import Footer from '../main/components/footerComponents/Footer';
import SearchComponents from './SearchComponents.jsx';
import UsersCards from "./UsersCards";

class Search extends Component {
    render() {
        return(
            <div>
                <Header/>
                <SearchComponents login={this.props.login}/>
                <Footer />
            </div>
        );
    }
}

export default Search;