import React, { Component } from 'react';
import { Redirect } from 'react-router'
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
                <div className="form-group">
                    <label htmlFor="code">Code</label>
                    <input type="text" className="form-control" id="code" placeholder="Code" defaultValue={this.state.category.code}
                        onChange={e => this.setState({ category: { ...this.state.category, code: e.target.value } })} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" placeholder="Description" defaultValue={this.state.category.description}
                        onChange={e => this.setState({ category: { ...this.state.category, description: e.target.value } })} />
                </div>
                <div className="form-group form-check">
                    <label className="form-check-label" htmlFor="active">Active</label>
                    <input type="checkbox" className="form-check-input" id="active" defaultChecked={this.state.category.active == 'true'}
                        onChange={e => this.setState({ category: { ...this.state.category, active: e.target.checked.toString() } })} />
                </div>
                <button className="btn btn-info" onClick={this.save}>Save</button>
                <button className="btn btn-primary" onClick={this.cancel}>Cancel</button>
            </div>
        );
    }
}