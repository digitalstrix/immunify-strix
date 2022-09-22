import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Table from "../../../../common/components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  childScheduleDetails,
  selectManageVacStatus,
  selectManageVacError,
  getSelectedChildInfo,
} from "./selector";
import moment from "moment";
import Dialog from "../../../../common/components/Admin/Dialog";
import Vaccine from "./Vaccine";
import { setSelectedVaccine } from "./ParentSideVaccineSlice";
import { notify } from "../../../../utils/commonUtils";
import { useSnackbar } from "notistack";

const Vaccinated = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const data = useSelector(getSelectedChildInfo);
  const { id, parentId, ChildQRCodes, BirthInformation } = data;
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const raw = useSelector(childScheduleDetails);
  const { vaccinated } = raw;

  vaccinated.sort(function(a,b){
    return new Date(b.vaccinatedDate) - new Date(a.vaccinatedDate)
  })
  
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
              qrCode: ChildQRCodes.find((i) => i.status === "ACTIVE")?.qrCode,
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
        data={vaccinated}
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
            title: "Vaccinated On",
            render: (rowData) =>
              moment(rowData.vaccinatedDate).format("DD MMM YYYY"),
          },
        ]}
        actions={[]}
        options={{ actionsColumnIndex: -1, exportButton: true }}
      />
    </Grid>
  );
};

export default Vaccinated;
