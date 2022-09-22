import React from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Toolbar from "./Toolbar";
import EmailList from "./EmailList/EmailListTable";
import DraftedEmailList from "./EmailList/DraftedEmailTable";
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
            tab1data={<DraftedEmailList />}
            tab2title="Recent"
            tab2data={<EmailList />}
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
