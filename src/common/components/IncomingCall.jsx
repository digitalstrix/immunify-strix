import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Fab,
  Backdrop,
  Avatar,
  Chip,
} from "@material-ui/core";
import { Call as CallIcon, CallEnd as CallEndIcon } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectCallerName } from "../../features/Parent/CallView/selector";
import {
  setCallerData,
  setReceivingCallStatus,
} from "../../features/Common/commonSlice";
import RingingTone from "../../assets/tones/incomigCall.mp3";
import { selectCallData } from "../../features/Common/selector";
const Incomingcall = () => {
  const dispatch = useDispatch();

  const callerName = useSelector(selectCallerName);
  const { channel, token, uid, slotId, userName } = useSelector(selectCallData);
  const audio = new Audio(RingingTone);

  useEffect(() => {
    audio.play();
    return () => {
      audio.pause();
    };
  }, []);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={callerName}
      >
        <Box
          sx={{
            flexGrow: 1,
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  style={{
                    width: 100,
                    height: 100,
                    "font-size": "40px",
                  }}
                >
                  {callerName.charAt(0)}
                </Avatar>
              </Box>
              <br />
              <br />
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                <Chip label="Incoming Call.." variant="outlined" />
              </div>
              <br />
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 25,
                }}
              >
                {`Dr. ${callerName}`}
              </Typography>
            </Grid>
            <br />
            <Grid item xs={12}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Fab
                  variant="extended"
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    height: 55,
                    marginRight: 60,
                  }}
                  onClick={() => {
                    window.open(
                      `http://localhost:3000/call-view?token=${token}&uid=${uid}&channel=${channel}&slotId=${slotId}&userName=${userName}`
                    );
                    dispatch(setReceivingCallStatus(false));
                    dispatch(
                      setCallerData({
                        data: {
                          channel: null,
                          token: null,
                          uid: null,
                          slotId: null,
                          userName: null,
                        },
                      })
                    );
                  }}
                >
                  <CallIcon />
                  <b> &nbsp; Accept </b>
                </Fab>
                <Fab
                  variant="extended"
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    height: 55,
                    marginRight: 10,
                  }}
                  onClick={() => {
                    dispatch(setReceivingCallStatus(false));
                    dispatch(
                      setCallerData({
                        data: {
                          channel: null,
                          token: null,
                          uid: null,
                          slotId: null,
                          userName: null,
                        },
                      })
                    );
                  }}
                >
                  <CallEndIcon />
                  <b> &nbsp; Decline </b>
                </Fab>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Backdrop>
    </div>
  );
};

export default Incomingcall;
