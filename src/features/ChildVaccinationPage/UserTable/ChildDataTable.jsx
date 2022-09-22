import React from "react";

import { withRouter } from "react-router-dom";
import Table from "../../../common/components/Table";

import info from "../../../assets/icons/Information.svg";

const InfoIcon = () => (
  <img src={info} width="24" height="24" alt="child info icon" />
);

const Childdatatable = (props) => {
  return (
    <div>
      <Table
        title="Child Details"
        columns={[
          { title: "Child Name", field: "name" },
          {
            title: "Registraion Number",
            field: "id",
          },
          {
            title: "Age",
            field: "age",
          },
          {
            title: "Date Registered",
            field: "createdAt",
          },
        ]}
        data={props.data}
        options={{
          search: false,
          actionsColumnIndex: -1,
          exportButton: true,
          emptyRowsWhenPaging: false,
          paging: false,
        }}
        actions={[
          {
            icon: InfoIcon,
            tooltip: "Child Vaccination Info",
            onClick: () => props.history.push("/childinfo"),
          },
        ]}
        rowClick={(event, rowData, togglePanel) => {
          props.history.push("/childinfo");
        }}
      />
    </div>
  );
};

export default withRouter(Childdatatable);
