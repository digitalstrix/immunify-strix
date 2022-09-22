import React from "react";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Table from "../../../common/components/Table";

export default function index() {
  const Data = [
    {
      firstname: "John",
      lastname: "Doe",
      username: "Johny32",
      email: "jd302@gmail.com",
      groups: "group1, group2, group3, group4",
      status: "Active",
    },
    {
      firstname: "John",
      lastname: "Doe",
      username: "Johny32",
      email: "jd302@gmail.com",
      groups: "group1, group2, group3, group4",
      status: "InActive",
    },
  ];
  return (
    <div>
      <Table
        title=""
        columns={[
          { title: "First Name", field: "firstname" },
          { title: "Last Name", field: "lastname" },
          { title: "Username", field: "username" },
          { title: "Email", field: "email" },
          { title: "Groups", field: "groups" },
          { title: "Status", field: "status" },
        ]}
        data={Data}
        actions={[
          {
            icon: EditOutlinedIcon,
            tooltip: "Edit User",
            onClick: (event, rowData) => {
              return rowData;
            },
          },
          {
            icon: DeleteOutlinedIcon,
            tooltip: "Delete User",
            onClick: (event, rowData) => {
              return rowData;
            },
          },
        ]}
        options={{
          loadingType: "overlay",
          showEmptyDataSourceMessage: true,
          headerStyle: { fontWeight: "bold" },
          pageSize: 5,
          actionsColumnIndex: -1,
        }}
      />
    </div>
  );
}
