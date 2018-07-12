import React, { Component } from 'react';
import './App.css';
import Header from './user/main/components/headerComponents/Header.js';
import Home from './user/home/Home.js';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Home />
      </div>
    );
  }
}

export default App;