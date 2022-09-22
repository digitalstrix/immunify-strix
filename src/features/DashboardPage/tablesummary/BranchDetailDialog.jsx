import React from "react";
import Table from "../../../common/components/Table";
import Box from "@material-ui/core/Box";

const Branchdetaildialog = () => {
  return (
    <div>
      <Box>
        <Table
          title={null}
          columns={[
            {
              field: "thead",
              headerStyle: { display: "none" },
              cellStyle: { fontWeight: "bold" },
            },
            { field: "tdata", headerStyle: { display: "none" } },
          ]}
          data={[
            { thead: "Name", tdata: "Kandy" },
            { thead: "Vaccination", tdata: "80" },
            { thead: "Registration number	", tdata: "425" },
            { thead: "Date of Birth	", tdata: "2020-02-10" },
            { thead: "Contact Number	", tdata: "0785832547" },
            { thead: "Email", tdata: "kansjayanayaka+test@gmail.com" },
            { thead: "City", tdata: "Bambalapitiya, Colombo, Colombo" },
            { thead: "First Registered Hospital	", tdata: "Apollo" },
          ]}
          options={{
            search: false,
            pageSize: 8,
            paging: false,
            toolbar: false,
          }}
        />
      </Box>
    </div>
  );
};

export default Branchdetaildialog;
