import React, { useState } from "react";
import CheckOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { IconButton, Tooltip } from "@material-ui/core";
import Table from "../../../../../../common/components/Admin/Table";
import { selectSentEmails, selectCountries } from "../../selector";
import { findObjectValue } from "../../findValue";
import MainDialog from "../../../../../../common/components/Admin/Dialog";
import ViewEmail from "./ViewEmail";

const Notificationlisttable = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const countryList = useSelector((state) => selectCountries(state));
  const country = countryList.map((countryObj) => ({
    lable: countryObj.countryName,
    value: countryObj.id,
  }));
  const sentEmailsList = useSelector((state) => selectSentEmails(state));
  const sentEmails = sentEmailsList.map((listObj) => ({
    ...listObj,
    sentTime: moment(listObj.updatedAt).format("hh:mm:ss a"),
    sentDate: moment(listObj.updatedAt).format("YYYY/MM/DD"),
    country: findObjectValue(country, listObj.countryId),
  }));

  return (
    <div>
      <MainDialog
        open={open}
        dialogtitle={"Details"}
        dialogcontent={
          <ViewEmail
            data={selectedRow}
            dialogactiontitle={"Close"}
            handleClose={() => setOpen(false)}
          />
        }
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
        maxWidth={"md"}
      />
      <Table
        title="Recent Mails"
        columns={[
          { title: "User Type", field: "usersType" },
          { title: "Sent Time", field: "sentTime" },
          { title: "Sent Date", field: "sentDate" },
          { title: "Contact Number", field: "contact" },
          { title: "country", field: "country" },
          { title: "Subscription", field: "parentSubscriptionPlan" },
          { title: "Parent Sub Category", field: "parentSubCategory" },
          // { title: "Approved by", field: "approvedBy" },
        ]}
        data={sentEmails.reverse()}
        actions={[
          {
            icon: "View",
            tooltip: "View",
          },
        ]}
        components={{
          Action: (props) => {
            switch (props.action.icon) {
              case "View":
                return (
                  <Tooltip title={"View"}>
                    <IconButton
                      onClick={() => {
                        setOpen(true);
                        setSelectedRow(props.data);
                      }}
                      disabled={false}
                      color="inherit"
                    >
                      <InfoOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                );

              default:
                break;
            }
          },
        }}
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
};

export default Notificationlisttable;
