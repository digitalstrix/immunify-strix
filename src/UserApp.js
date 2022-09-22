import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

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
// doctor routes
import AccountPage from "./features/AccountPage";
import MyPatientsPage from "./features/Doctor/MyPatientsPage";
import WalletPage from "./features/Doctor/WalletPage";
import BankAccountPage from "./features/Doctor/BankAccountPage";
import MyAppointmentsPage from "./features/Doctor/MyAppointmentsPage";
import CenterCardReports from "./features/ReportsPage/CenterCardReportsPage";
import PatientContainer from "./features/Doctor/MyAppointmentsPage/PatientInfo";
import MakeCallPage from "./features/Doctor/MakeCallPage";
// parent routes
import MyChildrenPage from "./features/Parent/MyChildrenPage/ChildrenListpage";
import ChildInfoPage from "./features/Parent/MyChildrenPage/ChildInfoPage";
import DocSearchPage from "./features/Parent/FindDoctorPage/DocSearchPage";
import SearchResultPage from "./features/Parent/FindDoctorPage/SearchResultPage";
import SelectChildPage from "./features/Parent/FindDoctorPage/SelectChildPage";
import PaymentDetailPage from "./features/Parent/FindDoctorPage/PaymentDetailPage";
import PaymentSummaryPage from "./features/Parent/FindDoctorPage/PaymentSummaryPage";
import MyAppointPage from "./features/Parent/MyAppointPage";

import { PORTAL_TYPE_VAC } from "./constants/commonConstants";

export default function UserApp() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <PersistentDrawerLeft portalType="user">
            <Route exact path="/" component={DashboardPage} />
            <PrivateRoute
              path="/calender"
              component={CalendarPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/childinfo"
              component={ChildInformationPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/child-vaccination"
              component={ChildVaccinationPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/registration"
              component={RegistrationPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/reports"
              component={ReportsPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/centercardreports"
              component={CenterCardReports}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/request-vaccines"
              component={RequestVaccinesPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/order-devices"
              component={OrderDevicesPage}
              portal={PORTAL_TYPE_VAC}
            />
            {/* Doctor Routes */}
            <PrivateRoute
              path="/appointments"
              component={MyAppointmentsPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/bank"
              component={BankAccountPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/wallet"
              component={WalletPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/mypatients"
              component={MyPatientsPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/my-appointments"
              component={MyAppointmentsPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/account"
              component={AccountPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/patient-info"
              component={PatientContainer}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/make-call"
              component={MakeCallPage}
              portal={PORTAL_TYPE_VAC}
            />
            {/* Parent Routes */}
            <PrivateRoute
              path="/mychildren"
              component={MyChildrenPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/childinfoPage"
              component={ChildInfoPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/docSearch"
              component={DocSearchPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/searchResult"
              component={SearchResultPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/selectChild"
              component={SelectChildPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/payment"
              component={PaymentDetailPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/paymentSummary"
              component={PaymentSummaryPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/myappointments"
              component={MyAppointPage}
              portal={PORTAL_TYPE_VAC}
            />
            <PrivateRoute
              path="/user-management"
              component={UserManagementPage}
              portal={PORTAL_TYPE_VAC}
            />
          </PersistentDrawerLeft>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}
// kansjayanayaka69@gmail.com
// User UI: lakmal777+120@gmail.com - 123456
// Admin UI: chamila.madushani+imm@immunify.me - 123456
