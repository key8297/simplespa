import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Redirect } from 'react-router';
import { AddButton, DeleteButton} from '../components/buttons'
import "react-table/react-table.css";
let db = require('../database/mocking');

export default class Accounts extends Component {

  constructor(props) {
    super(props);

    this.columns = [
      { accessor: 'id', show: false },
      {
        Cell: (cellProps) => {
          return <DeleteButton onClick={() => this.delete(account => account.id)} />
        },
        width: 50
      },
      {
        accessor: 'name',
        Header: 'Name',
        Cell: (cellProps) => {
          return <a href={`account/${cellProps.original.id}`}>{cellProps.original.name}</a>
        }
      },
      { accessor: 'email', Header: 'Email' },
      { accessor: 'phone', Header: 'Phone number' },
      { accessor: 'website', Header: 'Web site' },
    ];

    this.state = {
      accounts: [],
      createNew: false
    };

    this.state.accounts = db.getAccounts();
    this.createNew = this.createNew.bind(this);
    this.delete = this.delete.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    let accounts = db.getAccounts();
    this.setState({ accounts });
  }

  createNew() {
    this.setState({ createNew: true });
  }

  delete(id) {
    db.deleteAccount(id);
    this.refresh();
  }

  render() {

    if (this.state.createNew) {
      return (<Redirect to='/account' />);
    }

    return (
      <div>
        <AddButton onClick={this.createNew} />
        <AddButton onClick={() => { localStorage.clear(); this.refresh() }} />

        <ReactTable
          data={this.state.accounts}
          columns={this.columns}
          defaultPageSize={10}
          className="-striped -highlight"
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