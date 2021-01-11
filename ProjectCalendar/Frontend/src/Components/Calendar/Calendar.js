import React, { useState, useEffect } from 'react'
import moment from 'moment'
import './Calendar.css'
import builtCalendar from './BuiltCalendar'
const Calendar = () => {
    const [calendar, setCalendar] = useState([])
    const [value, setValue] = useState(moment())


    useEffect(() => {
        setCalendar(builtCalendar(value))
    }, [value])
    
    function isSelected(day){
        return value.isSame(day,'day')
    }
    function beforeToday(day){
        return day.isBefore(new Date(),'day')
    }
    function isToday(day){
        return day.isSame(new Date(),'day')
    }
    function dayStyles(day){
        if(beforeToday(day)) return 'before'
        if(isSelected(day)) return 'selected'
        if(isToday(day)) return 'today'
        return ''
    }

    return (<div className='calendar'>
        {calendar.map((week) => (
            <div>
                {week.map((day) => (
                    <div className='day' onClick={() => setValue(day)}>
                        <div
                            className={dayStyles(day)}
                        >{day.format('D').toString()}</div>
                    </div>
                ))}
            </div>
        ))}

    </div>)
}

export default Calendar