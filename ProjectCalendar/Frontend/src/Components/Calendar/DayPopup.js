import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { updateUserEvent, getUserEvent } from '../../Actions';

import './Popup.css';

const ChangePopup = ({ onClick, event }) => {
  const eventTimeStart = moment(event.startDate).format('YYYY-MM-DD');
  const eventTimeEnd = moment(event.endDate).format('YYYY-MM-DD');
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(eventTimeStart);
  const [endDate, setEndDate] = useState(eventTimeEnd);
  const [text, setText] = useState(event.event);
  const [checked, setChecked] = useState(true);

  const updateEvent = (e) => {
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

    console.log('Start',Number(new Date(startDate).getTime()))
    console.log('Start',Number(new Date(endDate).getTime()))
    dispatch(updateUserEvent(event._id, startDate, endDate, text));
    dispatch(getUserEvent());
  }

  const onChange = (events) => {
    const { target: { name, value } } = events;

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

  return (
    <div className='main'>
      <div className='wrapper-popup' onClick={onClick} />
      <div>
        <form className="popup" onSubmit={updateEvent}>
          {checked && <>
            <input type='date' className='input1' onChange={onChange} value={startDate} name="startDate"></input>
            <input type='date' className='input2' onChange={onChange} value={endDate} name="endDate"></input>
          </>}
          {!checked && <>
            <input type='datetime-local' className='input1' onChange={onChange} value={startDate} name="startDate"></input>
            <input type='datetime-local' className='input2' onChange={onChange} value={endDate} name="endDate"></input>
          </>}
          <input type='checkbox' name="hour" onClick={onHours} checked={checked}></input>
          <label for="hour">Whole day</label>
          <input type='text' className='text' placeholder='Add event to date' onChange={onChange} value={text} name="text" />
          <button type='submit' className='addevent-btn'>Change this event</button>
          <input type='reset' onClick={onClick} className='reset' />
        </form>
      </div>
    </div>
  )
}
export default ChangePopup;
