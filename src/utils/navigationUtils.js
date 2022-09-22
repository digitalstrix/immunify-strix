import {
  PORTAL_TYPE_IMM,
  PORTAL_TYPE_VAC,
  PORTAL_TYPE_GENERAL,
} from "../constants/commonConstants";

const ROLE_VIEW_DASHBOARD = "view_dashboard";
const ROLE_VIEW_DOCTOR_APPOINTMENTS = "view_doctor_appointments";
const ROLE_VIEW_CENTER_REPORTS = "view_center_reports";
const ROLE_PARENT_REGISTRATION = "parent_registration";
const ROLE_VACCINATE_CHILD = "vaccinate_child";
const ROLE_CHILD_INFO = "child_info";
const ROLE_UPDATE_PROFILE = "update_profile";
const ROLE_EVENT_CALENDER = "event_calender";
const ROLE_PATIENT_MGMT = "patient_mgmt";
const ROLE_UPDATE_BANK_ACCOUNT = "update_bank_account";
const ROLE_VIEW_WALLET = "view_wallet";
const ROLE_REQUEST_VACCINES = "request_vaccines";
const ROLE_USER_MGMT = "user_mgmt";
const ROLE_ORDER_DEVICES = "order_devices";
const ROLE_VIEW_APPOINTMENTS = "view_appointments";
const ROLE_PARENT_ACTIONS = "parent_actions";

const ROLE_VACCINE_FULL = "vaccine_full";
const ROLE_VACCINE_ADMIN_SCHEDULE = "vaccine_admin_schedule";
const ROLE_VACCINATION_CENTER_FULL = "vaccination_center_full";
const ROLE_TEMPLATES_FULL = "templates_full";
const ROLE_USER_MANAGEMENT_FULL = "user_management_full";
const ROLE_MANAGE_CARDS_FULL = "manage_cards_full";
const ROLE_REPORTS_FULL = "reports_full";
const ROLE_OPERATIONS_FULL = "operations_full";
const ROLE_BLOG_FULL = "blog_full";
const ROLE_PODCAST_FULL = "podcast_full";
const ROLE_NOISE_FULL = "noise_full";
const ROLE_MUSIC_FULL = "music_full";
const ROLE_QUESTION_FULL = "question_full";
const ROLE_APPOINTMENT_FULL = "appointment_full";
const ROLE_OPERATIONS_DR_APPROVE = "operations_dr_approve";
const ROLE_OPERATIONS_DR_ADD = "operations_dr_add";
const ROLE_OPERATIONS_CONSULTATION_TIME = "operations_consult_time";
const ROLE_OPERATIONS_USER_ENGAGEMENT = "operations_user_engagement";
const ROLE_FINANCE_FULL = "finance_full";
const ROLE_FINANCE_SETTLEMENTS = "finance_settlements";

const IMM_PORTAL_ROLES = {
  "/": [ROLE_VIEW_DASHBOARD],
  "/vaccine-list": [ROLE_VACCINE_FULL],
  "/vaccination-schedules": [ROLE_VACCINE_ADMIN_SCHEDULE],
  "/vaccination-centers": [ROLE_VACCINATION_CENTER_FULL],
  "/user-management": [ROLE_USER_MANAGEMENT_FULL],
  "/manage-templates": [ROLE_TEMPLATES_FULL],
  "/vaccenter-cards": [ROLE_MANAGE_CARDS_FULL],
  "/vendor-card-requests": [ROLE_MANAGE_CARDS_FULL],
  "/doctor-list": [ROLE_OPERATIONS_FULL],
  "/tradename-list": [ROLE_VACCINE_FULL],
  "/pending-tradenames": [ROLE_VACCINE_FULL],
  "/doctor-approval": [ROLE_OPERATIONS_FULL, ROLE_OPERATIONS_DR_APPROVE],
  "/addnew-doctor": [ROLE_OPERATIONS_FULL, ROLE_OPERATIONS_DR_ADD],
  "/edit-doctor": [ROLE_OPERATIONS_FULL, ROLE_OPERATIONS_DR_ADD],
  "/doctor-settlements": [ROLE_FINANCE_FULL, ROLE_FINANCE_SETTLEMENTS],
  "/user-engagement": [ROLE_OPERATIONS_FULL, ROLE_OPERATIONS_USER_ENGAGEMENT],
  "/view-blog": [ROLE_BLOG_FULL],
  "/viewBlogDetails/:id": [ROLE_BLOG_FULL],
  "/create-article": [ROLE_BLOG_FULL],
  // "/edit-article": [ROLE_BLOG_FULL],
  "/edit-article/:id": [ROLE_BLOG_FULL],
  "/view-categories": [ROLE_BLOG_FULL],
  "/view-podcast": [ROLE_PODCAST_FULL],
  "/viewPodcastDetails/:id": [ROLE_PODCAST_FULL],
  "/create-podcast": [ROLE_PODCAST_FULL],
  "/edit-podcast/:id": [ROLE_PODCAST_FULL],
  "/view-podcast-categories": [ROLE_PODCAST_FULL],
  "/view-noise": [ROLE_NOISE_FULL],
  "/create-noise": [ROLE_NOISE_FULL],
  "/edit-noise/:id": [ROLE_NOISE_FULL],
  "/view-music": [ROLE_MUSIC_FULL],
  "/create-music": [ROLE_MUSIC_FULL],
  "/edit-music/:id": [ROLE_MUSIC_FULL],
  "/view-question": [ROLE_QUESTION_FULL],
  "/create-question": [ROLE_QUESTION_FULL],
  "/edit-question": [ROLE_QUESTION_FULL],
  "/view-appointment": [ROLE_APPOINTMENT_FULL],
  "/create-appointment": [ROLE_APPOINTMENT_FULL],
  "/appointment-details/:id": [ROLE_APPOINTMENT_FULL],

  "/consultation-timing": [ROLE_OPERATIONS_FULL, ROLE_OPERATIONS_CONSULTATION_TIME],
  "/reports": [ROLE_REPORTS_FULL],
};

