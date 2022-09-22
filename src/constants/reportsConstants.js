import { extractDate } from '../utils/commonUtils'

export const VACCINE_VISE_TABLE_COLUMNS = [
    { title: 'Vaccine name', field: 'name' },
    { title: 'Dose', field: 'doseId', type: "numeric" },
    { title: 'Due Date', field: 'dueDate', render: (rowData) => extractDate(rowData.dueDate) },
    { title: 'Total Vaccination Entitled', field: 'VaccinateEntitled', type: "numeric" },
    { title: 'Total children not vaccinated', field: 'NotVaccinated', type: "numeric" },
    { title: 'Total Vaccinations', field: 'Vaccinated', type: "numeric "}
];

export const TOTAL_VACCINATED_TABLE_COLUMNS = [
    { title: 'Vaccine name', field: 'name'},
    { title: 'Dose', field: 'doseId', type: "numeric"},
    { title: 'Total Vaccination Entitled', field: 'VaccinateEntitled', type: "numeric"},
    { title: 'Total Vaccinations', field: 'Vaccinated', type: "numeric"}
];

export const CHILD_OVERDUE_TABLE_COLUMNS = [
    { title: 'Vaccine name', field: 'name'},
    { title: 'Dose', field: 'doseId', type: "numeric"},
    { title: 'Total Vaccination Entitled', field: 'VaccinateEntitled', type: "numeric"},
    { title: 'Total children not vaccinated', field: 'NotVaccinated', type: "numeric"},
    { title: 'Total Vaccinations', field: 'Vaccinated', type: "numeric"}
];

export const OVERDUE_ALL_TABLE_COLUMNS = [
    { title: 'Child name', field: 'childName'},
    { title: 'Vaccine', field: 'vaccineName'},
    { title: 'Dose', field: 'dose', type: "numeric"},
    { title: 'Due Date', field: 'dueDate', render: (rowData) => extractDate(rowData.dueDate)},
    { title: 'Contact Number', field: 'contact' }
];

export const VACCINATED_DETAILS_BY_VACCINE_TABLE_COLUMNS = [
    { title: 'Child Name', field: 'ChildName' },
    { title: 'Vaccine', field: 'name' },
    { title: 'Dose', field: 'doseId' },
    { title: 'Due Date', field: 'dueDate' },
    { title: 'Vaccinated Date', field: 'vaccinatedDate' },
];

export const OVERDUE_DETAILS_BY_VACCINE_TABLE_COLUMNS = [
    { title: 'Child Name', field: 'ChildName' },
    { title: 'Vaccine', field: 'name' },
    { title: 'Dose', field: 'doseId' },
    { title: 'Due Date', field: 'dueDate' },
    { title: 'Catchup Period', field: 'catchUpPeriod' },
    { title: 'Status', field: 'isCatchEndMessage'  }
];

export const REPORT_FORMATS = [
    { label: 'Total Number of Children Vaccinated', value: 1 },
    { label: 'Overdue / Not Vaccinated (Vaccinate Wise)', value: 2 },
    { label: 'Vaccine Wise', value: 3 },
    { label: 'Overdue All', value: 4 }
];

export const DEFAULT_TABLE_OPTIONS = {
    search: false,
    actionsColumnIndex: -1,
    exportButton: true,
    exportAllData: true,
    pageSizeOptions: [10, 25, 50, 100]
};

export const ALL_DOSES = "All Dose";

export const DOSES = [
    ALL_DOSES, "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
];

export const ALL_VACCINES_ID = 'all_vaccines';

export const ALL_VACCINES_OPTION = { id: ALL_VACCINES_ID, name: 'All Vaccine' };
export const CATCHUP_END_MESSAGE = 'Catchup End';
export const CATCHUP_PENDING_MESSAGE = 'Catchup Pending';