import React, { Component } from 'react';
import './App.css';
import Header from './user/main/components/headerComponents/Header.jsx';
import Home from './user/home/Home.js';
import Footer from "./user/main/components/footerComponents/Footer";


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Home />
          <Footer />
      </div>
    );
  }
}

export default App;