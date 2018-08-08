import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Signin.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { PostData } from '../main/components/PostData';
import { Router, Route } from 'react-router-dom';
import history from "../history/history"
import Header from '../main/components/headerComponents/Header.jsx';
import Footer from '../main/components/footerComponents/Footer';
import Content from './Content';

export const SignIn = () => (
	<div>
		<Header />
		<Content />
		<Footer />
	</div>
)

export default SignIn;