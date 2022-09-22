import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab
          label={props.tab1title}
          disabled={props.tab1disable}
          style={{ display: props.tab1hide }}
          {...a11yProps(0)}
        />
        <Tab
          label={props.tab2title}
          disabled={props.tab2disable}
          style={{ display: props.tab2hide }}
          {...a11yProps(1)}
        />
        <Tab
          label={props.tab3title}
          disabled={props.tab3disable}
          style={{ display: props.tab3hide }}
          {...a11yProps(2)}
        />
        <Tab
          label={props.tab4title}
          disabled={props.tab4disable}
          style={{ display: props.tab4hide }}
          {...a11yProps(3)}
        />
        <Tab
          label={props.tab5title}
          disabled={props.tab5disable}
          style={{ display: props.tab5hide }}
          {...a11yProps(4)}
        />
        <Tab
          label={props.tab6title}
          disabled={props.tab6disable}
          style={{ display: props.tab6hide }}
          {...a11yProps(5)}
        />
        <Tab
          label={props.tab7title}
          disabled={props.tab7disable}
          style={{ display: props.tab7hide }}
          {...a11yProps(6)}
        />
      </Tabs>
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
    </div>
  );
}
