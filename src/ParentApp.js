import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { PORTAL_TYPE_GENERAL } from "./constants/commonConstants";
import theme from "./assets/theme.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import PrivateRoute from "./common/components/PrivateRoute";
import DashboardPage from "./features/DashboardPage/DashboardPage";
import RegistrationPage from "./features/RegistrationPage/RegistrationPage";
import ChildVaccinationPage from "./features/ChildVaccinationPage/ChildVaccinationPage";
import ReportsPage from "./features/ReportsPage/StandardReportsPage";
import RequestVaccinesPage from "./features/RequestVaccinesPage/RequestVaccinesPage";
import OrderDevicesPage from "./features/OrderDevicesPage/OrderDevicesPage";
import PersistentDrawerLeft from "./common/components/Drawer";
import ChildInformationPage from "./features/ChildVaccinationPage/ChildInformationPage";
import CalendarPage from "./features/CalendarPage";
import UserManagementPage from "./features/UserManagementPage";

// parent routes
import MyChildrenPage from "./features/Parent/MyChildrenPage/ChildrenListpage";
import ChildInfoPage from "./features/Parent/MyChildrenPage/ChildInfoPage";
import DocSearchPage from "./features/Parent/FindDoctorPage/DocSearchPage";
import SearchResultPage from "./features/Parent/FindDoctorPage/SearchResultPage";
import SelectChildPage from "./features/Parent/FindDoctorPage/SelectChildPage";
import PaymentDetailPage from "./features/Parent/FindDoctorPage/PaymentDetailPage";
import PaymentSummaryPage from "./features/Parent/FindDoctorPage/PaymentSummaryPage";
import MyAppointPage from "./features/Parent/MyAppointPage";
import MyAccountPage from "./features/Parent/MyAccountPage";
import MakeAppointmentPage from "./features/Parent/FindDoctorPage/AppointmentDetailsFrom";
import CallView from './features/Parent/CallView/index.tsx'
import MilestonePages from "./features/Parent/MyChildrenPage/MilestonePage";

export default function ParentApp() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <PersistentDrawerLeft portalType="parent">
            {/* Parent Routes */}
            <PrivateRoute path="/my-account" component={MyAccountPage} portal={PORTAL_TYPE_GENERAL} />
            <PrivateRoute path="/mychildren" component={MyChildrenPage} portal={PORTAL_TYPE_GENERAL} />
            <PrivateRoute path="/childinfoPage" component={ChildInfoPage} portal={PORTAL_TYPE_GENERAL} />
            <PrivateRoute path="/docSearch" component={DocSearchPage} portal={PORTAL_TYPE_GENERAL} />
            <PrivateRoute path="/searchResult" component={SearchResultPage} portal={PORTAL_TYPE_GENERAL} />
            <PrivateRoute path="/selectChild" component={SelectChildPage} portal={PORTAL_TYPE_GENERAL} />
            <PrivateRoute path="/payment" component={PaymentDetailPage} portal={PORTAL_TYPE_GENERAL} />
            <PrivateRoute path="/make-appointment" component={MakeAppointmentPage} portal={PORTAL_TYPE_GENERAL} />
            <PrivateRoute path="/paymentSummary" component={PaymentSummaryPage} portal={PORTAL_TYPE_GENERAL} />
            <PrivateRoute path="/appointments" component={MyAppointPage} portal={PORTAL_TYPE_GENERAL} />
            <PrivateRoute path="/user-management" component={UserManagementPage} portal={PORTAL_TYPE_GENERAL} />
            <PrivateRoute path="/call-view" component={CallView} portal={PORTAL_TYPE_GENERAL} />
            <PrivateRoute path="/milestones" component={MilestonePages} portal={PORTAL_TYPE_GENERAL} />
          </PersistentDrawerLeft>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}
