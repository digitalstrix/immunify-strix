import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  makeStyles,
  Tooltip,
  IconButton,
  Button,
  Grid,
  Divider
} from "@material-ui/core";
import Table from "../../../../../../common/components/Admin/Table";
import edit from "../../../../../../assets/icons/Edit.svg";
import add from "../../../../../../assets/icons/Add.svg";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ConsultaionPlan from "../../../../../../common/components/Admin/Dialog";
import DetailDialog from "./DetailDialog";
import { formatConsultationPlan } from '../../../../../../utils/doctorListUtils';
import { removeArrayElement } from '../../../../../../utils/commonUtils';

const AddIcon = () => (
  <img src={add} width="24" height="24" alt="child info icon" />
);

const EditIcon = () => (
  <img src={edit} width="24" height="24" alt="child info icon" />
);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
    margin: theme.spacing(2),
  },
}));

const Index = ({ updateAction, values, errorProps, updateErrorProps, appointmentTypes, isUpdate = false }) => {

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const data = useMemo(() => formatConsultationPlan(values), [values]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ConsultaionPlan
        tooltip="Edit"
        dialogtitle="Edit Plan Information"
        dialogcontent={
          <DetailDialog
            updateAction={updateAction}
            values={values}
            errorProps={errorProps}
            updateErrorProps={updateErrorProps}
            setOpenDialog={setOpen}
            selected={selected}
            setSelected={setSelected}
            appointmentTypes={appointmentTypes}
            isUpdate={isUpdate}
            addedAppointmentData={data}
          />
        }
        maxWidth="sm"
        open={open}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
      />
      <Grid container justify="center">
        <Box>
          <Table
            title="Consultation Plans"
            columns={[
              { title: "Type of Appointment", field: "appoinment" },
              { title: "Amount (INR)", field: "amount"},
            ]}
            data={data}
            actions={[
              {
                icon: "edit",
                onClick: (event, rowData) => {
                  console.log("this is clikkkkkkkkking");
                  alert(
                    "this onclick wpnt do anything,remove & check console" +
                      rowData.name
                  );
                },
              },
              {
                icon: "add",
                tooltip: "add plan",
                isFreeAction: true,
                onClick: (event, rowData) =>
                  alert(
                    "this onclick wpnt do anything,remove & check console " +
                      rowData.name
                  ),
              },
              {
                icon: "delete",
                tooltip: "delete plan",
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
                  case "edit":
                    return (
                      <Tooltip title={"Edit"}>
                        <IconButton
                          onClick={() => {
                            setSelected(props.data);
                            setOpen(true);
                          }}
                          disabled={false}
                          color="inherit"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    );
                  case "add":
                    return (
                      <Tooltip title={"Add New Plan"}>
                        <Button
                          variant="contained"
                          color="inherit"
                          className={classes.button}
                          onClick={() => setOpen(true)}
                          startIcon={<AddIcon />}
                        >
                          Add a Plan
                        </Button>
                      </Tooltip>
                    );
                  case "delete":
                    return (
                      <Tooltip title={"Delete"}>
                        <IconButton
                          onClick={() => {
                            const { id: index } = props.data.tableData;
                              updateAction(removeArrayElement(values, index));
                          }}
                          disabled={false}
                          color="inherit"
                        >
                          <DeleteOutline />
                        </IconButton>
                      </Tooltip>
                    );
                  default:
                    break;
                }
              },
            }}
            options={{
              loadingType: "overlay",
              showEmptyDataSourceMessage: true,
              search: false,
              actionsColumnIndex: -1,
            }}
          />
        </Box>
        {/* {
          isUpdate && (
            <React.Fragment>
              <Divider />
              <Box display="flex" justifyContent="end" m={2}>
                <Button variant="contained" color="primary">
                  Save Changes
                </Button>
              </Box>
            </React.Fragment>
          )
        } */}
      </Grid>
    </div>
  );
};

export default Index;
