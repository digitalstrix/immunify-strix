import React from "react";
import { PersonAddOutlined } from "@material-ui/icons";
import MainDialog from "../../../common/components/Admin/Dialog";
import UseraddForm from "../UseraddForm";

export default function ActionBtn() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <MainDialog
        open={open}
        isiconbtn={false}
        btnlabel="Add a User"
        btnicon={<PersonAddOutlined />}
        dialogtitle="Add a User"
        dialogcontent={<UseraddForm />}
        handleOpen={() => setOpen(true)}
        handleClose={() => setOpen(false)}
        maxWidth="sm"
      />
    </div>
  );
}
