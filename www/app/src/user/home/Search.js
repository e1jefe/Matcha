import React, { Component } from 'react';
import './search.css';
import SearchComponents from './SearchComponents.jsx';

class Search extends Component {
		render() {
				return(
						<div>
								<SearchComponents login={this.props.login}/>
						</div>
				);
		}
}

export default Search;