import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/CreateOutlined";

import Table from "../../../../common/components/Table";
import MilestoneDetails from "./MilestoneDetails";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
} from "@material-ui/core";

import milestone1 from "../../../../assets/img/Milestones/milestone-01.png";
import milestone2 from "../../../../assets/img/Milestones/milestone-02.png";
import milestone3 from "../../../../assets/img/Milestones/milestone-03.png";
import milestone4 from "../../../../assets/img/Milestones/milestone-04.png";
import milestone5 from "../../../../assets/img/Milestones/milestone-05.png";
import milestone6 from "../../../../assets/img/Milestones/milestone-06.png";
import milestone7 from "../../../../assets/img/Milestones/milestone-07.png";
import milestone8 from "../../../../assets/img/Milestones/milestone-08.png";
import milestone9 from "../../../../assets/img/Milestones/milestone-09.png";
import milestone10 from "../../../../assets/img/Milestones/milestone-10.png";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    borderRadius: 4,
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: "100%",
  },
}))(MuiAccordionDetails);

const cardStyle = makeStyles({
  card: {
    width: "50%",
  },
  media: {
    objectFit: "contain",
    height: 140,
  },
  input: {
    display: "none",
  },
  cardAction: {
    width: "100%",
  },
});

const Index = () => {
  const classes = cardStyle();
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Box p={2}>
        {/* 2 months */}
        <Accordion
          square
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>02 Months Milestone</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={milestone1}
                    title="Rick"
                  />
                  <CardActions>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                    />
                    <label
                      htmlFor="contained-button-file"
                      className={classes.cardAction}
                    >
                      <Button
                        variant="outlined"
                        fullWidth
                        size="small"
                        color="primary"
                        component="span"
                        startIcon={<EditIcon />}
                      >
                        Change Image
                      </Button>
                    </label>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Table
                  title=""
                  columns={[{ title: "Milestone Name", field: "name" }]}
                  data={[
                    {
                      name: "Meet the Prediction",
                    },
                    {
                      name: "Social",
                    },
                    {
                      name: "Communication",
                    },
                    {
                      name: "Cognitive",
                    },
                    {
                      name: "Physical Development",
                    },
                  ]}
                  detailPanel={(rowData) => {
                    return <MilestoneDetails dataType="m1" />;
                  }}
                  rowClick={(event, rowData, togglePanel) => {
                    togglePanel();
                  }}
                  options={{
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    loadingType: "overlay",
                    showEmptyDataSourceMessage: true,
                    search: false,
                    toolbar: false,
                  }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        {/* 04 months */}
        <Accordion
          square
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>04 Months Milestone</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={milestone2}
                    title="Rick"
                  />
                  <CardActions>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                    />
                    <label
                      htmlFor="contained-button-file"
                      className={classes.cardAction}
                    >
                      <Button
                        variant="outlined"
                        fullWidth
                        size="small"
                        color="primary"
                        component="span"
                        startIcon={<EditIcon />}
                      >
                        Change Image
                      </Button>
                    </label>
                  </CardActions>
                </Card>
                <Grid item xs={12}>
                  <Table
                    title=""
                    columns={[{ title: "Milestone Name", field: "name" }]}
                    data={[
                      {
                        name: "Meet the Prediction",
                      },
                      {
                        name: "Social",
                      },
                      {
                        name: "Communication",
                      },
                      {
                        name: "Cognitive",
                      },
                      {
                        name: "Physical Development",
                      },
                    ]}
                    detailPanel={(rowData) => {
                      return <MilestoneDetails />;
                    }}
                    rowClick={(event, rowData, togglePanel) => {
                      togglePanel();
                    }}
                    options={{
                      headerStyle: {
                        fontWeight: "bold",
                      },
                      loadingType: "overlay",
                      showEmptyDataSourceMessage: true,
                      search: false,
                      toolbar: false,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        {/* 06 months */}
        <Accordion
          square
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>06 Months Milestone</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={milestone3}
                    title="Rick"
                  />
                  <CardActions>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                    />
                    <label
                      htmlFor="contained-button-file"
                      className={classes.cardAction}
                    >
                      <Button
                        variant="outlined"
                        fullWidth
                        size="small"
                        color="primary"
                        component="span"
                        startIcon={<EditIcon />}
                      >
                        Change Image
                      </Button>
                    </label>
                  </CardActions>
                </Card>
                <Table
                  title=""
                  columns={[{ title: "Milestone Name", field: "name" }]}
                  data={[
                    {
                      name: "Meet the Prediction",
                    },
                    {
                      name: "Social",
                    },
                    {
                      name: "Communication",
                    },
                    {
                      name: "Cognitive",
                    },
                    {
                      name: "Physical Development",
                    },
                  ]}
                  detailPanel={(rowData) => {
                    return <MilestoneDetails />;
                  }}
                  rowClick={(event, rowData, togglePanel) => {
                    togglePanel();
                  }}
                  options={{
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    loadingType: "overlay",
                    showEmptyDataSourceMessage: true,
                    search: false,
                    toolbar: false,
                  }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        {/* 09 months */}
        <Accordion
          square
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <Typography>09 Months Milestone</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={milestone4}
                    title="Rick"
                  />
                  <CardActions>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                    />
                    <label
                      htmlFor="contained-button-file"
                      className={classes.cardAction}
                    >
                      <Button
                        variant="outlined"
                        fullWidth
                        size="small"
                        color="primary"
                        component="span"
                        startIcon={<EditIcon />}
                      >
                        Change Image
                      </Button>
                    </label>
                  </CardActions>
                </Card>
                <Table
                  title=""
                  columns={[{ title: "Milestone Name", field: "name" }]}
                  data={[
                    {
                      name: "Meet the Prediction",
                    },
                    {
                      name: "Social",
                    },
                    {
                      name: "Communication",
                    },
                    {
                      name: "Cognitive",
                    },
                    {
                      name: "Physical Development",
                    },
                  ]}
                  detailPanel={(rowData) => {
                    return <MilestoneDetails />;
                  }}
                  rowClick={(event, rowData, togglePanel) => {
                    togglePanel();
                  }}
                  options={{
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    loadingType: "overlay",
                    showEmptyDataSourceMessage: true,
                    search: false,
                    toolbar: false,
                  }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        {/* 1 year */}
        <Accordion
          square
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
            <Typography>01 Year Milestone</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={milestone5}
                    title="Rick"
                  />
                  <CardActions>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                    />
                    <label
                      htmlFor="contained-button-file"
                      className={classes.cardAction}
                    >
                      <Button
                        variant="outlined"
                        fullWidth
                        size="small"
                        color="primary"
                        component="span"
                        startIcon={<EditIcon />}
                      >
                        Change Image
                      </Button>
                    </label>
                  </CardActions>
                </Card>
                <Table
                  title=""
                  columns={[{ title: "Milestone Name", field: "name" }]}
                  data={[
                    {
                      name: "Meet the Prediction",
                    },
                    {
                      name: "Social",
                    },
                    {
                      name: "Communication",
                    },
                    {
                      name: "Cognitive",
                    },
                    {
                      name: "Physical Development",
                    },
                  ]}
                  detailPanel={(rowData) => {
                    return <MilestoneDetails />;
                  }}
                  rowClick={(event, rowData, togglePanel) => {
                    togglePanel();
                  }}
                  options={{
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    loadingType: "overlay",
                    showEmptyDataSourceMessage: true,
                    search: false,
                    toolbar: false,
                  }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        {/* 1 year */}
        <Accordion
          square
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
        >
          <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
            <Typography>18 Months Milestone</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={milestone6}
                    title="Rick"
                  />
                  <CardActions>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                    />
                    <label
                      htmlFor="contained-button-file"
                      className={classes.cardAction}
                    >
                      <Button
                        variant="outlined"
                        fullWidth
                        size="small"
                        color="primary"
                        component="span"
                        startIcon={<EditIcon />}
                      >
                        Change Image
                      </Button>
                    </label>
                  </CardActions>
                </Card>
                <Table
                  title=""
                  columns={[{ title: "Milestone Name", field: "name" }]}
                  data={[
                    {
                      name: "Meet the Prediction",
                    },
                    {
                      name: "Social",
                    },
                    {
                      name: "Communication",
                    },
                    {
                      name: "Cognitive",
                    },
                    {
                      name: "Physical Development",
                    },
                  ]}
                  detailPanel={(rowData) => {
                    return <MilestoneDetails />;
                  }}
                  rowClick={(event, rowData, togglePanel) => {
                    togglePanel();
                  }}
                  options={{
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    loadingType: "overlay",
                    showEmptyDataSourceMessage: true,
                    search: false,
                    toolbar: false,
                  }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        {/* 2 years */}
        <Accordion
          square
          expanded={expanded === "panel7"}
          onChange={handleChange("panel7")}
        >
          <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
            <Typography>02 Year Milestone</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={milestone7}
                    title="Rick"
                  />
                  <CardActions>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                    />
                    <label
                      htmlFor="contained-button-file"
                      className={classes.cardAction}
                    >
                      <Button
                        variant="outlined"
                        fullWidth
                        size="small"
                        color="primary"
                        component="span"
                        startIcon={<EditIcon />}
                      >
                        Change Image
                      </Button>
                    </label>
                  </CardActions>
                </Card>
                <Table
                  title=""
                  columns={[{ title: "Milestone Name", field: "name" }]}
                  data={[
                    {
                      name: "Meet the Prediction",
                    },
                    {
                      name: "Social",
                    },
                    {
                      name: "Communication",
                    },
                    {
                      name: "Cognitive",
                    },
                    {
                      name: "Physical Development",
                    },
                  ]}
                  detailPanel={(rowData) => {
                    return <MilestoneDetails />;
                  }}
                  rowClick={(event, rowData, togglePanel) => {
                    togglePanel();
                  }}
                  options={{
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    loadingType: "overlay",
                    showEmptyDataSourceMessage: true,
                    search: false,
                    toolbar: false,
                  }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        {/* 3 years */}
        <Accordion
          square
          expanded={expanded === "panel8"}
          onChange={handleChange("panel8")}
        >
          <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
            <Typography>03 Year Milestone</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={milestone8}
                    title="Rick"
                  />
                  <CardActions>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                    />
                    <label
                      htmlFor="contained-button-file"
                      className={classes.cardAction}
                    >
                      <Button
                        variant="outlined"
                        fullWidth
                        size="small"
                        color="primary"
                        component="span"
                        startIcon={<EditIcon />}
                      >
                        Change Image
                      </Button>
                    </label>
                  </CardActions>
                </Card>
                <Table
                  title=""
                  columns={[{ title: "Milestone Name", field: "name" }]}
                  data={[
                    {
                      name: "Meet the Prediction",
                    },
                    {
                      name: "Social",
                    },
                    {
                      name: "Communication",
                    },
                    {
                      name: "Cognitive",
                    },
                    {
                      name: "Physical Development",
                    },
                  ]}
                  detailPanel={(rowData) => {
                    return <MilestoneDetails />;
                  }}
                  rowClick={(event, rowData, togglePanel) => {
                    togglePanel();
                  }}
                  options={{
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    loadingType: "overlay",
                    showEmptyDataSourceMessage: true,
                    search: false,
                    toolbar: false,
                  }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        {/* 4 years */}
        <Accordion
          square
          expanded={expanded === "panel9"}
          onChange={handleChange("panel9")}
        >
          <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
            <Typography>04 Year Milestone</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={milestone9}
                    title="Rick"
                  />
                  <CardActions>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                    />
                    <label
                      htmlFor="contained-button-file"
                      className={classes.cardAction}
                    >
                      <Button
                        variant="outlined"
                        fullWidth
                        size="small"
                        color="primary"
                        component="span"
                        startIcon={<EditIcon />}
                      >
                        Change Image
                      </Button>
                    </label>
                  </CardActions>
                </Card>
                <Table
                  title=""
                  columns={[{ title: "Milestone Name", field: "name" }]}
                  data={[
                    {
                      name: "Meet the Prediction",
                    },
                    {
                      name: "Social",
                    },
                    {
                      name: "Communication",
                    },
                    {
                      name: "Cognitive",
                    },
                    {
                      name: "Physical Development",
                    },
                  ]}
                  detailPanel={(rowData) => {
                    return <MilestoneDetails />;
                  }}
                  rowClick={(event, rowData, togglePanel) => {
                    togglePanel();
                  }}
                  options={{
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    loadingType: "overlay",
                    showEmptyDataSourceMessage: true,
                    search: false,
                    toolbar: false,
                  }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        {/* 5 years */}
        <Accordion
          square
          expanded={expanded === "panel10"}
          onChange={handleChange("panel10")}
        >
          <AccordionSummary
            aria-controls="panel10d-content"
            id="panel10d-header"
          >
            <Typography>05 Year Milestone</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={milestone10}
                    title="Rick"
                  />
                  <CardActions>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                    />
                    <label
                      htmlFor="contained-button-file"
                      className={classes.cardAction}
                    >
                      <Button
                        variant="outlined"
                        fullWidth
                        size="small"
                        color="primary"
                        component="span"
                        startIcon={<EditIcon />}
                      >
                        Change Image
                      </Button>
                    </label>
                  </CardActions>
                </Card>
                <Table
                  title=""
                  columns={[{ title: "Milestone Name", field: "name" }]}
                  data={[
                    {
                      name: "Meet the Prediction",
                    },
                    {
                      name: "Social",
                    },
                    {
                      name: "Communication",
                    },
                    {
                      name: "Cognitive",
                    },
                    {
                      name: "Physical Development",
                    },
                  ]}
                  detailPanel={(rowData) => {
                    return <MilestoneDetails />;
                  }}
                  rowClick={(event, rowData, togglePanel) => {
                    togglePanel();
                  }}
                  options={{
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    loadingType: "overlay",
                    showEmptyDataSourceMessage: true,
                    search: false,
                    toolbar: false,
                  }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default Index;
