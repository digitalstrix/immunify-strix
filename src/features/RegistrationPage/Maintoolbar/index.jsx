import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";

import Breadcrumb from "./Breadcrumb";
import MainDialog from "../../../common/components/Dialog";
import Parentdetaildialog from "../Parent/ParentDetailDialog";

import AddCircleOutline from "@material-ui/icons/AddCircleOutlineOutlined";
import { useSnackbar } from "notistack";

import {
  createParent,
  setDisplayParentRegDialog,
  updateErrors,
} from "../registrationSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInputs,
  selectChecks,
  selectDisplayParentRegDialog,
  selectCreateParentStatus,
  selectUser,
  getUserType
} from "../selector";
import {
  validateCreateParentPayload,
  generateCreateParentPayload,
  generateParentFormErrors,
} from "../../../utils/registrationUtils";

import { notify } from "../../../utils/commonUtils";

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const inputs = useSelector(selectInputs);
  const checks = useSelector(selectChecks);
  const open = useSelector(selectDisplayParentRegDialog);
  const createParentStatus = useSelector(selectCreateParentStatus);
  const user = useSelector(selectUser);
  const userType = useSelector(getUserType);

  const ADD_PARENT_SUCCESS_MSG = "Parent Added Successfully!";
  const ADD_PARENT_ERROR_MSG =
    "Parent Add Failed, Please verify the fields and try again!";

  useEffect(() => {
    console.log("inside use effect ");

    if (createParentStatus === "succeeded") {
      notify(enqueueSnackbar, ADD_PARENT_SUCCESS_MSG);
      dispatch(setDisplayParentRegDialog(false));
    } else if (createParentStatus === "failed") {
      notify(enqueueSnackbar, ADD_PARENT_ERROR_MSG, "error");
    }
  }, [createParentStatus, enqueueSnackbar, dispatch]);

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Box display="flex" justifyContent="flex-start">
          <Breadcrumb />
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <MainDialog
            isiconbtn={false}
            btnstarticon={<AddCircleOutline />}
            btnlabel="Add New Parent"
            dialogtitle="Add New Parent"
            dialogcontent={<Parentdetaildialog />}
            dialogaction={() => {
              const payload = generateCreateParentPayload(inputs, checks, user);

              if (validateCreateParentPayload(payload, checks)) {
                dispatch(
                  createParent({
                    ...payload,
                    addedBy: user.personId,
                    regType: userType==='VAC_ADMIN'?'VAC_CENTER_ADDED':"DOCTOR_ADDED",
                    userType: "PARENT",
                  })
                );
              } else {
                dispatch(
                  updateErrors(generateParentFormErrors(inputs, checks))
                );
              }

              // enqueueSnackbar(SuccessMsg, {
              //   variant: "success",
              //   anchorOrigin: {
              //     vertical: "top",
              //     horizontal: "center",
              //   },
              // })
            }}
            dialogCloseAction={() => dispatch(setDisplayParentRegDialog(false))}
            dialogOpenAction={() => {
              console.log("triggering");
              dispatch(setDisplayParentRegDialog(true));
            }}
            dialogactiontitle="Add Parent"
            maxWidth="md"
            open={open}
          />
        </Box>
      </Grid>
    </div>
  );
};
Index.propTypes = {
  className: PropTypes.string,
};
export default Index;
