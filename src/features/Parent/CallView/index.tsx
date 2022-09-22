import React, { useEffect, useReducer, useState } from "react";
import defaultCover from "../../../assets/img/Background/imm_logo.png";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Container,
  Card,
  CardActions,
  Button,
  TextField,
  MenuItem,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Box,
  Fab,
  CardContent,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import {
  ExpandMore as ExpandMoreIcon,
  CallEnd as CallEndIcon,
  Mic as MicOnIcon,
  MicOff as MicOffIcon,
  Videocam as VideoOnIcon,
  VideocamOff as VideoOffIcon,
} from "@material-ui/icons";
import { notify } from "../../../utils/commonUtils";
import { useSnackbar } from "notistack";
import StreamPlayer from "agora-stream-player";
import { excuteAfterGivenDelay } from "../../../utils/commonUtils";

// These customs hooks let any components in the application
// to directly use the required parameters and create clean functional components.
// useCamera hook returns a list of cameras when the hook is called
// useMicrophone hook returns a list of microphones when the hook is called
// useMediaStream hook returns localStream, a list of remote streams and
// a contatenated list of localstream and remote streams when the hook is called
import {
  useCamera,
  useMicrophone,
  useMediaStream,
  usePermission,
} from "../../../hooks/agora/index";

// This is an enhanced Web SDK. The enhancement basically converts the callback syntax into promises.
// Rest of the code will use async/await syntax in conjuction with these promises.
import AgoraRTC from "../../../utils/AgoraEnhancer";
import { setCallStatus } from "./callViewSlice";
import {
  getLoggedInUserId,
  selectSettingCallCompleteError,
  selectSettingCallCompleteStatus,
} from "./selector";

