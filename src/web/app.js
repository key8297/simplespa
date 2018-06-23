import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Members from './pages/members';
import Member from './pages/member';

import menuCss from './css/menu.css';

const Home = () => (
    <h1>Home</h1>
);

const Navigation = () => (
    <nav>
        <ul>
            <li><NavLink to='/home'>Home</NavLink></li>
            <li><NavLink to='/members'>Members</NavLink></li>
            <li><NavLink to='/category'>Category</NavLink></li>
        </ul>
    </nav>
);

const Main = () => (
    <Switch>
      <Route exact path='/home' component={Home}></Route>
      <Route exact path='/members' component={Members}></Route>
      <Route exact path='/member' component={Member}></Route>
      <Route path='/member/:id' component={Member}></Route>
    </Switch>
  );

export default class App extends Component {
    render() {
        // localStorage.clear();
        return (
            <div>
                <Navigation />
                <Main />
            </div>
        );
    }
}