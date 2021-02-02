import moment from 'moment';

export default function createCalendar(day, getallEvents, dayStyles, setValue, deleteEvent, setChangePopup, setEvent) {
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
        <div className={dayStyles(day)}>{day.format('D').toString()}
        </div>
        <div>
          {allEvents.map((event) => {
            const deleteEvents = () => {
              deleteEvent(event._id)
            }
            return (
              <div className='highlight'>
                <div className = 'event'>{event.event}</div>
                <button className='del' onClick={deleteEvents}>Del</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
