import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  Grid,
  Button,
  Checkbox,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Alert, AlertTitle } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "../../../../common/components/Table";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getQrDate,
  manageVaccination,
  setQrDate,
  setSelectedVaccine,
} from "./ParentSideVaccineSlice";
import {
  getChildSubscriptionManagingRole,
  vaccineDoesDetails,
  getLoggedInPersonId,
  getChildSubscribedFeature,
  getChildrenServicesList,
  getQrDateRetrievingStatus,
  selectQrDate,
  getSelectedChildQrCode,
  selectManageVacStatus,
} from "./selector";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: 20,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const DueVaccine = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [date, setDate] = useState(null);
  const [hasAccess, setHasAccess] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [editedView, setEditedView] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedVaccine(null));
    };
  }, [dispatch]);

  const {
    vaccine,
    tradeName,
    protectAgainst,
    status,
    dueDate,
    catchupPeriodStart,
    catchupPeriodEnd,
    vaccinatedDate,
    doseId,
    childId,
    parentId,
    qrCode,
    childDob,
    dosageName,
    id,
  } = data;

  const doesDetails = useSelector(vaccineDoesDetails);
  const role = useSelector(getChildSubscriptionManagingRole);
  const personId = useSelector(getLoggedInPersonId);
  const features = useSelector(getChildSubscribedFeature);
  const serviceList = useSelector(getChildrenServicesList);
  const qrRetrievingStatus = useSelector(getQrDateRetrievingStatus);
  const qrDate = useSelector(selectQrDate);
  const qrCodes = useSelector(getSelectedChildQrCode);

  const updatingState = useSelector(selectManageVacStatus);

  useEffect(() => {
    serviceList.map(async (value) => {
      const { memberImmId, servicePlanId } = value;
      if (childId == memberImmId) {
        if (servicePlanId == 3 || servicePlanId == 4) {
          await dispatch(getQrDate({ memberImmId: childId }));
        }
      }
    });

    //reset qr date
    return () => {
      dispatch(setQrDate(null));
    };
  }, []);

  useEffect(() => {
    if (qrRetrievingStatus == "succeeded") {
      if (qrDate) {
        if (new Date(qrDate[0]?.updatedAt) <= new Date(dueDate)) {
          alert(
            "You are only allowed to edit the vaccines which are due before the date of smart card purchase. Only your pediatrician can edit the vaccination information of this vaccine."
          );
          setHasAccess(false);
        }
      }
    }
  }, [qrRetrievingStatus]);

  const buttonActiveStatus =
    doesDetails.find((o) => o.doseId === doseId - 1) === undefined
      ? false
      : !doesDetails.find((o) => o.doseId === doseId - 1)?.vaccinated;

  return (
    <div>
      <Table
        title="Card Information"
        columns={[
          {
            field: "thead",
            headerStyle: { display: "none" },
            cellStyle: { fontWeight: "bold" },
          },
          { field: "tdata", headerStyle: { display: "none" } },
        ]}
        options={{
          search: false,
          pageSize: 8,
          paging: false,
          toolbar: false,
        }}
        data={[
          { thead: "Vaccine", tdata: vaccine },
          {
            thead: "Trade Name",
            tdata:
              (tradeName && tradeName !== "" && tradeName) ||
              "No Trade Name Provided",
          },
          { thead: "Protect Against", tdata: protectAgainst },
          { thead: "Vaccination Status", tdata: status },
          { thead: "Due Date", tdata: moment(dueDate).format("YYYY-MM-DD") },
          {
            thead: "Catchup Within",
            tdata: `${moment(catchupPeriodStart).format(
              "YYYY-MM-DD"
            )} - ${moment(catchupPeriodEnd).format("YYYY-MM-DD")}`,
          },
        ]}
      />
      <div className={classes.root}>
        {((!vaccinatedDate && qrCodes.length === 0) ||
          editedView ||
          hasAccess) && (
          <>
            <Accordion
              expanded={expanded === "panel"}
              onChange={handleChange("panel")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  {vaccine + " - Dose " + doseId}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  {vaccinatedDate && !editedView && (
                    <Grid md={12} style={{ padding: 10 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={vaccinatedDate}
                            disabled={vaccinatedDate}
                            inputProps={{ "aria-label": "primary checkbox" }}
                          />
                        }
                        label={
                          vaccinatedDate
                            ? `Vaccinated on ${moment(vaccinatedDate).format(
                                "YYYY-MM-DD"
                              )}`
                            : vaccine
                        }
                      />
                      <IconButton
                        color="primary"
                        aria-label="Edit"
                        component="span"
                        onClick={() => setEditedView(true)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Grid>
                  )}

                  {buttonActiveStatus && (
                    <Grid item md={12}>
                      <Alert severity="error">
                        <AlertTitle>Warning</AlertTitle>
                        Please Administer <strong>{vaccine}</strong> - Dose{" "}
                        <strong>{doseId - 1}</strong> first !
                      </Alert>
                    </Grid>
                  )}
                  <Grid item md={8}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        inputVariant="outlined"
                        fullWidth
                        id="Date"
                        label="Vaccinated Date"
                        format="MM/dd/yyyy"
                        minDate={childDob || null}
                        value={editedView ? vaccinatedDate : date}
                        onChange={(date) => setDate(date)}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item md={4}>
                    <Button
                      disabled={
                        !date ||
                        buttonActiveStatus ||
                        !hasAccess ||
                        updatingState === "loading"
                      }
                      style={{ marginTop: 8, marginLeft: 20 }}
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        dispatch(
                          manageVaccination({
                            childId,
                            personId,
                            vaccinationData: {
                              vaccinatedDate: date,
                              childVacDetailId: id,
                            },
                          })
                        );
                      }}
                    >
                      {updatingState === "loading" ? "Updating..." : "Save"}
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </div>
      <></>
    </div>
  );
};

export default DueVaccine;
