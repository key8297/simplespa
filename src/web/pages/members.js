import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Redirect } from 'react-router';
import { AddButton, DeleteButton} from '../components/buttons'
import "react-table/react-table.css";
let db = require('../database/mocking');

export default class Members extends Component {

  constructor(props) {
    super(props);

    this.columns = [
      { accessor: '_id', show: false },
      {
        Cell: (cellProps) => {
          return <DeleteButton onClick={() => this.delete(cellProps.original._id)} />
        },
        width: 50
      },
      { accessor: 'code', Header: 'Code' },
      {
        accessor: 'name',
        Header: 'Name',
        Cell: (cellProps) => {
          return <a href='#' onClick={() => this.setState({edit:cellProps.original._id})} >{cellProps.original.name}</a>
        }
      },
      { accessor: 'email', Header: 'Email' },
      { accessor: 'phone', Header: 'Phone number' },
      { accessor: 'website', Header: 'Web site' },
    ];

    this.state = {
      members: [],
      edit:'',
      createNew: false
    };

    this.createNew = this.createNew.bind(this);
    this.delete = this.delete.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentWillMount(){
    this.refresh();
  }

  refresh() {
    db.getAccounts()
    .then(members => this.setState({members}));
  }

  createNew() {
    this.setState({ createNew: true });
  }

  delete(id) {
    //console.log(id);
    db.deleteAccount(id);
    this.refresh();
  }

  render() {

    if(this.state.edit){
      return (<Redirect to={'/member/' + this.state.edit} />);
    }

    if (this.state.createNew) {
      return (<Redirect to='/member' />);
    }

    return (
      <div>
        <AddButton onClick={this.createNew} />
        <AddButton onClick={() => { localStorage.clear(); this.refresh() }} />

        <ReactTable
          data={this.state.members}
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