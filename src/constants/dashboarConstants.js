const DATA_KEY_VACCINATED_COUNT_WEEKLY = 'VaccinatedCount';
const DATA_KEY_VACCINATED_COUNT_MONTHLY = 'VaccinatedCount';
const DATA_KEY_NOT_VACCINATED_COUNT_WEEKLY = 'NotVaccinatedCount';
const DATA_KEY_VACCINATION_FORCAST = 'vaccinationForcast';

export const STATE_KEY_VACCINATED_WEEKLY = 'vaccinatedWeeky';
export const STATE_KEY_OVERDUE_WEEKLY = 'notVaccinatedWeekly';
export const STATE_KEY_VACCINATED_MONTHLY = 'vaccinatedMonthly';
export const STATE_KEY_VACCINATION_FORCAST = 'monthlyForcast';

export const DATA_KEYS = [
    { dataKey: DATA_KEY_VACCINATED_COUNT_WEEKLY, stateKey: STATE_KEY_VACCINATED_WEEKLY },
    { dataKey: DATA_KEY_NOT_VACCINATED_COUNT_WEEKLY, stateKey: STATE_KEY_OVERDUE_WEEKLY },
    { dataKey: DATA_KEY_VACCINATED_COUNT_MONTHLY, stateKey: STATE_KEY_VACCINATED_MONTHLY },
    { dataKey: DATA_KEY_VACCINATION_FORCAST, stateKey: STATE_KEY_VACCINATION_FORCAST },
];

export const GRANULARITY_OPTIONS = [
    {
        value: "today",
        label: "TODAY",
      },
      {
        value: "lastWeek",
        label: "LAST WEEK",
      },
      {
        value: "lastMonth",
        label: "LAST MONTH",
      },
];