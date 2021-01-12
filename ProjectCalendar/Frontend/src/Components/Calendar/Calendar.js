import React, { useState, useEffect } from 'react'
import moment from 'moment'
import './Calendar.css'
import builtCalendar from './BuiltCalendar'
import Popup from './Popup';
const Calendar = () => {
    const [calendar, setCalendar] = useState([])
    const [value, setValue] = useState(moment())
    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        setCalendar(builtCalendar(value))
    }, [value])

    function isSelected(day) {
        return value.isSame(day, 'day')
    }
    function beforeToday(day) {
        const mounthPrev = value.clone().startOf('month').startOf('day')
        return day.isBefore(mounthPrev, 'day')

    }
    function nextToday(day) {
        const mounthNext = value.clone().endOf('month').endOf('day')
        return day.isAfter(mounthNext, 'day')
    }
    function isToday(day) {
        return day.isSame(new Date(), 'day')
    }
    function dayStyles(day) {
        if (beforeToday(day)) return 'before'
        if (nextToday(day)) return 'before'
        if (isSelected(day)) return 'selected'
        if (isToday(day)) return 'today'
        return ''
    }
    function currMonthName() {
        return value.format('MMMM')
    }
    function currYearName() {
        return value.format('YYYY')
    }
    function prevMonth() {
        return value.clone().subtract(1, 'month')
    }
    function nextMonth() {
        return value.clone().add(1, 'month')
    }

    function viewPopup() {

        document.body.querySelector('.calendar').classList.toggle('opacity')
        if(showPopup) {
            setShowPopup(true)
        } 
        else {
            setShowPopup(false)
        }
        
    }
    return (
        <div>
            <div className='calendar'>
                <div className="calendar-head">
                    <div >
                        <button onClick={() => setValue(moment())}>Today</button>
                        <button onClick={() => setValue(prevMonth())}>Back</button>
                        <button onClick={() => setValue(nextMonth())}>Next</button>
                    </div>

                    <div>{currMonthName()}  {currYearName()}</div>
                    <div>

                        <button onClick={() => viewPopup()}>Add Event</button>

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
                                {week.map((day) => (
                                    <div className='day' onClick={() => setValue(day)} >
                                        <div id='number' className={dayStyles(day)}>{day.format('D').toString()} </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            { !showPopup && 
                <Popup></Popup>
            }
            
        </div>)
}

export default Calendar