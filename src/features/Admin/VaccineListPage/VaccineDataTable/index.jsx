import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from "notistack";
import Table from "../../../../common/components/Admin/Table";
import MainDialog from "../../../../common/components/Admin/Dialog";
import AddVaccineDialog from "../AddVaccineDialog";
import AddTradenameDialog from "../AddTradenameDialog";

import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { IconButton, Tooltip } from "@material-ui/core";
import { selectVaccines, selectVaccinesLoadingStatus, selectUpdateVaccineStatus } from '../selector';
import { loadVaccines } from '../vaccineSlice';
import { cloneArray, notify } from '../../../../utils/commonUtils';

const VACCINE_UPDATE_SUCCESSFUL_MSG = 'Vaccine Updated Successfully!';
const VACCINE_UPDATE_FAILURE_MSG = 'Vaccine Update Failure!';

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const vaccines = useSelector(selectVaccines);
  const vaccinesLoadingStatus = useSelector(selectVaccinesLoadingStatus);
  const updateVaccineStatus = useSelector(selectUpdateVaccineStatus);
  const dispatch = useDispatch();
  const [retryCount, setRetryCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState(null);

  const data = useMemo(() => {
    return [...vaccines];
  }, [vaccines]);

  useEffect(() => {
    if (vaccinesLoadingStatus === 'idle' && retryCount < 3) {
      dispatch(loadVaccines());
      setRetryCount(retryCount + 1);      
    }
  }, []);

  useEffect(() => {
    if (updateVaccineStatus === 'succeeded') {
      notify(enqueueSnackbar, VACCINE_UPDATE_SUCCESSFUL_MSG);
      setOpen(false);
    } else if (updateVaccineStatus === 'failed') {
      notify(enqueueSnackbar, VACCINE_UPDATE_FAILURE_MSG, 'error');
    }
  }, [updateVaccineStatus, enqueueSnackbar])

  return (
    <div>
      <MainDialog
        tooltip="Edit"
        dialogtitle="Edit Vaccine Information"
        dialogcontent={<AddVaccineDialog data={selectedVaccine} handleClose={() => setOpen(false)} dialogactiontitle="Update" disableAction={updateVaccineStatus === 'loading'}/>}
        maxWidth="md"
        open={open}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
      />
      <Table
        title={null}
        data={cloneArray(data)}
        columns={[
          { title: "Name", field: "name" },
          // { title: "Trade Name", field: "tradeName" },
          { title: "Protect Against", field: "protectAgainst" },
          { title: "Gender", field: "gender" },
          { title: "Adverse Effects", field: "adverseEffect" },
          { title: "Notes", field: "notes" },
        ]}
        actions={[
          // {
          //   icon: "view",
          //   tooltip: "View",
          // },
          {
            icon: "edit",
            tooltip: "Edit",
            onClick: (event, rowData) =>
              alert("You edited " + rowData.trade_name),
          },
          // {
          //   icon: "delete",
          //   tooltip: "Delete",
          //   onClick: (event, rowData) =>
          //     alert("You deleted " + rowData.trade_name),
          // },
        ]}
        components={{
          Action: (props) => {
            switch (props.action.icon) {
              // case "view":
              //   return (
              //     <MainDialog
              //       isiconbtn={true}
              //       btnicon={<VisibilityOutlinedIcon />}
              //       tooltip="View"
              //       dialogtitle="Vaccine Informations"
              //       dialogcontent={<AddVaccineDialog />}
              //       dialogaction={() => {
              //         alert("You Click Closed ");
              //       }}
              //       dialogactiontitle="Close"
              //       maxWidth="md"
              //     />
              //   );
              case "edit":
                return (
                  // <MainDialog
                  //   isiconbtn={true}
                  //   btnicon={<EditOutlinedIcon />}
                  //   tooltip="Edit"
                  //   dialogtitle="Edit Vaccine Informations"
                  //   dialogcontent={<AddTradenameDialog />}
                  //   dialogaction={() => {
                  //     alert("You Click Closed ");
                  //   }}
                  //   dialogactiontitle="Close"
                  //   maxWidth="md"
                  // />
                  <Tooltip title="Edit">
                  <IconButton
                    aria-label="Edit"
                    color="inherit"
                    onClick={(event) => {
                      setSelectedVaccine(props.data);
                      setOpen(true);
                    }}
                  >
                    <EditOutlinedIcon />
                  </IconButton>
                </Tooltip>
                );

              // case "delete":
              //   return (
              //     <Tooltip title="Delete">
              //       <IconButton
              //         aria-label="Delete"
              //         color="inherit"
              //         onClick={(event) =>
              //           props.action.onClick(event, props.data)
              //         }
              //       >
              //         <DeleteOutlineOutlinedIcon />
              //       </IconButton>
              //     </Tooltip>
              //   );

              default:
                break;
            }
          },
        }}
        options={{ actionsColumnIndex: -1, exportButton: true }}
      />
    </div>
  );
};

export default Index;
