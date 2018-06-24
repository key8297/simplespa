import React, {Component} from 'react';
import {TextInput} from './inputs';

export class Login extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <p>Crate new demo here</p>
                <button className='btn btn-default' >Create new demo</button>

                <p>Or you can login with previous login</p>

                <TextInput id='name' caption='Name' />
                <TextInput id='password' caption='Password' />
                <button className='btn btn-default'  >Login</button>
            </div>
        );
    }
}
