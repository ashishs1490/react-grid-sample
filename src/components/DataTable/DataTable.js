import React, { Component } from "react";
import styles from "./DataTable.module.scss";
import service from "../../service";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-dark.css';
import { Button } from 'react-bootstrap';

import SampleRowDataFactory from "../../shared/SampleRowData";
import ColumnDefinitionFactory from "../../shared/ColumnDefinitions";

class DataTable extends Component {

  constructor() {
    super();

    this.state = {
      // set the columns to use inside the grid
      columnDefs: new ColumnDefinitionFactory().createColDefs(),
      // set the row data to use inside the grid
      rowData: new SampleRowDataFactory().createRowData()
    };

    this.onGridReady = this.onGridReady.bind(this);
    this.refreshCells = this.refreshCells.bind(this);
  }

  onGridReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

  // Throws warning
  refreshCells() {
    this.api.selectAllFiltered();

    this.api.getSelectedRows().forEach(row => row.proficiency = Math.floor(Math.random() * 100) + 1);

    this.api.refreshCells();
  }

  startInterval = () => {
    this.interval = setInterval(() => {
      this.refreshCells();
    }, 1000);
  }

  stopInterval = () => {
    this.api.deselectAll();
    clearInterval(this.interval);
  }

  exportToCSV = () => {
    this.api.exportDataAsCsv({fileName: "data"});
  }

  render() {
    return (
      <div>
        <div style={{ padding: "10px" }}>
          <Button variant="success" className={styles.actionButton} onClick={this.startInterval}>Start Live Data</Button>
          <Button variant="danger" className={styles.actionButton} onClick={this.stopInterval}>Stop Live Data</Button>
          <Button variant="info" className={styles.actionButton}  onClick={this.exportToCSV}>Export Data</Button>
        </div>
        <div style={{ height: 525, width: 1200 }} className="ag-theme-dark">
          <AgGridReact
            // gridOptions is optional - it's possible to provide
            // all values as React props
            gridOptions={this.gridOptions}

            // listening for events
            onGridReady={this.onGridReady}

            // binding to array properties
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}

            // no binding, just providing hard coded strings for the properties
            suppressRowClickSelection="true"
            rowSelection="multiple"
            enableColResize="true"
            enableSorting="true"
            enableFilter="true"
            groupHeaders="true"
            rowHeight="22"
          />
        </div>
      </div>
    );
  }
};

export default DataTable;
