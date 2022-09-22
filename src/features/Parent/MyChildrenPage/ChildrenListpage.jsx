import React, { useState, useEffect } from "react";
import MainToolbar from "./MainToolbar";
import Table from "../../../common/components/Table";
import Dialog from "../../../common/components/Admin/Dialog";
import Nutrition from "./Nutrition";
import HealthFiles from "./HealthFiles";
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Breadcrumbs,
  Typography,
  Link,
  Avatar as DefaultAvatar,
} from "@material-ui/core";
import Avatar from "../../../common/components/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyChildren,
  getMyChildrenQRCodesAsync,
  getMyChildrenServicePlans,
  getSingleChildInfo,
} from "./myChildrenSlice";
import { getBasicProfileData } from "../MyAccountPage/parentProfileSlice";
import { notify } from "../../../utils/commonUtils";
import { useSnackbar } from "notistack";

import Information from "../../../assets/icons/Information.svg";
import Edit from "../../../assets/icons/Edit.svg";
import qrIcon from "@material-ui/icons/CropFreeTwoTone";
import nutrIcon from "@material-ui/icons/RestaurantTwoTone";
import {
  getLoggedInUserId,
  getmyChildren,
  selectUpdateChildStatus,
  selectUpdateChildError,
  selectAddChildStatus,
} from "./selector";
import { EditChildDetails, QrValue } from "./ChildDetails/EditChild.jsx";

const InformationIcon = () => (
  <img src={Information} width="24" height="24" alt="child info icon" />
);

const EditIcon = (props) => (
  <img src={Edit} width="24" height="24" alt="child info icon" />
);

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  avatar: {
    backgroundColor: "grey",
    width: 48,
    height: 48,
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const Index = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const parentId = useSelector(getLoggedInUserId);
  const updatingStatus = useSelector(selectUpdateChildStatus);
  const updatingError = useSelector(selectUpdateChildError);
  const addingStatus = useSelector(selectAddChildStatus);
  const myChildren = useSelector(getmyChildren);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [value, setValue] = useState({});

  const EDIT_CHILD_SUCCEESFUL_MSG = "Child Data Updated Successfully!";
  const EDIT_CHILD_FAILURE_MSG = "Child Data Updating Failed!";

  const classes = useStyles();
  const cName = "Edit Child - (" + value.name + ")";
  const nPlan = "Nutrition Plan for - (" + value.name + ")";

  useEffect(() => {
    if (updatingStatus === "succeeded") {
      setDialogType(null);
      setOpenDialog("");
      notify(enqueueSnackbar, EDIT_CHILD_SUCCEESFUL_MSG);
    } else if (updatingStatus === "failed") {
      setDialogType(null);
      setOpenDialog("");
      notify(enqueueSnackbar, EDIT_CHILD_FAILURE_MSG, "error");
    }
  }, [updatingStatus, updatingError, enqueueSnackbar]);

  useEffect(() => {
    dispatch(getMyChildrenServicePlans({ parentImmId: parentId }));
    dispatch(getBasicProfileData({ parentId }));
    dispatch(getMyChildren({ parentId }));
    dispatch(getMyChildrenQRCodesAsync(parentId));
  }, [dispatch, addingStatus]);

  return (
    <>
      <Dialog
        tooltip={
          dialogType === "Edit"
            ? "Edit Child"
            : dialogType === "Qr"
            ? "QR Code"
            : dialogType === "Nutritions"
            ? "Nutritions"
            : null
        }
        dialogtitle={
          dialogType === "Edit"
            ? cName
            : dialogType === "Qr"
            ? "QR Code"
            : dialogType === "Nutritions"
            ? nPlan
            : null
        }
        dialogcontent={
          dialogType === "Edit" ? (
            <EditChildDetails data={value} />
          ) : dialogType === "Qr" ? (
            <QrValue data={value} />
          ) : dialogType === "Nutritions" ? (
            <Nutrition data={value} />
          ) : null
        }
        maxWidth={
          dialogType === "Edit"
            ? "sm"
            : dialogType === "Qr"
            ? "xs"
            : dialogType === "Nutritions"
            ? "xs"
            : null
        }
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
              <Typography color="textPrimary">Children List</Typography>
            </Breadcrumbs>
          }
        />
        <Box display="flex" justifyContent="center" mt={4}>
          <Grid item xs={12} md={10}>
            <Table
              title=""
              columns={[
                {
                  title: "Avatar",
                  field: "imageUrl",
                  render: (rowData) =>
                    rowData.singedUrl ? (
                      <Avatar picture={rowData.singedUrl} />
                    ) : (
                      <DefaultAvatar className={classes.purple}>
                        {rowData.firstName.charAt(0)}
                      </DefaultAvatar>
                    ),
                },
                {
                  title: "Baby Name",
                  render: (rowData) =>
                    `${rowData.firstName || ""} ${rowData.middleName || ""} ${
                      rowData.lastName || ""
                    }`,
                },
                { title: "Hospital", field: "hospital" },
                {
                  title: "Age",
                  field: "age",
                },
              ]}
              data={myChildren}
              detailPanel={(rowData) => {
                return <HealthFiles data={rowData} />;
              }}
              actions={[
                {
                  icon: InformationIcon,
                  tooltip: "View Informations",
                  onClick: (event, rowData) => {
                    props.history.push({
                      pathname: "/childinfoPage",
                      search: "",
                      state: rowData,
                    });
                  },
                },
                {
                  icon: EditIcon,
                  tooltip: "Edit Info",
                  onClick: (event, rowData) => {
                    setOpenDialog(true);
                    setValue(rowData);
                    setDialogType("Edit");
                  },
                },
                {
                  icon: qrIcon,
                  tooltip: "Qr Code",
                  onClick: (event, rowData) => {
                    setOpenDialog(true);
                    setValue(rowData);
                    setDialogType("Qr");
                  },
                },
                {
                  icon: nutrIcon,
                  tooltip: "Nutritions",
                  onClick: (event, rowData) => {
                    dispatch(getSingleChildInfo({ childId: rowData.id }));
                    setOpenDialog(true);
                    setValue(rowData);
                    setDialogType("Nutritions");
                  },
                },
              ]}
              options={{
                headerStyle: {
                  fontWeight: "bold",
                },
                loadingType: "overlay",
                showEmptyDataSourceMessage: true,
                actionsColumnIndex: -1,
                search: false,
              }}
            />
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default withRouter(Index);
