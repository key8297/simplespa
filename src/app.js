import React, { Component } from 'react';

// import Home from './components/home';
// import User from './components/user';
import { Route, NavLink, Switch } from 'react-router-dom';
import Categories from './components/categories';
import Category from './components/category';
import Accounts from './pages/accounts';
import Account from './pages/account';

import menuCss from './css/menu.css';


const Navigation = () => (
    <nav>
        <ul>
            <li><NavLink to='/home'>Home</NavLink></li>
            <li><NavLink to='/accounts'>Accounts</NavLink></li>
            <li><NavLink to='/categories'>Categories</NavLink></li>
            <li><NavLink to='/contact'>Contact</NavLink></li>
            <li><NavLink to='/category'>Category</NavLink></li>
        </ul>
    </nav>
);

const About = () => (
    <h1>About</h1>
);

const Contact = () => (
    <h1>Contact</h1>
);

const Home = () => (
    <h1>Home</h1>
);

const Main = () => (
    <Switch>
      <Route exact path='/home' component={Home}></Route>
      <Route exact path='/accounts' component={Accounts}></Route>
      <Route path='/account/:id' component={Account}></Route>
      <Route exact path='/account' component={Account}></Route>
      <Route exact path='/categories' component={Categories}></Route>
      <Route exact path='/contact' component={Contact}></Route>
      <Route exact path='/category' component={Category}></Route>      
      <Route path='/category/:id' component={Category}></Route>
    </Switch>
  );

export default class App extends Component {
    render() {
        // localStorage.clear();
        return (
            <div>
                <h1></h1>
                <Navigation />
                <Main />
            </div>
        );

        // return <p>This is my new react app3</p>
    }
}