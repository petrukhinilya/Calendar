import moment from 'moment';

export default function createCalendar(day, getallEvents, dayStyles, setValue) {
  const allEvents = [];

  for (let i = 0; i < getallEvents.length; i++) {
    let dayStart = day.format('DD MMM YYYY');
    let dayStartEvent = moment(getallEvents[i].startDate).format('DD MMM YYYY');
    let dayEndEvent = moment(getallEvents[i].endDate).format('DD MMM YYYY');

    if (dayStart >= dayStartEvent && dayStart <= dayEndEvent) {
      allEvents.push(getallEvents[i]);
    }
  }

  return (
    <div className='day' onClick={() => setValue(day)} >
      <div id='number'>
        <div className={dayStyles(day)}>{day.format('D').toString()}</div>
          {allEvents.map((event) => {
            return (
              <div className='highlight'>{event.event}</div>
              )
            })
          }
      </div>
    </div>
  )
}
