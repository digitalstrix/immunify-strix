import React from "react";
import Table from "../../../../common/components/Table";
import { useSelector } from "react-redux";
import { selectVaccines } from "./selector";
import moment from "moment";
import { Box } from "@material-ui/core";

const VacVaccines = () => {
  let data = useSelector(selectVaccines);

  data = data.map((i) => {
    const {
      vaccinatedDate,
      Vaccine: { name, protectAgainst },
      status,
      id,
      VaccinationScheduleDetail,
    } = i;
    return {
      vaccinatedDate: moment(vaccinatedDate).format("YYYY-MM-DD"),
      name,
      protectAgainst,
      status,
      id,
      VaccinationScheduleDetail,
    };
  });

  const vacVaccines = data.filter((i) => i.status === "VACCINATED");

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
            title: "Vaccinated Date",
            field: "vaccinatedDate",
            type: "numeric",
          },
        ]}
        data={vacVaccines}
        options={{
          headerStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Box>
  );
};

export default VacVaccines;
