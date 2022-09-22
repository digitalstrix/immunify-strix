import React from "react";
import { useSnackbar } from "notistack";
import Table from "../../../../../common/components/Admin/Table";
import LocalAtmOutlinedIcon from "@material-ui/icons/LocalAtmOutlined";
import { Button } from "@material-ui/core";

const Datatable = () => {
  const { enqueueSnackbar } = useSnackbar();

  const AddSuccessMsg = "Payment Settled Successfully!";
  return (
    <div>
      <Table
        title=""
        columns={[
          { title: "Doctor Name", field: "doctor_name" },
          { title: "Email", field: "email" },
          { title: "Contact", field: "contact" },
          { title: "Registration Number", field: "registration_number" },
          { title: "Amount", field: "amount" },
          { title: "Status", field: "status" },
        ]}
        data={[
          {
            doctor_name: "Doc01",
            email: "doc01@gmail.com",
            contact: "+94 70128972677",
            registration_number: "#279742949239339939",
            amount: "1500",
            status: "PENDING",
          },
          {
            doctor_name: "Doc02",
            email: "doc01@gmail.com",
            contact: "+94 70128972677",
            registration_number: "#279742949239339939",
            amount: "1500",
            status: "PENDING",
          },
          {
            doctor_name: "Doc03",
            email: "doc01@gmail.com",
            contact: "+94 70128972677",
            registration_number: "#279742949239339939",
            amount: "1500",
            status: "PENDING",
          },
          {
            doctor_name: "Doc04",
            email: "doc01@gmail.com",
            contact: "+94 70128972677",
            registration_number: "#279742949239339939",
            amount: "1500",
            status: "PENDING",
          },
        ]}
        actions={[
          {
            icon: "settle",
            tooltip: "Pay User",
            onClick: (event, rowData) =>
              enqueueSnackbar(AddSuccessMsg, {
                variant: "success",
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
              }),
          },
        ]}
        components={{
          Action: (props) => (
            <Button
              onClick={(event) => props.action.onClick(event, props.data)}
              color="inherit"
              variant="contained"
              size="small"
              startIcon={<LocalAtmOutlinedIcon />}
            >
              Settle
            </Button>
          ),
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

export default Datatable;
