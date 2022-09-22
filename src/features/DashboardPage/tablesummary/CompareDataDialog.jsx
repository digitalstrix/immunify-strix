import React from "react";
import Table from "../../../common/components/Table";

import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

const Comparedatadialog = () => {
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
          {
            title: "Dose Count",
            field: "vaccination_Count",
            type: "numeric",
          },
        ]}
        actions={[
          {
            icon: DeleteOutlinedIcon,
            tooltip: "Remove",
            onClick: (event, rowData) => alert("Remove ? " + rowData.branch),
          },
        ]}
        options={{
          search: false,
          paging: false,
          actionsColumnIndex: -1,
          toolbar: false,
        }}
      />
    </div>
  );
};

export default Comparedatadialog;
