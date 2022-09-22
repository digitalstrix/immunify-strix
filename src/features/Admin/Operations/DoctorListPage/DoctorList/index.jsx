import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from "notistack";
import Table from "../../../../../common/components/Table";
// import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
// import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Dialog from "../../../../../common/components/Admin/Dialog";
import DoctorDetails from "../DoctorList/DoctorDetails";
import { withRouter } from "react-router";
import {
  IconButton,
  Tooltip,
  // Button,
  // FormControlLabel,  
  // Typography,
  // Switch,
} from "@material-ui/core";
import { notify } from '../../../../../utils/commonUtils';

import { fetchSelectedDoctorInfo, getAppointmentTypes, getSpecializations, getDoctorProfileUrl, setSearchStatus } from '../doctorListSlice';
import { selectSearchStatus } from '../selector';
import edit from "../../../../../assets/icons/Edit.svg";
// import remove from "../../../../../assets/icons/Remove.svg";

const EditIcon = () => (
  <img src={edit} width="24" height="24" alt="child info icon" />
);
// const RemoveIcon = () => (
//   <img src={remove} width="24" height="24" alt="child info icon" />
// );

const SEARCH_SUCCESSFUL_MSG = 'Searching completed!';
const SERACH_FAILED_MSG = 'Seaching failed!';

const Doctorapprovaldatatable = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  // const [state, setState] = React.useState({
  //   checkedA: true,
  //   checkedB: true,
  // });

  const searchStatus = useSelector(selectSearchStatus);

  useEffect(() => {
    dispatch(getAppointmentTypes());
    dispatch(getSpecializations());
  }, [dispatch])

  useEffect(() => {
    if (searchStatus === 'succeeded') {
      notify(enqueueSnackbar, SEARCH_SUCCESSFUL_MSG);
      dispatch(setSearchStatus('idle'));
    } else if (searchStatus === 'failed') {
      notify(enqueueSnackbar, SERACH_FAILED_MSG, 'error');
      dispatch(setSearchStatus('idle'));
    }
  }, [searchStatus, dispatch, enqueueSnackbar]);

  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };

  // const DeleteMsg = "User Deleted Successfully!";

  return (
    <div>
      <Dialog
        tooltip=""
        dialogtitle="Edit Doctor"
        dialogcontent={<DoctorDetails />}
        maxWidth="md"
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleOpen={() => setOpenDialog(true)}
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
        data={props.data}
        emptyDataSourceMessage={'Search the Doctor using the Name'}
        actions={[
          // {
          //   icon: "Toggle",
          //   tooltip: "Enable User",
          //   onClick: (event, rowData) => {
          //     console.log("toggle triggered");
          //   },
          // },
          {
            icon: "Edit",
            tooltip: "Edit Doctor",
            onClick: (event, rowData) => {
              props.history.push("/edit-doctor");
            },
          },
          // {
          //   icon: "Remove",
          //   tooltip: "Remove Doctor",
          //   onClick: (event, rowData) => {
          //     props.history.push("/edit-doctor");
          //   },
          // },
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
                        dispatch(fetchSelectedDoctorInfo(props.data));
                        dispatch(getDoctorProfileUrl({ profilePicture: props.data.profilePicture }));
                        props.action.onClick();
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                );
              // case "Remove":
              //   return (
              //     <Tooltip title={"Remove"}>
              //       <IconButton disabled={false} color="inherit">
              //         <RemoveIcon />
              //       </IconButton>
              //     </Tooltip>
              //   );
              // case "Toggle":
              //   return (
              //     <Switch
              //       checked={state.checkedA}
              //       onChange={handleChange}
              //       name="checkedA"
              //       inputProps={{ "aria-label": "secondary checkbox" }}
              //     />
              //   );
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

export default withRouter(Doctorapprovaldatatable);
