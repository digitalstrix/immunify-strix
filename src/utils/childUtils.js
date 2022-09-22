import moment from "moment";
import {
  NUTRITION_CATEGORIZE,
  MILESTONE_CATEGORY,
  CHILD_AGE_UNITS,
  SUBSCRIPTION_MANAGE_ROLES,
  CIRCLE_COLORS,
} from "../constants/nutritionConstants";
import Nutrition from "../features/Parent/MyChildrenPage/Nutrition/Nutrition";

export const childAge = (dob) => {
  const childAgeByYear = moment().diff(dob, "years");
  if (childAgeByYear > 0) {
    return `${childAgeByYear} years`;
  }
  const childAgeByMonth = moment().diff(dob, "months");
  if (childAgeByMonth > 0) {
    return `${childAgeByMonth} months`;
  }
  return `${moment().diff(dob, "days")} days`;
};

export const DetailsOfChildVaccination = (vaccinated, due, percentage = []) => {
  if (!Array.isArray(due) || !Array.isArray(vaccinated)) {
    return {
      due: [],
      vaccinated: [],
    };
  }
  const ChildVaccinationDetails = vaccinated.concat(due);

  const restructedDetails = ChildVaccinationDetails.map((vac) => {
    const {
      VaccinationScheduleDetail,
      Vaccine,
      VaccineVariation,
      status,
      dueDate,
      catchupPeriodStart,
      catchupPeriodEnd,
      vaccinatedDate,
      vacCaptureImage,
      id,
    } = vac;
    let vacObj = {};
    let doseId = "";
    if (VaccinationScheduleDetail?.Vaccine) {
      vacObj = VaccinationScheduleDetail.Vaccine;
      doseId = VaccinationScheduleDetail.doseId;
    } else if (Vaccine) {
      vacObj = Vaccine;
    }
    const { name, adverseEffect, protectAgainst } = vacObj;
    return {
      status,
      id,
      dueDate: moment(dueDate).format("L"),
      catchupPeriodEnd: moment(catchupPeriodEnd).format("L"),
      catchupPeriodStart: moment(catchupPeriodStart).format("L"),
      vacCaptureImage,
      vaccine: name || "",
      tradeName: VaccineVariation?.Manufacturer?.tradeName ?? "",
      adverseEffect,
      protectAgainst,
      vaccinatedDate: vaccinatedDate
        ? moment(vaccinatedDate).format("L")
        : null,
      percentage: vaccinationFilterdPercentage(Vaccine.name, percentage),
      doseId,
    };
  });
  return {
    due: restructedDetails.filter((e) => e.status === "DUE"),
    vaccinated: restructedDetails.filter((e) => e.status === "VACCINATED"),
  };
};

const vaccinationFilterdPercentage = (vaccine, percentage = []) => {
  const indexOfVaccine = percentage.findIndex((e) => e.name === vaccine);
  if (indexOfVaccine === -1) {
    return 0;
  }
  return percentage[indexOfVaccine].percentage;
};

export const scheduleDoseDetails = (vaccine, vacScheduleDetails) => {
  if (!Array.isArray(vacScheduleDetails) || vacScheduleDetails.length === 0) {
    return [];
  }
  const filteredVaccine = vacScheduleDetails.filter((vac) => {
    const name = vac.Vaccine?.name ?? "";
    return name === vaccine;
  });
  return filteredVaccine.map((fVac, i) => {
    const {
      status,
      Vaccine: { name },
      VaccinationScheduleDetail,
      VaccineVariation,
      vaccinatedDate,
    } = fVac;
    let doseId = 0;
    if (!VaccinationScheduleDetail) {
      doseId = VaccineVariation.doseId;
    } else {
      doseId = VaccinationScheduleDetail.doseId;
    }
    if (status === "DUE") {
      return {
        description: `${name} Dose ${doseId}`,
        vaccinated: false,
        doseId: doseId,
        doseActiveStatus: i === 0 ? true : false,
      };
    }
    return {
      description: `${name} Dose ${doseId}`,
      vaccinated: true,
      vaccinatedDate: moment(vaccinatedDate).format("L"),
      doseId: doseId,
    };
  });
};

export const getChildBelongsNutritions = ({
  dateOfBirth,
  customNutritions,
}) => {
  if (!dateOfBirth) {
    return {
      childAgeByMonth: 0,
      breakFirst: [],
      lunch: [],
      snack: [],
    };
  }
  const childAgeByMonth = moment().diff(moment(dateOfBirth), "month");
  const nutritionPlan =
    customNutritions && customNutritions.length > 0
      ? customNutritions
      : Nutrition;
  const childNutritions = nutritionPlan.filter(
    (e) => e.ageFrom <= childAgeByMonth && e.ageTo >= childAgeByMonth
  );
  if (childAgeByMonth <= 5) {
    return {
      childAgeByMonth,
      childNutritions,
    };
  }
  return {
    childAgeByMonth,
    breakFirst: childNutritions.filter(
      (e) => e.category === NUTRITION_CATEGORIZE.BREAKFIRST
    ),
    lunch: childNutritions.filter(
      (e) => e.category === NUTRITION_CATEGORIZE.LUNCH
    ),
    snack: childNutritions.filter(
      (e) => e.category === NUTRITION_CATEGORIZE.SNACK
    ),
  };
};

