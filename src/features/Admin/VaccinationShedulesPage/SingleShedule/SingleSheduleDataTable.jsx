import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import Table from "../../../../common/components/Admin/Table";

import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MainDialog from "../../../../common/components/Admin/Dialog";
import { useSnackbar } from "notistack";
import { IconButton, Tooltip } from "@material-ui/core";
import Addvaccinedialog from "./AddVaccineDialog";
import { getScheduleDetails } from '../vacSchedulesSlice';
import { formatScheduleDetails } from '../../../../utils/vacSchedulesUtils';
import { selectScheduleDetails } from '../selector';

const Singlesheduledatatable = ({ rowData: { id } }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const UpdateSuccessMsg = "Parent Updated Successfully!"; 

  const scheduleDetails = useSelector(selectScheduleDetails);

  useEffect(() => {
    if (!scheduleDetails[id]) {
      dispatch(getScheduleDetails({ schedueId: id }));
    }
  }, [id, scheduleDetails, dispatch]);

  

  if (!scheduleDetails[id]) {
    return (<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <CircularProgress />
    </div>);
  }

  return (
    <div>
      <Table
        title="Shedule Details"
        columns={[
          { title: "Vaccine Name", field: "name", filtering: false },
          { title: "Protect Against", field: "protectAgainst", filtering: false },
          { title: "Gender", field: "gender" },
          { title: "Dose", field: "doseId", type: "numeric" },
          {
            title: "Start",
            field: "start",
            filtering: false,
          },
          {
            title: "Catchup",
            field: "catchup",
            filtering: false,
          },
        ]}
        data={formatScheduleDetails(scheduleDetails[id])}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Vaccine",
            onClick: (event, rowData) =>
              alert("Need to implement edit functionality " + rowData.name),
          },
          {
            icon: "delete",
            tooltip: "Delete Vaccine Entry",
            onClick: (event, rowData) =>
              alert("Need to implement delete functionality " + rowData.name),
          },
        ]}
        components={{
          Action: (props) => {
            switch (props.action.icon) {
              case "edit":
                return (
                  <Tooltip title="Edit">
                    <IconButton
                      aria-label="Edit"
                      color="inherit"
                      onClick={(event) =>
                        props.action.onClick(event, props.data)

                      }
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
                      onClick={(event) =>
                        props.action.onClick(event, props.data)
                      }
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
        options={{
          filtering: true,
          loadingType: "overlay",
          showEmptyDataSourceMessage: true,
          search: true,
          actionsColumnIndex: -1,
          exportButton: false,
        }}
      />
    </div>
  );
};

export default Singlesheduledatatable;
