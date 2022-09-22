import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import QrReader from "../../../common/components/QrReader";
import { selectChildVaccinationInputs } from "../selector";
import {
  getVaccineVialImage,
  setChildVaccinationFormInputs,
  setVacVialImage,
} from "../vaccinationSlice";

import { init } from "../../../utils/barCodeUtils";
let barCodeReader = null;

const Vaccinationdialogcontent = ({ disableInputs }) => {
  const inputs = useSelector(selectChildVaccinationInputs);
  const [barcodeStart, setbarcodeStart] = useState(true);
  const dispatch = useDispatch();
  const updateInputs = (payload) =>
    dispatch(setChildVaccinationFormInputs(payload));
  const child = useSelector((state) => state.vaccination?.children[0]);

  const vialImage = useSelector((state) => state.vaccination.vacVialImage);

  const childVacData = child?.ChildVaccinationDetails.find(
    (vacData) => vacData.id === inputs?.childVacDetailId
  );

  useEffect(() => {
    if (childVacData?.vacCaptureImage) {
      dispatch(getVaccineVialImage(childVacData?.vacCaptureImage));
    }
    return () => {
      dispatch(setVacVialImage(null));
    };
  }, [dispatch, childVacData]);

  const handleChange = ({ target: { name, value } }) => {
    updateInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (barCodeReader) {
        barCodeReader.stop();
      }
    };
  }, []);

  return (
    <div>
      <QrReader
        isOpen={open}
        closeAction={() => setOpen(false)}
        handleError={(e) => console.log(e)}
        handleScan={(data) => {
          if (data !== null) {
            setOpen(false);
            updateInputs({
              ...inputs,
              qrCode: data,
            });
          }
        }}
      />
      <Box m={3}>
        <Grid container row spacing={3}>
          <Grid item xs={6}>
            <Box>
              <TextField
                id="vaccine_name"
                label="Vaccine Name"
                variant="outlined"
                disabled={true}
                name={"vaccine"}
                value={inputs.vaccine}
                fullWidth
              />
            </Box>
            <Box mt={2}>
              <TextField
                id="dose_count"
                label="Dose No"
                variant="outlined"
                disabled={true}
                value={inputs.doseId}
                fullWidth
              />
            </Box>
            <Box mt={2}>
              <TextField
                id="vial"
                label="Barcode of vial"
                variant="outlined"
                onChange={handleChange}
                name={"barCode"}
                disabled={disableInputs}
                value={inputs.barCode}
                fullWidth
              />
            </Box>
            <Box mt={2}>
              <TextField
                id="qr_vial"
                label="QR code of vial"
                variant="outlined"
                onChange={handleChange}
                name={"qrCode"}
                disabled={disableInputs}
                value={inputs.qrCode}
                fullWidth
              />
            </Box>
            <Box mt={2}>
              <TextField
                id="remarks"
                label="Remarks"
                variant="outlined"
                multiline
                rows={4}
                onChange={handleChange}
                name={"remarks"}
                disabled={disableInputs}
                value={inputs.remarks}
                fullWidth
              />
            </Box>
          </Grid>

          {/* <Image src={vialImage?.imageUrl || null} /> */}

          <Grid direction="column" justify="flex-start" item xs={6} spacing={2}>
            {vialImage && (
              <Box mt={2}>
                <Grid item xs={12} style={{ marginLeft: 130 }}>
                  <img
                    src={vialImage?.imageUrl}
                    style={{ alignSelf: "center" }}
                    alt="Vial Image"
                    width="200"
                    height="200"
                  />
                </Grid>
              </Box>
            )}
            <Box mt={2}>
              <Grid item xs={12}>
                {barcodeStart === true ? (
                  <Button
                    variant="outlined"
                    fullWidth
                    color="primary"
                    disabled={disableInputs}
                    onClick={() => {
                      barCodeReader = init("#barcode_placeholder", (result) => {
                        handleChange({
                          target: {
                            name: "barCode",
                            value: result.codeResult.code,
                          },
                        });
                      });
                      setbarcodeStart(false);
                    }}
                  >
                    {" "}
                    Scan Via Barcode
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    fullWidth
                    size="small"
                    color="inherit"
                    disabled={disableInputs}
                    onClick={() => {
                      if (barCodeReader) {
                        barCodeReader.stop();
                        setbarcodeStart(true);
                      }
                    }}
                  >
                    Stop Scanner
                  </Button>
                )}
              </Grid>
            </Box>
            <Box mt={2}>
              <Grid item xs={12}>
                <Button
                  onClick={() => setOpen(true)}
                  variant="outlined"
                  fullWidth
                  color="primary"
                  disabled={disableInputs}
                >
                  Scan Via QR code
                </Button>
              </Grid>
            </Box>
            <Box mt={2}>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  fullWidth
                  color="primary"
                  disabled
                  onClick={() => {}}
                >
                  Upload a Photo
                </Button>
              </Grid>
            </Box>
            <Box mt={2}>
              <Grid item xs={12}>
                <div id="barcode_placeholder"></div>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Vaccinationdialogcontent;
