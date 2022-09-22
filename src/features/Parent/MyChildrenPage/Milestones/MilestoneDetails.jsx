import React, { useState, useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import {
  Box,
  List,
  ListItem,
  TextField,
  Card,
  Divider,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import Dialog, {
  DialogContent,
  DialogActions,
} from "../../../../common/components/Admin/Dialog";

import { useSelector, useDispatch } from "react-redux";
import {
  categorizeMilestone,
  getChildMilestoneUpdatingError,
  getChildMilestoneUpdatingStatus,
  selectedMilestone,
} from "./ChildSummary/selector";
import { updateChildMilestoneAsync } from "./milestoneSlice";
import { notify } from "../../../../utils/commonUtils";
import { useSnackbar } from "notistack";
import findMilestoneImage from "../../../../utils/Milestones/milestoneImages";

const Milestonedetails = ({ dataType }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { social, communication, cognitive, physical } =
    useSelector(categorizeMilestone);
  const { childId, atAgeUnit, atAge } = useSelector(selectedMilestone);

  const updatingStatus = useSelector(getChildMilestoneUpdatingStatus);
  const updatingError = useSelector(getChildMilestoneUpdatingError);

  const CHILD_MILESTONE_UPDATE_SUCCESSFUL_MSG =
    "Child Milestone Successfully Updated!";
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

  console.log("dataaaaaaaa=>", social);

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
    <div className={classes.wrapper}>
      <Dialog
        tooltip="Add a note"
        dialogtitle="Add a note"
        dialogcontent={<AddNoteDialog data={selectedItem} />}
        maxWidth="xs"
        open={open}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
      />
      <List className={classes.scroll}>
        {getData() &&
          getData().length > 0 &&
          getData().map((item) => {
            return (
              <>
                <ListItem className={classes.listitem} key={item.id}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        style={{
                          width: "100%",
                          display: "inline-block",
                        }}
                        component="img"
                        title="alt"
                        image={findMilestoneImage(item.id)?.default}
                        title="alt"
                      />
                      <CardContent>
                        <Box className={classes.content}>
                          <Box>
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
                          </Box>
                          <Box>
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
                        </Box>
                        <Divider
                          dark
                          variant="full"
                          style={{
                            width: "100%",
                            marginBottom: 10,
                            marginTop: 10,
                          }}
                        />
                        <Typography
                          variant="caption"
                          // variant="h6"
                          color="textSecondary"
                          component="p"
                        >
                          {item.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Box className={classes.btn}>
                        <Button
                          size="small"
                          color="primary"
                          variant="contained"
                          className={classes.btn}
                          onClick={() => {
                            setSelectedItem(item);
                            setOpen(true);
                          }}
                        >
                          {item.description ? "Edit" : "Add a Note"}
                        </Button>
                      </Box>
                    </CardActions>
                  </Card>
                </ListItem>
              </>
            );
          })}
      </List>
    </div>
  );
};

export default Milestonedetails;

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    overflow: "hidden",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  scroll: {
    display: "flex",
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    overflowY: "auto",
  },
  listitem: {
    width: "40%",
    boxSizing: "border-box",
    flexShrink: 0,
  },
  card: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    // paddingTop: "100%", // 1:1,
    backgroundColor: "#f3e8ff",
  },
  content: {
    display: "flex",
    flexDirection: "row",
  },
  btn: {
    width: "100%",
  },
  title: {
    textDecoration: "line-through",
  },
});
