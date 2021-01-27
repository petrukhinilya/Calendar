import moment from 'moment';

export default function createCalendar(day, a, dayStyles, setValue) {
  const newArr = [];

  for (let i = 0; i < a.length; i++) {
    let dayStart = day.format('DD MMM YYYY');
    let bStart = moment(a[i].startDate).format('DD MMM YYYY');
    if (dayStart === bStart) {
      newArr.push(a[i])
    }
  }

  return (
        <div className='day' onClick={() => setValue(day)} >
          <div id='number'>
            <div className={dayStyles(day)}>{day.format('D').toString()}
            </div>
            <div>
              {newArr.map((event) => {
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