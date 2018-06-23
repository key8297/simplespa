import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export class DeleteButton extends Component {

    constructor(props) {
        super(props);

        this.confirm = this.confirm.bind(this);
    }

    confirm(callback) {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete seleted record?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => callback()
                },
                {
                    label: 'Cancel'
                }
            ]
        })
    }

    render() {
        return (
            <span style={{ fontSize: 10, height: 10, padding: 2 }}>
                <button className='btn btn-danger' onClick={() => this.confirm(this.props.onClick)}>
                    <i className="fa fa-times"></i>
                </button>
            </span>
        )
    }
}

export class AddButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <button style={styles.pageButton} className='btn btn-primary' onClick={() => this.props.onClick()}>
                <i className="fa fa-plus-circle"></i>
                <span> Add new</span> 
            </button>
        );
    }
}

export class SaveButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <button style={styles.pageButton} className='btn btn-primary' onClick={() => this.props.onClick()}>
                <i className="fa fa-save"></i>
                <span> Save</span> 
            </button>
        );
    }
}

export class CancelButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <button style={styles.pageButton} className='btn btn-danger' onClick={() => this.props.onClick()}>
                <i className="fa fa-ban"></i>
                <span> Cancel</span> 
            </button>
        );
    }
}

const styles = {
    pageButton: {
        marginTop: 10,
        marginBottom: 10
    }
}