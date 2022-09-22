import React, { useEffect, useState } from "react";
import {useDispatch} from 'react-redux';
import Table from "../../../../../common/components/Admin/Table";
import Dialog from "../../../../../common/components/Admin/Dialog";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import RestoreFromTrash from '@material-ui/icons/RestoreFromTrash';
import { approveDoctor, removeDoctor } from "../doctorApprovalSlice";
import { Typography, Box, Grid, Button } from "@material-ui/core";

const Doctorapprovaldatatable = ({ data }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [deleteData, setDeleteData] = useState();

  return (
    <div>
      <Dialog
        tooltip={"Delete"}
        dialogtitle={"Warning"}
        dialogcontent={
          (
            <Box p={3}>
              <Grid container row spacing={3}>
                <Grid item xs={12}>
                  <Typography>
                    You want to delete this user?
                  </Typography>
                </Grid>
                <Button
                  onClick={() => {
                    dispatch(removeDoctor(deleteData));
                    setOpen(false);
                  }}
                >
                  Yes, Delete it!
                </Button>
              </Grid>
            </Box>
          )
        }
        maxWidth="sm"
        open={open}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
      />
      <Table
        title=""
        columns={[
          { title: "Doctor Name", field: "firstName" },
          { title: "Email", field: "email" },
          { title: "Contact", field: "contact" },
          { title: "Registration Number", field: "registrationNumber" },
          { title: "Specialization", field: "specialization" },
          { title: "City", field: "city" },
          { title: "State", field: "state" },
        ]}
        data={data}
        actions={[
          {
            icon: CheckOutlinedIcon,
            tooltip: "Approve User",
            onClick: (event, rowData) => {
              dispatch(approveDoctor({ personId: rowData.personId }));
            },
          },
          {
            icon: RestoreFromTrash,
            tooltip: "Remove User",
            onClick: (event, rowData) => {
              setDeleteData({ personId: rowData.personId, userType: 'DOCTOR' })
              setDialogType("CONFIRM_DELETE");
              setOpen(true);
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

export default Doctorapprovaldatatable;
