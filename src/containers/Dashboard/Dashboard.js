import React, { Component } from "react";
import styles from "./Dashboard.module.scss";

import DataTable from "../../components/DataTable/DataTable";

class Dashboard extends Component {
  render() {
    return (
      <div className={styles.Warapper}>
        <DataTable />
      </div>
    )
  }
};

export default Dashboard;
