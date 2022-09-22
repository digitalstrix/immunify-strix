import React, { useContext, useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MainContext from '../../../context/MainContext';

const Viewquestion = (props) => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const context = useContext(MainContext);

    useEffect(() => {
        // console.log(context.a);
        getData();
    }, []);

    const getData = async () => {
        const ans = await context.getQuestion();
        const ans1 = await context.getAnswer();
        console.log(ans.data);
        console.log(ans1.data);
        setData(ans.data);
        setData1(ans1.data);

    };

    const deleteData = async (id) => {
        console.log(id);
        const ans = await context.deleteQuestion(id);
        console.log(ans);
        if (ans.status) {
            props.showAlert(true);
        }
        else {
            props.showAlert(false);
        }
    };

    return (
        <>
            <h1>View Questions</h1>
            <div>
                {data ? data.map((e, index) => {
                    return (
                        <Accordion key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{e.question}</Typography>
                                <b style={{ marginLeft: "20px" }}>Category 1</b>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {data1.findIndex(x=>x.QuestionId===e.id)!==-1 ? data1[data1.findIndex(x=>x.QuestionId===e.id)].answer : " - "}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    )
                }) : null}
            </div>
        </>
    )
}

export default Viewquestion;
