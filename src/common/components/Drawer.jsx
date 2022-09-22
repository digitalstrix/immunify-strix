import React from "react";
//router
import { withRouter, NavLink, useHistory } from "react-router-dom";

//material
import {
  Avatar,
  Badge,
  Box,
  Collapse,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  withStyles,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

//
import { useKeycloak } from "@react-keycloak/web";
import { setCookie } from "../../utils/commonUtils";
import { getRolesByPortalScreen } from "../../utils/navigationUtils";
import { LinearProgressIndicator } from "../../common/components/Loader";
import {hasRole, logoutAsync} from '../../features/LoginEntry/loginEntrySlice';
import "./styles/drawer.css";

// Icons
import {
  NotificationsActiveOutlined as NotificationsActiveOutlinedIcon,
  EmailOutlined,
  ChildCareOutlined as ChildIcon,
  EventAvailableOutlined as EventAvailableOutlinedIcon,
  ExpandLess,
  ExpandMore,
  StarBorder,
  RecentActorsOutlined as RecentActorsOutlinedIcon,
  ThumbUpAltOutlined as ApprovalIcon,
  UpdateOutlined as TimeIcon,
  MoreVert as MoreIcon,
  BallotOutlined as AppointIcon,
  PageviewOutlined as DocIcon,
  VerifiedUserOutlined as VerifiedUserOutlinedIcon,
  OfflineBoltRounded as OfflineBoltRoundedIcon,
  EventAvailableSharp as EventAvailableSharpIcon,
  AccountBalanceOutlined as AccountBalanceOutlinedIcon,
  AccountBalanceWalletOutlined as AccountBalanceWalletOutlinedIcon,
  PeopleOutlineOutlined as PeopleOutlineOutlinedIcon,
  StoreMallDirectoryOutlined as StoreMallDirectoryOutlinedIcon,
  AccountCircle,
  Notifications as NotificationsIcon,
  DevicesOtherOutlined as DevicesOtherOutlinedIcon,
  SwapVertOutlined as SwapVertOutlinedIcon,
  AssessmentOutlined as AssessmentOutlinedIcon,
  ChildFriendlyOutlined as ChildFriendlyOutlinedIcon,
  PregnantWomanOutlined as PregnantWomanOutlinedIcon,
  DashboardOutlined as DashboardOutlinedIcon,
  GroupAddOutlined,
  RecentActorsRounded as MyAccountIcon,
  People as MyPatientsIcon,
  AccountBalance as BankAccountIcon,
  FormatListBulleted as AppointmentsIcon,
  HourglassFullTwoTone as PendingIcon,
  PostAddTwoTone as AddNewItemIcon,
  LabelImportantTwoTone as LabelIcon,
} from "@material-ui/icons";

import { PORTAL_TYPE_IMM, PORTAL_TYPE_VAC } from "../../constants/commonConstants";

import logo from "../../assets/img/immunifyme logo.png";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/Common/commonSlice";
import DifferenceIcon from '@mui/icons-material/Difference';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import QuizIcon from '@mui/icons-material/Quiz';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import NoiseAwareIcon from '@mui/icons-material/NoiseAware';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

// const drawerWidth = 240;
const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    overflow: "hidden",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    "&activeLink": {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flex: 1,
    padding: theme.spacing(3),
    overflow: "auto",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  logo: {
    // width: "40px",
    height: "40px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    backgroundColor: "#F4F5F7",
    borderRadius: 20,
  },
}));

