import React from "react";
import MainToolbar from "./MainToolbar";
import Table from "../../../common/components/Table";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  avatar: {
    backgroundColor: "grey",
    width: 48,
    height: 48,
  },
}));

const Index = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <MainToolbar />
        <Box mt={3}>
          <Grid container row spacing={2} justify="center">
            <Grid item xs={12} md={3}>
              <Card>
                <Box display="flex" justifyContent="center">
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                      </Avatar>
                    }
                  />
                </Box>
                <Divider />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    align="center"
                  >
                    <Box fontWeight={600}>BABY JESSICA</Box>
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    color="initial"
                    align="center"
                  >
                    <Box>12 Months</Box>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" size="small">
                    View Info
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <Box display="flex" justifyContent="center">
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                      </Avatar>
                    }
                  />
                </Box>
                <Divider />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    align="center"
                  >
                    <Box fontWeight={600}>BABY JESSICA</Box>
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    color="initial"
                    align="center"
                  >
                    <Box>12 Months</Box>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" size="small">
                    View Info
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <Box display="flex" justifyContent="center">
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                      </Avatar>
                    }
                  />
                </Box>
                <Divider />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    align="center"
                  >
                    <Box fontWeight={600}>BABY JESSICA</Box>
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    color="initial"
                    align="center"
                  >
                    <Box>12 Months</Box>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" size="small">
                    View Info
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Index;
