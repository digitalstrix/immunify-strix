import { createSelector } from "reselect";
import { getFilteredDoctors } from "../../../../utils/doctorListUtils";

export const selectSpecializationsList = (state) => {
  const data = state.findADoctor.specializations.map((item) => {
    return { id: item.value, name: item.label };
  });
  return data;
};

export const selectSymptomsList = (state) => {
  const data = state.findADoctor.symptoms.map((item) => {
    return { id: item.value, name: item.label };
  });
  return data;
};

export const selectSearchingDoctorStatus = (state) => state.findADoctor.searchingDoctorsStatus;
const getDoctorsSearchList = (state) => state.findADoctor.doctorsFound
const getSortByFields = (state) => state.findADoctor.sortyByFields;
const getFilterOptions = (state) => state.findADoctor.filterOptions;

export const getFilteredDoctorList = createSelector(
  getDoctorsSearchList,
  getSortByFields,
  getFilterOptions,
  (doctorList, sortOptions, filterOptions) => {
    const doctors = getFilteredDoctors(
      doctorList,
      sortOptions,
      filterOptions
    ).map((item) => {
      const { consultationData } = item;
      return {
        ...item,
        min: consultationData?.min,
        max: consultationData?.max,
        avg: consultationData?.avg,
        total: consultationData?.total,
      };
    });
    return doctors;
  }
);

export const getLoggedInUserId = (state) => state.user.user.personId;
