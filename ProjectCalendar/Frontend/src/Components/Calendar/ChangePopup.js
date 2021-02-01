import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { updateUserEvent, getUserEvent } from '../../Actions';

import './Popup.css';

const ChangePopup = ({ onClick, event }) => {
  const eventTimeStart = moment(event.startDate).format('YYYY-MM-DD');
  const eventTimeEnd = moment(event.endDate).format('YYYY-MM-DD');
  console.log(eventTimeStart)
  console.log(eventTimeEnd)
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(eventTimeStart);
  const [endDate, setEndDate] = useState(eventTimeEnd);
  const [text, setText] = useState(event.event);

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
    console.log(event)
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

  return (
      <div className='main'>
          <div className='wrapper-popup' onClick={onClick}>
          </div>
        <div>
          <form className="popup" onSubmit={updateEvent}>
            <input type='date' className='input1' onChange={onChange} value={startDate} name="startDate"></input>
            <input type='date' className='input2' onChange={onChange} value={endDate} name="endDate"></input>
            <input type='text' className='text' placeholder='Add event to date' onChange={onChange} value={text} name="text"></input>
            <button type='submit' className='add-btn'>Change this event</button>
            <input type='reset' onClick={onClick} className='reset'></input>
          </form>
        </div>
      </div>
    )
}
export default ChangePopup;