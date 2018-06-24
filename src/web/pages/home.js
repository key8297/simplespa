import React, { Component } from 'react';
import {Login} from '../components/login';

export default class Home extends Component {

    render() {
        return (
            <div>
                <h1>Read me</h1>
                <Login />
            </div>
        );
    }
}

const styles = {
    button: {
        marginTop: 10,
        marginBottom: 10
    }
}