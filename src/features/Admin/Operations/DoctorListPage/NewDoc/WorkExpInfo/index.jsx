import React, { useState, useMemo, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { removeArrayElement } from '../../../../../../utils/commonUtils';
import { formatWorkExp } from '../../../../../../utils/doctorListUtils';


import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@material-ui/core";
import Table from "../../../../../../common/components/Table";
import Dialog from "../../../../../../common/components/Admin/Dialog";
import WorkExpInfo from "./WorkExpInfo";

import edit from "../../../../../../assets/icons/Edit.svg";
import remove from "../../../../../../assets/icons/Remove.svg";

const EditIcon = () => (
  <img src={edit} width="24" height="24" alt="child info icon" />
);
const RemoveIcon = () => (
  <img src={remove} width="24" height="24" alt="child info icon" />
);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

const Index = ({ updateAction, values, errorProps, updateErrorProps, isUpdate = false }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const formattedTableData = useMemo(() => formatWorkExp(values), [values]);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dialog
        tooltip="Add Work Experience"
        dialogtitle="Add Work Experience"
        dialogcontent={
        <WorkExpInfo
          updateAction={updateAction}
          values={values}
          errorProps={errorProps}
          updateErrorProps={updateErrorProps}
          setOpenDialog={setOpenDialog}
          selected={selected}
          setSelected={setSelected}
          isUpdate={isUpdate}
        />
        }
        maxWidth="sm"
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleOpen={() => setOpenDialog(true)}
      />
      <Grid container justify="center">
        <Box mt={4}>
          <Grid item md={12}>
            <Table
              title=""
              columns={[
                { title: "Hospital/Clinic Name", field: "hospital" },
                { title: "Hospital/Clinic Address", field: "address" },
                { title: "Date From", field: "start" },
                { title: "Date To", field: "end" },
              ]}
              data={formattedTableData}
              actions={[
                {
                  icon: "Edit",
                  onClick: (event, rowData) => {
                    console.log("this is clikkkkkkkkking");
                    alert(
                      "this onclick wpnt do anything,remove & check console" +
                        rowData.name
                    );
                  },
                },
                {
                  icon: "Remove",
                  onClick: (event, rowData) => {
                    console.log("this is clikkkkkkkkking");
                    alert(
                      "this onclick wpnt do anything,remove & check console" +
                        rowData.name
                    );
                  },
                },
                {
                  icon: "Add",
                  onClick: (event, rowData) => {
                    console.log("this is clikkkkkkkkking");
                    alert(
                      "this onclick wpnt do anything,remove & check console" +
                        rowData.name
                    );
                  },
                  isFreeAction: true,
                },
              ]}
              components={{
                Action: (props) => {
                  switch (props.action.icon) {
                    case "Edit":
                      return (
                        <Tooltip title={"Edit"}>
                          <IconButton
                            disabled={false}
                            color="inherit"
                            onClick={() => {
                              setSelected(props.data);
                              setOpenDialog(true);                            
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      );
                    case "Remove":
                      return (
                        <Tooltip title={"Remove"}>
                          <IconButton
                            disabled={false}
                            color="inherit"
                            onClick={() => {
                              const { id: index } = props.data.tableData;
                              updateAction(removeArrayElement(values, index));
                            }}
                          >
                            <RemoveIcon />
                          </IconButton>
                        </Tooltip>
                      );
                    case "Add":
                      return (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => {
                            setOpenDialog(true);
                          }}
                        >
                          Add Work Experience
                        </Button>
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
          </Grid>
        </Box>
      </Grid>
    </div>
  );
};

export default Index;
