import React from "react";
import MainDialog from "../../../../../../common/components/Admin/Dialog";
import EmailForm from "../EmailForm";
import EmailTestForm from "../EmailTestForm";
import SingleUser from "../../SingleUser";

export default function Actionbtn() {
  const [openSend, setOpenSend] = React.useState(false);
  const [openTest, setOpenTest] = React.useState(false);
  const [opensINGLE, setOpenSingle] = React.useState(false);
  return (
    <div>
      <MainDialog
        open={opensINGLE}
        isiconbtn={false}
        btnlabel="Send Email to single user"
        dialogtitle="Message"
        dialogcontent={<SingleUser data={{ messageType: "EMAIL" }} />}
        handleOpen={() => setOpenSingle(true)}
        handleClose={() => setOpenSingle(false)}
        maxWidth="sm"
      />
      <MainDialog
        open={openSend}
        isiconbtn={false}
        btnlabel="Send Email"
        dialogtitle="Message"
        dialogcontent={<EmailForm />}
        handleOpen={() => setOpenSend(true)}
        handleClose={() => setOpenSend(false)}
        maxWidth="sm"
      />
      <MainDialog
        open={openTest}
        isiconbtn={false}
        btnlabel="Test Send Email"
        dialogtitle="Message"
        dialogcontent={<EmailTestForm />}
        handleOpen={() => setOpenTest(true)}
        handleClose={() => setOpenTest(false)}
        maxWidth="sm"
      />
    </div>
  );
}