function App() {
  const dispatchAction = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const appId = process.env.REACT_APP_AGORA_APP_ID;

  const loggedInUserId = useSelector(getLoggedInUserId);
  const callCompletingState = useSelector(selectSettingCallCompleteStatus);
  const callCompletingError = useSelector(selectSettingCallCompleteError);

  const [rating, setRating] = useState(5);
  const [isRemoteUserDropped, setIsRemoteUserDropped] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const queryParams = new URLSearchParams(window.location.search);

  const [uid, setUid] = useState(queryParams.get("uid"));
  const [channel, setChannel] = useState(queryParams.get("channel"));
  const [token, setToken] = useState(queryParams.get("token"));
  const [slotId, setSlotId] = useState(queryParams.get("slotId"));
  const [userName, setUserName] = useState(queryParams.get("userName"));

  const CALL_COMPLETED_SUCCESSFULLY = "Call Completed";
  const CALL_COMPLETED_FAILURE = "Call Completing Failed!";

  useEffect(() => {
    if (callCompletingState === "succeeded") {
      notify(enqueueSnackbar, CALL_COMPLETED_SUCCESSFULLY);
      excuteAfterGivenDelay(() => window.close());
    } else if (callCompletingState === "failed") {
      notify(enqueueSnackbar, CALL_COMPLETED_FAILURE, "error");
    }
  }, [callCompletingState, callCompletingError, enqueueSnackbar]);

  const defaultState = {
    appId: appId,
    channel: channel || "",
    uid: uid || "",
    token: token?.replace(/ /g, "+") || undefined,
    cameraId: "",
    microphoneId: "",
    mode: "rtc",
    codec: "h264",
  };

  const reducer = (
    state: typeof defaultState,
    action: { type: string; [propName: string]: any }
  ) => {
    switch (action.type) {
      default:
        return state;
      case "setAppId":
        return {
          ...state,
          appId: action.value,
        };
      case "setChannel":
        return {
          ...state,
          channel: action.value,
        };
      case "setUid":
        return {
          ...state,
          uid: action.value,
        };
      case "setToken":
        return {
          ...state,
          token: action.value,
        };
      case "setCamera":
        return {
          ...state,
          cameraId: action.value,
        };
      case "setMicrophone":
        return {
          ...state,
          microphoneId: action.value,
        };
      case "setMode":
        return {
          ...state,
          mode: action.value,
        };
      case "setCodec":
        return {
          ...state,
          codec: action.value,
        };
    }
  };

  // Declaring different states used by our application.
  const classes = useStyles();
  const [isJoined, setisJoined] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [agoraClient, setClient] = useState<any>(undefined);
  // const agoraClient = AgoraRTC.createClient({ mode: state.mode, codec: state.codec });

  // All hooks are called to get the necessary data
  const permission = usePermission();
  const cameraList = useCamera();
  const microphoneList = useMicrophone();
  let [localStream, remoteStreamList] = useMediaStream(agoraClient);

  const update = (actionType: string) => (e: React.ChangeEvent<unknown>) => {
    return dispatch({
      type: actionType,
      value: (e.target as HTMLInputElement).value,
    });
  };

  const changeCamera = async (e: React.ChangeEvent<unknown>) => {
    let cameraId = (e.target as HTMLInputElement).value;
    if (cameraId == state.cameraId) {
      return;
    } else {
      update("setCamera")(e);
      if (localStream) {
        const stream = AgoraRTC.createStream({
          audio: false,
          video: true,
          cameraId: cameraId,
        });
        await stream.init();
        localStream.replaceTrack(stream.getVideoTrack());
      }
    }
  };

  const changeMicrophone = async (e: React.ChangeEvent<unknown>) => {
    let microphoneId = (e.target as HTMLInputElement).value;
    if (microphoneId == state.microphoneId) {
      return;
    } else {
      update("setMicrophone")(e);
      if (localStream) {
        const stream = AgoraRTC.createStream({
          video: false,
          audio: true,
          microphoneId: microphoneId,
        });
        await stream.init();
        localStream.replaceTrack(stream.getAudioTrack());
      }
    }
  };

  // Starts the video call
  const join = async () => {
    // Creates a new agora client with given parameters.
    // mode can be 'rtc' for real time communications or 'live' for live broadcasting.
    const client = AgoraRTC.createClient({
      mode: state.mode,
      codec: state.codec,
    });

    client.on("peer-leave", (event) => {
      setIsRemoteUserDropped(true);
      setisJoined(false);
    });

    // Loads client into the state
    setClient(client);
    setIsLoading(true);
    try {
      const uid = isNaN(Number(state.uid)) ? null : Number(state.uid);

      // initializes the client with appId
      await client.init(state.appId);

      // TBC: some errors in client.join might be caught without throwing the error again
      // e.g invalid token
      // which causing error handling in this function not working
      // joins a channel with a token, channel, user id
      await client.join(state.token, state.channel, uid);

      // create a ne stream
      const stream = AgoraRTC.createStream({
        streamID: uid || "",
        video: true,
        audio: true,
        screen: false,
        cameraId: state.cameraId,
        microphoneId: state.microphoneId,
      });

      // stream.setVideoProfile('480p_4')

      // Initalize the stream
      await stream.init();

      // Publish the stream to the channel.
      await client.publish(stream);

      // Set the state appropriately
      setIsPublished(true);
      setisJoined(true);
      notify(enqueueSnackbar, `Joined channel ${state.channel}`);
    } catch (err) {
      notify(enqueueSnackbar, `Failed to join, ${err}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Publish function to publish the stream to Agora. No need to invoke this after join.
  // This is to be invoke only after an unpublish
  const publish = async () => {
    setIsLoading(true);
    try {
      if (localStream) {
        // Publish the stream to the channel.
        await agoraClient.publish(localStream);
        setIsPublished(true);
      }
      notify(enqueueSnackbar, "Stream published");
    } catch (err) {
      notify(enqueueSnackbar, `Failed to publish, ${err}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Leaves the channel on invoking the function call.
  const leave = async () => {
    setIsLoading(true);
    try {
      if (localStream) {
        // Closes the local stream. This de-allocates the resources and turns off the camera light
        localStream.close();
        // unpublish the stream from the client
        agoraClient.unpublish(localStream);
      }
      // leave the channel
      await agoraClient.leave();
      setIsPublished(false);
      setisJoined(false);
      notify(enqueueSnackbar, "Left channel");
    } catch (err) {
      notify(enqueueSnackbar, `Failed to leave, ${err}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const JoinLeaveBtn = () => {
    return (
      <Button
        className={classes.buttonItem}
        color="primary"
        onClick={join}
        variant="contained"
        disabled={isLoading}
      >
        Join
      </Button>
    );
  };

  return (
    <React.Fragment>
      <Container style={{ flexDirection: "row" }}>
        {!isRemoteUserDropped ? (
          <>
            <Grid container>
              <Grid item xs={6}>
                <ExpansionPanel className={classes.advanceSettings}>
                  <ExpansionPanelSummary
                    style={{ paddingBottom: 4 }}
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography>Advanced Settings</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <form noValidate autoComplete="off">
                      <TextField
                        id="cameraId"
                        value={state.cameraId}
                        onChange={changeCamera}
                        select
                        label="Camera"
                        helperText="Please select your camera"
                        fullWidth
                        margin="normal"
                      >
                        {cameraList.map((item) => (
                          <MenuItem key={item.deviceId} value={item.deviceId}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        id="microphoneId"
                        value={state.microphoneId}
                        onChange={changeMicrophone}
                        select
                        label="Microphone"
                        helperText="Please select your microphone"
                        fullWidth
                        margin="normal"
                      >
                        {microphoneList.map((item) => (
                          <MenuItem key={item.deviceId} value={item.deviceId}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </form>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  {!isJoined && (
                    <CardActions className={classes.buttonContainer}>
                      <JoinLeaveBtn />
                    </CardActions>
                  )}
                </Card>
              </Grid>
            </Grid>

            {isJoined && (
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    {remoteStreamList.map((stream: any) => (
                      <StreamPlayer
                        key={stream.getId()}
                        stream={stream}
                        fit="contain"
                        networkDetect={true}
                        speaking={true}
                        appendIcon={true}
                        style={{ height: 600, width: "100%" }}
                        label={`Dr. ${userName}`}
                      />
                    ))}

                    <Box
                      style={{
                        margin: 20,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Fab
                        color="primary"
                        aria-label="add"
                        onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                        style={{ marginRight: 10 }}
                      >
                        {isVideoEnabled ? <VideoOnIcon /> : <VideoOffIcon />}
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
                          leave();
                          setisJoined(false);
                          setIsRemoteUserDropped(true);
                        }}
                      >
                        <CallEndIcon />
                        <b> &nbsp; End </b>
                      </Fab>
                      <Fab
                        color="secondary"
                        aria-label="edit"
                        onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                      >
                        {isAudioEnabled ? <MicOnIcon /> : <MicOffIcon />}
                      </Fab>
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    {localStream && (
                      <StreamPlayer
                        stream={localStream}
                        fit="contain"
                        networkDetect={true}
                        speaking={true}
                        appendIcon={true}
                        label="You"
                        video={isVideoEnabled}
                        placeholder={
                          <img
                            src={defaultCover}
                            style={{ height: "10%" }}
                            alt="cover"
                          />
                        }
                        audio={isAudioEnabled}
                        style={{ height: 600, width: "100%" }}
                      />
                    )}
                  </Grid>
                </Grid>
              </Box>
            )}
          </>
        ) : (
          <div>
            <Grid container>
              <Grid item xs={12}>
                <Card
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: 30,
                  }}
                >
                  <CardContent>
                    <ReactStars
                      count={rating}
                      onChange={(rate: any) => setRating(rate)}
                      size={24}
                      activeColor="#ffd700"
                    />
                  </CardContent>

                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={callCompletingState === "loading"}
                      style={{ marginRight: 20, backgroundColor: "red" }}
                      onClick={() =>
                        dispatchAction(
                          setCallStatus({
                            slotId,
                            immId: loggedInUserId,
                            rating,
                          })
                        )
                      }
                    >
                      {callCompletingState === "loading"
                        ? "Loading.."
                        : "Complete Call"}
                    </Button>
                    <Button
                      disabled={callCompletingState === "loading"}
                      variant="contained"
                      color="primary"
                      onClick={() => window.close()}
                    >
                      Not Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </div>
        )}
      </Container>
    </React.Fragment>
  );
}

export default function AppWithNotification() {
  return <App />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 12,
  },
  title: {
    fontWeight: 400,
  },
  divider: {
    marginBottom: "32px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  buttonItem: {
    width: "38.2%",
  },
  advanceSettings: {},
}));
