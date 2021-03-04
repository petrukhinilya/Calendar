import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { addUserEvent, getUserEvent } from '../../Actions';

import './CurrentDay.css';

const CurrentDayPopup = ({ onClick, startOfEvent}) => {
const dispatch = useDispatch();
  const startDayEvent = moment(startOfEvent).format('YYYY-MM-DD');
  const [startDate, setStartDate] = useState(startDayEvent);
  const [endDate, setEndDate] = useState('');
  const [text, setText] = useState('');

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
  // moment(value).format("YYYY-MM-DDTHH:mm:ss") вероятно для инпута

  return (
      <div className='main'>
          <div className='wrapper-popup1' onClick={onClick}>
          </div>
        <div>
          <form className="popup1" onSubmit={sendEvent}>
            <input type='date' className='input1' onChange={onChange} value={startDate} name="startDate"></input>
            <input type='date' className='input2' onChange={onChange} value={endDate} name="endDate"></input>
            <div>
            <input className='hour1' type="datetime-local"/>
            <input className='hour1' type="datetime-local"/>
            </div>
            <input type='text' className='text' placeholder='Add event to date' onChange={onChange} value={text} name="text"></input>
            <button type='submit' className='add-btn'>Add event</button>
            <input type='reset' onClick={onClick} className='reset'></input>
          </form>
        </div>
      </div>
    )
}

export default CurrentDayPopup;
