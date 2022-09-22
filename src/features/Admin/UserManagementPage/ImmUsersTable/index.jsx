/* eslint-disable react-hooks/rules-of-hooks */
import React, {useMemo, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';

import { IconButton, Tooltip } from "@material-ui/core";
import {Alert} from '@material-ui/lab'
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Table from "../../../../common/components/Admin/Table";
import UserEditForm from './UserEditForm';
import MainDialog from "../../../../common/components/Admin/Dialog";
import {
  selectCountries,
  selectUsersIsLoading,
  selectAddedUsers,
  selectIsLoadingAdminAdd,
  selectIsLoadingAdminUpdate,
  } from '../selector';


const DIALOG_TYPE_EDIT = "EDIT";
export default function index() {
  const dispatch = useDispatch();
  const isPending = useSelector((state) => selectUsersIsLoading(state));
  const addedUsers = useSelector((state) => selectAddedUsers(state));

  const [selectedRow, setSelectedRow] = useState(null);
  const [type, setType] = useState(null);
  const [dialogTitle, setDialogTitle] = useState(null);
  const [open, setOpen] = useState(false);
  const [dialogActionTitle, setDialogActionTitle] = useState(null);
  const data = addedUsers && addedUsers.length > 0 && addedUsers.map((user) => ({
    firstname: user.firstName,
    lastname: user.lastName,
    username: user.username,
    email: user.email,
    groups: user?.groups?.length > 0 && user?.groups.map((group) => (group.name)),
    status: user.status,
    authUserId: user?.authUserId,
    userId: user?.userId,
    personId: user?.personId,
  }));

  const dialogContent = () => {
    if (type === DIALOG_TYPE_EDIT) {
      return (
        <UserEditForm
          data={selectedRow}
          dialogactiontitle={dialogActionTitle}
          handleClose={() => setOpen(false)}
        />
      );
    }

    return null;
  };

  const loadAdd = useSelector((state) => selectIsLoadingAdminAdd(state));
  const loadUpdate = useSelector((state) => selectIsLoadingAdminUpdate(state));
  useMemo(() => {
    return (
      <div>
        {(loadAdd === 'succeeded') && (
          <Alert onClose={() => {}} severity="error">Registration successfull!</Alert>
        )}
        {(loadAdd === 'failed') && (
          <Alert onClose={() => {}} severity="error">Registration failed!</Alert>
        )}
        {(loadUpdate === 'succeeded') && (
          <Alert onClose={() => {}} severity="error">Update successfull!</Alert>
        )}
        {(loadUpdate === 'failed') && (
          <Alert onClose={() => {}} severity="error">Update failed!</Alert>
        )}
      </div>
    )
  }, [loadAdd, loadUpdate]);

  return (
    <div>
      
      {(isPending === 'pending') ? (
        <text>Loading.....</text>
      ) : (
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
            title="Imm User List"
            columns={[
              { title: "First Name", field: "firstname" },
              { title: "Last Name", field: "lastname" },
              { title: "Username", field: "username" },
              { title: "Email", field: "email" },
              { title: "Groups", field: "groups" },
              { title: "Status", field: "status" },
            ]}
            data={data.length > 0 ? data : []}
            actions={[
              {
                icon: "Edit",
                tooltip: "Edit",
              },
              {
                icon: "Delete",
                tooltip: "Delete",
              },
            ]}
            components={{
              Action: (props) => {
                switch (props.action.icon) {

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

                  case "Delete":
                    return (
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={(props) => {
                            // deleteHandle({ messageId: props.data.id });
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
      )}
      
    </div>
  );
}
