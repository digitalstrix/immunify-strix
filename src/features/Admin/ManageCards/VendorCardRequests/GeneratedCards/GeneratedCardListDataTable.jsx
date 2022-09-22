import React from "react";
import MainDialog from "../../../../../common/components/Admin/Dialog";
import Table from "../../../../../common/components/Admin/Table";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";

import { useSnackbar } from "notistack";
import Printcardsdialog from "./PrintCardsDialog";

const Generatedcardlistdatatable = () => {
  const { enqueueSnackbar } = useSnackbar();

  const UpdateSuccessMsg = "Sent for Printing Successfully!";
  return (
    <div>
      <Table
        title="QR Codes batch Table"
        columns={[
          { title: "Date Allocated", field: "date_allocated", type: "numeric" },
          {
            title: "Batch Allocated",
            field: "batch_allocated",
            type: "numeric",
          },
          { title: "Batch Enabled", field: "batch_enabled", type: "numeric" },
          {
            title: "Batch Start & End id",
            field: "batch_start_and_end_id",
            type: "numeric",
          },
          { title: "Deleted Cards", field: "deleted_cards", type: "numeric" },
        ]}
        data={[
          {
            date_allocated: "2020-12-09",
            batch_allocated: "1",
            batch_enabled: "10",
            batch_start_and_end_id: "011111-0000002995 - 011111-0000003004	",
            deleted_cards: "0",
          },
          {
            date_allocated: "2020-12-09",
            batch_allocated: "10",
            batch_enabled: "10",
            batch_start_and_end_id: "011111-0000002995 - 011111-0000003004	",
            deleted_cards: "0",
          },
          {
            date_allocated: "2020-12-09",
            batch_allocated: "8",
            batch_enabled: "10",
            batch_start_and_end_id: "011111-0000002995 - 011111-0000003004	",
            deleted_cards: "0",
          },
          {
            date_allocated: "2020-12-09",
            batch_allocated: "8",
            batch_enabled: "10",
            batch_start_and_end_id: "011111-0000002995 - 011111-0000003004	",
            deleted_cards: "0",
          },
        ]}
        actions={[
          {
            icon: "cards",
            tooltip: "Print Cards",
            onClick: (event, rowData) =>
              alert("this is " + rowData.shedule_name),
          },
        ]}
        components={{
          Action: (props) => {
            switch (props.action.icon) {
              case "cards":
                return (
                  <MainDialog
                    isiconbtn={true}
                    btnicon={<PrintOutlinedIcon />}
                    tooltip="Print Cards"
                    dialogtitle="Print Cards"
                    dialogcontent={<Printcardsdialog />}
                    dialogaction={() =>
                      enqueueSnackbar(UpdateSuccessMsg, {
                        variant: "success",
                        anchorOrigin: {
                          vertical: "top",
                          horizontal: "center",
                        },
                      })
                    }
                    dialogactiondisable={false}
                    dialogactiontitle="Print"
                    maxWidth="md"
                  />
                );

              default:
                break;
            }
          },
        }}
        options={{
          loadingType: "overlay",
          showEmptyDataSourceMessage: true,
          search: true,
          actionsColumnIndex: -1,
          exportButton: true,
        }}
      />
    </div>
  );
};

export default Generatedcardlistdatatable;
