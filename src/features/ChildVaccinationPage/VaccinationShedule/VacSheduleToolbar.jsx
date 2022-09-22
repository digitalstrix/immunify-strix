import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from "notistack";

import { Box, Grid } from "@material-ui/core";
import Dialog from "../../../common/components/Dialog";
import DialogContent from "./VacSheduleDialogContent";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import {
  selectAddNewVaccineFormInputs,
  selectChildren
} from '../selector';
import { addNewVaccine } from '../vaccinationSlice';

const Vacsheduletoolbar = ({ onGoingChecked, setOnGoingChecked }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const inputs = useSelector(selectAddNewVaccineFormInputs);
  const [ child ] = useSelector(selectChildren)
  const dispatch = useDispatch();


  const NewVaccineSuccessMsg = "New Vaccine Added Successfully!";
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Box display="flex" justifyContent="flex-start">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
          >
            <FormControlLabel
              value="ongoing"
              control={<Radio color="primary" />}
              label="Ongoing"
              labelPlacement="start"
              checked={onGoingChecked}
              onClick={() => setOnGoingChecked(true)}
            />
            <FormControlLabel
              value="vaccinated"
              control={<Radio color="primary" />}
              label="Vaccinated"
              labelPlacement="start"
              checked={!onGoingChecked}
              onClick={() => setOnGoingChecked(false)}
            />
          </RadioGroup>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Dialog
            isiconbtn={false}
            disableOpenAction={!child}
            btnlabel="Add New Vaccine"
            dialogactiontitle="Submit Vaccine"
            dialogtitle="Add new Vaccine"
            dialogcontent={<DialogContent />}
            dialogaction={() =>{
              dispatch(addNewVaccine({
                ...inputs,
                childId: child.id,
                vacId: 1
              }));
              // enqueueSnackbar(NewVaccineSuccessMsg, {
              //   variant: "success",
              //   anchorOrigin: {
              //     vertical: "top",
              //     horizontal: "center",
              //   },
              // })
            }}
            dialogOpenAction={() => setOpen(true)}
            dialogCloseAction={() => setOpen(false)}
            maxWidth="md"
            open={open}
          />
        </Box>
      </Grid>
    </div>
  );
};

export default Vacsheduletoolbar;
