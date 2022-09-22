import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Divider,
  Switch,
  FormControl,
  FormGroup,
  Grow,
} from "@material-ui/core";
import Chart from "../../../../common/components/Chart";
import Table from "../../../../common/components/Table";
import Dialog from "../../../../common/components/Admin/Dialog";
import GrowthDialog from "./GrowthDialog";
import DeleteDialog from "./DeleteDialog";
import {
  generateGrowthDatasets,
  generateLabels,
} from "../../../../utils/growthUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedChildInfo,
  selectStdGraphs,
  selectHeightInfo,
  selectWeightInfo,
  selectHcwInfo,
} from "../selector";
import {
  selectAddGrowthStatus,
  selectAddGrowthError,
  selectGrowthFetchingStatus,
  selectGrowthFetchingError,
  selectHeightRawData,
  selectWeightRawData,
  selectHcRawData,
  selectGrowthInfoDeletingStatus,
  selectGrowthInfoDeletingError,
} from "./selector";
import { notify } from "../../../../utils/commonUtils";
import { useSnackbar } from "notistack";
import { getSelectedChildGrowthInfo } from "./ParentSideChildGrowthSlice";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { excuteAfterGivenDelay } from "../../../../utils/commonUtils";
import EditGrowthdialog from "./EditGrowthDialog";

