import React, { Component } from 'react';
import { TextInput } from './inputs';
import { Redirect } from 'react-router-dom';
const axios = require('axios');
const db = require('../database/mocking');

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            name: '',
            password: '',
            hasValidToken: false
        }

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.createNewDemo = this.createNewDemo.bind(this);
    }

    componentWillMount() {
        let token = localStorage.getItem('token');
        if (token) {
            axios({
                method: 'GET',
                url: '/api/misc/verifyToken',
                headers: {
                    'content-Type': 'application/json',
                    authorization: `bearer ${token}`
                }
            })
                .then(response => {
                    this.setState({ hasValidToken: true });
                })
                .catch(err => {
                    localStorage.removeItem('token');
                });
        }
    }

    login() {
        axios.post('/api/login',
            {
                name: this.state.name,
                password: this.state.password
            })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                this.setState({ redirect: true });
            });
    }

    logout() {
        localStorage.removeItem('token');
        this.setState({ hasValidToken: false });
    }

    createNewDemo() {
        this.logout();
        db.createDemo()
            .then(user => {
                this.setState({ name: user.name, password: user.password });
            })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }

        let loginPart;
        if (!this.state.hasValidToken) {
            loginPart = <div className="form-group">
                <TextInput id='name' caption='Name' value={this.state.name}
                    onChange={e => { this.setState({ name: e.target.value }) }} />
                <TextInput id='password' caption='Password' value={this.state.password}
                    onChange={e => { this.setState({ password: e.target.value }) }} />
                <button className='btn btn-default' onClick={() => this.login()}>
                <span className="glyphicon glyphicon-log-in" /> Login</button>
            </div>
        }
        else {
            loginPart = <div className="form-group">
                <button className='btn btn-default' onClick={() => this.logout()}>
                Logout <span className="glyphicon glyphicon-log-out" /></button>
            </div>
        }

        return (
            <div>
                <div className="form-group">
                    <p>Crate new demo here</p>
                    <button className='btn btn-default' onClick={() => this.createNewDemo()} > Create new demo</button>
                </div>

                {loginPart}
            </div>
        );
    }
}
