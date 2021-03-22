import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { MuiPickersUtilsProvider, DateTimePicker, DatePicker, } from '@material-ui/pickers';
import { Alert } from '@material-ui/lab'
import { TextField, Button, FormControlLabel, Checkbox, Snackbar } from '@material-ui/core'

import DateFnsUtils from '@date-io/date-fns';
import DateMomentUtils from '@date-io/moment';

import { addUserEvent, getUserEvent } from '../../Actions';

import './Popup.css';

const CurrentDayPopup = ({ onClick, startOfEvent, setOpenSnackAdd }) => {
  const dispatch = useDispatch();
  const startDayEvent = moment(startOfEvent).format('YYYY-MM-DD');
  const [startDate, setStartDate] = useState(startDayEvent);
  const [endDate, setEndDate] = useState(startDayEvent);
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
      'marginTop': '20px',
      'borderRadius': '10rem',
      'background': 'blue',
      'transition': '.2s',
      'cursor': 'pointer',
      'color': 'black',
      'font-weight':'600'
    },
    cancel: {
      'marginTop': '40px',
      'border': '1px solid red',
      'borderRadius': '10rem',
      'background': 'red',
      'transition': '.2s',
      'cursor': 'pointer',
      'color': 'black',
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
          <Button type='submit' style={styles.add} variant='contained'>Add event</Button>
          <Button type='reset' onClick={onClick} style={styles.cancel} variant='contained' color='secondary'>Cancel</Button>
        </form>
      </div>
    </div>
  )
}

export default CurrentDayPopup;
