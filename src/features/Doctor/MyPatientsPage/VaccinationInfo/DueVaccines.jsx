import React from "react";
import Table from "../../../../common/components/Table";
import { useSelector } from "react-redux";
import { selectVaccines } from "./selector";
import moment from "moment";
import { Box } from "@material-ui/core";

const Duevaccines = () => {
  let data = useSelector(selectVaccines);

  data = data.map((i) => {
    const {
      dueDate,
      Vaccine: { name, protectAgainst },
      status,
      id,
      VaccinationScheduleDetail,
    } = i;
    return {
      dueDate: moment(dueDate).format("YYYY-MM-DD"),
      name,
      protectAgainst,
      status,
      id,
      VaccinationScheduleDetail,
    };
  });

  const dueVaccines = data.filter((i) => i.status === "DUE");

  return (
    <Box mt={3}>
      <Table
        title=""
        columns={[
          { title: "Vaccine Name", field: "name" },
          {
            title: "Protect Against",
            field: "protectAgainst",
          },
          {
            title: "Dose Id",
            field: "id",
          },
          {
            title: "Due Date",
            field: "dueDate",
            type: "numeric",
          },
        ]}
        data={dueVaccines}
        options={{
          headerStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Box>
  );
};

export default Duevaccines;
