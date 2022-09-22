import React from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Toolbar from "./Toolbar";
import NotificationList from "./NotificationList/NotificationListTable";
import DraftedNotificationList from "./NotificationList/DraftedNotificationTable";
import TabBar from "../../../../../common/components/TabBar";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export default function Index() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth={true}>
        <Toolbar />
        <Box mt={5}>
          <TabBar
            tab1title="Drafted"
            tab1data={<DraftedNotificationList />}
            tab2title="Recent"
            tab2data={<NotificationList />}
            tab3hide="none"
            tab4hide="none"
            tab5hide="none"
            tab6hide="none"
            tab7hide="none"
            variant="fullWidth"
          />
        </Box>
      </Container>
    </div>
  );
}
