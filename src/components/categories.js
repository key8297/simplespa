import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Redirect } from 'react-router';
import { DeleteButton, AddButton } from './buttons';
import "react-table/react-table.css";
let cat = require('../database/mocking');

export default class Categories extends Component {
  constructor(props, context) {
    super(props, context);
    this.columns = [
      {
        accessor: 'code',
        Header: 'Code',
        Cell: (cellProps) => {
          return <a href={`category/${cellProps.original.code}`}>{cellProps.original.code}</a>
        }
      },
      { accessor: 'description', Header: 'Description' },
      { accessor: 'active', Header: 'Active' },
      {
        accessor: '', Header: 'Action',
        Cell: (cellProps) => {
          return <DeleteButton onClick={() => this.deleteCategory(cellProps.original.code)} />
        }
      }
    ];

    this.data = cat.getCategories();

    this.state = {
      createNew: false
    };

    this.createNew = this.createNew.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  createNew() {
    console.log('CreateNew');
    this.setState({ createNew: true });
  }

  deleteCategory(code) {
    console.log(`Deleting ... ${code}`);
  }

  render() {

    if (this.state.createNew) {
      return (<Redirect to='/category' />);
    }

    return (
      <div>
        <AddButton onClick={this.createNew} />
        {/* <button className="btn btn-info" style={styles.button} onClick={this.createNew}>New category</button> */}
        <ReactTable
          data={this.data}
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