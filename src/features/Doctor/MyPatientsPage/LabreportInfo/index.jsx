import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Box,
} from "@material-ui/core";

import FolderIcon from "@material-ui/icons/Folder";
import ViewIcon from "@material-ui/icons/VisibilityOutlined";
import { useSelector } from "react-redux";
import { selectLabReports } from "./selector";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const Index = () => {
  const labReports = useSelector(selectLabReports);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List>
        <Box p={5}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            {labReports && labReports.length > 0 ? (
              labReports.map((i) => {
                return (
                  <Grid key={i.id} item xs={12} md={6}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={i.labReportName} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="download"
                          onClick={() => {
                            window.open(i.url, "_blank", "noopener,noreferrer");
                          }}
                        >
                          <ViewIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Grid>
                );
              })
            ) : (
              <Grid item>
                <Typography color="textSecondary">No Data.</Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </List>
    </div>
  );
};

export default Index;
