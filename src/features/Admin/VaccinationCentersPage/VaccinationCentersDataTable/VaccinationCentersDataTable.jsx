import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useSnackbar } from "notistack";
import MainDialog from "../../../../common/components/Admin/Dialog";
import Table from "../../../../common/components/Admin/Table";
import AddVaccineCenterDialog from "../AddVaccineCenterDialog";

import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { IconButton, Tooltip } from "@material-ui/core";
import { notify } from '../../../../utils/commonUtils';
import { selectCenterUpdateStatus, selectCenterUpdateError } from '../selector';

const CENTER_UPATED_SUCCEESFULLY_MSG = 'Center Updated Successfully!';
const CENTER_UPDATE_FAILED_MSG = 'Center Update Failed!';

const VaccinationCentersDataTable = ({ data }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const centerUpdateStatus = useSelector(selectCenterUpdateStatus);
  const centerUpdateError = useSelector(selectCenterUpdateError);


  useEffect(() => {
    if (centerUpdateStatus === 'succeeded') {
      notify(enqueueSnackbar, CENTER_UPATED_SUCCEESFULLY_MSG);
      setOpen(false);
    } else if (centerUpdateStatus === 'failed') {
      notify(enqueueSnackbar, centerUpdateError || CENTER_UPDATE_FAILED_MSG, 'error');
    }
  }, [centerUpdateStatus, centerUpdateError, enqueueSnackbar]);

  return (
    <div>
      <MainDialog
        tooltip="Edit"
        dialogtitle="Edit Center Information"
        dialogcontent={<AddVaccineCenterDialog data={selectedCenter} handleClose={() => setOpen(false)} dialogactiontitle="Update" disableAction={centerUpdateStatus === 'loading'}/>}
        maxWidth="md"
        open={open}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
      />
      <Table
        title={null}
        columns={[
          { title: "Center Name", field: "name" },
          { title: "State", field: "state" },
          { title: "City", field: "city" },
          { title: "Center Type", field: "vacType" },
          { title: "Contact Number", field: "contactNumber" },
          { title: "Email", field: "email" },
          { title: "Status", field: "status" },
          { title: "Date Registered", field: "createdAt" }
        ]}
        data={data.slice()}
        actions={[
          // {
          //   icon: "view",
          //   tooltip: "View Details",
          //   onClick: (event, rowData) =>
          //     alert(
          //       "this onclick wpnt do anything,remove & check console " +
          //         rowData.shedule_name
          //     ),
          // },
          {
            icon: "edit",
            tooltip: "Edit",            
              
          },
          // {
          //   icon: "delete",
          //   tooltip: "Delete",
          //   onClick: (event, rowData) =>
          //     alert("You Deleted " + rowData.center_name),
          // },
        ]}
        components={{
          Action: (props) => {
            switch (props.action.icon) {
              // case "view":
              //   return (
              //     <MainDialog
              //       isiconbtn={true}
              //       btnicon={<VisibilityOutlinedIcon />}
              //       tooltip="View Info"
              //       dialogtitle="View Information"
              //       dialogcontent={<AddVaccineCenterDialog />}
              //       dialogcontentreadonly={true}
              //       dialogaction={() =>
              //         enqueueSnackbar(UpdateSuccessMsg, {
              //           variant: "success",
              //           anchorOrigin: {
              //             vertical: "top",
              //             horizontal: "center",
              //           },
              //         })
              //       }
              //       dialogactiondisable={true}
              //       dialogactiontitle="Update"
              //       maxWidth="md"
              //     />
              //   );

              case "edit":
                return (                  
                  <Tooltip title={'Edit Center'}>
                    <IconButton
                      onClick={() => {
                        setOpen(true)
                        setSelectedCenter(props.data);
                      }}
                      disabled={false}
                      color="inherit"
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                );

              // case "delete":
              //   return (
              //     <Tooltip title="Delete">
              //       <IconButton
              //         aria-label="Delete"
              //         color="inherit"
              //         onClick={(event) =>
              //           props.action.onClick(event, props.data)
              //         }
              //       >
              //         <DeleteOutlineOutlinedIcon />
              //       </IconButton>
              //     </Tooltip>
              //   );
              default:
                break;
            }
          },
        }}
        options={{
          loadingType: "overlay",
          showEmptyDataSourceMessage: true,
          search: true,
          actionsColumnIndex: -1,
          exportButton: true,
        }}
      />
    </div>
  );
};

export default VaccinationCentersDataTable;


// [
//   {
//     center_name: "SLKandy Center",
//     country: "Sri Lanka",
//     city: "Kandy",
//     center_type: "Hospital",
//     date_registered: "2021/01/04",
//     status: "ACTIVE",
//   },
//   {
//     center_name: "SLKandy Center2",
//     country: "Sri Lanka",
//     city: "Kandy",
//     center_type: "Hospital",
//     date_registered: "2021/01/04",
//     status: "ACTIVE",
//   },
//   {
//     center_name: "SLKandy Center3",
//     country: "Sri Lanka",
//     city: "Kandy",
//     center_type: "Hospital",
//     date_registered: "2021/01/04",
//     status: "ACTIVE",
//   },
//   {
//     center_name: "SLKandy Center4",
//     country: "Sri Lanka",
//     city: "Kandy",
//     center_type: "Hospital",
//     date_registered: "2021/01/04",
//     status: "ACTIVE",
//   },
// ]