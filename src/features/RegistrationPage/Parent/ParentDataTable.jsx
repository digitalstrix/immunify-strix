import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  Tooltip,
  Grid,
  IconButton,
  Button,
  TextField,
  Box,
} from "@material-ui/core";

import Table from "../../../common/components/Table";
import Childdatatable from "../Child/ChildDataTable";
import MainDialog from "../../../common/components/Dialog";
import Childdetaildialog from "../Child/ChildDetailDialog";
import Parentdetaildialog from "./ParentDetailDialog";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import {
  setDisplayParentEditDialog,
  setDisplayChildRegDialog,
  initParentFormForUpdate,
  updateParent,
  updateChildFormRelativeId,
  addChild,
  fetchChildren,
  initForm,
  searchParent,
  updateErrors,
  updateChildFromErrors,
} from "../registrationSlice";
import {
  selectDisplayParentEditDialog,
  selectDisplayChildRegDialog,
  selectInputs,
  selectChecks,
  selectUpdateParentStatus,
  selectChildFormRelativeId,
  selectChildFromInputs,
  selectAddChildStatus,
  selectParentSearchStatus,
  selectCountries,
  selectUser,
  getUserType,
} from "../selector";
import {
  generateCreateParentPayload,
  validateCreateParentPayload,
  generateCreateChildPayload,
  validateCreateChildPayload,
  generateParentFormErrors,
  generateChildFormErrors,
} from "../../../utils/registrationUtils";
import { notify } from "../../../utils/commonUtils";

import add from "../../../assets/icons/Add.svg";
import edit from "../../../assets/icons/Edit.svg";

const AddIcon = () => (
  <img src={add} width="24" height="24" alt="child info icon" />
);
const EditIcon = () => (
  <img src={edit} width="24" height="24" alt="child info icon" />
);

const getDialogContent = (openParentEditDialog, openChildRegDialog) => {
  if (openParentEditDialog) {
    return <Parentdetaildialog />;
  }
  if (openChildRegDialog) {
    return <Childdetaildialog />;
  }
  return null;
};

const getToolTip = (openParentEditDialog, openChildRegDialog) => {
  if (openParentEditDialog) {
    return "Edit";
  }
  if (openChildRegDialog) {
    return "Add New Child";
  }
  return null;
};

const getTitle = (openParentEditDialog, openChildRegDialog) => {
  if (openParentEditDialog) {
    return "Edit Parent Information";
  }
  if (openChildRegDialog) {
    return "Add New Child";
  }
  return null;
};

const actionTitle = (openParentEditDialog, openChildRegDialog) => {
  if (openParentEditDialog) {
    return "Update";
  }
  if (openChildRegDialog) {
    return "Add Child";
  }
  return null;
};

const dialogCloseAction = (
  openParentEditDialog,
  openChildRegDialog,
  dispatch
) => {
  if (openParentEditDialog) {
    return () => {
      dispatch(initForm());
      dispatch(setDisplayParentEditDialog(false));
    };
  }

  if (openChildRegDialog) {
    return () => {
      dispatch(initForm("child"));
      dispatch(setDisplayChildRegDialog(false));
    };
  }

  return () => {};
};

const UPDATE_PARENT_SUCCESS_MSG = "Parent Updated Successfully!";
const UPDATE_PARENT_ERROR_MSG = "Parent Update Faild, Please verify the fields and try again!";
const ADD_CHILD_SUCCESS_MSG = "Child Added Successfuly!";
const ADD_CHILD_ERROR_MSG = "Child Add Failed, Please verify the fields and try again!";

