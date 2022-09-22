import React, {useState, useCallback} from "react";
import CheckOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import AriaModal from 'react-aria-modal';
import Table from "../../../../../../common/components/Admin/Table";
import { selectDraftEmails, selectCountries } from '../../selector';
import EditEmail from './EditEmail';
import ApproveEmail from './ApproveEmail';
import { deletMessageAsync } from '../../userEngagementSlice';
import { findObjectValue } from '../../findValue';

const Notificationlisttable = () => {
  const dispatch = useDispatch();
  const [modalActive, setOpenSend] = React.useState(false);
  const [modalActive2, setOpenSend2] = React.useState(false);
  const [dataRow, setDR] = useState(null);
  const [dataRow2, setDR2] = useState(null);
  const countryList = useSelector((state) => selectCountries(state));
  const country = countryList.map((countryObj => ({lable: countryObj.countryName, value: countryObj.id})))
  const draftEmailList = useSelector((state) => selectDraftEmails(state));
  const draftEmails = draftEmailList.map(countryObj => ({ ...countryObj, sentTime: moment(countryObj.updatedAt).format("hh:mm:ss a"), sentDate: moment(countryObj.updatedAt).format("YYYY/MM/DD"), country: findObjectValue(country, countryObj.countryId)}));

  const deactivateModal = () => {
    setOpenSend(false)
  }
  const activateModal = () => {
    setOpenSend(true)
  };

  const deactivateModal2 = () => {
    setOpenSend2(false)
  }
  const activateModal2 = () => {
    setOpenSend2(true)
  };

  const renderApprove = modalActive2 ? (
    <AriaModal
      onExit={deactivateModal2}
      alert={false}
      focusDialog={true}
      titleId='modal-title'
      underlayClickExits={'balck'}
      verticallyCenter={true}
    >
      <div
        style={{ outline: 0 }}
        className='my-modal-dialog'
      >
        <ApproveEmail data ={dataRow2} />
        <footer className="modal-footer">
          <button id="demo-one-deactivate" onClick={() => deactivateModal2()}>
            deactivate modal
          </button>
        </footer>
      </div>
    </AriaModal>
  ) : null

  const renderFunction = modalActive ? (
    <AriaModal
      onExit={deactivateModal}
      alert={false}
      focusDialog={true}
      titleId='modal-title'
      underlayClickExits={'balck'}
      verticallyCenter={true}
    >
      <div
        style={{ outline: 0 }}
        className='my-modal-dialog'
      >
        <EditEmail data ={dataRow} />
        <footer className="modal-footer">
          <button id="demo-one-deactivate" onClick={() => deactivateModal()}>
            deactivate modal
          </button>
        </footer>
      </div>
    </AriaModal>
  ) : null

  const deleteHandle = useCallback(
    (info) => {
      dispatch(deletMessageAsync(info));
    },[dispatch]
  )

  return (
    <div>
      <Table
        title="Drafted Mails"
        columns={[
          { title: "User Type", field: "usersType" },
          { title: "Subject", field: "subject" },
          { title: "Message", field: "message" },
          { title: "Sent Time", field: "sentTime" },
          { title: "Send Date", field: "sentDate" },
          { title: "Age From", field: "ageFromMonth" },
          { title: "Age To", field: "ageToMonth" },
          { title: "Contact Number", field: "contact" },
          { title: "Days (before/after) end subscription", field: "days" },
          { title: "Image", field: "image" },
          { title: "country", field: "country" },
          { title: "Subscription", field: "parentSubscriptionPlan" },
          { title: "Parent Sub Category", field: "parentSubCategory" },
          // { title: "Submited by", field: "approvedBy" },
        ]}
        data={draftEmails.reverse()}
        actions={[
          {
            icon: EditOutlinedIcon,
            tooltip: "Edit Email",
            onClick: (event, rowData) => {
              setDR(rowData);
              activateModal();
            },
          },
          {
            icon: CheckOutlinedIcon,
            tooltip: "Approve Email",
            onClick: (event, rowData) => {
              setDR2(rowData);
              activateModal2();
            },
          },
          {
            icon: DeleteOutlinedIcon,
            tooltip: "Delete Email",
            onClick: (event, rowData) => {
              deleteHandle({ messageId: rowData.id })
              // return rowData;
            },
          },
        ]}
        options={{
          loadingType: "overlay",
          showEmptyDataSourceMessage: true,
          headerStyle: { fontWeight: "bold" },
          pageSize: 5,
          actionsColumnIndex: -1,
        }}
      />
      {renderFunction}
      {renderApprove}
    </div>
  );
};

export default Notificationlisttable;
