import moment from 'moment';

export default function createCalendar(day, a, dayStyles, setValue) {
  const arrOfEvents = [];

  for (let i = 0; i < a.length; i++) {
    let dayStart = day.format('DD MMM YYYY');
    let dayStartEvent = moment(a[i].startDate).format('DD MMM YYYY');
    if (dayStart === dayStartEvent) {
      arrOfEvents.push(a[i])
    }
  }

  return (
        <div className='day' onClick={() => setValue(day)} >
          <div id='number'>
            <div className={dayStyles(day)}>{day.format('D').toString()}
            </div>
            <div>
              {arrOfEvents.map((event) => {
                  return (
                    <div className='highlight'>{event.event}</div>
                  )
                })
              }
            </div>
          </div>
        </div>
      )
}
