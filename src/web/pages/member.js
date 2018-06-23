import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { TextInput } from '../components/inputs';
import { SaveButton, CancelButton } from '../components/buttons';
let db = require('../database/mocking');

export default class Member extends Component {

    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        this.isNew = (!this.id);
        this.isUpdate = !(!this.id);
        this.state = {
            member: {},
            backToMembers: false
        };

        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentWillMount() {
        //axios
        console.log(this.id);
        if (this.isUpdate) {
            db.getAccount(this.id)
                .then(member => {
                    this.setState({ member });
                });
        }
    }

    save() {
        if (this.isNew) {
            db.addAccount(this.state.member)
                .then(() => this.setState({ backToMembers: true }));
        }
        else {
            db.saveAccount(this.state.member)
                .then(() => this.setState({ backToMembers: true }));
        }
    }

    cancel() {
        this.setState({ backToMembers: true });
    }

    render() {
        if (this.state.backToMembers) {
            return <Redirect to='/members' />
        }

        return (
            <div>
                <SaveButton onClick={this.save} />
                <CancelButton onClick={this.cancel} />

                <TextInput id='name' caption='Name' defaultValue={this.state.member.name}
                    onChange={e => this.setState({ member: { ...this.state.member, name: e.target.value } })}
                />

                <TextInput id='emai' caption='Email' defaultValue={this.state.member.email}
                    onChange={e => this.setState({ member: { ...this.state.member, email: e.target.value } })}
                />

                <TextInput id='phone' caption='Phone' defaultValue={this.state.member.phone}
                    onChange={e => this.setState({ member: { ...this.state.member, phone: e.target.value } })}
                />

                <TextInput id='website' caption='Web site' defaultValue={this.state.member.website}
                    onChange={e => this.setState({ member: { ...this.state.member, website: e.target.value } })}
                />
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