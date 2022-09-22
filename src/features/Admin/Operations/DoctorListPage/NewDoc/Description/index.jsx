import React, { useEffect } from 'react'
import { Box, Button, Card, CardContent, CardHeader, Container, Divider, Grid, makeStyles, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { updateDoctorDescription } from '../../doctorListSlice';
import { selectDescriptionStatus } from '../../selector';
import { notify } from '../../../../../../utils/commonUtils';
import { useSnackbar } from 'notistack';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(4),
        margin: theme.spacing(2),
    },
    card: {
        minWidth: 500,
    },
}));


const Index = ({ values, updateAction }) => {
    const classes = useStyles();
    const dispatch = useDispatch();


    const handleChange = ({ target: { name, value } }) => {
        console.log('upAction', name, value)
        updateAction({
            ...values,
            [name]: value
        });
    };


    return (
        <div className={classes.root}>
            <form>
                <Grid container justify="center">
                    <Card className={classes.card} mt={3}>
                        <CardHeader
                            title="Doctor Description"
                            titleTypographyProps={{
                                variant: "h6",
                            }}
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="doc-description"
                                        label="Description"
                                        name='description'
                                        multiline
                                        fullWidth
                                        rows={4}
                                        variant="outlined"
                                        margin="normal"
                                        value={values.description || ""}
                                        //   value={value}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>

                        <Divider />
                        <Box display="flex" justifyContent="end" m={2}>
                            <Button variant="contained" color="primary" onClick={() => {
                                // const { description } = values;
                                dispatch(updateDoctorDescription(values));
                            }}  >
                                Save Changes
                            </Button>
                        </Box>

                    </Card>
                </Grid>
            </form>

        </div>
    )
}

export default Index
