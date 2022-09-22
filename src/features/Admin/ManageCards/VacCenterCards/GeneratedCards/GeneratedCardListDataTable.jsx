import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, IconButton, Tooltip } from '@material-ui/core';
import MainDialog from "../../../../../common/components/Admin/Dialog";
import Table from "../../../../../common/components/Admin/Table";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import { extractDate, notify } from '../../../../../utils/commonUtils';

import { useSnackbar } from "notistack";
import PrintCardsDialog from "./PrintCardsDialog";

import { selectCodeDetails, selectPrintCardStatus, selectPdfUrl, selectArtworks } from '../../selector';
import { getQrCodes, setPdfUrl, getArtworks } from '../../mangeCardsSlice';

const CARD_PRINTING_SUCCESS_MSG = 'Card printing successful! Download by clicking the link in the dialog';
const CARD_PRINTING_FAILED_MSG = 'Card printing failure! Try again.';

const Generatedcardlistdatatable = ({ rowData: { id }}) => {
  const { enqueueSnackbar } = useSnackbar();
  const codeDetails = useSelector(selectCodeDetails);
  const cardPrintingStatus = useSelector(selectPrintCardStatus);
  const pdfUrl = useSelector(selectPdfUrl);
  const artworks = useSelector(selectArtworks);
  const [open, setOpen] = useState(false);
  const [batch, setBatch] = useState(null);

  
  const dispatch = useDispatch();

  useEffect(() => {
    if (!codeDetails[id]) {
      dispatch(getQrCodes({ vacId: id }));
    }
  }, [id, codeDetails, dispatch]);

  useEffect(() => {
    if (cardPrintingStatus === 'succeeded') {
      notify(enqueueSnackbar, CARD_PRINTING_SUCCESS_MSG);
    } else if (cardPrintingStatus === 'failed') {
      notify(enqueueSnackbar, CARD_PRINTING_FAILED_MSG, 'error');
    }
  }, [cardPrintingStatus, enqueueSnackbar]);

  useEffect(() => {
    if (!artworks || artworks.length === 0) {
      dispatch(getArtworks({}));
    }
  }, [artworks, dispatch]);

  const data = useMemo(() => {
    const cardData = codeDetails[id];
    if (cardData) {
      return cardData
      .map(({ createdAt, maxCode, minCode, totalCount, remainingCount, ...rem }) => ({
        ...rem,
        createdAt: extractDate(createdAt),
        range: `${minCode} - ${maxCode}`,
        totalCount,
        remainingCount,
        issuedCount: totalCount - remainingCount
      }));
    }
    return [];
  }, [codeDetails, id]);

  const handleClose = () => {
    setOpen(false);
    dispatch(setPdfUrl(null));
  }


  if (!codeDetails[id]) {
    return (<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <CircularProgress />
    </div>);
  }

  return (
    <div>
      <MainDialog
        open={open}
        dialogtitle={'Print Cards'}
        disableBackdropClick
        disableEscapeKeyDown
        // dialogcontent={<Printcardsdialog data={selectedCenter} handleClose={() => setOpen(false)} dialogactiontitle="Print"/>}
        dialogcontent={
        <PrintCardsDialog
          vacId={id}
          batch={batch}
          handleClose={handleClose}
          dialogactiontitle="Print"
          pdfUrl={pdfUrl}
          artworks={artworks}
          cardPrintingStatus={cardPrintingStatus}
        />
      }
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
        maxWidth={"md"}
      />
      <Table
        title="QR Codes batch Table"
        columns={[
          { title: "Date Allocated", field: "createdAt" },
          { title: "Batch Allocated", field: "totalCount", type: "numeric" },
          { title: "Batch Enabled", field: "issuedCount", type: "numeric" },
          { title: "Batch Remaining", field: "remainingCount", type: "numeric" },
          { title: "Batch Start & End Codes", field: "range" }
        ]}
        data={data}
        actions={[
          {
            icon: "cards",
            tooltip: "Print Cards",
            onClick: (event, rowData) =>
              alert("this is " + rowData.shedule_name),
          },
        ]}
        components={{
          Action: (props) => {
            switch (props.action.icon) {
              case "cards":
                return (
                  <Tooltip title="Print Cards">
                    <IconButton
                      aria-label="Print Cards"
                      color="inherit"
                      onClick={(event) => {
                        setBatch(props.data);

                        setOpen(true);
                      }}
                    >
                      <PrintOutlinedIcon />
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
          search: true,
          actionsColumnIndex: -1,
          exportButton: true,
        }}
      />
    </div>
  );
};

export default Generatedcardlistdatatable;
