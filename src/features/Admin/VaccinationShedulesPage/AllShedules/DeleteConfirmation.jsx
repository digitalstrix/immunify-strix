import React from "react";
import { useDispatch } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { generateVacSchedDeletePayload } from '../../../../utils/vacSchedulesUtils';
import { deleteVacSchedule } from '../vacSchedulesSlice';
  
const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function DeleteConfirmation(props) {
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <DialogContent dividers>
                Are you sure to delete {props.data.name} ?
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={() => props.handleClose()}
                        disabled={false}
                        color="primary"
                        variant="outlined"
                        >
                        Close 
                    </Button>
                    <Button
                        autoFocus
                        onClick={() => {
                            const payload = generateVacSchedDeletePayload(props.data);
                            dispatch(deleteVacSchedule(payload));
                        }}
                        type='button'
                        color="primary"
                        variant="contained"
                        >
                        {props.dialogactiontitle}
                    </Button>                   

                </DialogActions>
        </React.Fragment>
    );
}