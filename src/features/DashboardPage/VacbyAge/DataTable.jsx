import React from "react";
import Table from "../../../common/components/Table";

const Datatable = () => {
  return (
    <div>
      <Table
        title={null}
        data={[
          {
            branch: "Kandy",
            vaccination_Count: "20",
          },
          {
            branch: "Kegalle",
            vaccination_Count: "20",
          },
          {
            branch: "NuwaraEliya",
            vaccination_Count: "20",
          },
          {
            branch: "Bandarawela",
            vaccination_Count: "20",
          },
          {
            branch: "Badulla",
            vaccination_Count: "20",
          },
          {
            branch: "Mehmet",
            vaccination_Count: "20",
          },
          {
            branch: "Mehmet",
            vaccination_Count: "20",
          },
        ]}
        columns={[
          { title: "Branch", field: "branch" },
          {
            title: "Vaccination Count",
            field: "vaccination_Count",
            type: "numeric",
          },
        ]}
        options={{ actionsColumnIndex: -1, exportButton: true }}
      />
    </div>
  );
};

export default Datatable;
