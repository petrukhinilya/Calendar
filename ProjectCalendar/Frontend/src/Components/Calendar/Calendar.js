import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Snackbar, Popover, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../Header/Header';
import builtCalendar from './BuiltCalendar';
import Popup from './Popup';
import DayPopup from './DayPopup';
import CalendarDay from './CalendarDay';
import CurrentDayPopup from './CurrentDayPopup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { ChevronLeftOutlined, ChevronRightOutlined } from '@material-ui/icons';

import { getUserEvent, deleteUserEvent, updateUserEvent } from '../../Actions';

import './Calendar.css';

const Calendar = () => {
  const dispatch = useDispatch();
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());
  const [showPopup, setShowPopup] = useState(false);
  const [showDayPopup, setShowDayPopup] = useState(false);
  const [event, setEvent] = useState('');
  const allEvents = useSelector(state => state.events.events);

  const [showCurrentDayPopup, setShowCurrentDayPopup] = useState(false);
  const [startOfEvent, setStartOfEvent] = useState('');

  const [openSnackDelete, setOpenSnackDelete] = useState(false);
  const [openSnackAdd, setOpenSnackAdd] = useState(false);

  useEffect(() => {
    setCalendar(builtCalendar(value))
  }, [value]);

  useEffect(() => {
    dispatch(getUserEvent())
  }, [])

  const isSelected = (day) => {
    return value.isSame(day, 'day');
  }

  const beforeToday = (day) => {
    const mounthPrev = value.clone().startOf('month').startOf('day');

    return day.isBefore(mounthPrev, 'day');
  }

  const nextToday = (day) => {
    const mounthNext = value.clone().endOf('month').endOf('day');

    return day.isAfter(mounthNext, 'day');
  }

  const isToday = (day) => {
    if (value.isSame(day, 'day') && value.isSame(day, 'month')) {
      return true
    }
    return false
  }

  const dayStyles = (day) => {
    if (beforeToday(day)) return 'before';

    if (nextToday(day)) return 'before';

    if (isToday(day)) return 'selected';

    return '';
  }

  const currMonthName = () => {
    return value.format('MMMM');
  }

  const currYearName = () => {
    return value.format('YYYY');
  }

  const prevMonth = () => {
    return value.clone().subtract(1, 'month');
  }

  const nextMonth = () => {
    return value.clone().add(1, 'month');
  }

  const deleteEvent = (id) => {
    let deleteEvent = confirm('Delete event')
    if (deleteEvent) {
      dispatch(deleteUserEvent(id));
      dispatch(getUserEvent());
      setOpenSnackDelete(true);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackDelete(false);
    setOpenSnackAdd(false);
  }

  const styles = {
    buttons: {
      'fontWeight': '700',
    }
  }

  return (
    <div className='calendar-wrapper'>
      <div className='calendar'>
        <div className="calendar-head">
          <div className='head-wrapper'>
            <Button onClick={() => setValue(moment())} variant="outlined" style={styles.buttons}>Today</Button>
            <div onClick={() => setValue(prevMonth())} className='arrow'>
              <ChevronLeftOutlined />
            </div>
            <div onClick={() => setValue(nextMonth())} className='arrow'>
              <ChevronRightOutlined/>
            </div>
            <div>{currMonthName()}  {currYearName()}</div>
            <Button onClick={() => setShowPopup(true)} variant="contained" color='primary' style={styles.buttons}>Add Event</Button>
          </div>
          <Header />
        </div>
        <table className='body'>
          <tbody>
            <tr className='day-names'>
              {
                ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <td>{d}</td>
                ))
              }
            </tr>
            {calendar.map((week) => (
              <tr className='day-wrapper'>
                {week.map((day) => {
                  return (
                    <CalendarDay
                      day={day}
                      allEvents={allEvents}
                      dayStyles={dayStyles}
                      setValue={setValue}
                      deleteEvent={deleteEvent}
                      setShowDayPopup={setShowDayPopup}
                      setEvent={setEvent}
                      setShowCurrentDayPopup={setShowCurrentDayPopup}
                      setStartOfEvent={setStartOfEvent}
                    />
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Snackbar autoHideDuration={2000} open={openSnackDelete} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">Event was deleted</Alert>
      </Snackbar>
      <Snackbar autoHideDuration={2000} open={openSnackAdd} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">Event was added</Alert>
      </Snackbar>
      {showPopup &&
        <Popup
          onClick={() => setShowPopup(false)}
          setOpenSnackAdd={() => setOpenSnackAdd(true)}
        />
      }
      {showDayPopup &&
        <DayPopup
          onClick={() => setShowDayPopup(false)}
          event={event}
          setOpenSnackAdd={() => setOpenSnackAdd(true)}
        />}
      {showCurrentDayPopup &&
        <CurrentDayPopup
          onClick={() => setShowCurrentDayPopup(false)}
          startOfEvent={startOfEvent}
          setOpenSnackAdd={() => setOpenSnackAdd(true)}
        />
      }
    </div>
  )
}

export default Calendar;
