import AddTodo from './Components/AddTodo';
import './App.css';
import React from 'react'

function App(){
  return (
    <div className="App">
      <header className="App-header">
      <AddTodo />
      {/* onFormSubmit={this.onBtnHandler} */}

      </header>
    </div>
  );
}

export default App;
