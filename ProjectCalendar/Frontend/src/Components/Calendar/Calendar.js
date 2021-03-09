import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import builtCalendar from './BuiltCalendar';
import Popup from './Popup';
import DayPopup from './DayPopup';
import CalendarDay from './CalendarDay';
import CurrentDayPopup from './CurrentDayPopup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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

  useEffect(async () => {
    await setCalendar(builtCalendar(value))
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
    return day.isSame(new Date(), 'day');
  }

  const dayStyles = (day) => {
    if (beforeToday(day)) return 'before';

    if (nextToday(day)) return 'before';

    if (isSelected(day)) return 'selected';

    if (isToday(day)) return 'today';

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
    }
  }

  return (
    <div className='calendar-wrapper'>
      <div className='calendar'>
        <div className="calendar-head">
          <div className='head-wrapper'>
            <button className='today-btn' onClick={() => setValue(moment())}>Today</button>
            <div onClick={() => setValue(prevMonth())}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div onClick={() => setValue(nextMonth())}>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
            {currMonthName()}  {currYearName()}
          </div>
          <div>
            <button onClick={() => setShowPopup(true)} className='add-btn'>Add Event</button>
          </div>
        </div>
        <div className='body'>
          <div className='day-names'>
            {
              ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div>{d}</div>
              ))
            }
          </div>
          <div className='week'>
            {calendar.map((week) => (
              <div className='day-wrapper'>
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
              </div>
            ))}
          </div>
        </div>
      </div>
      {showPopup && <Popup onClick={() => setShowPopup(false)} />}
      {showDayPopup &&
        <DayPopup
          onClick={() => setShowDayPopup(false)}
          event={event}
        />}
      {showCurrentDayPopup &&
        <CurrentDayPopup
          onClick={() => setShowCurrentDayPopup(false)}
          startOfEvent={startOfEvent}
        />
      }
    </div>
  )
}

export default Calendar;
