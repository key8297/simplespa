import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

export default class RedirectTo extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: this.props.redirect,
            toUrl: this.props.directTo || '/'
        }
    }

    render(){
        if(this.state.redirect){
            return <Redirect to={this.this.toUrl} />;
        }

        return <div />;
    }
}