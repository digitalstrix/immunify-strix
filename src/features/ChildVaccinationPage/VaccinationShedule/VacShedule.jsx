import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip, IconButton } from '@material-ui/core';
import { useSnackbar } from "notistack";
import Table from "../../../common/components/Table";
import VaccinationDialogContent from "./VaccinationDialogContent";
import MainDialog from "../../../common/components/Dialog";

import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
// import PersonAddDisabledOutlinedIcon from "@material-ui/icons/PersonAddDisabledOutlined";
import {
  selectChildVaccinationDialogType,
  selectOpenChildVaccinationDialog,
  selectChildVaccinationInputs,
  selectChildVaccinationStatus,
  selectUser
} from '../selector';
import {
  setOpenChildVaccinationDialog,
  setChildVaccinationDialogType,
  initChildVaccinationForm,
  vaccinateChild
} from '../vaccinationSlice';
import { validateChildVaccinationPayload, generateChildVaccinationPayload } from '../../../utils/vaccinationUtils';

import notvaccinated from '../../../assets/icons/NotVaccinated.svg';
import vaccinate from '../../../assets/icons/DoneVaccination.svg';

const NotVaccinatedIcon = () => (
  <img src={notvaccinated} width="24" height="24" alt="child info icon"/>
);
const VaccinateIcon = () => (
  <img src={vaccinate} width="24" height="24" alt="child info icon"/>
);

const ACTION_TYPE_ADD = 'Add';
const ACTOION_TYPE_UPDATE = 'Update'
const VACCINATION_SUCCESS_MSG = 'Update successful';


const actionTitle = (type) => (type === ACTION_TYPE_ADD ? 'Add' : 'Close'); 

const dialogTitle = (type) => (type === ACTION_TYPE_ADD ? 'Vaccinate' : 'Vaccinated'); 

const dialogAction = (type, inputs, user, dispatch) => {

  if (type === ACTION_TYPE_ADD) {
    return () => {
      const payload = generateChildVaccinationPayload(inputs, user);
  
      if (validateChildVaccinationPayload(payload)) {
        dispatch(vaccinateChild(payload));
      }
    };
  }
  return () => {
    dispatch(setOpenChildVaccinationDialog(false));
  };  
};

const dialogCloseAction = (dispatch) => {
  return () => {
    dispatch(setOpenChildVaccinationDialog(false));
  };
};

const getDueOrVaccinatedDate = (onGoingChecked) => {
  if (onGoingChecked) {
    return { title: "Due Date", field: "dueDate" };
  }
  return { title: "Vaccinated Date", field: "vaccinatedDate" }
}

const getColumns = (onGoingChecked) => {
  const cols = [
    { title: "Vaccine", field: "vaccineName" },
    { title: "Disease", field: "disease" },
    { title: "Dose No", field: "doseId", type: "numeric" },
    getDueOrVaccinatedDate(onGoingChecked)    
  ]
  if (onGoingChecked) {
    cols.push({ title: "Catchup Period", field: "catchupPeriod" });
  }
  return cols;
}

