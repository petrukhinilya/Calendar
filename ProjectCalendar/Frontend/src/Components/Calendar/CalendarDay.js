import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarTimes } from '@fortawesome/free-solid-svg-icons';

import './Calendar.css';

const CalendarDay = ({ day, allEvents, dayStyles, setValue, deleteEvent, setShowDayPopup, setEvent, setShowCurrentDayPopup, setStartOfEvent }) => {
  const events = [];

  for (let i = 0; i < allEvents.length; i++) {
    let dayStart = day.format('MM DDD YYYY');
    let dayStartEvent = moment(allEvents[i].startDate).format('MM DDD YYYY');
    let dayEndEvent = moment(allEvents[i].endDate).format('MM DDD YYYY');

    if (dayStart >= dayStartEvent && dayStart <= dayEndEvent) {
      events.push(allEvents[i]);
    }
  }

  const updateEvents = (event) => {
    setEvent(event);
    setShowDayPopup(true);
  }

  const addEvent = (day) => {
    setStartOfEvent(day)
    setShowCurrentDayPopup(true)
  }

  return (
    <div className='day' onClick={() => { addEvent(day) }}>
      <div>
        <div id='number' className={dayStyles(day)} >
          {day.format('D').toString()}
        </div>
        <div>
          {events.map((event) => {
            return (
              <div className='highlight'>
                <div className='event' onClick={(e) => {
                  e.stopPropagation()
                  updateEvents(event)
                }}>
                  {event.event}
                </div>
                <button className='del' onClick={(e) => {
                  e.stopPropagation()
                  deleteEvent(event._id)
                }}>
                  <FontAwesomeIcon icon={faCalendarTimes} />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CalendarDay;
