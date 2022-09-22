import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Eventdialog from "./EventDialog";
import DeleteConfirmation from "./DeleteConfirmation";
import EventDetails from "./EventDetails";
import EventAlert from "./EventAlert";
import { excuteAfterGivenDelay, notify } from "../../utils/commonUtils";
import { isOnSameDay } from "../../utils/calenderUtils";

import {
  selectEvents,
  selectUser,
  getLoggedInUserId,
  selectEventsRetreivingStatus,
  selectUpdateEventStatus,
  selectAddEventStatus,
  selectDeleteEventStatus,
} from "./selector";

import { deleteUserEvent, getUserEvents } from "./calenderSlice";

const DIALOG_TYPE_EVENT = "event";
const DIALOG_TYPE_ERROR = "error";
const DIALOG_TYPE_DETAILS = "details";
const DIALOG_TYPE_DELETE = "delete";

const RETRIVING_EVENTS_FAILURE_MSG = "Failed to retrieve events!";

const UPDATE_EVENT_SUCCESS_MSG = "Event Updated Successfully!";
const UPDATE_EVENT_FAILURE_MSG = "Failed To Update The Event!";

const ADD_EVENT_SUCCESS_MSG = "Event Added Successfully!";
const ADD_EVENT_FAILURE_MSG = "Failed To Add The Event!";

const DELETE_EVENT_SUCCESS_MSG = "Event Deleted Successfully!";
const DELETE_EVENT_FAILURE_MSG = "Failed To Delete The Event!";

const Index = (props) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const localizer = momentLocalizer(moment);
  const [slot, setSlot] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
  });
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dialogType, setDialogType] = useState(null);
  const [events, setEvents] = useState([]);

  const userId = useSelector(getLoggedInUserId);
  const user = useSelector(selectUser);
  const data = useSelector(selectEvents);

  const eventsRetreivingStatus = useSelector(selectEventsRetreivingStatus);
  const updateEventStatus = useSelector(selectUpdateEventStatus);
  const addEventStatus = useSelector(selectAddEventStatus);
  const deleteEventStatus = useSelector(selectDeleteEventStatus);

  useEffect(() => {
    if (eventsRetreivingStatus === "failed") {
      notify(enqueueSnackbar, RETRIVING_EVENTS_FAILURE_MSG, "error");
    }
  }, [eventsRetreivingStatus, enqueueSnackbar]);

  useEffect(() => {
    if (deleteEventStatus === "succeeded") {
      setOpen(false);
      setDialogType(null);
      setSelectedEvent(null);
      notify(enqueueSnackbar, DELETE_EVENT_SUCCESS_MSG);
    } else if (deleteEventStatus === "failed") {
      setOpen(false);
      setDialogType(null);
      setSelectedEvent(null);
      notify(enqueueSnackbar, DELETE_EVENT_FAILURE_MSG, "error");
    }
  }, [deleteEventStatus, enqueueSnackbar]);

  useEffect(() => {
    if (updateEventStatus === "succeeded") {
      setOpen(false);
      setDialogType(null);
      notify(enqueueSnackbar, UPDATE_EVENT_SUCCESS_MSG);
    } else if (updateEventStatus === "failed") {
      setOpen(false);
      setDialogType(null);
      notify(enqueueSnackbar, UPDATE_EVENT_FAILURE_MSG, "error");
    }
  }, [updateEventStatus, enqueueSnackbar]);

  useEffect(() => {
    if (addEventStatus === "succeeded") {
      setOpen(false);
      setDialogType(null);
      notify(enqueueSnackbar, ADD_EVENT_SUCCESS_MSG);
    } else if (addEventStatus === "failed") {
      setOpen(false);
      setDialogType(null);
      notify(enqueueSnackbar, ADD_EVENT_FAILURE_MSG, "error");
    }
  }, [addEventStatus, enqueueSnackbar]);

  useEffect(() => {
    dispatch(getUserEvents(userId));
  }, [dispatch]);

  useEffect(() => {
    const modifiedData = data.map((i) => {
      const { id, userId } = i;
      return { id, userId, ...JSON.parse(i.events) };
    });

    const modifiedRoundTwo = modifiedData.map((i) => {
      const {
        eventDesc,
        eventName,
        fromDate,
        ageUnit,
        minAgeRange,
        maxAgeRange,
        toDate,
      } = i;
      return {
        ...i,
        description: eventDesc,
        title: eventName,
        start: new Date(fromDate),
        end: new Date(toDate),
        ageGroup: ageUnit,
        atAgeUnit: ageUnit,
        ageFrom: minAgeRange,
        ageTo: maxAgeRange,
      };
    });
    setEvents(modifiedRoundTwo);
  }, [data]);

  const closeAction = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  const renderDialog = () => {
    if (open) {
      switch (dialogType) {
        case DIALOG_TYPE_EVENT:
          return (
            <Eventdialog
              slot={slot}
              open={open}
              closeAction={closeAction}
              holidays={events ? events.holidays : []}
              user={user}
              selectedEvent={selectedEvent}
            />
          );
        case DIALOG_TYPE_ERROR:
          return <EventAlert open={open} closeAction={closeAction} />;
        case DIALOG_TYPE_DETAILS:
          return (
            <EventDetails
              open={open}
              closeAction={closeAction}
              deleteAction={() => setDialogType(DIALOG_TYPE_DELETE)}
              updateAction={() => setDialogType(DIALOG_TYPE_EVENT)}
              selectedEvent={selectedEvent}
            />
          );
        case DIALOG_TYPE_DELETE:
          return (
            <DeleteConfirmation
              open={open}
              holidays={events ? events.holidays : []}
              user={{}}
              selectedEvent={selectedEvent}
              closeAction={closeAction}
              confirmationAction={() => {
                //submit delete and set selected item to null
                dispatch(
                  deleteUserEvent({
                    doctorId: userId,
                    id: selectedEvent.id,
                  })
                );
              }}
            />
          );
        default:
          return null;
      }
    }
  };

  return (
    <div style={{ height: "80vh" }}>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectEvent={(event, b) => {
          setSelectedEvent(event);
          setDialogType(DIALOG_TYPE_DETAILS);
          setOpen(true);
        }}
        onSelectSlot={({ start, end }) => {
          //consider selecting right to left
          const startMoment = moment(start);
          const now = moment();
          if (!isOnSameDay(startMoment, now) && startMoment.isBefore(now)) {
            setDialogType(DIALOG_TYPE_ERROR);
          } else {
            setDialogType(DIALOG_TYPE_EVENT);
            setOpen(true);
          }
          setSlot({ dateFrom: start, dateTo: end });
          setSelect(true);
        }}
        eventPropGetter={(event) => {
          if (event.isHoliday) {
            return { style: { backgroundColor: "#D32F2F" } };
          }
          return { style: { backgroundColor: "#443266" } };
        }}
      />
      {renderDialog()}
      <EventDetails />
      <EventAlert />
    </div>
  );
};

export default Index;