const Parentdatatable = ({ parents = [] }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const openParentEditDialog = useSelector(selectDisplayParentEditDialog);
  const openChildRegDialog = useSelector(selectDisplayChildRegDialog);
  const inputs = useSelector(selectInputs);
  const checks = useSelector(selectChecks);
  const updateParentStatus = useSelector(selectUpdateParentStatus);
  const addChildStatus = useSelector(selectAddChildStatus);
  const relativeId = useSelector(selectChildFormRelativeId);
  const childFormInputs = useSelector(selectChildFromInputs);
  const parentSearchStatus = useSelector(selectParentSearchStatus);
  const countries = useSelector(selectCountries);
  const user = useSelector(selectUser);
  const userType = useSelector(getUserType);
  const [query, setQuery] = useState("");

  const dialogAction = (openParentEditDialog, openChildRegDialog, dispatch) => {
    if (openParentEditDialog) {
      return () => {
        const payload = generateCreateParentPayload(inputs, checks, user);
        if (validateCreateParentPayload(payload, checks)) {
          dispatch(updateParent(payload));
        } else {
          dispatch(updateErrors(generateParentFormErrors(inputs, checks)));
        }
      };
    }

    if (openChildRegDialog) {
      return () => {
        const payload = generateCreateChildPayload(
          childFormInputs,
          { relativeId },
          user
        );
        if (validateCreateChildPayload(payload)) {
          dispatch(
            addChild({
              ...payload,
              regType:
                userType === "VAC_ADMIN" ? "VAC_CENTER_ADDED" : "DOCTOR_ADDED",
              addedBy: user.personId,
            })
          );
        } else {
          dispatch(
            updateChildFromErrors(generateChildFormErrors(childFormInputs))
          );
        }
      };
    }

    return () => {};
  };

  useEffect(() => {
    if (updateParentStatus === "succeeded") {
      notify(enqueueSnackbar, UPDATE_PARENT_SUCCESS_MSG);
      dispatch(setDisplayParentEditDialog(false));
    } else if (updateParentStatus === "failed") {
      notify(enqueueSnackbar, UPDATE_PARENT_ERROR_MSG, "error");
    }

    if (addChildStatus === "succeeded") {
      notify(enqueueSnackbar, ADD_CHILD_SUCCESS_MSG);
      dispatch(setDisplayChildRegDialog(false));
    } else if (addChildStatus === "failed") {
      notify(enqueueSnackbar, ADD_CHILD_ERROR_MSG, "error");
    }
  }, [updateParentStatus, addChildStatus, enqueueSnackbar, dispatch]);

  return (
    <div>
      <MainDialog
        btnicon={<EditOutlinedIcon />}
        tooltip={getToolTip(openParentEditDialog, openChildRegDialog)}
        dialogtitle={getTitle(openParentEditDialog, openChildRegDialog)}
        dialogcontent={getDialogContent(
          openParentEditDialog,
          openChildRegDialog
        )}
        dialogaction={dialogAction(
          openParentEditDialog,
          openChildRegDialog,
          dispatch
        )}
        dialogCloseAction={dialogCloseAction(
          openParentEditDialog,
          openChildRegDialog,
          dispatch
        )}
        dialogactiontitle={actionTitle(
          openParentEditDialog,
          openChildRegDialog
        )}
        maxWidth="md"
        open={openParentEditDialog || openChildRegDialog}
      />
      <Box component="span" m={4}>
        <Grid container xs={12} spacing={2}>
          <Grid item lg={4} md={4} xs={12}>
            <TextField
              fullWidth
              label="Search parent by phone number, email or NIC"
              name="firstName"
              size="small"
              onChange={({ target: { value } }) => setQuery(value)}
              // value={query}
              variant="outlined"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (query) {
                    dispatch(searchParent({ query }));
                  }
                }
              }}
            />
          </Grid>
          <Grid item lg={8} md={8} xs={12}>
            <Button
              variant="contained"
              color="primary"
              disabled={parentSearchStatus === "loading"}
              onClick={() => {
                if (query) {
                  dispatch(searchParent({ query }));
                }
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Table
        title="Parent Details"
        columns={[
          { title: "Name", field: "name" },
          { title: "Email Address", field: "email" },
          { title: "ID Number", field: "idNumber", type: "numeric" },
          {
            title: "Mobile Number",
            field: "contact",
            type: "numeric",
          },
        ]}
        data={parents}
        detailPanel={[
          {
            render: (rowData) => {
              dispatch(fetchChildren({ parentId: rowData.id }));
              return <Childdatatable rowData={rowData} />;
            },
          },
        ]}
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
              case "edit":
                return (
                  <Tooltip title={"Edit"}>
                    <IconButton
                      onClick={() => {
                        dispatch(
                          initParentFormForUpdate({
                            data: props.data,
                            countries,
                          })
                        );
                        dispatch(setDisplayParentEditDialog(true));
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
                  <Tooltip title={"Add New Child"}>
                    <IconButton
                      onClick={() => {
                        dispatch(updateChildFormRelativeId(props.data.id));
                        dispatch(setDisplayChildRegDialog(true));
                      }}
                      disabled={false}
                      color="inherit"
                    >
                      <AddIcon />
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
          search: true,
          actionsColumnIndex: -1,
          exportButton: true,
        }}
      />
    </div>
  );
};

export default Parentdatatable;

// actions={[
//   {
//     icon: () => (
//       <MainDialog
//         isiconbtn={true}
//         btnstarticon={<EditOutlinedIcon />}
//         dialogtitle="Edit Parent Information"
//         dialogcontent={<Parentdetaildialog />}
//         dialogaction={() => {
//           alert("You Edited ");
//         }}
//         dialogactiontitle="Update"
//         maxWidth="md"
//       />
//     ),
//     tooltip: "Edit",
//   },
//   {
//     icon: () => (
//       <MainDialog
//         isiconbtn={true}
//         btnstarticon={<AddCircleOutline />}
//         dialogtitle="Add New Child"
//         dialogcontent={<Childdetaildialog />}
//         dialogaction={() => {
//           alert("You Added ");
//         }}
//         dialogactiontitle="Add Child"
//         maxWidth="md"
//       />
//     ),
//     tooltip: "Add a Child",
//   },
// ]}
