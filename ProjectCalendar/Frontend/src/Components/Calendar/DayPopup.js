import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker,
  DatePicker,
  TimePicker
} from '@material-ui/pickers';
import { TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core'

import DateFnsUtils from '@date-io/date-fns';
import DateMomentUtils from '@date-io/moment'

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

    if(text && text.length >= 0){
      dispatch(updateUserEvent(event._id, startDate, endDate, text));
      dispatch(getUserEvent());
      onClick();
    } else {
      alert('Fill event')
    }
  }

  const onChangeText = (event) => {
    const { target: { name, value } } = event;

    switch (name) {
      case 'text':
        setText(value);
        break;
      default:
        break;
    }
  }

  const onChangeStartDate = (event) => {
    setStartDate(event)
  }

  const onChangeEndDate = (event) => {
    setEndDate(event)
  }

  const onHours = () => {
    if (checked) {
      setChecked(false)
    } else {
      setChecked(true)
    }
  }

  const styles = {
    marginTop: '20px',
    border: '1px solid red',
    borderRadius: '10rem',
    background: 'transparent',
    transition: '.2s',
    cursor: 'pointer',
    color: 'black'
  }

  return (
    <div className='main'>
      <div className='wrapper-popup' onClick={onClick} />
      <div>
        <form className="popup" onSubmit={updateEvent}>
        {checked && <>
            <MuiPickersUtilsProvider utils={DateMomentUtils}>
              <DatePicker format="MM/DD/yyyy" className='input1' onChange={onChangeStartDate} value={startDate}
                disablePast='true'
              />
              <DatePicker format="MM/DD/yyyy" className='input2' onChange={onChangeEndDate} value={endDate}
                disablePast='true' />
            </MuiPickersUtilsProvider>
          </>}
          {!checked && <>
            <MuiPickersUtilsProvider utils={DateMomentUtils}>
              <DateTimePicker className='input1' onChange={onChangeStartDate} value={startDate} name="startDate"
                disablePast='true' /> 
              <DateTimePicker className='input2' onChange={onChangeEndDate} value={endDate} name="endDate"
                disablePast='true' />
            </MuiPickersUtilsProvider>
          </>}
          <FormControlLabel control={
            <Checkbox
              checked={checked}
              onChange={onHours}
              name="hour"    
            />
          }
            label="All Day" />
          <TextField type='text' className='text' placeholder='Add event to date' onChange={onChangeText} value={text} name="text" required />
          <Button type='submit' style={styles}>Add event</Button>
          <Button type='reset' onClick={onClick} style={styles}>Cancel</Button>
        </form>
      </div>
    </div>
  )
}
export default ChangePopup;
