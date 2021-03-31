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

import { addUserEvent, getUserEvent } from '../../Actions';

import './Popup.css';

const Popup = ({ onClick }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const [text, setText] = useState('');
  const [checked, setChecked] = useState(true);

  const sendEvent = (e) => {
    e.preventDefault();

    dispatch(addUserEvent(startDate, endDate, text));
    dispatch(getUserEvent());
    setOpenSnackAdd()
    onClick();
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
    add: {
      'cursor': 'pointer',
      'font-weight':'600'
    },
    cancel: {
      'margin-top':'10px',
      'cursor': 'pointer',
      'font-weight':'600'
    },
  }

  return (
    <div className='main'>
      <div className='wrapper-popup' onClick={onClick}>
      </div>
      <div>
        <form className="popup" onSubmit={sendEvent}>
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
          <div className='popup-btn-wrapper'>
          <Button type='submit' style={styles.add} variant='contained' color='primary'>Add event</Button>
          <Button type='reset' onClick={onClick} style={styles.cancel} variant='contained' color='secondary'>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Popup;