function PersistentDrawerLeft(props) {
  const dispatch = useDispatch();
  const [active, setActive] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openOperations, setOpenOperations] = React.useState(false);
  const [openContent, setOpenContent] = React.useState(false);
  const [openPodcast, setOpenPodcast] = React.useState(false);
  const [openNoise, setOpenNoise] = React.useState(false);
  const [openMusic, setOpenMusic] = React.useState(false);
  const [openQuestion, setOpenQuestion] = React.useState(false);
  const [openAppointment, setOpenAppointment] = React.useState(false);
  const [openTradename, setOpenTradename] = React.useState(false);
  const [openFinance, setOpenFinance] = React.useState(false);
  const [openReports, setOpenReports] = React.useState(false);
  const [openAdminReports, setOpenAdminReports] = React.useState(false);
  const [openUserEngagements, setOpenUserEngagement] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  // const { keycloak } = useKeycloak();
  const history = useHistory();
  const classes = useStyles();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const userLoginData = useSelector((state) => state.user);

  const isAuthorized = ({ portal, to: screen }) => {
    const roles = getRolesByPortalScreen(portal, screen);
    // console.log(screen);
    // console.log(roles);
    // if (keycloak) {
      return roles.some(async (role) => {
        const realm = await hasRole(role)
        // console.log('realm -======> ', realm);
        // keycloak.hasRealmRole(role);
        // const resource = keycloak.hasResourceRole(role);
        return realm ;
        // || resource;
      });
    // }
    // return false;
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);

    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logoutAsync(userLoginData));
    history.push("/");
    setCookie("login", "", 0);
    // dispatch(userLogout(userLoginData));
    // history.push("/");
    // setCookie("login", "", 0);
    // keycloak.logout();
  };

  const navigateToAccount = () => {
    history.push("/account");
  };

  const drawerItemMapper = (item) => (
    <div>
      <ListItem
        button
        component={NavLink}
        exact
        activeStyle={{
          fontWeight: "bolder",
          backgroundColor: "#ece2ff",
          color: "#8F479B",
        }}
        to={item.to}
        key={item.text}
        onClick={item.onClick}
        activeClassName='activeLink'
        className={classes.activeLink}>
        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
        <ListItemText primary={item.text} />
        {open ? item.openIcon : item.closeIcon}
        {openOperations ? item.openIcon2 : item.closeIcon2}
        {openFinance ? item.openIcon3 : item.closeIcon3}
        {openAdminReports ? item.openIcon4 : item.closeIcon4}
        {openTradename ? item.openIcon5 : item.closeIcon5}
      </ListItem>
      {item.content}
    </div>
  );

  const CollapseItems = () => {
    return (
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem
            button
            key='one'
            component={NavLink}
            className={classes.nested}
            exact
            to='/vaccenter-cards'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Vaccination Center Cards' />
          </ListItem>
          <ListItem
            button
            key='two'
            component={NavLink}
            className={classes.nested}
            exact
            to='/vendor-card-requests'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Vendor Card Requests' />
          </ListItem>
        </List>
      </Collapse>
    );
  };

  const CollapseItemsOperations = () => {
    return (
      <Collapse in={openOperations} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem
            button
            key='opTwo'
            component={NavLink}
            className={classes.nested}
            exact
            to='/doctor-approval'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <ApprovalIcon />
            </ListItemIcon>
            <ListItemText primary='Doctor Approval' />
          </ListItem>

          <ListItem
            button
            key='opOne'
            component={NavLink}
            className={classes.nested}
            exact
            to='/doctor-list'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <VerifiedUserOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Doctors' />
          </ListItem>

          <ListItem
            button
            key='opThree'
            component={NavLink}
            className={classes.nested}
            exact
            to='/consultation-timing'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <TimeIcon />
            </ListItemIcon>
            <ListItemText primary='Consultation Timing' />
          </ListItem>

          <ListItem
            button
            key='opFour'
            component={NavLink}
            className={classes.nested}
            exact
            to='/user-engagement'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <RecentActorsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='User Engagement' />
          </ListItem>
        </List>
      </Collapse>
    );
  };

  const CollapseItemsContent = () => {
    return (
      <Collapse in={openContent} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem
            button
            key='opTwo'
            component={NavLink}
            className={classes.nested}
            exact
            to='/view-blog'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <ApprovalIcon />
            </ListItemIcon>
            <ListItemText primary='View Article' />
          </ListItem>

          <ListItem
            button
            key='opOne'
            component={NavLink}
            className={classes.nested}
            exact
            to='/create-article'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <VerifiedUserOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Create Article' />
          </ListItem>

          {/* <ListItem
            button
            key='opThree'
            component={NavLink}
            className={classes.nested}
            exact
            to='/edit-article'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <TimeIcon />
            </ListItemIcon>
            <ListItemText primary='Edit Article' />
          </ListItem> */}

          <ListItem
            button
            key='opFour'
            component={NavLink}
            className={classes.nested}
            exact
            to='/view-categories'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <RecentActorsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='View Categories' />
          </ListItem>
        </List>
      </Collapse>
    );
  };

  const CollapseItemsPodcast = () => {
    return (
      <Collapse in={openPodcast} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem
            button
            key='opTwo'
            component={NavLink}
            className={classes.nested}
            exact
            to='/view-podcast'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <ApprovalIcon />
            </ListItemIcon>
            <ListItemText primary='View Podcast' />
          </ListItem>

          <ListItem
            button
            key='opOne'
            component={NavLink}
            className={classes.nested}
            exact
            to='/create-podcast'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <VerifiedUserOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Create Podcast' />
          </ListItem>

          {/* <ListItem
            button
            key='opThree'
            component={NavLink}
            className={classes.nested}
            exact
            to='/edit-podcast'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <TimeIcon />
            </ListItemIcon>
            <ListItemText primary='Edit Podcast' />
          </ListItem> */}

          <ListItem
            button
            key='opFour'
            component={NavLink}
            className={classes.nested}
            exact
            to='/view-podcast-categories'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <RecentActorsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='View Categories' />
          </ListItem>
        </List>
      </Collapse>
    );
  };

  const CollapseItemsNoise = () => {
    return (
      <Collapse in={openNoise} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem
            button
            key='opTwo'
            component={NavLink}
            className={classes.nested}
            exact
            to='/view-noise'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <ApprovalIcon />
            </ListItemIcon>
            <ListItemText primary='View White Noise' />
          </ListItem>

          <ListItem
            button
            key='opOne'
            component={NavLink}
            className={classes.nested}
            exact
            to='/create-noise'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <VerifiedUserOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Create White Noise' />
          </ListItem>

          {/* <ListItem
            button
            key='opThree'
            component={NavLink}
            className={classes.nested}
            exact
            to='/edit-noise'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <TimeIcon />
            </ListItemIcon>
            <ListItemText primary='Edit White Noise' />
          </ListItem> */}
        </List>
      </Collapse>
    );
  };

  const CollapseItemsMusic = () => {
    return (
      <Collapse in={openMusic} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem
            button
            key='opTwo'
            component={NavLink}
            className={classes.nested}
            exact
            to='/view-music'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <ApprovalIcon />
            </ListItemIcon>
            <ListItemText primary='View Music' />
          </ListItem>

          <ListItem
            button
            key='opOne'
            component={NavLink}
            className={classes.nested}
            exact
            to='/create-music'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <VerifiedUserOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Create Music' />
          </ListItem>

          {/* <ListItem
            button
            key='opThree'
            component={NavLink}
            className={classes.nested}
            exact
            to='/edit-music'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <TimeIcon />
            </ListItemIcon>
            <ListItemText primary='Edit Music' />
          </ListItem> */}
        </List>
      </Collapse>
    );
  };

  const CollapseItemsQuestion = () => {
    return (
      <Collapse in={openQuestion} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem
            button
            key='opTwo'
            component={NavLink}
            className={classes.nested}
            exact
            to='/view-question'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <ApprovalIcon />
            </ListItemIcon>
            <ListItemText primary='View Question' />
          </ListItem>

          <ListItem
            button
            key='opOne'
            component={NavLink}
            className={classes.nested}
            exact
            to='/create-question'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <VerifiedUserOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Create Question' />
          </ListItem>

          <ListItem
            button
            key='opThree'
            component={NavLink}
            className={classes.nested}
            exact
            to='/edit-question'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <TimeIcon />
            </ListItemIcon>
            <ListItemText primary='Edit Question' />
          </ListItem>
        </List>
      </Collapse>
    );
  };

  const CollapseItemsAppointment = () => {
    return (
      <Collapse in={openAppointment} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem
            button
            key='opTwo'
            component={NavLink}
            className={classes.nested}
            exact
            to='/view-appointment'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <ApprovalIcon />
            </ListItemIcon>
            <ListItemText primary='View Appointment' />
          </ListItem>

          <ListItem
            button
            key='opOne'
            component={NavLink}
            className={classes.nested}
            exact
            to='/create-appointment'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <VerifiedUserOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Create Appointment' />
          </ListItem>
        </List>
      </Collapse>
    );
  };

  const CollapseItemsFinance = () => {
    return (
      <Collapse in={openFinance} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem
            button
            key='dfone'
            component={NavLink}
            className={classes.nested}
            exact
            to='/doctor-settlements'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Doctor Settlements' />
          </ListItem>
        </List>
      </Collapse>
    );
  };

  const CollapseItemsReports = () => {
    return (
      <Collapse in={openReports} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem
            button
            key='dfone'
            component={NavLink}
            className={classes.nested}
            exact
            to='/reports'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Standard Reports' />
          </ListItem>
          <ListItem
            button
            key='dfone'
            component={NavLink}
            className={classes.nested}
            exact
            to='/centercardreports'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Center card Reports' />
          </ListItem>
        </List>
      </Collapse>
    );
  };

  const CollapseItemsAdminReports = () => {
    return (
      <Collapse in={openAdminReports} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem
            button
            key='raone'
            component={NavLink}
            className={classes.nested}
            exact
            to='/reports'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Card Printings' />
          </ListItem>
        </List>
      </Collapse>
    );
  };

  const CollapseItemsTradename = () => {
    return (
      <Collapse in={openTradename} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem
            button
            key='opTwo'
            component={NavLink}
            className={classes.nested}
            exact
            to='/tradename-list'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <AddNewItemIcon />
            </ListItemIcon>
            <ListItemText primary='Add Tradenames' />
          </ListItem>

          <ListItem
            button
            key='opOne'
            component={NavLink}
            className={classes.nested}
            exact
            to='/pending-tradenames'
            activeStyle={{
              fontWeight: "bolder",
              backgroundColor: "#f0f0f0",
              color: "blue",
            }}>
            <ListItemIcon>
              <PendingIcon />
            </ListItemIcon>
            <ListItemText primary='Pending Tradenames' />
          </ListItem>
        </List>
      </Collapse>
    );
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      {/* <MenuItem
        onClick={() => {
          handleMenuClose();
          navigateToAccount();
        }}
      >
        My account
      </MenuItem> */}
      <Divider />
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      {/* <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton aria-label='account of current user' aria-controls='primary-search-account-menu' aria-haspopup='true' color='inherit'>
          <AccountCircle />
        </IconButton>
        {/* <p>My Account</p> */}
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Box>
            <img src={logo} alt='logo' width='150px' />
          </Box>
          <Box>
            <div className={classes.sectionDesktop}>
              {/* <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
              <IconButton edge='end' aria-label='account of current user' aria-controls={menuId} aria-haspopup='true' onClick={handleProfileMenuOpen} color='inherit'>
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-label='show more' aria-controls={mobileMenuId} aria-haspopup='true' onClick={handleMobileMenuOpen} color='inherit'>
                <MoreIcon />
              </IconButton>
            </div>
            {renderMobileMenu}
            {renderMenu}
          </Box>
        </Toolbar>
        <LinearProgressIndicator />
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}>
        <Toolbar />
        <div className={classes.drawerContainer}>
          {(() => {
            switch (props.portalType) {
              case "admin":
                return (
                  <div>
                    <List>
                      {[
                        {
                          text: "Dashboard",
                          icon: <DashboardOutlinedIcon />,
                          to: "/",
                          portal: PORTAL_TYPE_IMM,
                        },
                        {
                          text: "Vaccines",
                          icon: <PregnantWomanOutlinedIcon />,
                          to: "/vaccine-list",
                          portal: PORTAL_TYPE_IMM,
                        },
                        {
                          text: "Vaccination Schedules",
                          icon: <ChildFriendlyOutlinedIcon />,
                          to: "/vaccination-schedules",
                          portal: PORTAL_TYPE_IMM,
                        },
                        {
                          text: "Vaccination Centers",
                          icon: <StoreMallDirectoryOutlinedIcon />,
                          to: "/vaccination-centers",
                          portal: PORTAL_TYPE_IMM,
                        },
                        {
                          text: "Manage Templates",
                          icon: <SwapVertOutlinedIcon />,
                          to: "/manage-templates",
                          portal: PORTAL_TYPE_IMM,
                        },
                        {
                          text: "User Management",
                          icon: <GroupAddOutlined />,
                          to: "/user-management",
                          portal: PORTAL_TYPE_IMM,
                        },
                        {
                          text: "Tradename",
                          icon: <LabelIcon />,
                          onClick: () => setOpenTradename(!openTradename),
                          openIcon5: <ExpandLess />,
                          closeIcon5: <ExpandMore />,
                          content: <CollapseItemsTradename />,
                          to: "/tradename-list",
                          portal: PORTAL_TYPE_IMM,
                        },
                        {
                          text: "Manage Cards",
                          icon: <DevicesOtherOutlinedIcon />,
                          onClick: () => setOpen(!open),
                          openIcon: <ExpandLess />,
                          closeIcon: <ExpandMore />,
                          content: <CollapseItems />,
                          to: "/vaccenter-cards",
                          portal: PORTAL_TYPE_IMM,
                        },
                        {
                          text: "Operations",
                          icon: <OfflineBoltRoundedIcon />,
                          onClick: () => setOpenOperations(!openOperations),
                          openIcon2: <ExpandLess />,
                          closeIcon2: <ExpandMore />,
                          content: <CollapseItemsOperations />,
                          to: "/doctor-approval",
                          portal: PORTAL_TYPE_IMM,
                        },
                        {
                          text: "Content",
                          icon: <DifferenceIcon />,
                          onClick: () => setOpenContent(!openContent),
                          openIcon2: <ExpandLess />,
                          closeIcon2: <ExpandMore />,
                          content: <CollapseItemsContent />,
                          to: "/view-blog",
                          portal: PORTAL_TYPE_IMM,
                        },
                        {
                          text: "Podcast",
                          icon: <PodcastsIcon />,
                          onClick: () => setOpenPodcast(!openPodcast),
                          openIcon2: <ExpandLess />,
                          closeIcon2: <ExpandMore />,
                          content: <CollapseItemsPodcast />,
                          to: "/view-podcast",
                          portal: PORTAL_TYPE_IMM,
                        },
                        {
                          text: "White Noise",
                          icon: <NoiseAwareIcon />,
                          onClick: () => setOpenNoise(!openNoise),
                          openIcon2: <ExpandLess />,
                          closeIcon2: <ExpandMore />,
                          content: <CollapseItemsNoise />,
                          to: "/view-noise",
                          portal: PORTAL_TYPE_IMM,
                        },
                        {
                          text: "Music",
                          icon: <LibraryMusicIcon />,
                          onClick: () => setOpenMusic(!openMusic),
                          openIcon2: <ExpandLess />,
                          closeIcon2: <ExpandMore />,
                          content: <CollapseItemsMusic />,
                          to: "/view-music",
                          portal: PORTAL_TYPE_IMM,
                        },
                        {
                          text: "Question",
                          icon: <QuizIcon />,
                          onClick: () => setOpenQuestion(!openQuestion),
                          openIcon2: <ExpandLess />,
                          closeIcon2: <ExpandMore />,
                          content: <CollapseItemsQuestion />,
                          to: "/view-question",
                          portal: PORTAL_TYPE_IMM,
                        },
                        {
                          text: "Appointment",
                          icon: <BookOnlineIcon />,
                          onClick: () => setOpenAppointment(!openAppointment),
                          openIcon2: <ExpandLess />,
                          closeIcon2: <ExpandMore />,
                          content: <CollapseItemsAppointment />,
                          to: "/view-appointment",
                          portal: PORTAL_TYPE_IMM,
                        },
                        {
                          text: "Finance",
                          icon: <DevicesOtherOutlinedIcon />,
                          onClick: () => setOpenFinance(!openFinance),
                          openIcon3: <ExpandLess />,
                          closeIcon3: <ExpandMore />,
                          content: <CollapseItemsFinance />,
                          to: "/doctor-settlements",
                          portal: PORTAL_TYPE_IMM,
                        },
                        {
                          text: "Reports",
                          icon: <AssessmentOutlinedIcon />,
                          onClick: () => setOpenAdminReports(!openAdminReports),
                          openIcon4: <ExpandLess />,
                          closeIcon4: <ExpandMore />,
                          content: <CollapseItemsAdminReports />,
                          to: "/reports",
                          portal: PORTAL_TYPE_IMM,
                        },
                      ]
                        .filter(isAuthorized)
                        .map(drawerItemMapper)}
                    </List>
                  </div>
                );
                break;
              case "user":
                return (
                  <div>
                    <Box p={2}>
                      <Box display='flex' alignItems='center' className={classes.profile} px={2} py={1}>
                        <Box>
                          <StyledBadge
                            overlap='circular'
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            variant='dot'>
                            <Avatar src={""} />
                          </StyledBadge>
                        </Box>
                        <Box ml={3}>
                          <Box>
                            <Typography variant='overline' component='div'>
                              John Doe
                            </Typography>

                            <Typography variant='caption' className={classes.title} color='textSecondary'>
                              Role:{" "}
                            </Typography>
                            <Typography variant='caption'>Doctor</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Divider />
                    <List>
                      {[
                        {
                          text: "Dashboard",
                          icon: <DashboardOutlinedIcon />,
                          to: "/",
                          portal: PORTAL_TYPE_VAC,
                        },
                        {
                          text: "My Account",
                          icon: <MyAccountIcon />,
                          to: "/account",
                          portal: PORTAL_TYPE_VAC,
                        },
                        {
                          text: "My Appointments",
                          icon: <AppointmentsIcon />,
                          to: "/my-appointments",
                          portal: PORTAL_TYPE_VAC,
                        },
                        {
                          text: "My Patients",
                          icon: <MyPatientsIcon />,
                          to: "/mypatients",
                          portal: PORTAL_TYPE_VAC,
                        },
                        {
                          text: "Bank Account",
                          icon: <BankAccountIcon />,
                          to: "/bank",
                          portal: PORTAL_TYPE_VAC,
                        },
                        {
                          text: "Manage Events",
                          icon: <EventAvailableOutlinedIcon />,
                          to: "/calender",
                          portal: PORTAL_TYPE_VAC,
                        },
                        {
                          text: "Registration",
                          icon: <PregnantWomanOutlinedIcon />,
                          to: "/registration",
                          portal: PORTAL_TYPE_VAC,
                        },
                        {
                          text: "Child Vaccination",
                          icon: <ChildFriendlyOutlinedIcon />,
                          to: "/child-vaccination",
                          portal: PORTAL_TYPE_VAC,
                        },
                        // {
                        //   text: "Reports",
                        //   icon: <AssessmentOutlinedIcon />,
                        //   to: "/reports",
                        // },
                        {
                          text: "Reports",
                          icon: <OfflineBoltRoundedIcon />,
                          onClick: () => setOpenReports(!openReports),
                          openIcon2: <ExpandLess />,
                          closeIcon2: <ExpandMore />,
                          content: <CollapseItemsReports />,
                          to: "/reports",
                          portal: PORTAL_TYPE_VAC,
                        },
                        {
                          text: "Request Vaccines",
                          icon: <SwapVertOutlinedIcon />,
                          to: "/request-vaccines",
                          portal: PORTAL_TYPE_VAC,
                        },
                        {
                          text: "User Management",
                          icon: <GroupAddOutlined />,
                          to: "/user-management",
                          portal: PORTAL_TYPE_VAC,
                        },
                        {
                          text: "Order Device",
                          icon: <DevicesOtherOutlinedIcon />,
                          to: "/order-devices",
                          portal: PORTAL_TYPE_VAC,
                        },
                        // {
                        //   text: "My Pateints",
                        //   icon: <PeopleOutlineOutlinedIcon />,
                        //   to: "/mypatients",
                        // },
                        // {
                        //   text: "My Appointments",
                        //   icon: <EventAvailableSharpIcon />,
                        //   to: "/appointments",
                        // },
                        // {
                        //   text: "Wallet",
                        //   icon: <AccountBalanceWalletOutlinedIcon />,
                        //   to: "/wallet",
                        // },
                        // {
                        //   text: "My Bank Account",
                        //   icon: <AccountBalanceOutlinedIcon />,
                        //   to: "/bank",
                        // },
                        // {
                        //   text: "My Child",
                        //   icon: <ChildIcon />,
                        //   to: "/mychildren",
                        // },
                        // {
                        //   text: "Find A Doctor",
                        //   icon: <DocIcon />,
                        //   to: "/docSearch",
                        // },
                        // {
                        //   text: "My Appointments",
                        //   icon: <AppointIcon />,
                        //   to: "/myappointments",
                        // },
                      ]
                        .filter(isAuthorized)
                        .map(drawerItemMapper)}
                    </List>
                  </div>
                );
              case "parent":
                return (
                  <div>
                    <List>
                      {[
                        {
                          text: "My Account",
                          icon: <MyAccountIcon />,
                          to: "/my-account",
                        },
                        {
                          text: "My Appointments",
                          icon: <EventAvailableSharpIcon />,
                          to: "/appointments",
                        },
                        {
                          text: "My Children",
                          icon: <ChildIcon />,
                          to: "/mychildren",
                        },
                        {
                          text: "Find A Doctor",
                          icon: <DocIcon />,
                          to: "/docSearch",
                        },
                        // {
                        //   text: "JOin Call",
                        //   icon: <DocIcon />,
                        //   to: "/call-view",
                        // },
                      ].map((item) => (
                        <>
                        {console.log(item)}
                          <ListItem
                            button
                            component={NavLink}
                            exact
                            to={item.to}
                            activeStyle={{
                              fontWeight: "bolder",
                              backgroundColor: "#ece2ff",
                              color: "#8F479B",
                            }}
                            key={item.text}
                            onClick={item.onClick}
                            activeClassName='activeLink'
                            className={classes.activeLink}>
                            {item.icon && <ListItemIcon style={{ color: "#8F479B" }}>{item.icon}</ListItemIcon>}
                            <ListItemText primary={item.text} style={{ paddingTop: 5, paddingBottom: 5 }} className={"activeText"} />
                            {open ? item.openIcon : item.closeIcon}
                            {openOperations ? item.openIcon2 : item.closeIcon2}
                            {openFinance ? item.openIcon3 : item.closeIcon3}
                            {openReports ? item.openIcon4 : item.closeIcon4}
                          </ListItem>
                          {item.content}
                        </>
                      ))}
                    </List>
                  </div>
                );
              default:
                break;
            }
          })()}
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {props.children}
      </main>
    </div>
  );
}

export default withRouter(PersistentDrawerLeft);
