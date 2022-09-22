import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import MainContext from '../../../context/MainContext';

const Appointmentdetails = () => {
    const { id } = useParams();
    const context = useContext(MainContext);
    useEffect(()=>{
        console.log(id);
    });

    return (
        <>
            <div>
                <h1>Patient Name</h1>
            </div>
            <div>
                Appointment ID
            </div>
            <div>20/09/2022 - 7:30 AM</div>
            <div>
                <h3>Doctor Name</h3>
            </div>
            <div>
                Full description
            </div>
        </>
    )
}

export default Appointmentdetails;
