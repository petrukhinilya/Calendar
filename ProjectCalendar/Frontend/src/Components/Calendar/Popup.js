import React,
{ useState } from 'react'
import './Popup.css'
import { useDispatch } from 'react-redux'
import { addUserEvent } from '../../Actions';
const Popup = ({ onClick }) => {

    const dispatch = useDispatch()

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [text, setText] = useState('')

    const sendEvent = (e) => {
        e.preventDefault()

        const { target: { children: {
            startDate: { value: startDate },
            endDate: { value: endDate },
            text: { value: text },
        } } } = e

        dispatch(addUserEvent(startDate, endDate, text))
    }

    const onChange = (event) => {
        const { target: { name, value } } = event

        switch (name) {
            case 'startDate':
                setStartDate(value)
                break
            case 'endDate':
                setEndDate(value)
                break
            case 'text':
                setText(value)
                break
            default:
                break
        }
    }

    return (
        <div className='main'>
            <div className='wrapper-popup' onClick={onClick}>
            </div>
            <div>
                <form className="popup" onSubmit={sendEvent}>
                    <input type='date' className='input1' onChange={onChange} value={startDate} name="startDate"></input>
                    <input type='date' className='input2' onChange={onChange} value={endDate} name="endDate"></input>
                    <input type='text' className='text' placeholder='Add event to date' onChange={onChange} value={text} name="text"></input>
                    <button type='submit' className='add-btn'>Add event</button>
                    <input type='reset' onClick={onClick} className='reset'></input>
                </form>
            </div>
        </div>
    )
}

export default Popup