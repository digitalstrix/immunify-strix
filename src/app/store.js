import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

import dashboardReducer from "../features/DashboardPage/dashboardSlice";
import registrationReducer from "../features/RegistrationPage/registrationSlice";
import vaccinationReducer from "../features/ChildVaccinationPage/vaccinationSlice";
import growthReducer from "../features/ChildVaccinationPage/growthSlice";
import countryReducer from "../features/Country/countrySlice";
import userReducer from "../features/User/userSlice";
import requestVaccinesReducer from "../features/RequestVaccinesPage/requestVaccinesSlice";
import orderDevicesReducer from "../features/OrderDevicesPage/orderDevicesSlice";
import reportsReducer from "../features/ReportsPage/reportsSlice";
import calenderReducer from "../features/CalendarPage/calenderSlice";
import commonReducer from "../features/Common/commonSlice";
import vacCenterReducer from "../features/Admin/VaccinationCentersPage/vacCenterSlice";
import vacSchedulesReducer from "../features/Admin/VaccinationShedulesPage/vacSchedulesSlice";
import manageTemplatesReducer from "../features/Admin/ManageTemplates/manageTemplateSlice";
import manageCardsReducer from "../features/Admin/ManageCards/mangeCardsSlice";
import vaccineReducer from "../features/Admin/VaccineListPage/vaccineSlice";
import adminReportsReducer from "../features/Admin/ReportsPage/reportsSlice";
import doctorApprovalReducer from "../features/Admin/Operations/DoctorApprovalPage/doctorApprovalSlice";
import doctorListReducer from "../features/Admin/Operations/DoctorListPage/doctorListSlice";
import consultationTimesReducer from "../features/Admin/Operations/ConsultationTiming/consultationTimesSlice";
import userEngagementReducer from "../features/Admin/Operations/UserEngagement/userEngagementSlice";
import userManagementReducer from "../features/Admin/UserManagementPage/userManagementSlice";
import DoctorProfileInfoReducer from "../features/AccountPage/ProfileInfo/profileInfoSlice";
import DoctorEducationInfoReducer from "../features/AccountPage/EducationInfo/educationInfoSlice";
import DoctorWorkExperienceInfoReducer from "../features/AccountPage/WorkExpInfo/workExperienceInfoSlice";
import DoctorConsultationPlansReducer from "../features/AccountPage/ConsultationPlanInfo/consultationPlanSlice";
import availabilityCalendarReducer from "../features/AccountPage/AvailabalityCalInfo/availabilityCalendarSlice";
import doctorHospitalReducer from "../features/AccountPage/HospitalInfo/doctorHospitalSlice";
import myPatientsReducer from "../features/Doctor/MyPatientsPage/myPatientsSlice";
import doctorBankAccountReducer from "../features/Doctor/BankAccountPage/bankAccountSlice";
import myChildrenReducer from "../features/Parent/MyChildrenPage/myChildrenSlice";
import selectedChildHealthFilesReducer from "../features/Parent/MyChildrenPage/HealthFiles/healthFilesSlice";
import ParentSideChildVacReducer from "../features/Parent/MyChildrenPage/VacShedule/ParentSideVaccineSlice";
import ParentSideChildGrowthReducer from "../features/Parent/MyChildrenPage/ChildGrowth/ParentSideChildGrowthSlice";
import ChildNutritionPlanReducer from "../features/Parent/MyChildrenPage/Nutrition/ChildNutritionSlice";
import ChildMilestoneReducer from "../features/Parent/MyChildrenPage/Milestones/milestoneSlice";
import parentProfileReducer from "../features/Parent/MyAccountPage/parentProfileSlice";
import findADoctorReducer  from "../features/Parent/FindDoctorPage/DocSearchForm/findADoctorSlice";
import doctorSideMyAppointmentsReducer  from "../features/Doctor/MyAppointmentsPage/myAppointmentsSlice"
import parentAppointmentsReducer from '../features/Parent/MyAppointPage/myAppointmentsSlice'
import parentCallViewReducer from '../features/Parent/CallView/callViewSlice'
import tradenameReducer from "../features/Admin/Tradenames/TradenameListPage/tradenameSlice";
import loginEntryReducer from '../features/LoginEntry/loginEntrySlice';

// import logger from 'redux-logger';

