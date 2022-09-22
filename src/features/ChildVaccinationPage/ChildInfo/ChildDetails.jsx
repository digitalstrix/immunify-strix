import React from "react";
import Table from "../../../common/components/Table";

const tableMetaData = [
  { thead: "Name", dataKey: "name" },
  { thead: "Gender", dataKey: "gender" },
  { thead: "Registration number	", dataKey: "id" },
  { thead: "Date of Birth	", dataKey: "dateOfBirth" },
  { thead: "Contact Number	", dataKey: "contact" },
  { thead: "Email", dataKey: "email" },
  { thead: "City", dataKey: "city" },
  { thead: "First Registered Hospital	", dataKey: "hospital" },
];

const extractDataForTable  = ({
  id, gender, name, firstName,
  BirthInformation: { hospital, dateOfBirth },
  Person: { contact, email, city }
}) => ({
  id,
  gender,
  name,
  firstName,
  hospital,
  dateOfBirth,
  contact,
  email,
  city
}
);



const formatDataForTable = (data) => {
  if (data) {
    const extractedData = extractDataForTable(data);
    return tableMetaData.map(({ thead, dataKey }) =>({
      thead, tdata: extractedData[dataKey]
    }));
  }
  return [];  
};

const Childdetails = ({ data }) => {  
  return (
    <div>
      <Table
        title="Card Information"
        columns={[
          {
            field: "thead",
            headerStyle: { display: "none" },
            cellStyle: { fontWeight: "bold" },
          },
          { field: "tdata", headerStyle: { display: "none" } },
        ]}
        data={formatDataForTable(data)}
        options={{
          search: false,
          pageSize: 8,
          paging: false,
          toolbar: false,
        }}
      />
    </div>
  );
};

export default Childdetails;
