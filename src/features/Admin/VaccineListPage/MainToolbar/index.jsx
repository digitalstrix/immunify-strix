import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { Box, Grid, Button } from "@material-ui/core";

import Breadcrumb from "./Breadcrumb";
import MainDialog from "../../../../common/components/Admin/Dialog";
import AddVaccineDialog from "../AddVaccineDialog";
import AddTradenameDialog from "../AddTradenameDialog";
import { notify } from '../../../../utils/commonUtils';
import { selectAddNewVaccineStatus } from '../selector';


const TYPE_ADD_VACCINE = 'ADD_VACCINE';
const TYPE_ADD_TRADENAME = 'ADD_TRADENAME';

const ADD_NEW_VACCINE_SUCCESSFUL_MSG = 'Vaccine added successfully!';
const ADD_NEW_VACCINE_FAILURE_MSG = 'Failed to add new vaccine!';

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [type, setType] = useState(null);
  const [open, setOpen] = useState(false);
  const addVaccineStatus = useSelector(selectAddNewVaccineStatus)

  const SuccessMsg = "Vaccine Added Successfully!";
  const TradenameSuccessMsg = "Tradename Added Successfully!";

  useEffect(() => {
    if (addVaccineStatus === 'succeeded') {
      notify(enqueueSnackbar, ADD_NEW_VACCINE_SUCCESSFUL_MSG);
      setOpen(false);
    } else if (addVaccineStatus === 'failed') {
      notify(enqueueSnackbar, ADD_NEW_VACCINE_FAILURE_MSG, 'error');
    }
  }, [addVaccineStatus, enqueueSnackbar]);

  const dialogContent = () => {
    if (type === TYPE_ADD_VACCINE) {
      return <AddVaccineDialog dialogactiontitle="Add Vaccine" handleClose={() => setOpen(false)} disableAction={addVaccineStatus === 'loading'}/>
    }
    if (type === TYPE_ADD_TRADENAME) {
      return <AddTradenameDialog dialogactiontitle="Add Tradename" handleClose={() => setOpen(false)}/>
    }
    return null;
  };
  

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
            open={open}
            dialogtitle={type === TYPE_ADD_VACCINE ? "Add New Vaccine": "Add New Tradename"}
            dialogcontent={dialogContent()}
            handleOpen={() => setOpen(true)}
            handleClose={() => setOpen(false)} 
            maxWidth="md"
          />
          {/* <Box p={1}>
            <MainDialog
              isiconbtn={false}
              btnlabel="Add New Vaccine"
              dialogtitle="Add New Vaccine"
              dialogcontent={<AddVaccineDialog />}
              // dialogaction={() =>
              //   enqueueSnackbar(SuccessMsg, {
              //     variant: "success",
              //     anchorOrigin: {
              //       vertical: "top",
              //       horizontal: "center",
              //     },
              //   })
              // }
              dialogactiontitle="Add Vaccine"
              maxWidth="md"
            />
          </Box>
          <Box p={1}>
            <MainDialog
              isiconbtn={false}
              btnlabel="Add New TradeName"
              dialogtitle="Add New Vaccine"
              dialogcontent={<AddTradenameDialog />}
              // dialogaction={() =>
              //   enqueueSnackbar(TradenameSuccessMsg, {
              //     variant: "success",
              //     anchorOrigin: {
              //       vertical: "top",
              //       horizontal: "center",
              //     },
              //   })
              // }
              dialogactiontitle="Add Tradename"
              maxWidth="md"
            />
          </Box> */}
          <Box p={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setType(TYPE_ADD_VACCINE);
                setOpen(true);
              }}
            >
              Add New Vaccine
            </Button>
          </Box>
          {/* <Box p={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setType(TYPE_ADD_TRADENAME);
                setOpen(true);
              }}
            >
              Add New Tradename
            </Button>
          </Box> */}
        </Box>
      </Grid>
    </div>
  );
};
Index.propTypes = {
  className: PropTypes.string,
};
export default Index;
