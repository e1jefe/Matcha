import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './user/home/Home'
import SignIn from './user/main/components/headerComponents/SigninForm.js'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Home}/>
			<Route exact path='/home' component={Home}/>
			<Route path='/signin' component={SignIn}/>
		</Switch>
	</main>
)

export default Main