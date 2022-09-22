import React, { useEffect } from "react";
import { Box, Grid, TextField, Typography, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { DialogContent, DialogActions } from "../../../../../common/components/Admin/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { loadVaccines, loadManufacturers, addTradename } from "../tradenameSlice";
import { selectVaccines, selectManufacturers, selectUserId, selectTradenameAddStatus } from "../selector";
import { generateAddTradenamePayload } from "../../../../../utils/vaccineUtils";
import { excuteAfterGivenDelay } from "../../../../../utils/commonUtils";

const dosecount = ["1", "2", "3", "4", "5"];
const durationUnit = ["Year", "Month", "Week", "Day"];

const Index = (props) => {
  const dispatch = useDispatch();
  const vaccines = useSelector(selectVaccines);
  const manufacturers = useSelector(selectManufacturers);
  const personId = useSelector(selectUserId);
  const status = useSelector(selectTradenameAddStatus);

  const [inputs, setInputs] = React.useState({
    createdBy: personId,
    manufacturerCompanyId: "",
    durationUnit: "",
    dosecount: "1",
    doses: { dose2: 0, dose3: 0, dose4: 0, dose5: 0 },
    tradename: "",
    vaccines: [],
  });

  useEffect(() => {
    dispatch(loadManufacturers());
    console.log(inputs, "============++++", inputs);
    if (status === "succeeded") {
      props.handleClose();
    }
  }, [status, inputs, dispatch]);

  // const handleChange = (value) => {
  //   setInputs({
  //     ...inputs,
  //     vaccine: value.name,
  //     manufacturer: value.companyName,
  //   });
  // };

  return (
    <React.Fragment>
      <DialogContent dividers>
        <form noValidate autoComplete='off'>
          <Box p={3}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Autocomplete
                  id='vaccine'
                  name='vaccine'
                  options={vaccines}
                  onInputChange={(e, value) => {
                    value && value.length >= 2 && dispatch(loadVaccines({ vaccineName: value }));
                  }}
                  onChange={(e, value) => {
                    value && setInputs({ ...inputs, vaccines: value });
                  }}
                  // onChange={(e, value) => {
                  //   value &&
                  //     value.forEach((item) => {
                  //       return setInputs({ ...inputs, vaccines: [...inputs.vaccines, item.name] });
                  //     });
                  // }}
                  // onChange={(e, value) => handleChange(value)}
                  required
                  getOptionSelected={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option.name}
                  fullWidth
                  multiple={true}
                  renderInput={(params) => <TextField {...params} label='Select Vaccine' variant='outlined' required />}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id='manufacturer'
                  name='manufacturer'
                  options={manufacturers}
                  onChange={(e, value) => value && setInputs({ ...inputs, manufacturerCompanyId: value.id })}
                  getOptionSelected={(option, value) => option.id === value.id}
                  // onChange={(e, value) => handleChange(value)}
                  getOptionLabel={(option) => option.companyName}
                  fullWidth
                  renderInput={(params) => <TextField {...params} label='Select Manufacturer' variant='outlined' required />}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id='tradename'
                  label='tradename'
                  variant='outlined'
                  fullWidth
                  value={inputs.tradename}
                  onChange={(e) => {
                    setInputs({ ...inputs, tradename: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id='durationUnit'
                  name='durationUnit'
                  options={durationUnit}
                  defaultValue={durationUnit[0]}
                  onChange={(e, value) => value && setInputs({ ...inputs, durationUnit: value })}
                  getOptionSelected={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option}
                  fullWidth
                  renderInput={(params) => <TextField {...params} label='Select duration unit' variant='outlined' required />}
                />
              </Grid>
              <Grid item xs={6}>
                {/* <Autocomplete
                  id='dose'
                  options={dosecount}
                  value={dose}
                  defaultValue={1}
                  onChange={(event, newValue) => {
                    setDose(newValue);
                  }}
                  inputValue={doseValue}
                  onInputChange={(event, newInputValue) => {
                    setDoseValue(newInputValue);
                  }}
                  fullWidth
                  renderInput={(params) => <TextField {...params} label='Dose Count' variant='outlined' size='medium' />}
                /> */}
                <Autocomplete
                  id='dosecount'
                  name='dosecount'
                  options={dosecount}
                  defaultValue={dosecount[0]}
                  onChange={(e, value) => value && setInputs({ ...inputs, dosecount: value })}
                  getOptionSelected={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option}
                  fullWidth
                  renderInput={(params) => <TextField {...params} label='Select dose count' variant='outlined' required />}
                />
              </Grid>



              <Grid container row item xs={12} md={12} spacing={1}>
                {inputs.dosecount === "2" ? (
                  <Grid item md={4}>
                    <Grid item xs={12}>
                      <Typography>Dose 2</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        id='days'
                        label={inputs.durationUnit}
                        variant='outlined'
                        margin='normal'
                        type='number'
                        value={inputs.doses.dose2}
                        onChange={(e) => setInputs({ ...inputs, doses: { ...inputs.doses, dose2: e.target.value } })}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                ) : inputs.dosecount === "3" ? (
                  <>
                    <Grid item md={4}>
                      <Grid item xs={12}>
                        <Typography>Dose 2</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          id='days'
                            label={inputs.durationUnit}
                          variant='outlined'
                          type='number'
                          margin='normal'
                          value={inputs.doses.dose2}
                          onChange={(e) => setInputs({ ...inputs, doses: { ...inputs.doses, dose2: e.target.value } })}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item md={4}>
                      <Grid item xs={12}>
                        <Typography>Dose 3</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          id='days'
                            label={inputs.durationUnit}
                          variant='outlined'
                          type='number'
                          margin='normal'
                          value={inputs.doses.dose3}
                          onChange={(e) => setInputs({ ...inputs, doses: { ...inputs.doses, dose3: e.target.value } })}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </>
                ) : inputs.dosecount === "4" ? (
                  <>
                    <Grid item md={4}>
                      <Grid item xs={12}>
                        <Typography>Dose 2</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          id='days'
                              label={inputs.durationUnit}
                          variant='outlined'
                          type='number'
                          margin='normal'
                          value={inputs.doses.dose2}
                          onChange={(e) => setInputs({ ...inputs, doses: { ...inputs.doses, dose2: e.target.value } })}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item md={4}>
                      <Grid item xs={12}>
                        <Typography>Dose 3</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          id='days'
                              label={inputs.durationUnit}
                          variant='outlined'
                          type='number'
                          margin='normal'
                          value={inputs.doses.dose3}
                          onChange={(e) => setInputs({ ...inputs, doses: { ...inputs.doses, dose3: e.target.value } })}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item md={4}>
                      <Grid item xs={12}>
                        <Typography>Dose 4</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          id='days'
                              label={inputs.durationUnit}
                          variant='outlined'
                          type='number'
                          margin='normal'
                          value={inputs.doses.dose4}
                          onChange={(e) => setInputs({ ...inputs, doses: { ...inputs.doses, dose4: e.target.value } })}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </>
                ) : inputs.dosecount === "5" ? (
                  <>
                    <Grid item md={4}>
                      <Grid item xs={12}>
                        <Typography>Dose 2</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          id='days'
                                label={inputs.durationUnit}
                          variant='outlined'
                          type='number'
                          margin='normal'
                          value={inputs.doses.dose2}
                          onChange={(e) => setInputs({ ...inputs, doses: { ...inputs.doses, dose2: e.target.value } })}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item md={4}>
                      <Grid item xs={12}>
                        <Typography>Dose 3</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          id='days'
                                label={inputs.durationUnit}
                          variant='outlined'
                          type='number'
                          margin='normal'
                          value={inputs.doses.dose3}
                          onChange={(e) => setInputs({ ...inputs, doses: { ...inputs.doses, dose3: e.target.value } })}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item md={4}>
                      <Grid item xs={12}>
                        <Typography>Dose 4</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          id='days'
                                label={inputs.durationUnit}
                          variant='outlined'
                          type='number'
                          margin='normal'
                          value={inputs.doses.dose4}
                          onChange={(e) => setInputs({ ...inputs, doses: { ...inputs.doses, dose4: e.target.value } })}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item md={4}>
                      <Grid item xs={12}>
                        <Typography>Dose 5</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          id='days'
                                label={inputs.durationUnit}
                          variant='outlined'
                          type='number'
                          margin='normal'
                          value={inputs.doses.dose5}
                          onChange={(e) => setInputs({ ...inputs, doses: { ...inputs.doses, dose5: e.target.value } })}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </>
                ) : null}
              </Grid>
            </Grid>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => props.handleClose()} disabled={false} color='primary' variant='outlined'>
          Close
        </Button>
        <Button
          autoFocus
          onClick={() => {
            const payload = generateAddTradenamePayload(inputs);

            console.log("payload ==================>", payload);
            dispatch(addTradename(payload));
          }}
          type='button'
          color='primary'
          variant='contained'>
          {props.dialogactiontitle}
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default Index;
