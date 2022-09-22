import { createSelector } from "reselect";
import { 
  DetailsOfChildVaccination,
  scheduleDoseDetails 
} from "../../../../utils/childUtils";

export const getSelectedChildInfo = (state) => state.myChildren.selectedChildAllInfo;
export const selectedChildDueVaccines = (state) => 
state.myChildren.selectedChildAllInfo.ChildVaccinationDetails?.filter((i) => i.status === "DUE")||[];

export const selectedChildVaccinatedVaccines = (state) => 
state.myChildren.selectedChildAllInfo.ChildVaccinationDetails?.filter((i) => i.status === "VACCINATED")||[];

export const selectedChildVacSchedulePercentage = (state) => state.myChildren.selectedChildVacSchedulePercentage;
export const getSelectedVaccine = (state) => state.ParentSideChildVac.selectedVaccine;
export const getChildSubscriptionManagingRole = (state) => state.myChildren.selectedChildAllInfo?.subscription?.manageRole ?? null;
export const subscribedFeatures = (state) => state.myChildren.selectedChildAllInfo?.subscription?.subscriptionDetails?.subscribedFeatures?.features ?? [];

export const getChildSubscribedFeature = createSelector(
  subscribedFeatures,
  (features) => {
    if (!Array.isArray(features) || features.length === 0) {
      return [];
    }
    return features.map((e) => {
      const {key} = e;
      return key;
    });
  },
  );
  
export const getLoggedInPersonId = (state) => state.user.user.personId;
export const getChildrenServicesList = (state) => state.myChildren.myChildrenServicePlansList;
export const getQrDateRetrievingStatus = (state) => state.ParentSideChildVac.retrievingQrDateStatus;
export const selectQrDate = (state) => state.ParentSideChildVac.qrDate;
export const getSelectedChildQrCode = (state) => state.myChildren.selectedChildAllInfo.ChildQRCodes;
export const selectManageVacStatus = (state) => state.ParentSideChildVac.parentSideManageVaccinationStatus;
export const selectManageVacError = (state) => state.ParentSideChildVac.parentSideManageVaccinationError;
export const selectDownloadVacScheduleStatus = (state) => state.ParentSideChildVac.vacScheduleDownloadStatus;
export const selectDownloadVacScheduleError = (state) => state.ParentSideChildVac.vacScheduleDownloadError;
export const selectEmailVacScheduleStatus = (state) => state.ParentSideChildVac.vacScheduleEmailStatus;
export const selectEmailVacScheduleError = (state) => state.ParentSideChildVac.vacScheduleDownloadError;

export const childScheduleDetails = createSelector(
  selectedChildVaccinatedVaccines,
  selectedChildDueVaccines,
  selectedChildVacSchedulePercentage,
  (vaccinated, due, percentage) =>
    DetailsOfChildVaccination(vaccinated, due, percentage)
);

export const vaccineDoesDetails = createSelector(
  getSelectedVaccine,
  selectedChildVaccinatedVaccines,
  selectedChildDueVaccines,
  (vac, vaccinated, due) => {
    if (!vac) {
      return [];
    }
    return scheduleDoseDetails(vac, due.concat(vaccinated));
  },
);
