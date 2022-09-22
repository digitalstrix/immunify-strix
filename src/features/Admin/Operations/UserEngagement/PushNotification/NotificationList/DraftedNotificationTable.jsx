/* eslint-disable no-lone-blocks */
import React, { useState, useCallback, useMemo } from "react";
import CheckOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { useSelector, useDispatch } from "react-redux";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import moment from "moment";
import { IconButton, Tooltip } from "@material-ui/core";
import AriaModal from "react-aria-modal";
import MainDialog from "../../../../../../common/components/Admin/Dialog";

import Table from "../../../../../../common/components/Admin/Table";
import { selectDraftNotifications, selectCountries } from "../../selector";
import EditNotification from "./EditNotification";
import ApproveNotification from "./ApproveNotification";
import ViewNotification from "./ViewNotification";
import { deletMessageAsync } from "../../userEngagementSlice";
import { findObjectValue } from "../../findValue";
import { selectUser } from "../../../../../User/selector";

const DIALOG_TYPE_EDIT = "EDIT";
const DIALOG_TYPE_APPROVE = "APPROVE";
const DIALOG_TYPE_VIEW = "VIEW";

const Notificationlisttable = () => {
  const dispatch = useDispatch();
  const [modalActive, setOpenSend] = React.useState(false);
  const [modalActive2, setOpenSend2] = React.useState(false);
  const [dataRow, setDR] = useState(null);
  const [dataRow2, setDR2] = useState(null);
  const [dialogTitle, setDialogTitle] = useState(null);
  const [dialogActionTitle, setDialogActionTitle] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [type, setType] = useState(null);
  const [isCanSend, setIsCanSend] = useState(true);

  const selectedUser = useSelector((state) => selectUser(state));
  const countryList = useSelector((state) => selectCountries(state));
  const country = countryList.map((countryObj) => ({
    lable: countryObj.countryName,
    value: countryObj.id,
  }));

  const draftNotificationList = useSelector((state) =>
    selectDraftNotifications(state)
  );
  const draftNotifications = draftNotificationList.map((listObj) => ({
    ...listObj,
    sentTime: moment(listObj.updatedAt).format("hh:mm:ss a"),
    sentDate: moment(listObj.updatedAt).format("YYYY/MM/DD"),
    country: findObjectValue(country, listObj.countryId),
  }));
  const deactivateModal = () => {
    setOpenSend(false);
  };
  const activateModal = () => {
    setOpenSend(true);
  };

  const deactivateModal2 = () => {
    setOpenSend2(false);
  };
  const activateModal2 = () => {
    setOpenSend2(true);
  };

  useMemo(() => {
    let length = 0;
    selectedUser?.my_group?.forEach((data) => {
      if (data.groupName === 'operations_user') {
        setIsCanSend(false);
      }
      ++length;
      if (length === selectedUser?.my_group?.length) {
        return true;
      }
    });
  }, [selectedUser]);

  const dialogContent = () => {
    if (type === DIALOG_TYPE_EDIT) {
      return (
        <EditNotification
          data={selectedRow}
          dialogactiontitle={dialogActionTitle}
          handleClose={() => setOpen(false)}
        />
      );
    }

    if (type === DIALOG_TYPE_APPROVE) {
      return (
        <ApproveNotification
          data={selectedRow}
          dialogactiontitle={dialogActionTitle}
          handleClose={() => setOpen(false)}
        />
      );
    }

    if (type === DIALOG_TYPE_VIEW) {
      return (
        <ViewNotification
          data={selectedRow}
          dialogactiontitle={dialogActionTitle}
          handleClose={() => setOpen(false)}
        />
      );
    }

    return null;
  };

  const deleteHandle = useCallback(
    (info) => {
      dispatch(deletMessageAsync(info));
    },
    [dispatch]
  );

  return (
    <div>
      <MainDialog
        open={open}
        // btnicon={<AddCircleOutline />}
        dialogtitle={dialogTitle}
        dialogcontent={dialogContent()}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
        maxWidth={"md"}
      />
      <Table
        title="Drafted Push Notifications"
        columns={[
          { title: "User Type", field: "usersType" },
          { title: "Drafted Time", field: "sentTime" },
          { title: "Drafted Date", field: "sentDate" },
          { title: "country", field: "country" },
          { title: "Subscription", field: "parentSubscriptionPlan" },
          { title: "Parent Sub Category", field: "parentSubCategory" },
          { title: "NavigationSetup", field: "navigationSetup"},
          // { title: "Submited by", field: "approvedBy" },
        ]}
        data={draftNotifications.reverse()}
        actions={[
          {
            icon: "View",
            tooltip: "View",
          },
          {
            icon: "Edit",
            tooltip: "Edit",
          },
          {
            icon: "Approve",
            tooltip: "Approve",
          },
          {
            icon: "Delete",
            tooltip: "Delete",
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
                        setDialogTitle("Details");
                        setDialogActionTitle("Close");
                        setOpen(true);
                        setSelectedRow(props.data);
                        setType(DIALOG_TYPE_VIEW);
                      }}
                      disabled={false}
                      color="inherit"
                    >
                      <InfoOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                );

              case "Edit":
                return (
                  <Tooltip title={"Edit"}>
                    <IconButton
                      onClick={() => {
                        setDialogTitle("Edit");
                        setDialogActionTitle("Edit");
                        setOpen(true);
                        setSelectedRow(props.data);
                        setType(DIALOG_TYPE_EDIT);
                      }}
                      disabled={false}
                      color="inherit"
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                );

              case "Approve":
                return (
                  <Tooltip title="Approve">
                    <IconButton
                      onClick={() => {
                        setDialogTitle("Approve");
                        setDialogActionTitle("Approve");
                        setOpen(true);
                        setSelectedRow(props.data);
                        setType(DIALOG_TYPE_APPROVE);
                      }}
                      disabled={!isCanSend}
                      color="inherit"
                    >
                      <CheckOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                );

              case "Delete":
                return (
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={(props) => {
                        deleteHandle({ messageId: props.data.id });
                      }}
                      disabled={false}
                      color="inherit"
                    >
                      <DeleteOutlinedIcon />
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
