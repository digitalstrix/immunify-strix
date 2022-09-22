import React from "react";
import Table from "../../../common/components/Table";
import Branchdetaildialog from "./BranchDetailDialog";
import MainDialog from "../../../common/components/Dialog";

import IconButton from "@material-ui/core/IconButton";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import CompareOutlinedIcon from "@material-ui/icons/ShuffleOutlined";
import { Tooltip } from "@material-ui/core";

const TableSummary = () => {
  return (
    <div>
      <Table
        title={null}
        data={[
          {
            branch: "Kandy",
            vaccination: "Baran",
            qr_codes: 1987,
          },
          {
            branch: "Kegalle",
            vaccination: "Baran",
            qr_codes: 1987,
          },
          {
            branch: "NuwaraEliya",
            vaccination: "Baran",
            qr_codes: 1987,
          },
          {
            branch: "Bandarawela",
            vaccination: "Baran",
            qr_codes: 1987,
          },
          {
            branch: "Badulla",
            vaccination: "Baran",
            qr_codes: 1987,
          },
          {
            branch: "Mehmet",
            vaccination: "Baran",
            qr_codes: 1987,
          },
          {
            branch: "Mehmet",
            vaccination: "Baran",
            qr_codes: 1987,
          },
        ]}
        columns={[
          { title: "Branch", field: "branch" },
          { title: "Vaccination", field: "vaccination" },
          { title: "Total QR Codes", field: "qr_codes", type: "numeric" },
        ]}
        actions={[
          {
            icon: "view",
            onClick: (event, rowData) =>
              alert(
                "this onclick wpnt do anything,remove & check console" +
                  rowData.name
              ),
          },
          {
            icon: "compare",
            tooltip: "Save User",
            onClick: (event, rowData) =>
              alert(
                "this onclick wpnt do anything,remove & check console " +
                  rowData.name
              ),
          },
        ]}
        components={{
          Action: (props) => {
            switch (props.action.icon) {
              case "view":
                return (
                  <MainDialog
                    isiconbtn={true}
                    btnicon={<VisibilityOutlinedIcon />}
                    tooltip="View"
                    dialogtitle="Branch Inoformation"
                    dialogcontent={<Branchdetaildialog />}
                    dialogaction={() => {
                      alert("You Click Closed ");
                    }}
                    dialogactiontitle="Close"
                    maxWidth="sm"
                  />
                );
              case "compare":
                return (
                  <Tooltip title="Compare">
                    <IconButton aria-label="compare" color="inherit">
                      <CompareOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                );

              default:
                break;
            }
          },
        }}
        options={{ actionsColumnIndex: -1, exportButton: true }}
      />
    </div>
  );
};

export default TableSummary;