const VAC_PORTAL_ROLES = {
    '/': [ROLE_VIEW_DASHBOARD],
    '/calender': [ROLE_EVENT_CALENDER],
    '/childinfo': [ROLE_CHILD_INFO],
    '/child-vaccination': [ROLE_VACCINATE_CHILD],
    '/registration': [ROLE_PARENT_REGISTRATION],
    '/reports': [ROLE_VIEW_CENTER_REPORTS],
    '/centercardreports': [ROLE_VIEW_CENTER_REPORTS],
    '/request-vaccines': [ROLE_REQUEST_VACCINES],
    '/order-devices': [ROLE_ORDER_DEVICES],
    '/appointments': [ROLE_VIEW_APPOINTMENTS],
    '/bank': [ROLE_UPDATE_BANK_ACCOUNT],
    '/wallet': [ROLE_VIEW_WALLET],
    '/mypatients': [ROLE_PATIENT_MGMT],
    '/account': [ROLE_UPDATE_PROFILE],
    '/mychildren': [ROLE_PARENT_ACTIONS],
    '/childinfoPage': [ROLE_PARENT_ACTIONS],
    '/docSearch': [ROLE_PARENT_ACTIONS],
    '/searchResult': [ROLE_PARENT_ACTIONS],
    '/selectChild': [ROLE_PARENT_ACTIONS],
    '/payment': [ROLE_PARENT_ACTIONS],
    '/paymentSummary': [ROLE_PARENT_ACTIONS],
    '/my-appointments': [ROLE_VIEW_DOCTOR_APPOINTMENTS],
    '/user-management': [ROLE_USER_MGMT],
    '/patient-info': [ROLE_VIEW_DASHBOARD],
    '/make-call' : [ROLE_VIEW_DOCTOR_APPOINTMENTS]
};

const GENERAL_PORTAL_ROLES = {
    '/my-account': [ROLE_PARENT_ACTIONS, ROLE_UPDATE_PROFILE],
    '/mychildren': [ROLE_PARENT_ACTIONS],
    '/docSearch': [ROLE_PARENT_ACTIONS],
    '/childinfoPage': [ROLE_PARENT_ACTIONS],
    '/searchResult': [ROLE_PARENT_ACTIONS],
    '/make-appointment': [ROLE_PARENT_ACTIONS],
    '/appointments': [ROLE_PARENT_ACTIONS],
    '/call-view': [ROLE_PARENT_ACTIONS],
  "/milestones": [ROLE_PARENT_ACTIONS],
};

export const getRolesByPortalScreen = (portal, screen) => {
  if (portal === PORTAL_TYPE_IMM) {
    return IMM_PORTAL_ROLES[screen] || [];
  }
  if (portal === PORTAL_TYPE_VAC) {
    return VAC_PORTAL_ROLES[screen] || [];
  }
  if (portal === PORTAL_TYPE_GENERAL) {
    return GENERAL_PORTAL_ROLES[screen] || [];
  }
  return [];
};
