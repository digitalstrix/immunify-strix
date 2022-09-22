import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import Table from "../../../common/components/Table";
import { selectPastAppointments } from "./selector";
import { cloneArray } from "../../../utils/commonUtils";

const Pastappoint = () => {
  const pastAppointments = useSelector(selectPastAppointments);

  return (
    <div>
      <Table
        title=""
        columns={[
          {
            title: "Name",
            render: (rowData) => `Dr. ${rowData.firstName} ${rowData.lastName}`,
          },
          { title: "Appintment Number", field: "slotId" },
          { title: "Appintment Type", field: "appoinmentType" },
          {
            title: "Date",
            render: (rowData) => moment(rowData.date).format("YYYY-MM-DD"),
          },
          {
            title: "Time",
            render: (rowData) => `${rowData.startTime} - ${rowData.endTime}`,
          },
          { title: "Status", field: "status" },
        ]}
        data={cloneArray(pastAppointments)}
        options={{
          loadingType: "overlay",
          showEmptyDataSourceMessage: true,
          actionsColumnIndex: -1,
        }}
      />
    </div>
  );
};

export default Pastappoint;
