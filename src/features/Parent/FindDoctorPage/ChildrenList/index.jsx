import React from "react";
import Table from "../../../../common/components/Table";

const index = () => {
  return (
    <div>
      <Table
        title="Select Children"
        columns={[
          { title: "Baby Name", field: "name" },
          {
            title: "Gender",
            field: "gender",
          },
          { title: "QR Code Count", field: "qrcode" },
          { title: "Hospital", field: "hospital" },
          {
            title: "Age(MM/DD/YY)",
            field: "age",
          },
        ]}
        data={[
          {
            name: "Olivia Serrin",
            gender: "Female",
            age: "03/02/00",
            qrcode: "2",
            hospital: "Apollo",
          },
          {
            name: "Rishi Serrin",
            gender: "Female",
            age: "00/00/01",
            qrcode: "4",
            hospital: "Apollo",
          },
        ]}
        options={{
          selection: true,
          search: false,
          paging: false,
        }}
        onSelectionChange={(rows) =>
          console.log("You Checked " + rows.length + " rows")
        }
      />
    </div>
  );
};

export default index;
