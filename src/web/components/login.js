import React, { Component } from 'react';
import { TextInput } from './inputs';
import { Redirect } from 'react-router-dom';
let db = require('../database/mocking');

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            name: '',
            password: ''
        }

        this.login = this.login.bind(this);
        this.createNewDemo = this.createNewDemo.bind(this);
    }

    login() {
        this.setState({redirect:true});
    }

    createNewDemo() {
        db.createDemo()
            .then(user => {
                this.setState({ name: user.name, password: user.password });
            })
    }

    render() {

        console.log('render', this.state.user);

        if (this.state.redirect) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <div className="form-group">
                    <p>Crate new demo here</p>
                    <button className='btn btn-default' onClick={() => this.createNewDemo()} >Create new demo</button>
                    <button className='btn btn-default' onClick={() => this.login()} >set user</button>
                </div>

                <p>Or you can login with previous login</p>
                <div className="form-group">
                    <TextInput id='name' caption='Name' value={this.state.name}
                        onChange={e => { this.setState({ name: e.target.value }) }} />
                    <TextInput id='password' caption='Password' value={this.state.password}
                        onChange={e => { this.setState({ password: e.target.value }) }} />
                    <button className='btn btn-default' onClick={() => this.login()}>Login</button>
                </div>
            </div>
        );
    }
}