const Vacshedule = ({ data, onGoingChecked }) => {

  const openChildVaccinationDialog = useSelector(selectOpenChildVaccinationDialog);
  const childVaccinationDialogType = useSelector(selectChildVaccinationDialogType);
  const vaccinationStatus = useSelector(selectChildVaccinationStatus);
  const vaccinationInputs = useSelector(selectChildVaccinationInputs);
  const user = useSelector(selectUser);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const disableInputs = childVaccinationDialogType === ACTOION_TYPE_UPDATE;

  useEffect(() => {
    if (vaccinationStatus === 'succeeded') {
      enqueueSnackbar(VACCINATION_SUCCESS_MSG, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      dispatch(setOpenChildVaccinationDialog(false));
    }

  }, [vaccinationStatus, enqueueSnackbar, dispatch]);

  return (
    <div>
      <MainDialog
        btnicon={<PersonAddOutlinedIcon />}
        dialogtitle={dialogTitle(childVaccinationDialogType)}
        dialogcontent={<VaccinationDialogContent disableInputs={disableInputs}/>}
        dialogaction={dialogAction(childVaccinationDialogType, vaccinationInputs, user, dispatch)}
        dialogactiontitle={actionTitle(childVaccinationDialogType)}
        maxWidth="md"
        open={openChildVaccinationDialog}
        dialogCloseAction={dialogCloseAction(dispatch)}        
      />
      <Table
        title={null}
        data={data}
        columns={getColumns(onGoingChecked)}
        actions={onGoingChecked ? [
          {
            icon: "not_vaccinated",
            onClick: (event, rowData) =>
              alert(
                "this onclick wpnt do anything,remove & check console " +
                  rowData.name
              ),
          },
        ]: [
          {
            icon: "vaccinated",
            onClick: (event, rowData) =>
              alert(
                "this onclick wpnt do anything,remove & check console" +
                  rowData.name
              ),
          }
        ]}
        components={{
          Action: (props) => {

            switch (props.action.icon) {
              case "vaccinated":
                return (
                  <Tooltip title={'Vaccinated'}>
                    <IconButton
                      onClick={() => {
                        console.log(props.data);
                        // dispatch(initParentFormForUpdate(props.data));
                        // dispatch(setDisplayParentEditDialog(true));
                        dispatch(setChildVaccinationDialogType(ACTOION_TYPE_UPDATE));
                        dispatch(initChildVaccinationForm(props.data));                        
                        dispatch(setOpenChildVaccinationDialog(true));
                      }}
                      disabled={false}
                      color="inherit"
                    >
                      <VaccinateIcon />
                    </IconButton>
                  </Tooltip>
                );
              case "not_vaccinated":
                return (
                  <Tooltip title={'Not Vaccinated'}>
                    <IconButton
                      onClick={() => {
                        console.log(props.data);
                        // dispatch(initParentFormForUpdate(props.data));
                        // dispatch(setDisplayParentEditDialog(true));
                        dispatch(setChildVaccinationDialogType(ACTION_TYPE_ADD));
                        dispatch(initChildVaccinationForm(props.data));                        
                        dispatch(setOpenChildVaccinationDialog(true));
                      }}
                      disabled={false}
                      color="inherit"
                    >
                      <NotVaccinatedIcon />
                    </IconButton>
                  </Tooltip>
                );
              default:
                break;
            }
          },
        }}
        options={{ actionsColumnIndex: -1, exportButton: true, pageSize: 10 }}
      />
    </div>
  );
};

export default Vacshedule;


// [
//   {
//     vaccine: "OPV",
//     disease: "Polio",
//     dose: 1,
//     due_date: "2019/07/25",
//     due_in: "2019/06/25",
//     catchup_period: "06 Month",
//   },
//   {
//     vaccine: "OPV",
//     disease: "Polio",
//     dose: 1,
//     due_date: "2019/07/25",
//     due_in: "2019/06/25",
//     catchup_period: "06 Month",
//   },
//   {
//     vaccine: "OPV",
//     disease: "Polio",
//     dose: 1,
//     due_date: "2019/07/25",
//     due_in: "2019/06/25",
//     catchup_period: "06 Month",
//   },
//   {
//     vaccine: "OPV",
//     disease: "Polio",
//     dose: 2,
//     due_date: "2019/07/25",
//     due_in: "2019/06/25",
//     catchup_period: "06 Month",
//   },
//   {
//     vaccine: "OPV",
//     disease: "Polio",
//     dose: 1,
//     due_date: "2019/07/25",
//     due_in: "2019/06/25",
//     catchup_period: "06 Month",
//   },
//   {
//     vaccine: "OPV",
//     disease: "Polio",
//     dose: 1,
//     due_date: "2019/07/25",
//     due_in: "2019/06/25",
//     catchup_period: "06 Month",
//   },
//   {
//     vaccine: "OPV",
//     disease: "Polio",
//     dose: 1,
//     due_date: "2019/07/25",
//     due_in: "2019/06/25",
//     catchup_period: "06 Month",
//   },
// ]