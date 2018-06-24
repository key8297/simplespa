import React, { Component } from 'react';
import { TextInput } from '../components/inputs';
import { Redirect } from 'react-router';

const Refresh = ({ path = '/' }) => (
    <Route
        path={path}
        component={({ history, location, match }) => {
            history.replace({
                ...location,
                pathname:location.pathname.substring(match.path.length)
            });
            return null;
        }}
    />
);

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            loggedIn: false
        }
        this.login = this.login.bind(this);
    }

    login() {
        console.log(`${this.state.name} - ${this.state.password}`);
        browserHistory.push('/');
        // localStorage.setItem('tokens','aaaa');
        // this.setState({loggedIn : true});
    }

    render() {

        // if(this.setState.loggedIn){
        //     console.log(this.setState.loggedIn);
        //     return <Refresh to='/refresh/' />
        // }

        return (
            <div>
                <TextInput id='name' caption='User name'
                    onChange={e => this.setState({ name: e.target.value })}
                />
                <TextInput id='password' caption='Password'
                    onChange={e => this.setState({ password: e.target.value })}
                />

                <button onClick={this.login}>Login</button>
            </div>);
    }
}