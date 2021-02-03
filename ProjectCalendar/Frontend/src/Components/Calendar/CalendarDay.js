import moment from 'moment';

const CalendarDay = ({day, allEvents, dayStyles, setValue, deleteEvent, setDayPopup, setEvent}) => {
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
    setDayPopup(true);
  }

  return (
    <div className='day' onClick={() => setValue(day)} >
      <div id='number'>
        <div className={dayStyles(day)}>{day.format('D').toString()}
        </div>
        <div>
          {events.map((event) => {
            return (
              <div className='highlight'>
                <div className = 'event' onClick={() => updateEvents(event)}>{event.event}</div>
                <button className='del' onClick={() => deleteEvent(event._id)}>Del</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CalendarDay;
