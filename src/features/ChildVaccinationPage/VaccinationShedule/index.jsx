import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Box } from "@material-ui/core";
import VacSheduleToolbar from "./VacSheduleToolbar";
import VacShedule from "./VacShedule";
import { extractDate } from '../../../utils/commonUtils';
import { generateCatchUpPeriod } from '../../../utils/vaccinationUtils';

import { selectChildren } from '../selector';

const VACCINATED = 'VACCINATED';

const sorter = (onGoingChecked) => {
  if (onGoingChecked) {
    return (a, b) => (a.dueDate > b.dueDate ? 1 : -1);
  }
  return (a, b) => (a.vaccinatedDate < b.vaccinatedDate ? 1 : -1);
}
const formatData = (data, onGoingChecked) => {
  return data.filter(({ status }) => {
    if (onGoingChecked) {
      return status !== VACCINATED;
    } else {
      return status === VACCINATED;
    }
  })
  .sort(sorter(onGoingChecked))
  .map(entry => ({
    ...entry,
    vaccineName: entry.Vaccine.name,
    disease: entry.Vaccine.protectAgainst,
    doseId: entry.VaccinationScheduleDetail ? entry.VaccinationScheduleDetail.doseId : entry.VaccineVariation.doseId,
    catchupPeriod: generateCatchUpPeriod(entry),
    dueDate: onGoingChecked ? extractDate(entry.dueDate): null,
    vaccinatedDate: !onGoingChecked ? extractDate(entry.vaccinatedDate) : null,
    barCode: entry.barcode,
    qrCode: entry.qrcode,
    remarks: entry.notes
  }));
};

const Index = () => {

  const [onGoingChecked, setOnGoingChecked ] = useState(true);

  // const [ { ChildVaccinationDetails } ] = useSelector(selectChildren);
  const [ child ] = useSelector(selectChildren);

  return (
    <div >
      <Box m={3}>
        <VacSheduleToolbar onGoingChecked={onGoingChecked} setOnGoingChecked={setOnGoingChecked}/>
      </Box>
      {
        !!child ? <Box m={3}>
          <VacShedule data={formatData(child.ChildVaccinationDetails, onGoingChecked)} onGoingChecked={onGoingChecked}/>
        </Box>
        : null
      }
      
    </div>
  );
};

export default Index;
