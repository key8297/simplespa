import React, { Component } from 'react';
import { Redirect } from 'react-router';
import {TextInput} from './inputs';
let cat = require('../database/mocking');

export default class Category extends Component {

    constructor(props) {
        super(props);
        this.code = props.match.params.id;
        this.isNew = (!this.code);
        this.isUpdate = !(!this.code);
        this.state = {
            category: {},
            backToCategories: false
        };
        if (this.isNew) {
            this.state.category.active = 'true';
        }
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentWillMount() {
        //axios
        if (this.isUpdate) {
            let category = cat.getCategories().filter(x => x.code == this.code)[0];
            this.setState({ category });
        }
    }

    save() {
        this.isNew ? cat.addCategory(this.state.category) : cat.saveCategory(this.state.category);
        this.setState({ backToCategories: true });
    }

    cancel() {
        this.setState({ backToCategories: true });
    }

    render() {
        if (this.state.backToCategories) {
            return <Redirect to='/categories' />
        }

        return (
            <div>
                <button className="btn btn-info" style={styles.button} onClick={this.save}>Save</button>
                <button className="btn btn-primary" onClick={this.cancel}>Cancel</button>
                
                <TextInput id='code' caption='Code' defaultValue={this.state.category.code}
                    onChange={e => this.setState({ category: { ...this.state.category, code: e.target.value } })}
                />

                <TextInput id='description' caption='Description' defaultValue={this.state.category.description}
                    onChange={e => this.setState({ category: { ...this.state.category, description: e.target.value } })}
                />

                <div className="form-group form-check">
                    <label className="form-check-label" htmlFor="active">Active</label>
                    <input type="checkbox" className="form-check-input" id="active" defaultChecked={this.state.category.active == 'true'}
                        onChange={e => this.setState({ category: { ...this.state.category, active: e.target.checked.toString() } })} />
                </div>

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