import React from "react";
import { Grid, Box } from "@material-ui/core";
import Datepicker from "./DatePicker";
import MainDialog from "../../../common/components/Dialog";
import Comparedatadialog from "./CompareDataDialog";

const ToolbarSummary = () => {
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Box>
          <Datepicker />
        </Box>

        <Box>
          <MainDialog
            isiconbtn={false}
            btnlabel="Compare"
            dialogtitle="Compare View"
            dialogcontent={<Comparedatadialog />}
            dialogaction={() => {
              alert("You Edited ");
            }}
            dialogactiontitle="Close"
            maxWidth="sm"
          />
        </Box>
      </Grid>
    </div>
  );
};

export default ToolbarSummary;
