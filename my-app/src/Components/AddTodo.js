import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { relative } from 'upath';
class AddTodo extends React.Component{
  constructor(props){
    super(props)
    this.state = {myValue: '',
  items: []}

  }
 
  onTextHandler = (e) => this.setState({myValue: e.currentTarget.value})

    onBtnHandler = (e) => {
      let randomId = uuidv4()
      
        e.preventDefault()
        if(this.state.myValue === '')return;
        let inputF = document.getElementById('myInput').value
      const newItems = [...this.state.items]

      // объект с свойствами
      let obj = {text: inputF,id: randomId,checked:false}
      newItems.push(obj)
      this.setState({items: newItems}
    )
     
    }
    onCheck = (event) => { 
      const arrCheck = this.state.items.find(item=>
      item.id==event.currentTarget.parentElement.id)
      if(arrCheck.checked){
        arrCheck.checked =false
      }else{
        arrCheck.checked = true
      }

      // this.setState({
      //   checked: true
      // })
        // if(event.target.checked){
        //   this.setState({myValue: 'xxx'})
        // }
        
        console.log(arrCheck)
    }

    deleteItem = (event) => {
      const filteredItems= this.state.items.filter(item =>
        item.id!==event.currentTarget.parentElement.id);

      this.setState({
        items: filteredItems
      })
      
    }
    render(){

  return (
      
    <div>
     
        <input 
        type = 'text'
        onChange={this.onTextHandler}
        value = {this.state.myValue}
        placeholder = 'Your Text'
        id = "myInput" />
        <button onClick = {this.onBtnHandler}>
          Add Todo
        </button>
        
      {this.state.items.map((item) => { 
        
        return (<div key = {item.id} id = {item.id}>
        <input type = 'checkbox'
        onClick = {this.onCheck}/>
        <label>{item.text}</label>
        <button onClick={this.deleteItem}
 
        ><FontAwesomeIcon icon={faTrashAlt} /></button>

          
      </div>)
      })}
    </div>
  )
}
}

export default AddTodo