import React from "react";
import MainDialog from "../../../../common/components/Admin/Dialog";

export default function ActionBtn({
  btnlabel,
  btnicon,
  dialogtitle,
  dialogcontent,
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <MainDialog
        open={open}
        isiconbtn={false}
        btnlabel={btnlabel}
        btnicon={btnicon}
        dialogtitle={dialogtitle}
        dialogcontent={dialogcontent}
        handleOpen={() => setOpen(true)}
        handleClose={() => setOpen(false)}
        maxWidth="sm"
      />
    </div>
  );
}
