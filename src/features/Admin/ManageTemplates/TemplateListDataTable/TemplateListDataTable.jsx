import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useSnackbar } from "notistack";
import MainDialog from "../../../../common/components/Admin/Dialog";
import Table from "../../../../common/components/Admin/Table";
import AddTemplateDialog from "../AddTemplateDialog";
// import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
// import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { IconButton, Tooltip } from "@material-ui/core";
import { extractDate, notify } from '../../../../utils/commonUtils';
import { selectUpdateTemplateStatus } from '../selector';

const UPDATE_TEMPLATE_SUCCESS_MSG = 'Template Updating Successful!';
const UPDATE_TEMPLATE_FAILURE_MSG = 'Template Updating Failed!';

const Templatelistdatatable = ({ artworks, countries, vacCenters }) => {

  const { enqueueSnackbar } = useSnackbar();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [open, setOpen] = useState(false);

  const countryMap = useMemo(() => {
    const map = new Map();
    countries.forEach((country) => {
      map.set(country.id, country);
    });

    return map;
  }, [countries]);

  const centersMap = useMemo(() => {
    const map = new Map();
    vacCenters.forEach((center) => {
      map.set(center.id, center);
    });
    return map;
  }, [vacCenters]);

  const data = useMemo(() => {
    return artworks.map(({ createdAt, countryId, vacId, ...rem }) => ({
      ...rem,
      countryId,
      vacId,
      country: countryMap.get(countryId) ? countryMap.get(countryId).countryName : countryId,      
      center: vacId ? (centersMap.get(vacId) ? centersMap.get(vacId).name : vacId) : 'N/A',
      createdAt: extractDate(createdAt)
    }));
  }, [artworks, centersMap, countryMap]);

  const updateTemplateStatus = useSelector(selectUpdateTemplateStatus);

  useEffect(() => {
    if (updateTemplateStatus === 'succeeded') {
      notify(enqueueSnackbar, UPDATE_TEMPLATE_SUCCESS_MSG);
      setOpen(false);
    } else if (updateTemplateStatus === 'failed') {
      notify(enqueueSnackbar, UPDATE_TEMPLATE_FAILURE_MSG, 'error');
    }
  }, [updateTemplateStatus, enqueueSnackbar]);

  return (
    <div>
      <MainDialog
        open={open}
        btnicon={<EditOutlinedIcon />}
        dialogtitle="Edit Template Information"
        dialogcontent={
          <AddTemplateDialog
            data={selectedTemplate}
            countries={countries}
            countryMap={countryMap}            
            vacCenters={vacCenters}
            centersMap={centersMap}
            dialogactiontitle="Update"
            handleClose={() => setOpen(false)}
            disableAction={updateTemplateStatus === 'loading'}
          />
        }
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
        maxWidth="md"
      />
      <Table
        title=""
        columns={[
          { title: "Template Name", field: "templateName" },
          { title: "Description", field: 'description' },
          // { title: "Center Name", field: "center_name" },
          { title: "Country", field: "country" },
          { title: "Center", field: "center" },
          // { title: "City", field: "city" },
          { title: "Date Added", field: "createdAt" }
        ]}
        data={data}
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
            onClick: (event, rowData) =>
              alert("this onclick will return row data " + rowData.center_name),
          },
          // {
          //   icon: "delete",
          //   tooltip: "Delete",
          //   onClick: (event, rowData) =>
          //     alert("You Deleted " + rowData.template_name),
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
              //       dialogtitle="View Template Information"
              //       dialogcontent={<AddTemplateDialog />}
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
                  <Tooltip title={'Edit'}>
                  <IconButton
                    onClick={() => {

                      // setDialogTitle('Edit Template Information');
                      // setDialogActionTitle('Update');
                      setOpen(true)
                      // setType(DIALOG_TYPE_UPDATE_SCHEDULE);
                      setSelectedTemplate(props.data);
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
                return null;
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

export default Templatelistdatatable;
