import React from "react";
import MainDialog from "../../../../../../common/components/Admin/Dialog";
import EmailForm from "../EmailForm";
import EmailTestForm from "../EmailTestForm";
import SingleUser from "../../SingleUser";
import { Box, Grid } from "@material-ui/core";

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
          dialogcontent={<SingleUser data={{ messageType: "EMAIL" }} />}
          handleOpen={() => setOpenSingle(true)}
          handleClose={() => setOpenSingle(false)}
          maxWidth="sm"
          tooltip="Send email for single user"
        />
      </Box>
      <Box m={1}>
        <MainDialog
          open={openSend}
          isiconbtn={false}
          btnlabel="Send"
          dialogtitle="Message"
          dialogcontent={<EmailForm />}
          handleOpen={() => setOpenSend(true)}
          handleClose={() => setOpenSend(false)}
          maxWidth="sm"
          tooltip="Send email"
        />
      </Box>
      <Box m={1}>
        <MainDialog
          open={openTest}
          isiconbtn={false}
          btnlabel="Test"
          dialogtitle="Message"
          dialogcontent={<EmailTestForm />}
          handleOpen={() => setOpenTest(true)}
          handleClose={() => setOpenTest(false)}
          maxWidth="sm"
          tooltip="Test before sending email"
        />
      </Box>
    </Box>
  );
}
