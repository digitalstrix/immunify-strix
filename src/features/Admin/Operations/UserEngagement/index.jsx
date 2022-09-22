import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, makeStyles } from "@material-ui/core";
import MainToolbar from "./MainToolbar";
import TabBar from "../../../../common/components/TabBar";
import PushNotification from "./PushNotification";
import Email from "./Email";
import {
  getSentEmails,
  getSentNotifications,
  getDraftEmails,
  getDraftNotifications,
  getCountries,
} from "./userEngagementSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const EMAIL = 'EMAIL';
const PUSHNOTIFICATION = 'PUSHNOTIFICATION';

export default function Index() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const callAsync = async () => {
    await dispatch(getSentEmails({ messageType: EMAIL, mode: 'SENT' }));
    await dispatch(getSentNotifications({ messageType: PUSHNOTIFICATION, mode: 'SENT'  }));
    await dispatch(getDraftEmails({ messageType: EMAIL, mode: 'DRAFT'  }));
    await dispatch(getDraftNotifications({ messageType: PUSHNOTIFICATION, mode: 'DRAFT'  }));
    await dispatch(getCountries());
  }

  useEffect(() => {
    // callAsync();
    dispatch(getSentEmails({ messageType: EMAIL, mode: 'SENT' }));
    dispatch(getSentNotifications({ messageType: PUSHNOTIFICATION, mode: 'SENT'  }));
    dispatch(getDraftEmails({ messageType: EMAIL, mode: 'DRAFT'  }));
    dispatch(getDraftNotifications({ messageType: PUSHNOTIFICATION, mode: 'DRAFT'  }));
    dispatch(getCountries());
  }, [])
  return (
    <div className={classes.root}>
      <Container maxWidth={true}>
        <MainToolbar />
        <Box mt={3}>
          <TabBar
            tab1title="Push Notifications"
            tab1data={<PushNotification />}
            tab2title="Emails"
            tab2data={<Email />}
            tab3hide="none"
            tab4hide="none"
            tab5hide="none"
            tab6hide="none"
            variant="fullWidth"
          />
        </Box>
      </Container>
    </div>
  );
}
