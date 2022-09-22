import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@material-ui/core';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import MainContext from '../../../context/MainContext';

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    ['link', 'image'],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'align': [] }],

    ['clean']
];

const Createappointment = (props) => {
    const [value1, setValue1] = useState({
        patientName: "",
        appointmentID: "",
        appointmentTs: "",
        doctorName: ''
    });
    const context = useContext(MainContext);
    const [dateTime, setDateTime] = useState(dayjs(new Date().toISOString()));

    const handleDTChange=(e)=>{
        setDateTime(e);
    }

    const [value, setValue] = useState({
        richText: '',
        simpleText: '',
        textLength: 0
    });

    const rteChange1 = (content, delta, source, editor) => {
        setValue({
            richText: editor.getHTML(),
            simpleText: editor.getText(),
            textLength: editor.getLength()
        })
    };

    const handleChange = (e) => {
        setValue1({ ...value1, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(value1);
        console.log(value);
        console.log(new Date(dateTime.toJSON()).toLocaleDateString());
        console.log(new Date(dateTime.toJSON()).toLocaleTimeString());

        const ans = await context.createAppointment({date: new Date(dateTime.toJSON()).toLocaleDateString(), time: new Date(dateTime.toJSON()).toLocaleTimeString(), UserId: "02", patient_name: value1.patientName, doctor_name: value1.doctorName });
        console.log(ans);
        if(ans.status)
        {
            props.showAlert(true);
        }
        else
        {
            props.showAlert(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                    <h1>Create Appointment</h1>
                </div>
                <div>
                    <h3>Patient Name</h3>
                    <TextField id="patientName" label="Patient Name" sx={{ width: "100%" }} name="patientName" onChange={handleChange} value={value1.patientName} variant="outlined" />
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <h3>Appointment ID</h3>
                    <TextField id="appointmentID" label="Appointment ID" sx={{ width: "100%" }} name="appointmentID" onChange={handleChange} value={value1.appointmentID} variant="outlined" />
                </div>
                <div>
                    <h3>Appointment Date and Time</h3>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Appointment Date & Time"
                            onChange={handleDTChange}
                            value={dateTime}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <h3>Doctor Name</h3>
                    <TextField id="doctorName" label="Doctor Name" sx={{ width: "100%" }} name="doctorName" onChange={handleChange} value={value1.doctorName} variant="outlined" />
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <h3>Appointment Details</h3>
                    <ReactQuill theme="snow" value={value.richText} placeholder="Write here .." onChange={rteChange1} modules={{ toolbar: toolbarOptions }} />
                </div>
                <Button type="submit" color="primary" variant="contained">Submit</Button>
            </form>
        </>
    )
}

export default Createappointment;
