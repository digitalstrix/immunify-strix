import React from "react";
import { useSnackbar } from "notistack";
import MainDialog from "../../../../../common/components/Admin/Dialog";
import Table from "../../../../../common/components/Admin/Table";
import GeneratedCardListDataTable from "../GeneratedCards/GeneratedCardListDataTable";

import PlaylistAddOutlinedIcon from "@material-ui/icons/PlaylistAddOutlined";
import Generateqrcodedialog from "./GenerateQrCodeDialog";

const Vaccentercardsdatatable = () => {
  const { enqueueSnackbar } = useSnackbar();

  const UpdateSuccessMsg = "QR Codes Generated Successfully!";
  return (
    <div>
      <Table
        title=""
        columns={[
          { title: "Center Name", field: "center_name" },
          { title: "Vendor Id", field: "vendor_id" },
          { title: "Card Quantity", field: "card_quantity" },

          {
            title: "Order Status",
            field: "order_status",
          },
          {
            title: "Requested Date",
            field: "requested_date",
            type: "numeric",
          },
        ]}
        data={[
          {
            center_name: "SLKandy Center",
            vendor_id: "83v3hhh32h3y23h3u32332gk32g3",
            card_quantity: "100",
            order_status: "Pending",
            requested_date: "2021/01/04",
          },
          {
            center_name: "SLKandy Center2",
            vendor_id: "83v3hhh32h3y23h3u32332gk32g3",
            card_quantity: "100",
            order_status: "Pending",
            requested_date: "2021/01/04",
          },
          {
            center_name: "SLKandy Center3",
            vendor_id: "83v3hhh32h3y23h3u32332gk32g3",
            card_quantity: "100",
            order_status: "Pending",
            requested_date: "2021/01/04",
          },
          {
            center_name: "SLKandy Center4",
            vendor_id: "83v3hhh32h3y23h3u32332gk32g3",
            card_quantity: "100",
            order_status: "Pending",
            requested_date: "2021/01/04",
          },
        ]}
        actions={[
          {
            icon: "qrcode",
            tooltip: "Generate QR Codes",
            onClick: (event, rowData) =>
              alert("this is " + rowData.shedule_name),
          },
        ]}
        components={{
          Action: (props) => {
            switch (props.action.icon) {
              case "qrcode":
                return (
                  <MainDialog
                    isiconbtn={true}
                    btnicon={<PlaylistAddOutlinedIcon />}
                    tooltip="Generate QR Codes"
                    dialogtitle="Generate New QR Codes Batch"
                    dialogcontent={<Generateqrcodedialog />}
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
                    dialogactiontitle="Generate"
                    maxWidth="sm"
                  />
                );

              default:
                break;
            }
          },
        }}
        detailPanel={[
          {
            render: (rowData) => {
              return <GeneratedCardListDataTable rowdata={rowData} />;
            },
          },
        ]}
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

export default Vaccentercardsdatatable;
