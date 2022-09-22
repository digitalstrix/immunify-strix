import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { Box, Grid, Button, TextField } from "@material-ui/core";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import QrReader from "../../../common/components/QrReader";
import { fetchChild, initVaccination } from "../vaccinationSlice";
import { initGrowth } from "../growthSlice";
import {
  selectChildFetchingStatus,
  selectChildFetchingError,
  selectParents
} from '../selector';
import { notify } from '../../../utils/commonUtils';

const CHILD_NOT_FOUND_MSG = "Cannot find a child for the given QR Code!";
const CHILD_FETCHING_FAILED = "Failed to get the child information!";

const Index = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const childFetchingStatus = useSelector(selectChildFetchingStatus);
  const childFetchingError = useSelector(selectChildFetchingError);
  const parents = useSelector(selectParents);
  const match =  useRouteMatch();
  const shouldRenderContent = !(match.path === '/child-vaccination' && parents && parents.length === 0); // check whether the possibility of using a hook for calculation optimization
  const dispatch =  useDispatch();

  useEffect(() => {
    if (childFetchingStatus === "failed") {
      if (childFetchingError) {
        notify(enqueueSnackbar, CHILD_FETCHING_FAILED, "error");
      } else {
        notify(enqueueSnackbar, CHILD_NOT_FOUND_MSG, "warning");
      }
    }
  }, [childFetchingStatus, childFetchingError, enqueueSnackbar]);

  if (shouldRenderContent) {
    return (
      <div>
        <QrReader
          isOpen={open}
          closeAction={() => setOpen(false)}
          handleError={() => {}}
          handleScan={(data) => {

            if (data !== null) {
              setOpen(false);
              dispatch(initVaccination());
              dispatch(initGrowth());
              dispatch(fetchChild({
                qrCode: data
              }));
            }
          }}
        />
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Box display="flex" justifyContent="flex-start">
            {props.breadcrumb}
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Grid container spacing={2}>
            <Grid item>
              <TextField
                fullWidth
                label="TYPE QR CODE"
                name="firstName"
                size="small"
                onChange={({target: { value }}) => {
                  setQrCode(value);
                }}
                // onBlur={({ target: { value }}) => {
                //   if (value) {
                //     dispatch(initVaccination({}));
                //     dispatch(initGrowth());
                //     dispatch(fetchChild({
                //       qrCode: value
                //     }));
                //   }                
                // }}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  if (qrCode) {
                    dispatch(initVaccination({}));
                    dispatch(initGrowth());
                    dispatch(fetchChild({
                      qrCode
                    }));
                  }   
                }}
              >
                Search
              </Button>
            </Grid>
            <Grid item>
            OR
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
                startIcon={<CameraAltOutlinedIcon />}
              >
                Scan QR Code
              </Button>
            </Grid>
          </Grid>
          </Box>
        </Grid>
      </div>
    );
  }
  return null;
};
Index.propTypes = {
  className: PropTypes.string,
};
export default Index;

// import React from "react";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import { Box, Grid, Button, Typography, Breadcrumbs } from "@material-ui/core";
// import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";

// function handleClick(event) {
//   event.preventDefault();
//   console.info("You clicked a breadcrumb.");
// }

// const Index = () => {
//   return (
//     <div>
//       <Grid
//         container
//         direction="row"
//         justify="space-between"
//         alignItems="center"
//       >
//         <Box display="flex" justifyContent="flex-start">
//           <Breadcrumbs aria-label="breadcrumb">
//             <Link to="/">DashboardPage</Link>
//             <Link to="/">All Users</Link>
//             <Typography color="textPrimary">Child Vaccination</Typography>
//           </Breadcrumbs>
//         </Box>
//         <Box display="flex" justifyContent="flex-end">
//           <Button
//             variant="outlined"
//             color="primary"
//             startIcon={<CameraAltOutlinedIcon />}
//           >
//             Scan QR Code
//           </Button>
//         </Box>
//       </Grid>
//     </div>
//   );
// };
// Index.propTypes = {
//   className: PropTypes.string,
// };
// export default Index;
