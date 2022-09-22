import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from "notistack";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "../../../common/components/Table";
import MainDialog from "../../../common/components/Dialog";
import Childdetaildialog from "./ChildDetailDialog";
import Childissuecarddialog from "./ChildIssueCardDialog";
import { excuteAfterGivenDelay } from '../../../utils/commonUtils';
import {
  selectChildren,
  selectChildDetailDialogType,
  selectDisplayChildDetailDialog,
  selectChildFromInputs,
  selectChildFormRelativeId,
  selectChildUpdatingStatus,
  selectScannedCard,
  selectActivateCardStatus,
  selectActivateCardError,
  selectChild,
  selectUser
} from '../selector';
import {
  setDisplayChildDetailDialog,
  initChildEditDialog,
  updateChild,
  initForm,
  setSelectedChild,
  activateCard,
  updateChildFromErrors,
  setScannedCard
} from '../registrationSlice';
import {
  cloneArray,
  notify
} from '../../../utils/commonUtils';
import {
  CHILDREN_DIALOG_TYPE_EDIT,
  CHILDREN_DIALOG_TYPE_CARD
} from  '../../../constants/registrationConstants';
import {
  generateCreateChildPayload,
  validateCreateChildPayload,
  generateChildFormErrors
} from "../../../utils/registrationUtils";
import edit from '../../../assets/icons/Edit.svg'
import card from '../../../assets/icons/Card.svg'

const CardIcon = () => (
  <img src={card} width="24" height="24" alt="child info icon"/>
);
const EditIcon = () => (
  <img src={edit} width="24" height="24" alt="child info icon"/>
);

const CHILD_UPDATE_SUCCESS_MSG = "Child Updated Successfully!";
const CHILD_UPDATE_FAILED_MSG = "Child update failed!";
const CARD_ACTIVATE_SUCCESS_MSG = "Card Activated Successfuly!";
const CARD_ACTIVATE_FAILED_MSG = "Card Activation failed!";

const title = (type) => {
  switch (type) {
    case CHILDREN_DIALOG_TYPE_EDIT:
      return 'Edit Child Information';
    case CHILDREN_DIALOG_TYPE_CARD:
      return 'Issue a Card';
    default:
      return '';
  } 
};

const dialogContent = (type) => {
  switch (type) {
    case CHILDREN_DIALOG_TYPE_EDIT:
      return <Childdetaildialog />;
    case CHILDREN_DIALOG_TYPE_CARD:
      return <Childissuecarddialog />;
    default:
      return null;
  } 
};

const dialogAction = (type, inputs, relativeId, child, scannedCard, user, dispatch) => {

  switch (type) {
    case CHILDREN_DIALOG_TYPE_EDIT:
      return () => {
        const payload = generateCreateChildPayload(inputs, { relativeId }, user);
        if (validateCreateChildPayload(payload)) {
          dispatch(updateChild(payload));
        } else {
          dispatch(updateChildFromErrors(generateChildFormErrors(inputs)));
        }
      };
    case CHILDREN_DIALOG_TYPE_CARD:
      return () => {
        if (scannedCard && child) {
          dispatch(activateCard({
            childId: child.id,
            qrCode: scannedCard
          }));

        }
      };
    default:
      return () => {};
  } 
};

const dialogCloseAction = (type, dispatch) => {
  switch (type) {
    case CHILDREN_DIALOG_TYPE_EDIT:
      return () => {
        dispatch(initForm('child'))
        dispatch(setDisplayChildDetailDialog([false, '']));
      };
    case CHILDREN_DIALOG_TYPE_CARD:
      return () => {
        dispatch(setDisplayChildDetailDialog([false, '']));
        excuteAfterGivenDelay(dispatch(setScannedCard(null)));
      };
    default:
      return () => {};
  } 
};

const actionTitle = (type, child) => {
  switch (type) {
    case CHILDREN_DIALOG_TYPE_EDIT:
      return 'Update';
    case CHILDREN_DIALOG_TYPE_CARD:
      return child.ChildQRCodes.length > 0 ? 'Assign card for lost card' : 'Activate';
    default:
      return '';
  } 
};
const maxWidth = (type) => (type === CHILDREN_DIALOG_TYPE_CARD ? 'sm': 'md');

