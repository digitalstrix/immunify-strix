import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabBar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <Box mt={1}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant={props.variant}
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            centered={props.centered}
          >
            <Tab
              label={props.tab1title}
              {...a11yProps(0)}
              disabled={props.tab1disable}
              wrapped
              style={{ display: props.tab1hide }}
            />
            <Tab
              label={props.tab2title}
              {...a11yProps(1)}
              disabled={props.tab2disable}
              wrapped
              style={{ display: props.tab2hide }}
            />
            <Tab
              label={props.tab3title}
              {...a11yProps(2)}
              disabled={props.tab3disable}
              wrapped
              style={{ display: props.tab3hide }}
            />
            <Tab
              label={props.tab4title}
              {...a11yProps(3)}
              disabled={props.tab4disable}
              wrapped
              style={{ display: props.tab4hide }}
            />
            <Tab
              label={props.tab5title}
              {...a11yProps(5)}
              disabled={props.tab5disable}
              wrapped
              style={{ display: props.tab5hide }}
            />
            <Tab
              label={props.tab6title}
              {...a11yProps(6)}
              disabled={props.tab6disable}
              wrapped
              style={{ display: props.tab6hide }}
            />
            <Tab
              label={props.tab7title}
              {...a11yProps(7)}
              disabled={props.tab7disable}
              wrapped
              style={{ display: props.tab7hide }}
            />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          {props.tab1data}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {props.tab2data}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {props.tab3data}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {props.tab4data}
        </TabPanel>
        <TabPanel value={value} index={4}>
          {props.tab5data}
        </TabPanel>
        <TabPanel value={value} index={5}>
          {props.tab6data}
        </TabPanel>
        <TabPanel value={value} index={6}>
          {props.tab7data}
        </TabPanel>
      </Box>
    </div>
  );
}