const reducers = combineReducers({
  dashboard: dashboardReducer,
    registration: registrationReducer,
    vaccination: vaccinationReducer,
    growth: growthReducer,
    country: countryReducer,
    requestVaccines: requestVaccinesReducer,
    orderDevices: orderDevicesReducer,
    reports: reportsReducer,
    user: userReducer,
    calender: calenderReducer,
    common: commonReducer,
    vacCenter: vacCenterReducer,
    vacSchedules: vacSchedulesReducer,
    manageTemplates: manageTemplatesReducer,
    manageCards: manageCardsReducer,
    vaccines: vaccineReducer,
    adminReports: adminReportsReducer,
    doctorApprovalReducer: doctorApprovalReducer,
    consultationTimes: consultationTimesReducer,
    DoctorProfileInfo: DoctorProfileInfoReducer,
    doctorEducation: DoctorEducationInfoReducer,
    doctorWorkExp: DoctorWorkExperienceInfoReducer,
    doctorConsultationPlans: DoctorConsultationPlansReducer,
    doctorSessions: availabilityCalendarReducer,
    doctorHospital: doctorHospitalReducer,
    doctorList: doctorListReducer,
    userEngagementReducer: userEngagementReducer,
    userManagementReducer: userManagementReducer,
    myPatients: myPatientsReducer,
    doctorBankAccount: doctorBankAccountReducer,
    myChildren: myChildrenReducer,
    selectedChildHealthFiles: selectedChildHealthFilesReducer,
    ParentSideChildVac: ParentSideChildVacReducer,
    ParentSideChildGrowth: ParentSideChildGrowthReducer,
    nutrition: ChildNutritionPlanReducer,
    childMilestone: ChildMilestoneReducer,
    parentProfile: parentProfileReducer,
    findADoctor: findADoctorReducer,
    doctorSideMyAppointments: doctorSideMyAppointmentsReducer,
    parentAppointments: parentAppointmentsReducer,
    parentCallView: parentCallViewReducer,
    tradenames: tradenameReducer,
    loginEntryReducer: loginEntryReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    storage.removeItem('persist:root')
    return reducers(undefined, action)
  }
  return reducers(state, action)
}

 const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export default store;

// export default configureStore({
//   reducer: {
//     dashboard: dashboardReducer,
//     registration: registrationReducer,
//     vaccination: vaccinationReducer,
//     growth: growthReducer,
//     country: countryReducer,
//     requestVaccines: requestVaccinesReducer,
//     orderDevices: orderDevicesReducer,
//     reports: reportsReducer,
//     user: userReducer,
//     calender: calenderReducer,
//     common: commonReducer,
//     vacCenter: vacCenterReducer,
//     vacSchedules: vacSchedulesReducer,
//     manageTemplates: manageTemplatesReducer,
//     manageCards: manageCardsReducer,
//     vaccines: vaccineReducer,
//     adminReports: adminReportsReducer,
//     doctorApprovalReducer: doctorApprovalReducer,
//     consultationTimes: consultationTimesReducer,
//     DoctorProfileInfo: DoctorProfileInfoReducer,
//     doctorEducation: DoctorEducationInfoReducer,
//     doctorWorkExp: DoctorWorkExperienceInfoReducer,
//     doctorConsultationPlans: DoctorConsultationPlansReducer,
//     doctorSessions: availabilityCalendarReducer,
//     doctorHospital: doctorHospitalReducer,
//     doctorList: doctorListReducer,
//     userEngagementReducer: userEngagementReducer,
//     userManagementReducer: userManagementReducer,
//     myPatients: myPatientsReducer,
//     doctorBankAccount: doctorBankAccountReducer,
//     myChildren: myChildrenReducer,
//     selectedChildHealthFiles: selectedChildHealthFilesReducer,
//     ParentSideChildVac: ParentSideChildVacReducer,
//     ParentSideChildGrowth: ParentSideChildGrowthReducer,
//     nutrition: ChildNutritionPlanReducer,
//     childMilestone: ChildMilestoneReducer,
//     parentProfile: parentProfileReducer,
//     findADoctor: findADoctorReducer,
//     doctorSideMyAppointments: doctorSideMyAppointmentsReducer,
//     parentAppointments: parentAppointmentsReducer,
//     parentCallView: parentCallViewReducer,
//     tradenames: tradenameReducer,
//   },
//   // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
// });
