import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Members from './pages/members';
import Member from './pages/member';
// import Login from './pages/login2';
import Home from './pages/home';


import menuCss from './css/menu.css';

// const Home = () => (
//     <h1>Home</h1>
// );

const Navigation = () => (

    <nav className="navbar">
        <div className="container-fluid">
            <div className="navbar-header">
                <span style={{fontFamily:'georgia'}} className="navbar-brand" >Demo-hk</span>
            </div>
            <ul className="nav navbar-nav">
                <li><NavLink to='/home'><span className="glyphicon glyphicon-home" /> Home</NavLink></li>
                <li><NavLink to='/members'><span className="glyphicon glyphicon-user" /> Members</NavLink></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
            </ul>
        </div>
    </nav>
);

const Main = () => (
    <Switch>
        <Route exact path='/home' component={Home}></Route>
        <Route exact path='/members' component={Members}></Route>
        <Route exact path='/member' component={Member}></Route>
        {/* <Route exact path='/login' component={Login}></Route> */}
        <Route path='/member/:id' component={Member}></Route>
    </Switch>
);

export default class App extends Component {
    render() {
        localStorage.clear();
        return (
            <div>
                <Navigation />
                <Main />
            </div>
        );
    }
}