import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { Box, Grid } from "@material-ui/core";

import Breadcrumb from "./Breadcrumb";
import MainDialog from "../../../../common/components/Admin/Dialog";
import AddTemplateDialog from "../AddTemplateDialog";
import { selectAddTemplateStatus } from '../selector';
import { notify } from '../../../../utils/commonUtils';

const TEMPLATE_CREATION_SUCCESS_MSG = "Template Created Successfully!";
const TEMPLATE_CREATION_FAILURE_MSG = "Template Creation Failed!";

const Index = ({ countries, vacNames, vacCenters }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);


  const addTemplateStatus = useSelector(selectAddTemplateStatus);

  useEffect(() => {
    if (addTemplateStatus === 'succeeded') {
      notify(enqueueSnackbar, TEMPLATE_CREATION_SUCCESS_MSG);
      setOpen(false);
    } else if (addTemplateStatus === 'failed') {
      notify(enqueueSnackbar, TEMPLATE_CREATION_FAILURE_MSG, 'error')
    }
  }, [addTemplateStatus, enqueueSnackbar])

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
          <Box p={1}>
            <MainDialog
              open={open}
              isiconbtn={false}
              btnlabel="Add Template"
              dialogtitle="Add New Template"
              dialogcontent={
              <AddTemplateDialog
                dialogactiontitle="Submit"
                handleClose={() => setOpen(false)}
                countries={countries}
                vacNames={vacNames}
                vacCenters={vacCenters}
                disableAction={addTemplateStatus === 'loading'}
              />
              }
              handleOpen={() => setOpen(true)}
              handleClose={() => setOpen(false)}
              maxWidth="md"
            />
          </Box>
        </Box>
      </Grid>
    </div>
  );
};
Index.propTypes = {
  className: PropTypes.string,
};
export default Index;
