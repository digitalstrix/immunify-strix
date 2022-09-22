import React, { useContext, useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './index.css';
import { NavLink } from 'react-router-dom';
import MainContext from '../../../context/MainContext';

const Viewappointment = (props) => {
    const [data, setData] = useState([]);
    const context = useContext(MainContext);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const ans = await context.getAppointment();
        console.log(ans.data);
        setData(ans.data);
    };

    const deleteData = async (id) => {
        // console.log(id);
        const ans = await context.deleteAppointment(id);
        console.log(ans);
        if(ans.status)
        {
            props.showAlert(true);
        }
        else
        {
            props.showAlert(false);
        }
    };
    return (
        <>
            <div>
                <h1>View Appointments</h1>
                <div>
                    <div className="row">
                        {data ? data.map((e, index) => {
                            return (
                                <Card sx={{ maxWidth: 345, margin:'6px' }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Patient Name
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {`Appointment ID | ${e.date} - ${e.time}`}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Doctor Name
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            This will be the description (Limited words, Click read more to see..)
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Share</Button>
                                        <NavLink to="/appointment-details/1">Read More ..</NavLink>
                                    </CardActions>
                                </Card>
                            )
                        }) : null}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Viewappointment;
