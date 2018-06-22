import React, { Component } from 'react';
import { Redirect } from 'react-router';
import {TextInput} from '../components/inputs';
import {SaveButton, CancelButton} from '../components/buttons';
let db = require('../database/mocking');

export default class Account extends Component {

    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        this.isNew = (!this.id);
        this.isUpdate = !(!this.id);
        this.state = {
            account: {},
            backToAccounts: false
        };

        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentWillMount() {
        //axios
        if (this.isUpdate) {
            let account = db.getAccount(this.id);
            this.setState({ account });
        }
    }

    save() {
        this.isNew ? db.addAccount(this.state.account) : db.saveAccount(this.state.account);
        this.setState({ backToAccounts: true });
    }

    cancel() {
        this.setState({ backToAccounts: true });
    }

    render() {
        if (this.state.backToAccounts) {
            return <Redirect to='/accounts' />
        }

        return (
            <div>
                <SaveButton onClick={this.save} />
                <CancelButton onClick={this.cancel} />
                {/* <button className="btn btn-info" style={styles.button} onClick={this.save}>Save</button> */}
                {/* <button className="btn btn-primary" onClick={this.cancel}>Cancel</button> */}

                
                <TextInput id='name' caption='Name' defaultValue={this.state.account.name}
                    onChange={e => this.setState({ account: { ...this.state.account, name: e.target.value } })}
                />

                <TextInput id='emai' caption='Email' defaultValue={this.state.account.email}
                    onChange={e => this.setState({ account: { ...this.state.account, email: e.target.value } })}
                />

                <TextInput id='phone' caption='Phone' defaultValue={this.state.account.phone}
                    onChange={e => this.setState({ account: { ...this.state.account, phone: e.target.value } })}
                />

                <TextInput id='website' caption='Web site' defaultValue={this.state.account.website}
                    onChange={e => this.setState({ account: { ...this.state.account, website: e.target.value } })}
                />
            </div>
        );
    }
}

const styles = {
    button:{
      marginTop:10, 
      marginBottom:10
    }
  }