import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, IconButton, CircularProgress } from "@material-ui/core";
import Table from "../../../common/components/Table";
import Loader from "../../../common/components/Loader";
import MainDialog from "../../../common/components/Dialog";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ExportOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import {
  selectData,
  selectColumns,
  selectSecondaryReportData,
  selectSecondaryReportColumns,
  selectReportFormat,
  selectSecondaryReportLoadingStatus,
  selectTitle,
  selectSecondaryTitle,
} from "../selector";

import { loadSecondaryReport } from "../reportsSlice";

import { cloneArray } from "../../../utils/commonUtils";
import { tableOptions } from "../../../utils/reportsUtils";
import { DEFAULT_TABLE_OPTIONS } from "../../../constants/reportsConstants";

const toolTip = () => "tool tip";
const title = () => "Detailed Report";
const dialogContent = (loadingStatus, { columns, data, actions, title }) => (
  <Box m={3}>
    {loadingStatus ? (
      <Loader height={"40vh"} />
    ) : (
      <Table
        title={title}
        columns={cloneArray(columns)}
        data={cloneArray(data)}
        options={tableOptions()}
        actions={actions}
      />
    )}
  </Box>
);
const dialogAction = () => {};

const actions = (reportFormat, columns = []) => {
  if (columns.length === 0) {
    return [];
  }
  return reportFormat === 1 || reportFormat === 2
    ? [
        {
          icon: "export",
        },
      ]
    : [];
};

const Reporttabledata = () => {
  const [open, setOpen] = useState(false);
  const data = useSelector(selectData);
  const columns = useSelector(selectColumns);
  const secondaryReportData = useSelector(selectSecondaryReportData);
  const secondaryReportColumns = useSelector(selectSecondaryReportColumns);
  const reportFormat = useSelector(selectReportFormat);
  const seondaryReportLoadingStatus = useSelector(
    selectSecondaryReportLoadingStatus
  );
  const primaryTitle = useSelector(selectTitle);
  const secondaryTitle = useSelector(selectSecondaryTitle);
  const dispatch = useDispatch();

  return (
    <div>
      <MainDialog
        btnicon={<EditOutlinedIcon />}
        tooltip={toolTip()}
        dialogtitle={title()}
        dialogcontent={dialogContent(
          seondaryReportLoadingStatus === "loading",
          {
            columns: secondaryReportColumns,
            data: secondaryReportData,
            actions: [],
            title: secondaryTitle,
          }
        )}
        dialogaction={dialogAction()}
        dialogCloseAction={() => setOpen(false)}
        maxWidth="md"
        open={open}
      />
      <Box m={3}>
        <Table
          title={primaryTitle}
          columns={cloneArray(columns)}
          data={cloneArray(data)}
          options={DEFAULT_TABLE_OPTIONS}
          actions={actions(reportFormat, columns)}
          components={{
            Action: (props) => {
              switch (props.action.icon) {
                case "export":
                  return (
                    <Tooltip title={"Export"}>
                      <IconButton
                        onClick={() => {
                          // console.log(props.data);
                          dispatch(loadSecondaryReport(props.data));
                          setOpen(true);
                        }}
                        color="inherit"
                      >
                        <ExportOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  );
                default:
                  return null;
              }
            },
          }}
        />
      </Box>
    </div>
  );
};

export default Reporttabledata;
