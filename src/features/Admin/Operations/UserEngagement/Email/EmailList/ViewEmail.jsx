import React from "react";
import {
  DialogContent,
  DialogActions,
} from "../../../../../../common/components/Admin/Dialog";
import Table from "../../../../../../common/components/Admin/Table";

function Viewemail(data) {
  const rowData = data.data;
  return (
    <div>
      <DialogContent dividers>
        <Table
          title=""
          columns={[
            {
              field: "thead",
              headerStyle: { display: "none" },
              cellStyle: { fontWeight: "bold" },
            },
            {
              field: "tdata",
              headerStyle: { display: "none" },
            },
          ]}
          data={[
            {
              thead: "User Type",
              tdata: rowData.usersType ? rowData.usersType : "",
            },
            {
              thead: "Subject",
              tdata: rowData.subject ? rowData.subject : null,
            },
            {
              thead: "Message",
              tdata: rowData.message ? rowData.message : null,
            },
            {
              thead: "Drafted Time",
              tdata: rowData.sentTime ? rowData.sentTime : null,
            },
            {
              thead: "Drafted Date",
              tdata: rowData.sentDate ? rowData.sentDate : null,
            },
            {
              thead: "Age From",
              tdata: rowData.ageFromMonth ? rowData.ageFromMonth : null,
            },
            {
              thead: "Age To",
              tdata: rowData.ageToMonth ? rowData.ageToMonth : null,
            },
            {
              thead: "Contact No",
              tdata: rowData.contact ? rowData.contact : null,
            },
            {
              thead: "Days(Before/After end subscription)",
              tdata: rowData.days ? rowData.days : null,
            },
            { thead: "Image", tdata: rowData.image ? rowData.image : null },
            {
              thead: "Country",
              tdata: rowData.country ? rowData.country : null,
            },
            {
              thead: "Subscription",
              tdata: rowData.parentSubscriptionPlan
                ? rowData.parentSubscriptionPlan
                : null,
            },
            {
              thead: "Parent Sub Category",
              tdata: rowData.parentSubCategory
                ? rowData.parentSubCategory
                : null,
            },
          ]}
          options={{
            search: false,
            pageSize: 13,
            paging: false,
            toolbar: false,
            tableLayout: "auto",
          }}
        />
      </DialogContent>
    </div>
  );
}

export default Viewemail;