const Childdatatable = ({ rowData: { id } }) => {
  const { enqueueSnackbar } = useSnackbar();
  const children = useSelector(selectChildren);
  const isOpen = useSelector(selectDisplayChildDetailDialog);
  const type = useSelector(selectChildDetailDialogType);
  const inputs = useSelector(selectChildFromInputs);
  const relativeId = useSelector(selectChildFormRelativeId);
  const childUpdatingStatus = useSelector(selectChildUpdatingStatus);
  const child = useSelector(selectChild);
  const user = useSelector(selectUser);
  const scannedCard = useSelector(selectScannedCard);
  const activateCardStatus = useSelector(selectActivateCardStatus);
  const activateCardError = useSelector(selectActivateCardError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (childUpdatingStatus === 'succeeded') {
      notify(enqueueSnackbar, CHILD_UPDATE_SUCCESS_MSG);      
      dispatch(setDisplayChildDetailDialog([false, '']));
    } else if (childUpdatingStatus === 'failed') {
      notify(enqueueSnackbar, CHILD_UPDATE_FAILED_MSG, 'error');
    }

    if (activateCardStatus === 'succeeded') {
      notify(enqueueSnackbar, CARD_ACTIVATE_SUCCESS_MSG);
      dispatch(setDisplayChildDetailDialog([false, '']));
    } else if (activateCardStatus === 'failed') {
      if (activateCardError && activateCardError.error) {
        notify(enqueueSnackbar, activateCardError.error, 'warning');
      } else {
        notify(enqueueSnackbar, CARD_ACTIVATE_FAILED_MSG, 'error');        
      }
    }   
    
  }, [childUpdatingStatus, activateCardStatus, activateCardError, enqueueSnackbar, dispatch]);

  return (
    <div>
      {isOpen ?
      <MainDialog
        dialogtitle={title(type)}
        dialogcontent={dialogContent(type)}
        dialogaction={dialogAction(type, inputs, relativeId, child, scannedCard, user, dispatch)}
        dialogCloseAction={dialogCloseAction(type, dispatch)}
        dialogactiontitle={actionTitle(type, child)}
        maxWidth={maxWidth(type)}
        open={true}
      />: null
      }
      <Table
        title="Child Details"
        columns={[
          { title: "Child Name", field: "firstName" },
          {
            title: "Registraion Number",
            field: "id",
            type: "numeric",
          },
          {
            title: "Age",
            field: "age",
          },
          {
            title: "Date Registered",
            field: "createdAt",
          },
        ]}
        data={cloneArray(children[id] || [])}
        actions={[
          {
            icon: "edit",
            onClick: (event, rowData) =>
              alert(
                "this onclick wpnt do anything,remove & check console" +
                  rowData.name
              ),
          },
          {
            icon: "card",
            onClick: (event, rowData) =>
              alert(
                "this onclick wpnt do anything,remove & check console " +
                  rowData.name
              ),
          },
        ]}
        components={{
          Action: (props) => {
            switch (props.action.icon) {
              case "edit":
                return (
                  <Tooltip title={'Edit'}>
                    <IconButton
                      onClick={() => {
                        dispatch(setDisplayChildDetailDialog([true, CHILDREN_DIALOG_TYPE_EDIT]));
                        dispatch(initChildEditDialog(props.data));
                      }}
                      disabled={false}
                      color="inherit"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                );
              case "card":
                return (
                  <Tooltip title={'Issue Card'}>
                    <IconButton
                      onClick={() => {
                        dispatch(setSelectedChild(props.data));
                        dispatch(setDisplayChildDetailDialog([true, CHILDREN_DIALOG_TYPE_CARD]));
                      }}
                      disabled={false}
                      color="inherit"
                    >
                      <CardIcon />
                    </IconButton>
                  </Tooltip>
                );
              default:
                break;
            }
          },
        }}
        options={{
          search: false,
          actionsColumnIndex: -1,
          exportButton: true,
        }}
      />
    </div>
  );
};

export default Childdatatable;
