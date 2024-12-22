import Dropdown from './Components/Dropdown'
import List from './Structures/List'
import LinkedList from './Structures/LinkedList'
import BinaryTree from './Structures/BinaryTree/BinaryTree'
import './App.css'
import React, { useState } from 'react'
function App() {
    const [choice, setChoice] = useState<string>("List");
    const dict: { [key: string]: React.ReactNode} = {
      "List": <List/>,
      "Linked List": <LinkedList/>,
      "Binary Tree": <BinaryTree/>
    };
    return (
      <div className='app'>
        <Dropdown list={Object.keys(dict)} head={choice} handleClick={(element)=>setChoice(element)}/>
        <div className="page-content">{dict[choice]}</div>
      </div>
    )
  
}

export default App
