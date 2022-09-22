import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useSnackbar } from "notistack";

import Table from "../../../../common/components/Admin/Table";
import MainDialog from "../../../../common/components/Admin/Dialog";
import SingleSheduleDataTable from "../SingleShedule/SingleSheduleDataTable";
import AddVaccineDialog from "../SingleShedule/AddVaccineDialog";


import { IconButton, Tooltip } from "@material-ui/core";

import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AddCircleOutline from "@material-ui/icons/AddCircleOutlineOutlined";
import AddScheduleDialog from "./AddSheduleDialog";
import DeleteScheduleDialog from "./DeleteConfirmation";
import {
  selectSchedules,
  selectScheduleUpdateStatus,
  selectAddVacShedDetails,
  selectDelVacShedDetails
} from '../selector';
import { extractDate, notify } from '../../../../utils/commonUtils';
import { VAC_SCHEDULE_MAIN_TABLE_CLOUMNS } from '../../../../constants/vacScheduleConstants';

const UPDATE_SUCCESSFUL_MSG = "Schedule Updated Successfully!";
const UPDATE_FAILURE_MSG = "Schedule Update Failed!";

const ADD_VACCINE_SUCCESSFUL_MSG = 'Vaccine added to the Schedule Successfully!';
const ADD_VACCINE_FAILURE_MSG = 'Vaccine adding Failure!';

const DELETE_VAC_SCHEDULE_SUCCESS_MSG = 'Vaccination Schedule Deleted Successfully!';
const DELETE_VAC_SCHEDULE_FAILURE_MSG = 'Vaccination Schedule Delete Failure!';

const DIALOG_TYPE_UPDATE_SCHEDULE = 'UPDATE';
const DIALOG_TYPE_ADD_VACCINE = 'ADD';
const DIALOG_TYPE_DELETE_SCHEDULE = 'DELETE';


