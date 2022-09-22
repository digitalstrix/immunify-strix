import React from "react";
import Table from "../../../../../common/components/Admin/Table";
import { useSelector } from "react-redux";
import { selectConsultationTimes } from "../selectors";
import { cloneArray } from "../../../../../utils/commonUtils";

const Consulationtimedatatable = () => {
  const data = useSelector(selectConsultationTimes);
  const processedData = cloneArray(data);

  const postData = processedData.map((item) => {
    return {
      ...item,
      doctorName: item.doctorName.replace(/null/g, ""),
      patientName: item.patientName.replace(/null/g, ""),
    };
  });

  return (
    <div>
      <Table
        title=""
        columns={[
          { title: "Doctor Name", field: "doctorName" },
          { title: "Doctor Contact", field: "doctorContact" },
          { title: "Appointment Date", field: "appointmentDate" },
          { title: "Appointment Time", field: "appointmentTime" },
          { title: "Patient Name", field: "patientName" },
          { title: "Patient Contact", field: "patientContact" },
          { title: "Status", field: "appointmentStatus" },
        ]}
        options={{
          headerStyle: { fontWeight: "bold" },
          loadingType: "overlay",
        }}
        data={postData}
      />
    </div>
  );
};

export default Consulationtimedatatable;