const Index = ({}) => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [measurement, setMeasurement] = useState("height");
  const [isDataView, setIsDataView] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [dialogType, setDialogType] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const fetchingStatus = useSelector(selectGrowthFetchingStatus);
  const fetchingError = useSelector(selectGrowthFetchingError);
  const addingStatus = useSelector(selectAddGrowthStatus);
  const addingError = useSelector(selectAddGrowthError);
  const stdGraphs = useSelector(selectStdGraphs);
  const heightInfo = useSelector(selectHeightInfo);
  const weightInfo = useSelector(selectWeightInfo);
  const hcwInfo = useSelector(selectHcwInfo);
  const selectedChildData = useSelector(getSelectedChildInfo);

  const deletingStatus = useSelector(selectGrowthInfoDeletingStatus);
  const deletingError = useSelector(selectGrowthInfoDeletingError);

  const originalHeightData = useSelector(selectHeightRawData);
  const originalWeightData = useSelector(selectWeightRawData);
  const originalHcData = useSelector(selectHcRawData);

  const getTableData = () => {
    if (measurement === "height") {
      return originalHeightData;
    } else if (measurement === "weight") {
      return originalWeightData;
    } else {
      return originalHcData;
    }
  };

  const getDataColumnNameData = () => {
    if (measurement === "height") {
      return 'Height (cm)';
    } else if (measurement === "weight") {
      return 'Weight (Kg)';
    } else {
      return 'Head Circumference (cm)';
    }
  };

  const ADDING_SUCCESSFUL_MSG = "Growth Data Updated Successfully!";
  const ADDING_FAILURE_MSG = "Growth Data Updating Failed!";
  const FETCHING_FAILURE_MSG = "Growth Data Fetching Failed!";
  const DELETING_SUCCESSFUL_MSG = "Growth Data Deleted Successfully!";
  const DELETING_FAILURE_MSG = "Growth Data Deleting Failed!";

  useEffect(() => {
    if (fetchingStatus === "failed") {
      notify(enqueueSnackbar, FETCHING_FAILURE_MSG, "error");
    }
  }, [fetchingStatus, fetchingError, enqueueSnackbar]);

  useEffect(() => {
    if (deletingStatus === "succeeded") {
      setOpenDialog(false);
      setMeasurement("height");
      dispatch(getSelectedChildGrowthInfo(selectedChildData.id));
      notify(enqueueSnackbar, DELETING_SUCCESSFUL_MSG);
    } else if (deletingStatus === "failed") {
      setOpenDialog(false);
      setMeasurement("height");
      notify(enqueueSnackbar, DELETING_FAILURE_MSG, "error");
    }
  }, [deletingStatus, deletingError, enqueueSnackbar]);

  useEffect(() => {
    if (addingStatus === "succeeded") {
      setOpenDialog(false);
      setMeasurement("height");
      dispatch(getSelectedChildGrowthInfo(selectedChildData.id));
      notify(enqueueSnackbar, ADDING_SUCCESSFUL_MSG);
    } else if (addingStatus === "failed") {
      setOpenDialog(false);
      setMeasurement("height");
      notify(enqueueSnackbar, ADDING_FAILURE_MSG, "error");
    }
  }, [addingStatus, addingError, enqueueSnackbar]);

  const datasetsHeight = useMemo(() => {
    const generated = generateGrowthDatasets(
      stdGraphs,
      heightInfo,
      measurement
    );
    const childGrowth = generated[7];
    if (childGrowth && childGrowth.data) {
      childGrowth.data = childGrowth.data.slice();
    }
    return generated;
  }, [stdGraphs, heightInfo, measurement]);
  const datasetsWeight = useMemo(() => {
    const generated = generateGrowthDatasets(
      stdGraphs,
      weightInfo,
      measurement
    );
    const childGrowth = generated[7];
    if (childGrowth && childGrowth.data) {
      childGrowth.data = childGrowth.data.slice();
    }
    return generated;
  }, [stdGraphs, weightInfo, measurement]);
  const datasetsHcw = useMemo(() => {
    const generated = generateGrowthDatasets(stdGraphs, hcwInfo, measurement);
    const childGrowth = generated[7];
    if (childGrowth && childGrowth.data) {
      childGrowth.data = childGrowth.data.slice();
    }
    return generated;
  }, [stdGraphs, hcwInfo, measurement]);
  const labels = useMemo(
    () => generateLabels(stdGraphs, measurement),
    [stdGraphs, measurement]
  );

  const measurementReturnDataSet = (measurement) => {
    if (measurement === "height") {
      return datasetsHeight;
    } else if (measurement === "weight") {
      return datasetsWeight;
    } else {
      return datasetsHcw;
    }
  };

  const getDialogType = () => {
    switch (dialogType) {
      case "EDIT":
        return (
          <EditGrowthdialog
            measurement={measurement}
            selectedChildData={selectedChildData}
            selectedDataObject={selectedItem}
          />
        );
        break;
      case "DELETE":
        return <DeleteDialog data={selectedItem} />;
        break;
      case "ADD":
        return (
          <GrowthDialog
            measurement={measurement}
            selectedChildData={selectedChildData}
          />
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (openDialog === false) {
      excuteAfterGivenDelay(() => setDialogType(null), 100);
    }
  }, [openDialog]);

  return (
    <div>
      <Dialog
        dialogtitle="Child Growth Details"
        dialogcontent={getDialogType()}
        maxWidth="sm"
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleOpen={() => setOpenDialog(true)}
      />
      <Box m={3}>
        <Box mt={3}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item justifyContent="flex-start">
              <RadioGroup
                row
                aria-label="measurement"
                name="measurement"
                value={measurement}
                onChange={({ target: { value } }) => {
                  setMeasurement(value);
                }}
              >
                <FormControlLabel
                  value="height"
                  control={<Radio color="primary" />}
                  label="Height"
                />
                <FormControlLabel
                  value="weight"
                  control={<Radio color="primary" />}
                  label="Weight"
                />
                <FormControlLabel
                  value="hcw"
                  control={<Radio color="primary" />}
                  label="Head Circumference"
                />
              </RadioGroup>
            </Grid>
            <Grid item justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setDialogType("ADD");
                  setOpenDialog(true);
                }}
              >
                Add Growth Details
              </Button>
            </Grid>
          </Grid>
          <Grid item justifyContent="flex-start">
            <br />
            <Divider variant="full" />
            <br />
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="start"
                  control={
                    <Switch
                      color="primary"
                      value={isDataView}
                      onChange={() => setIsDataView(!isDataView)}
                    />
                  }
                  label="Chart View"
                  labelPlacement="start"
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Box>
        <br />
        {isDataView ? (
          <Grow in={isDataView}>
            <Table
              title=""
              columns={[
                { title: "Date", field: "date" },
                { title: getDataColumnNameData(), field: measurement },
              ]}
              data={getTableData() || []}
              actions={[
                {
                  icon: EditOutlinedIcon,
                  tooltip: "Edit User",
                  onClick: (event, rowData) => {
                    setDialogType("EDIT");
                    setSelectedItem(rowData);
                    setOpenDialog(true);
                  },
                },
                {
                  icon: DeleteOutlinedIcon,
                  tooltip: "Delete User",
                  onClick: (event, rowData) => {
                    setDialogType("DELETE");
                    setSelectedItem(rowData);
                    setOpenDialog(true);
                  },
                },
              ]}
              options={{
                loadingType: "overlay",
                showEmptyDataSourceMessage: true,
                headerStyle: { fontWeight: "bold" },
                pageSize: 5,
                actionsColumnIndex: -1,
                search: false,
              }}
            />
          </Grow>
        ) : (
          <Grow in={!isDataView}>
            <Box m={3}>
              <Chart
                graphtype={"Line"}
                labels={labels}
                datasets={measurementReturnDataSet(measurement)}
                options={{
                  fill: false,
                }}
              />
            </Box>
          </Grow>
        )}
      </Box>
    </div>
  );
};

export default Index;
