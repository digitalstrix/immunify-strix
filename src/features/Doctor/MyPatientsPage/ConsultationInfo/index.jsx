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
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { selectConsultations } from "./selector";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
}));

export default function Index() {
  const classes = useStyles();
  const consultations = useSelector(selectConsultations);

  return (
    <React.Fragment>
      <Timeline align="alternate">
        {consultations && consultations.length > 0 ? (
          consultations.map((i) => {
            return (
              <TimelineItem key={i.id}>
                <TimelineOppositeContent>
                  <Typography color="textSecondary">
                    {moment(i.date).format("YYYY-MM-DD")}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography> {`Appointment Number: ${i.id}`}</Typography>
                    <Typography>
                      {" "}
                      {`Appointment Type: ${i.appoinmentType}`}
                    </Typography>
                    <Typography>
                      {" "}
                      {`Appointment Status: ${i.status}`}
                    </Typography>
                    <Typography> {`Consulted By: You`}</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            );
          })
        ) : (
          <Typography>No Data.</Typography>
        )}
      </Timeline>
    </React.Fragment>
  );
}
