import './Popup.css'
import { useDispatch } from 'react-redux'
import { addUserEvent } from '../../Actions';
const Popup = ({ onClick }) => {

    const dispatch = useDispatch()

    function sendEvent(){
        let inputStartDate = document.body.querySelector('.input1').value
        let inputEndDate = document.body.querySelector('.input2').value
        let inputText = document.body.querySelector('.text').value
        console.log(inputStartDate)
        console.log(inputEndDate)
        console.log(inputText)
       
        dispatch(addUserEvent(inputStartDate,inputEndDate,inputText))
    }
    return (
        <div className='main'>
            <div className='wrapper-popup' onClick={onClick}>
            </div>
            <div className="popup" >
                <input type='date' className='input1'></input>
                <input type='date' className='input2'></input>
                <input type='text' className='text' placeholder='Add event to date'></input>
                <button type='submit' onClick={()=>sendEvent()} className='add-btn'>Add event</button>
                <input type='reset' onClick={onClick} className='reset'></input>
            </div>
        </div>
    )
}

export default Popup