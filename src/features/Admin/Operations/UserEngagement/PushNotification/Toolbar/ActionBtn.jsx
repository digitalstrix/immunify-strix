import React from "react";
import { Box } from "@material-ui/core";
import MainDialog from "../../../../../../common/components/Admin/Dialog";
import NotificationForm from "../NotificationForm";
import NotificationTestForm from "../NotificationTestForm";
import SingleUser from "../../SingleUser";

export default function Actionbtn() {
  const [openSend, setOpenSend] = React.useState(false);
  const [openTest, setOpenTest] = React.useState(false);
  const [opensINGLE, setOpenSingle] = React.useState(false);
  return (
    <Box display="flex">
      <Box m={1}>
        <MainDialog
          open={opensINGLE}
          isiconbtn={false}
          btnlabel="Single user"
          dialogtitle="Message"
          dialogcontent={
            <SingleUser data={{ messageType: "PUSHNOTIFICATION" }} />
          }
          handleOpen={() => setOpenSingle(true)}
          handleClose={() => setOpenSingle(false)}
          maxWidth="sm"
          tooltip="Send push notification for single user"
        />
      </Box>
      <Box m={1}>
        <MainDialog
          open={openSend}
          isiconbtn={false}
          btnlabel="Send"
          dialogtitle="Message"
          dialogcontent={<NotificationForm />}
          handleOpen={() => setOpenSend(true)}
          handleClose={() => setOpenSend(false)}
          maxWidth="sm"
          tooltip="Send push notification"
        />
      </Box>
      <Box m={1}>
        <MainDialog
          open={openTest}
          isiconbtn={false}
          btnlabel="Test"
          dialogtitle="Message"
          dialogcontent={<NotificationTestForm />}
          handleOpen={() => setOpenTest(true)}
          handleClose={() => setOpenTest(false)}
          maxWidth="sm"
          tooltip="Test before sending push notification"
        />
      </Box>
    </Box>
  );
}
