import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useSnackbar } from "notistack";
import { IconButton, Tooltip } from "@material-ui/core";
import { notify } from '../../../../../utils/commonUtils';
import MainDialog from "../../../../../common/components/Admin/Dialog";
import Table from "../../../../../common/components/Admin/Table";
import GeneratedCardListDataTable from "../GeneratedCards/GeneratedCardListDataTable";
import PlaylistAddOutlinedIcon from "@material-ui/icons/PlaylistAddOutlined";
import GenerateQRCodeDialog from "./GenerateQrCodeDialog";
import { selectQrCodeGenerationStatus, selectQrCodeGenerationError } from '../../selector';


const QRCODE_GENERATION_SUCCEESFUL_MSG = 'QR Codes Generated Successfully!';
const QRCODE_GENERATION_FAILURE_MSG = 'QR Codes Generation Failed!';

const Vaccentercardsdatatable = ({ data }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const qrCodeGenerationStatus = useSelector(selectQrCodeGenerationStatus);
  const qrCodeGenerationError = useSelector(selectQrCodeGenerationError);

  useEffect(() => {
    if (qrCodeGenerationStatus === 'succeeded') {
      notify(enqueueSnackbar, QRCODE_GENERATION_SUCCEESFUL_MSG);
      setOpen(false);
    } else if (qrCodeGenerationStatus === 'failed') {
      notify(enqueueSnackbar, qrCodeGenerationError || QRCODE_GENERATION_FAILURE_MSG, 'error');
    }
  }, [qrCodeGenerationStatus, qrCodeGenerationError, enqueueSnackbar]);

  return (
    <div>
      <MainDialog
        tooltip="Generate QR Codes"
        dialogtitle="Generate New QR Codes Batch"
        dialogcontent={<GenerateQRCodeDialog data={selectedCenter} handleClose={() => setOpen(false)} dialogactiontitle="Generate" disableAction={qrCodeGenerationStatus === 'loading'} />}
        maxWidth="md"
        open={open}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
      />
      <Table
        title=""
        columns={[
          { title: "Center Name", field: "name" },
          { title: "Country", field: "country" },
          { title: "State", field: "state" },
          { title: "City", field: "city" },
          { title: "Center Type", field: "vacType" },
          { title: "Status", field: "status" },
          { title: "Date Registered", field: "createdAt" }
        ]}
        data={data.slice()}
        actions={[
          {
            icon: "qrcode",
            tooltip: "Generate QR Codes",
            onClick: (event, rowData) =>
              alert("this is " + rowData.shedule_name),
          },
        ]}
        components={{
          Action: (props) => {
            switch (props.action.icon) {
              case "qrcode":
                return (
                  <Tooltip title={'Generate QR Codes'}>
                    <IconButton
                      onClick={() => {
                        setOpen(true)
                        setSelectedCenter(props.data);
                      }}
                      disabled={false}
                      color="inherit"
                    >
                      <PlaylistAddOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                );

              default:
                break;
            }
          },
        }}
        detailPanel={[
          {
            render: (rowData) => {
;               return <GeneratedCardListDataTable rowData={rowData} />;
            },
          },
        ]}
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

export default Vaccentercardsdatatable;
