import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  categorizeMilestone,
  getChildMilestoneUpdatingError,
  getChildMilestoneUpdatingStatus,
  selectedMilestone,
} from "../ChildSummary/selector";
import Dialog, {
  DialogContent,
  DialogActions,
} from "../../../../../common/components/Admin/Dialog";
import { notify } from "../../../../../utils/commonUtils";
import { useSnackbar } from "notistack";
import defaultImg from "../../../../../assets/img/Milestones/2MONTHS/SOCIAL/2MONTHS_SOCIAL_1.png";
import { updateChildMilestoneAsync } from "../milestoneSlice";
import findMilestoneImage from "../../../../../utils/Milestones/milestoneImages";

const useStyles = makeStyles({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  media: {
    height: 140,
  },
  title: {
    textDecoration: "line-through",
  },
});

function Milestonecards({ dataType }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { social, communication, cognitive, physical } = useSelector(categorizeMilestone);
  const { childId, atAgeUnit, atAge } = useSelector(selectedMilestone);
  const updatingStatus = useSelector(getChildMilestoneUpdatingStatus);
  const updatingError = useSelector(getChildMilestoneUpdatingError);

  const CHILD_MILESTONE_UPDATE_SUCCESSFUL_MSG = "Child Milestone Successfully Updated!";
  const CHILD_MILESTONE_UPDATE_FAILURE_MSG = "Child Milestone Updating Failed!";

  const updateChildMilestone = useCallback(
    (info) => {
      dispatch(updateChildMilestoneAsync(info));
    },
    [dispatch]
  );

  useEffect(() => {
    if (updatingStatus === "succeeded") {
      notify(enqueueSnackbar, CHILD_MILESTONE_UPDATE_SUCCESSFUL_MSG);
      setOpen(false);
      setSelectedItem(null);
    } else if (updatingStatus === "failed") {
      notify(enqueueSnackbar, CHILD_MILESTONE_UPDATE_FAILURE_MSG, "error");
    }
  }, [updatingStatus, updatingError, enqueueSnackbar]);

  const getData = () => {
    switch (dataType) {
      case "social":
        return social;
        break;

      case "communication":
        return communication;
        break;

      case "cognitive":
        return cognitive;
        break;

      case "physical":
        return physical;
        break;

      default:
        return [];
        break;
    }
  };

  const AddNoteDialog = ({ data }) => {
    const [note, setNote] = useState(data?.description || null);
    return (
      <>
        <DialogContent dividers>
          <Box p={2}>
            <TextField
              id="textarea"
              multiline
              rows={4}
              fullWidth
              defaultValue={note}
              variant="outlined"
              disabled={updatingStatus === "loading" ? true : false}
              onBlur={(e) => {
                setNote(e.target.value);
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              dispatch(
                updateChildMilestoneAsync({
                  childId,
                  cbId: data.id,
                  atAge,
                  atAgeUnit,
                  description: note,
                })
              );
            }}
          >
            {updatingStatus === "loading" ? "Loading..." : "Save"}
          </Button>
        </DialogActions>
      </>
    );
  };

  return (
    <div>
      <Dialog
        tooltip="Add a note"
        dialogtitle="Add a note"
        dialogcontent={<AddNoteDialog data={selectedItem} />}
        maxWidth="xs"
        open={open}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
      />
      <Box p={3}>
        <Grid container spacing={3}>
          {getData() &&
            getData().length > 0 &&
            getData().map((item) => {
              const imgData = findMilestoneImage(item.id);
              return (
                <Grid item xs={12} md={4}>
                  <Card className={classes.card}>
                    <Box>
                      <CardMedia
                        image={imgData?.imgPath?.default || defaultImg}
                        className={classes.media}
                      />
                      <CardContent>
                        <Box display="flex">
                          <FormControlLabel
                            control={
                              <GreenCheckbox
                                checked={
                                  item.completedByChild === 0 ? false : true
                                }
                                onChange={() => {
                                  updateChildMilestone({
                                    childId,
                                    cbId: item.id,
                                    atAge,
                                    atAgeUnit,
                                    milestoneCompletedByChild:
                                      !item.completedByChild,
                                  });
                                }}
                                name="checkedG"
                              />
                            }
                          />
                          <Typography
                            style={{ fontSize: 15 }}
                            color="textPrimary"
                            component="p"
                            className={
                              item.completedByChild === 1 && classes.title
                            }
                          >
                            {item.behaviour}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Box>
                    <Box>
                      <CardActionArea
                        onClick={() => {
                          setSelectedItem(item);
                          setOpen(true);
                        }}
                      >
                        <Divider />
                        <Box m={2}>
                          <Typography
                            variant="caption"
                            color="textSecondary"
                            component="p"
                          >
                            {item.description}
                          </Typography>
                        </Box>
                        <Box m={3}>
                          <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            fullWidth
                            className={classes.btn}
                          >
                            {item.description ? "Edit" : "Add a Note"}
                          </Button>
                        </Box>
                      </CardActionArea>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </div>
  );
}

export default Milestonecards;

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
