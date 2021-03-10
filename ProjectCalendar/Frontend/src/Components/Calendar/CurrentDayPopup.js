import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { addUserEvent, getUserEvent } from '../../Actions';

import './Popup.css';

const CurrentDayPopup = ({ onClick, startOfEvent }) => {
  const dispatch = useDispatch();
  const startDayEvent = moment(startOfEvent).format('YYYY-MM-DD');
  const [startDate, setStartDate] = useState(startDayEvent);
  const [endDate, setEndDate] = useState(startDayEvent);
  const [text, setText] = useState('');
  const [checked, setChecked] = useState(true);

  const sendEvent = (e) => {
    e.preventDefault();

    const {
      target: {
        children: {
          startDate: {
            value: startDate
          },
          endDate: {
            value: endDate
          },
          text: {
            value: text
          },
        }
      }
    } = e;

    console.log('Start',startDate)
    console.log('Start',endDate)

    dispatch(addUserEvent(startDate, endDate, text));
    dispatch(getUserEvent());
    onClick();
  }

  const onChange = (event) => {
    const { target: { name, value } } = event;

    switch (name) {
      case 'startDate':
        setStartDate(value);
        break;
      case 'endDate':
        setEndDate(value);
        break;
      case 'text':
        setText(value);
        break;
      default:
        break;
    }
  }

  const onHours = () => {
    if (checked) {
      setChecked(false)
    } else {
      setChecked(true)
    }
  }
  // moment(value).format("YYYY-MM-DDTHH:mm:ss") вероятно для инпута

  return (
    <div className='main'>
      <div className='wrapper-popup' onClick={onClick}>
      </div>
      <div>
        <form className="popup" onSubmit={sendEvent}>
        {checked && <>
            <input type='date' className='input1' onChange={onChange} value={startDate} name="startDate"/>
            <input type='date' className='input2' onChange={onChange} value={endDate} name="endDate"/>
          </>}
          {!checked && <>
            <input type='datetime-local' className='input1' onChange={onChange} value={startDate} name="startDate"/>
            <input type='datetime-local' className='input2' onChange={onChange} value={endDate} name="endDate"/>
          </>}
          <input type='checkbox' name="hour" onClick={onHours} checked={checked}/>
          <label className = 'hour' for="hour"> Whole day</label>
          <input type='text' className='text' placeholder='Add event to date' onChange={onChange} value={text} name="text"></input>
          <button type='submit' className='addevent-btn'>Add event</button>
          <input type='reset' onClick={onClick} className='reset'></input>
        </form>
      </div>
    </div>
  )
}

export default CurrentDayPopup;
