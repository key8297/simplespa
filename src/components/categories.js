import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import { Redirect } from 'react-router'

const { Row, Cell } = ReactDataGrid;
let cat = require('../database/mocking');

class CellRenderer extends Component {
  render() {
    switch(this.props.column.key){
      case 'code':
        return <a href={'category/' + this.props.rowData.code}><Cell {...this.props} /> </a>;
      case 'code':
        return <a href={'category/' + this.props.rowData.code}><Cell {...this.props} /> </a>;
      default:
        return <Cell {...this.props} />;
    }
  }
}

class RowRenderer extends React.Component {
  render() {
    return (<Row cellRenderer={CellRenderer} ref="row" {...this.props} />);
  }
}

export default class Categories extends Component {
  constructor(props, context) {
    super(props, context);
    this.createRows();
    this._columns = [
      { key: 'code', name: 'Code' },
      { key: 'description', name: 'Description' },
      { key: 'active', name: 'Active' },
      { key: 'delete', name: 'Action' }
    ];

    this.state = {
      createNew: false
    };

    this.createNew = this.createNew.bind(this);    
  }

  createRows = () => {
    this._rows = cat.getCategories();
  };

  rowGetter = (i) => {
    return this._rows[i];
  };

  getCellActions(column, row) {
    return [
      {
        icon: 'glyphicon glyphicon-link',
        actions: [
          {
            text: 'Campaign Linking',
            callback: () => { console.log(`${row} - ${column}`); }
          }
        ]
      }
    ];
  }

  createNew() {
    this.setState({ createNew: true });
  }

  render() {

    if (this.state.createNew) {
      return (<Redirect to='/category' />);
    }

    return (
      <div>
        <button className="btn btn-info" onClick={this.createNew}>New category</button>
        <ReactDataGrid
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this._rows.length}
          minHeight={500}
          getCellActions={getCellActions}
          rowRenderer={RowRenderer} />
      </div>
    );
  }

}