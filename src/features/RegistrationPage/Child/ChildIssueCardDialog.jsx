import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box, Button, TextField } from "@material-ui/core";
import CameraIcon from '@material-ui/icons/CameraAltOutlined'
import Table from "../../../common/components/Table";
import QrReader from '../../../common/components/QrReader';
import { selectParents, selectChild, selectScannedCard } from '../selector';
import { setScannedCard } from '../registrationSlice';

const tableMetaData = [
  { thead: "Name", dataKey: "name" },
  { thead: "Gender", dataKey: "gender" },
  { thead: "Registration number	", dataKey: "id" },
  { thead: "Date of Birth	", dataKey: "dateOfBirth" },
  { thead: "Contact Number	", dataKey: "contact" },
  { thead: "Email", dataKey: "email" },
  { thead: "City", dataKey: "city" },
  { thead: "First Registered Hospital	", dataKey: "hospital" },
];

const Childissuecarddialog = () => {

  const child = useSelector(selectChild);
  const parents = useSelector(selectParents);
  const result = useSelector(selectScannedCard);
  const dispatch = useDispatch();
  let tableData = [];

  if (child) {
    const {
      id, firstName, middleName, lastName, parentId, gender, dateOfBirth,
      BirthInformation: { hospital, city }
    } = child;
    const parent = parents.find(({ id }) => id === parentId);
    const { contact, email } = parent;
    tableData = {
      name: `${firstName} ${middleName} ${lastName}`,
      gender,
      hospital,
      dateOfBirth,
      id,
      contact,
      email,
      city
    }

    tableData = tableMetaData.map(({ thead, dataKey }) => ({
      thead,
      tdata: tableData[dataKey]
    }));
  }

  const [open, setOpen] = useState(false);
  // const [result, setResult] = useState(null);

  const handleError = err => {
    console.error(err);
  }

  const handleScan = data => {
    if (data !== null) {
      dispatch(setScannedCard(data));
      setOpen(false);
    } else if (result === null) {
      dispatch(setScannedCard(data));
    }
  }

  if (child === null) {
    return null;
  }

  return (
    <div>
      <Box>
        <Table
          title="Card Information"
          columns={[
            {
              field: "thead",
              headerStyle: { display: "none" },
              cellStyle: { fontWeight: "bold" },
            },
            {
              field: "tdata",
              headerStyle: { display: "none" }
            },
          ]}
          data={tableData}
          options={{
            search: false,
            pageSize: 8,
            paging: false,
            toolbar: false,
          }}
        />
      </Box>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Box m={3}>
          {" "}
          <TextField
            id="outlined-helperText"
            label="Type QR Code"
            variant="outlined"
            size="small"
            onChange={({ target: { value }}) => dispatch(setScannedCard(value))}
            value={result}
          />
        </Box>
        or
        <Box m={3}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CameraIcon />}
            onClick={() => setOpen(true)}
          >
            Scan New Card
          </Button>
        </Box>
        <QrReader
          isOpen={open}
          closeAction={() => setOpen(false)}
          handleError={handleError} handleScan={handleScan}/>
      </Grid>
    </div>
  );
};

export default Childissuecarddialog;
