import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import CheckOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import Table from "../../../../../../common/components/Admin/Table";
import { selectSentNotifications, selectCountries } from '../../selector';
import { findObjectValue } from '../../findValue';

const Notificationlisttable = () => {
  const countryList = useSelector((state) => selectCountries(state));
  const country = countryList.map((countryObj => ({lable: countryObj.countryName, value: countryObj.id})));
  const sentNotificationsList = useSelector((state) => selectSentNotifications(state));
  const sentNotifications = sentNotificationsList.map(listObj => (
    { 
      ...listObj, 
      sentTime: moment(listObj.updatedAt).format("hh:mm:ss a"), 
      sentDate: moment(listObj.updatedAt).format("YYYY/MM/DD"), 
      country: findObjectValue(country, listObj.countryId),
    }
  ));

  return (
    <div>
      <Table
        title="Recent Push Notifications"
        columns={[
          { title: "User Type", field: "usersType" },
          { title: "Subject", field: "subject" },
          { title: "Message", field: "message" },
          { title: "Sent Time", field: "sentTime" },
          { title: "Sent Date", field: "sentDate" },
          { title: "Age From", field: "ageFromMonth" },
          { title: "Age To", field: "ageToMonth" },
          { title: "Contact Number", field: "contact" },
          { title: "Days (before/after) end subscription", field: "days" },
          { title: "Image", field: "image" },
          { title: "country", field: "country" },
          { title: "Subscription", field: "parentSubscriptionPlan" },
          { title: "Parent Sub Category", field: "parentSubCategory" },
          // { title: "Approved by", field: "approvedBy" },
        ]}
        data={sentNotifications.reverse()}
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
