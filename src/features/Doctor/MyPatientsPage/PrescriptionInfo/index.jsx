import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import PreviewIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { selectPrescriptions } from "./selector";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
}));

export default function Index() {
  const prescriptions = useSelector(selectPrescriptions);
  const classes = useStyles();
  return (
    <React.Fragment>
      <Timeline align="alternate">
        {prescriptions && prescriptions.length > 0 ? (
          prescriptions.map((i) => {
            return (
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography color="textSecondary">
                    {moment(i.date || i.updateAt).format("YYYY-MM-DD") ||
                      i.time}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography>
                      {(i.fileName && "Dr. " + i.fileName) ||
                        "Dr. " +
                          i.userData.firstName +
                          " " +
                          i.userData.lastName ||
                        "No Doctor Name Provided"}
                    </Typography>
                    <IconButton
                      color="primary"
                      aria-label="preview"
                      component="span"
                      onClick={() => {
                        window.open(
                          i.imageUrl,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                    >
                      <PreviewIcon />
                    </IconButton>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            );
          })
        ) : (
          <Typography color="textSecondary">No Data.</Typography>
        )}
      </Timeline>
    </React.Fragment>
  );
}