export const getCategorizeFeed = (feedTime, nutrition = []) => {
  const filteredFeed = nutrition.filter((e) => e.category === feedTime);
  if (filteredFeed.length !== 1) {
    return [];
  }
  const [{ values }] = filteredFeed;
  return values;
};

export const getChildMilestoneAge = (details) => {
  const {
    BirthInformation: { dateOfBirth },
  } = details;
  const defaultAge = {
    ageByMonths: null,
    ageByDays: null,
  };
  if (typeof dateOfBirth === "undefined" || !dateOfBirth) {
    return defaultAge;
  }
  if (!dateOfBirth) {
    return defaultAge;
  }
  const ageByMonths = moment().diff(moment(dateOfBirth), "month");
  if (ageByMonths < 2) {
    const ageByDays = moment().diff(moment(dateOfBirth), "days");
    return {
      ageByMonths,
      ageByDays,
    };
  }
  return {
    ...defaultAge,
    ageByMonths,
  };
};

export const getChildMilestone = (milestones, age, images, name) => {
  const { ageByMonths, ageByDays } = age;
  const { firstName } = name;
  return milestones
    .map((milestone) => {
      const image =
        images.filter(
          (e) =>
            e.atAge === milestone.fetchAge &&
            e.atAgeUnit === milestone.fetchAgeUnit
        )?.[0] ?? null;
      return {
        ...milestone,
        image,
        firstName,
        ageByMonths,
        ageByDays,
        disabled: !(
          (milestone.atAge <= ageByMonths &&
            milestone.atAgeTo >= ageByMonths) ||
          ageByMonths < 2
        ),
      };
    })
    .filter((e) => {
      if (ageByMonths === 0 || ageByMonths === 1) {
        return e.atAge === 2;
      }
      return e.atAge <= ageByMonths;
    });
};

export const getMilestoneAgesByMonths = (milestones) => {
  if (!Array.isArray(milestones)) {
    return [];
  }
  return milestones.map((e) => {
    const { atAge } = e;
    return atAge;
  });
};

export const validMilestonePercentages = (percentage = [], milestones = []) => {
  const milestoneAges = getMilestoneAgesByMonths(milestones);
  const validPercentages = [];
  percentage.forEach((e) => {
    const { atAgeUnit, atAge } = e;
    let childAge = atAge;
    if (atAgeUnit === CHILD_AGE_UNITS.years) {
      childAge = childAge * 12;
    }
    if (milestoneAges.includes(childAge)) {
      validPercentages.push({ ...e, ageByMonths: childAge });
    }
  });
  validPercentages.sort((a, b) => {
    return b.ageByMonths - a.ageByMonths;
  });
  return validPercentages;
};

export const getCategorizeMilestone = (details) => {
  const { childMilestoneDetails } = details;
  if (
    !Array.isArray(childMilestoneDetails) ||
    childMilestoneDetails.length === 0
  ) {
    return {
      actByDoc: [],
      social: [],
      communication: [],
      cognitive: [],
      physical: [],
    };
  }
  return {
    actByDoc: childMilestoneDetails.filter((e) => e.isActByDoctor),
    social: childMilestoneDetails.filter(
      (e) =>
        e.behavioursCategory === MILESTONE_CATEGORY.SOCIAL && !e.isActByDoctor
    ),
    communication: childMilestoneDetails.filter(
      (e) =>
        e.behavioursCategory === MILESTONE_CATEGORY.COMMUNICATION &&
        !e.isActByDoctor
    ),
    cognitive: childMilestoneDetails.filter(
      (e) => e.behavioursCategory === MILESTONE_CATEGORY.COGNITIVE
    ),
    physical: childMilestoneDetails.filter(
      (e) => e.behavioursCategory === MILESTONE_CATEGORY.PHYSICAL_DEVELOPMENT
    ),
  };
};

export const mapMilestoneImages = () => {
  return {
    MONTHS: [
      {
        atAge: 2,
        image: 1,
      },
      {
        atAge: 4,
        image: 2,
      },
      {
        atAge: 6,
        image: 3,
      },
      {
        atAge: 9,
        image: 4,
      },
      {
        atAge: 18,
        image: 5,
      },
    ],
    YEARS: [
      {
        atAge: 1,
        image: 6,
      },
      {
        atAge: 2,
        image: 7,
      },
      {
        atAge: 3,
        image: 8,
      },
      {
        atAge: 4,
        image: 9,
      },
      {
        atAge: 5,
        image: 10,
      },
    ],
  };
};