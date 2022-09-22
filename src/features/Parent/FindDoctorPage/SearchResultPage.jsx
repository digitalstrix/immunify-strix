import useAvatar from "../../../assets/img/userAvatar.png";
import React, { useEffect, useState } from "react";
import MainToolbar from "./MainToolbar";
import Table from "../../../common/components/Table";
import Dialog from "../../../common/components/Admin/Dialog";
import AppointmentDetailsFrom from "./AppointmentDetailsFrom";
import { withRouter } from "react-router";
import {
  Breadcrumbs,
  Container,
  makeStyles,
  Typography,
  Link,
  Button,
  Grid,
  Box,
  Avatar,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  getFilteredDoctorList,
  selectSearchingDoctorStatus,
} from "./DocSearchForm/selector.js";
import { setForChild } from "./DocSearchForm/findADoctorSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  paper: {
    padding: 16,
  },
  actionBtn: {
    backgroundColor: "#ece2ff",
    color: "#8F479B",
    textTransform: "none",
    fontWeight: "bold",

    "&:hover": {
      backgroundColor: "#ece2ff",
      color: "#8F479B",
    },
  },
}));

const SearchResultPage = (props) => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState({});
  const classes = useStyles();

  const searchingStatus = useSelector(selectSearchingDoctorStatus);
  const data = useSelector(getFilteredDoctorList);

  useEffect(() => {
    dispatch(setForChild(false));
  }, [openDialog]);

  return (
    <>
      <Dialog
        dialogtitle={"Make an Appointment"}
        dialogcontent={<AppointmentDetailsFrom data={selected} />}
        maxWidth="lg"
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleOpen={() => setOpenDialog(true)}
      />
      <Container maxWidth={true}>
        <MainToolbar
          breadcrumb={
            <Breadcrumbs>
              <Link
                color="inherit"
                href="#"
                onClick={() => props.history.push("/")}
              >
                DashboardPage
              </Link>
              <Link
                color="inherit"
                href="#"
                onClick={() => props.history.push("/docSearch")}
              >
                Doctor Search
              </Link>
              <Typography color="textPrimary">Available Doctors</Typography>
            </Breadcrumbs>
          }
        />
        <Box mt={4}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} md={8}>
              <Table
                title=""
                columns={[
                  {
                    title: "Avatar",
                    field: "profilePicture",
                    render: (rowData) => {
                      return rowData.profilePicture !== "" ? (
                        <img
                          src={rowData.profilePicture}
                          onError={(e) => (e.target.src = useAvatar)}
                          style={{ width: 40, borderRadius: "50%" }}
                          alt="avatar"
                        />
                      ) : (
                        <Avatar style={{ color: "#443266" }}>
                          {rowData.firstName?.charAt(0)}
                        </Avatar>
                      );
                    },
                  },
                  {
                    title: "Name",
                    render: (rowData) =>
                      `Dr ${rowData?.firstName || ""} ${
                        rowData?.lastName || ""
                      }`,
                  },
                  {
                    title: "Fee",
                    render: (rowData) => {
                      let fee = rowData?.min + " - ₹" + rowData?.max;
                      if (rowData?.min == rowData?.max) {
                        fee = rowData?.min;
                      }
                      return `₹ ${fee}`;
                    },
                  },
                  { title: "Speciality", field: "specialization" },
                ]}
                actions={[
                  {
                    icon: "save",
                    tooltip: "Book An Appointment",
                    onClick: (event, rowData) => {
                      props.history.push({
                        pathname: "/make-appointment",
                        state: {
                          ...rowData,
                        },
                      });
                    },
                  },
                ]}
                components={{
                  Action: (props) => (
                    <Button
                      onClick={(event) => {
                        setSelected(props.data);
                        props.action.onClick(event, props.data);
                      }}
                      variant="contained"
                      size="small"
                      className={classes.actionBtn}
                    >
                      Book an Appointment
                    </Button>
                  ),
                }}
                data={data}
                options={{
                  loadingType: "overlay",
                  showEmptyDataSourceMessage: true,
                  search: false,
                  actionsColumnIndex: -1,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default withRouter(SearchResultPage);
