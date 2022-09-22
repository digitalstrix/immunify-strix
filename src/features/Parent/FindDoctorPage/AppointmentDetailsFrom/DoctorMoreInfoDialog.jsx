import React from "react";
import { Card, CardContent, Grid } from "@material-ui/core";
import { DialogContent } from "../../../../common/components/Admin/Dialog";
import Table from "../../../../common/components/Table";

const DoctorMoreInfoDialog = ({ data }) => {
  const {
    additionalData: { education, experiance },
  } = data;

  const eduData =
    education &&
    education.length > 0 &&
    education.map((item) => {
      return { degree: item.digree, university: item.university };
    });

  const workExp =
    experiance &&
    experiance.length > 0 &&
    experiance.map((item) => {
      return {
        hospitalClinic: item.hospitalClinic,
        yearsWorked: parseInt(
          (new Date(item.endDate) - new Date(item.startDate)) /
            (1000 * 60 * 60 * 24 * 365)
        ),
      };
    });

  return (
    <div>
      <DialogContent style={{ margin: 10 }}>
        <Card>
          <CardContent>
            <Table
              title="Education "
              columns={[
                {
                  title: "Degree",
                  field: "degree",
                  render: (rowData) => rowData.degree || <i>N/A</i>,
                },
                {
                  title: "University",
                  field: "university",
                  render: (rowData) => rowData.university || <i>N/A</i>,
                },
              ]}
              data={eduData || []}
              options={{
                loadingType: "overlay",
                showEmptyDataSourceMessage: true,
                search: false,
                actionsColumnIndex: -1,
                paging: false,
              }}
            />
            <br />
            <Table
              title="Experience "
              columns={[
                {
                  title: "Hospital",
                  field: "hospitalClinic",
                  render: (rowData) => rowData.hospitalClinic || <i>N/A</i>,
                },
                {
                  title: "Years of Experience",
                  field: "yearsWorked",
                  render: (rowData) => rowData.yearsWorked || <i>N/A</i>,
                },
              ]}
              data={workExp || []}
              options={{
                loadingType: "overlay",
                showEmptyDataSourceMessage: true,
                search: false,
                paging: false,
              }}
            />
          </CardContent>
        </Card>
      </DialogContent>
    </div>
  );
};

export default DoctorMoreInfoDialog;
