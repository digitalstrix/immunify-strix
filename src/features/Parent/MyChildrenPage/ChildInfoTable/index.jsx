import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import Table from "../../../../common/components/Table";
import { gettingSelectedChildInfoStatus } from "./selector";
import Skeleton from "@material-ui/lab/Skeleton";

const Index = ({ data }) => {
  const {
    firstName,
    middleName,
    lastName,
    gender,
    BirthInformation,
    ChildQRCodes,
  } = data;
  const status = useSelector(gettingSelectedChildInfoStatus);
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
        options={{
          search: false,
          pageSize: 8,
          paging: false,
          toolbar: false,
        }}
        data={[
          {
            thead: "Name",
            tdata:
              status === "loading" ? (
                <Skeleton variant="text" />
              ) : (
                firstName || "" + middleName || "" + lastName || ""
              ),
          },
          {
            thead: "Gender",
            tdata: status === "loading" ? <Skeleton variant="text" /> : gender,
          },
          {
            thead: "QR Code",
            tdata:
              status === "loading" ? (
                <Skeleton variant="text" />
              ) : ChildQRCodes && ChildQRCodes.length > 0 ? (
                ChildQRCodes.find((i) => i.status === "ACTIVE").qrCode
              ) : (
                "No Qr Code Assigned"
              ),
          },
          {
            thead: "Birthday",
            tdata:
              status === "loading" ? (
                <Skeleton variant="text" />
              ) : (
                moment(
                  BirthInformation && BirthInformation?.dateOfBirth
                ).format("YYYY-MM-DD")
              ),
          },
          {
            thead: "Hospital",
            tdata:
              status === "loading" ? (
                <Skeleton variant="text" />
              ) : (
                BirthInformation && BirthInformation?.hospital
              ),
          },
        ]}
      />
    </div>
  );
};

export default Index;
