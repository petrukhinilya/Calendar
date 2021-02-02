import moment from 'moment';

export default function createCalendar(day, getallEvents, dayStyles, setValue, deleteEvent, setChangePopup, setEvent) {
  const allEvents = [];

  for (let i = 0; i < getallEvents.length; i++) {
    let dayStart = day.format('MM DDD YYYY');
    let dayStartEvent = moment(getallEvents[i].startDate).format('MM DDD YYYY');
    let dayEndEvent = moment(getallEvents[i].endDate).format('MM DDD YYYY');

    if (dayStart >= dayStartEvent && dayStart <= dayEndEvent) {
      allEvents.push(getallEvents[i]);
    }
  }

  return (
    <div className='day' onClick={() => setValue(day)}>
      <div id='number'>
        <div className={dayStyles(day)}>{day.format('D').toString()}</div>
        <div>
          {allEvents.map((event) => {
            return (
              <div className='highlight'>
                <div className = 'event'>{event.event}</div>
                <button className='del'>Del</button>
              </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