const Allshedulesdatatable = ({ countries }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [dialogTitle, setDialogTitle] = useState(null);
  const [dialogActionTitle, setDialogActionTitle] = useState(null);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(null);
  const schedules = useSelector(selectSchedules);  
  
  const scheduleUpdateStatus = useSelector(selectScheduleUpdateStatus);
  const addScheduleDetailsStatus = useSelector(selectAddVacShedDetails);
  const deleteVacSchduleStatus = useSelector(selectDelVacShedDetails);

  const data = useMemo(() => {
    if (schedules.length > 0) {
      const { country: countryId } = schedules[0];
      const country = countries.find(({ id }) => id === countryId);
      let countryName = countryId;
      if (country) {
        countryName = country.countryName;
      }
      return schedules.map(({ createdAt, updatedAt, ...remaining }) => ({
        ...remaining,
        country: countryName,
        countryId,
        createdAt: extractDate(createdAt),
        updatedAt: extractDate(updatedAt),
      }));
    }
    return [];    
  }, [countries, schedules]);

  useEffect(() => {
    if (scheduleUpdateStatus === 'succeeded') {
      notify(enqueueSnackbar, UPDATE_SUCCESSFUL_MSG);
      setOpen(false);
    } else if (scheduleUpdateStatus === 'failed') {
      notify(enqueueSnackbar, UPDATE_FAILURE_MSG, 'error');
    }
  }, [scheduleUpdateStatus, enqueueSnackbar]);

  useEffect(() => {
    if (addScheduleDetailsStatus === 'succeeded') {
      notify(enqueueSnackbar, ADD_VACCINE_SUCCESSFUL_MSG);
      setOpen(false);
    } else if (addScheduleDetailsStatus === 'failed') {
      notify(enqueueSnackbar, ADD_VACCINE_FAILURE_MSG, 'error');
    }
  }, [addScheduleDetailsStatus, enqueueSnackbar]);

  useEffect(() => {
    if (deleteVacSchduleStatus === 'succeeded') {
      notify(enqueueSnackbar, DELETE_VAC_SCHEDULE_SUCCESS_MSG);
      setOpen(false);
    } else if (deleteVacSchduleStatus === 'failed') {
      notify(enqueueSnackbar, DELETE_VAC_SCHEDULE_FAILURE_MSG, 'error');
    }
  }, [deleteVacSchduleStatus, enqueueSnackbar]);

  const dialogContent = () => {

    if (type === DIALOG_TYPE_ADD_VACCINE) {
      return <AddVaccineDialog data={selectedSchedule} dialogactiontitle={dialogActionTitle} handleClose={() => setOpen(false)} disableAction={addScheduleDetailsStatus === 'loading'}/>;
    }
    
    if (type === DIALOG_TYPE_UPDATE_SCHEDULE) {
      return <AddScheduleDialog data={selectedSchedule} dialogactiontitle={dialogActionTitle} handleClose={() => setOpen(false)} disableAction={scheduleUpdateStatus === 'loading'}/>;
    }

    if (type === DIALOG_TYPE_DELETE_SCHEDULE) {
      return <DeleteScheduleDialog data={selectedSchedule} dialogactiontitle={dialogActionTitle} handleClose={() => setOpen(false)}/>;
    }

    return null;
  };

  return (
    <div>
      <MainDialog
        open={open}
        btnicon={<AddCircleOutline />}
        dialogtitle={dialogTitle}
        dialogcontent={dialogContent()}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
        maxWidth={type !== DIALOG_TYPE_DELETE_SCHEDULE ? "md" : "sm"}
      />
      <Table 
        title="All Shedules"
        columns={VAC_SCHEDULE_MAIN_TABLE_CLOUMNS}
        data={data}
        actions={[
          {
            icon: "add",
            onClick: (event, rowData) =>
              alert(
                "this onclick wpnt do anything,remove & check console" +
                  rowData.shedule_name
              ),
          },
          {
            icon: "edit",
            tooltip: "Save User",
            onClick: (event, rowData) =>
              alert(
                "this onclick wpnt do anything,remove & check console " +
                  rowData.shedule_name
              ),
          },
          {
            icon: "delete",
            tooltip: "Save User",
            onClick: (event, rowData) =>
              alert("You Deleted " + rowData.shedule_name),
          },
        ]}
        components={{
          Action: (props) => {
            switch (props.action.icon) {
              case "add":
                return (
                <Tooltip title={'Add New Vaccine'}>
                  <IconButton
                    onClick={() => {
                      setDialogTitle('Add New Vaccine');
                      setDialogActionTitle('Add');
                      setOpen(true)
                      setSelectedSchedule(props.data);
                      setType(DIALOG_TYPE_ADD_VACCINE);
                    }}
                    disabled={false}
                    color="inherit"
                  >
                    <AddCircleOutline />
                  </IconButton>
                </Tooltip>
              );

              case "edit":
                return (
                  <Tooltip title={'Edit Shedule Information'}>
                    <IconButton
                      onClick={() => {

                        setDialogTitle('Edit Shedule Information');
                        setDialogActionTitle('Update');
                        setOpen(true)
                        setType(DIALOG_TYPE_UPDATE_SCHEDULE);
                        setSelectedSchedule(props.data);
                      }}
                      disabled={false}
                      color="inherit"
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                );                

              case "delete":
                return (
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="Delete"
                      color="inherit"
                      onClick={(event) => {
                        setDialogTitle('Delete Vaccination Schedule');
                        setDialogActionTitle('Delete');
                        setOpen(true)
                        setType(DIALOG_TYPE_DELETE_SCHEDULE);
                        setSelectedSchedule(props.data);
                      }}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                );
              default:
                break;
            }
          },
        }}
        detailPanel={[
          {
            render: (rowData) => {
              console.log(rowData);
              return <SingleSheduleDataTable rowData={rowData} />;
            },
          },
        ]}
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

export default Allshedulesdatatable;
