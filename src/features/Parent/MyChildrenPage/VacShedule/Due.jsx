import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Table from "../../../../common/components/Table";
import { useSelector, useDispatch } from "react-redux";
import {
  childScheduleDetails,
  selectManageVacStatus,
  selectManageVacError,
  getSelectedChildInfo,
} from "./selector";
import moment from "moment";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Dialog from "../../../../common/components/Admin/Dialog";
import Vaccine from "./Vaccine";
import { setSelectedVaccine } from "./ParentSideVaccineSlice";
import { notify } from "../../../../utils/commonUtils";
import { useSnackbar } from "notistack";

const Due = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const data = useSelector(getSelectedChildInfo);
  const { id, parentId, ChildQRCodes, BirthInformation } = data;
  const raw = useSelector(childScheduleDetails);
  const { due } = raw;
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const status = useSelector(selectManageVacStatus);
  const error = useSelector(selectManageVacError);
  const MANAGE_VAC_SUCCESS = "Vaccine Updated Successfully!";
  const MANAGE_VAC_FAILURE = "Vaccine Updating Failed!";

  useEffect(() => {
    if (status === "succeeded") {
      setOpenDialog(false);
      notify(enqueueSnackbar, MANAGE_VAC_SUCCESS);
    } else if (status === "failed") {
      setOpenDialog(false);
      notify(enqueueSnackbar, MANAGE_VAC_FAILURE, "error");
    }
  }, [status, error, enqueueSnackbar]);

  return (
    <Grid>
      <Dialog
        tooltip="Vaccine Info"
        dialogtitle="Vaccine Info"
        dialogcontent={
          <Vaccine
            data={{
              ...selected,
              qrCode:
                ChildQRCodes &&
                ChildQRCodes.length > 0 &&
                ChildQRCodes.find((i) => i.status === "ACTIVE")?.qrCode,
              childDob: BirthInformation?.dateOfBirth,
            }}
          />
        }
        maxWidth="sm"
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleOpen={() => setOpenDialog(true)}
      />
      <Table
        title={null}
        data={due}
        rowClick={(event, rowData, togglePanel) => {
          setSelected({ ...rowData, childId: id, parentId });
          dispatch(setSelectedVaccine(rowData.vaccine));
          setOpenDialog(true);
        }}
        columns={[
          { title: "Vaccine", field: "vaccine" },
          { title: "Dose No", field: "doseId", type: "numeric" },
          { title: "Protect Against", field: "protectAgainst", render: (rowData) => rowData?.protectAgainst || <i>N/A</i> },
          {
            title: "Due Date",
            field: "dueDate",
            render: (rowData) => moment(rowData.dueDate).format("YYYY-MM-DD"),
          },
          {
            title: "Catchup Within",
            render: (rowData) =>
              `${moment(rowData.catchupPeriodStart).format(
                "YYYY-MM-DD"
              )} - ${moment(rowData.catchupPeriodEnd).format("YYYY-MM-DD")}`,
          },
          {
            title: "Protect Against",
            render: (rowData) => {
              return (
                <div style={{ width: 50, height: 50 }}>
                  <CircularProgressbarWithChildren
                    value={rowData.percentage}
                    styles={buildStyles({
                      textSize: "16px",
                      pathTransitionDuration: 0.5,
                      pathColor: "purple",
                      textColor: "#f88",
                      trailColor: "#d6d6d6",
                      backgroundColor: "#3e98c7",
                    })}
                  >
                    <div style={{ fontSize: 12 }}>
                      <strong>{rowData.percentage}%</strong>
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
              );
            },
          },
        ]}
        actions={[]}
        options={{ actionsColumnIndex: -1, exportButton: true }}
      />
    </Grid>
  );
};

export default Due;
