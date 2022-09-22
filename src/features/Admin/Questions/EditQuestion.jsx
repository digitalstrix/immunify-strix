import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@material-ui/core';
import MainContext from '../../../context/MainContext';

const Editquestion = (props) => {
    const [value1, setValue1] = useState({
        question:"",
        answer:"",
        category:""
    });
    const context = useContext(MainContext);

    const handleChange=(e)=>{
        setValue1({...value1,[e.target.name]:e.target.value});
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(value1);

        // let ans = await updateQuestion({ question: value1.question });
        // console.log(ans);
                // if(ans.success)
        // {
        //     props.showAlert(true);
        // }
        // else
        // {
        //     props.showAlert(false);
        // }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom:"20px"}}>
                    <h1>Create Question</h1>
                </div>
                <div style={{marginBottom:"12px"}}>
                    <h3>Question</h3>
                    <TextField id="question" label="Question" sx={{width:"100%"}} name="question" onChange={handleChange} value={value1.question} variant="outlined" multiline rows={4} />
                </div>
                <div style={{marginBottom:"12px"}}>
                    <h3>Answer</h3>
                    <TextField id="answer" label="Answer" sx={{width:"100%"}} name="answer" onChange={handleChange} value={value1.answer} variant="outlined" multiline rows={4} />
                </div>
                <div style={{marginBottom:"12px"}}>
                    <FormControl fullWidth>
                        <InputLabel id="category1">Category</InputLabel>
                        <Select
                            labelId="category1"
                            id="category"
                            label="Age"
                            name="category" onChange={handleChange} value={value1.category}
                        >
                            <MenuItem value={'category1'}>Category 1</MenuItem>
                            <MenuItem value={'category2'}>Category 2</MenuItem>
                            <MenuItem value={'category3'}>Category 3</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Button type="submit" color="primary" variant="contained">Submit</Button>
            </form>
        </>
    )
}

export default Editquestion;
