import { useState } from 'react'
import {data} from './data'
import './App.css'

function App() {
  const [leftItems, setLeftItems] = useState(data)
  const [rightItems,setRightItems] = useState([])
  

  function checked(list,item){
    const newList=list.map((it)=>{
      if(it.id===item.id){
        return {...it,checked:!it.checked}
      }
      else{
        return it
      }
    })
    return newList
  }

  function handleClick(item,direction){
    let checkedList;
    if(direction==="LEFT"){
      const copyList=[...leftItems]
      checkedList=checked(copyList,item)
      setLeftItems(checkedList)
    }
    else{
      const copyList=[...rightItems]
      checkedList=checked(copyList,item)
      setRightItems(checkedList)
    }
  }

  function resetItems(list){
    const newList=list.map((item)=>{
      // if(item.checked){
      //   return{...item,checked:!item.checked}
      // }
      // else{
      //   return item
      // }
      return {...item,checked:false}
    })
    return newList
  }

  function handleTransfer(dir){
    if(dir==='LEFT_TO_RIGHT'){
      const copyList=[...leftItems]
      const checkedListt=copyList.filter((item)=>item.checked)
      const uncheckedList=copyList.filter((item)=>!item.checked)
      setLeftItems(uncheckedList)
      setRightItems((prev)=>(resetItems([...prev,...checkedListt])))


    }
    else{
      const copyList=[...rightItems]
      const checkedListt=copyList.filter((item)=>item.checked)
      const uncheckedList=copyList.filter((item)=>!item.checked)
      setRightItems(uncheckedList)
      setLeftItems((prev)=>(resetItems([...prev,...checkedListt])))

    }
  }

  return (
    <div className='App'>
      <h1>Transfer List</h1>
      <div className='container'>
        <div className='box'>
          {leftItems.map((item)=>(
            <div key={item.id} className={`item ${item.checked?'checked':''}`} id={item.id}
            onClick={()=>handleClick(item,'LEFT')}
            >
              {item.title}
            </div>
          ))}
        </div> 

        <div className='actions'>
          <button onClick={()=>handleTransfer('RIGHT_TO_LEFT')}>Left</button>
          <button onClick={()=>handleTransfer('LEFT_TO_RIGHT')}>Right</button>
        </div>

        <div className='box'>
        {rightItems.map((item)=>(
            <div key={item.id} className={`item ${item.checked?'checked':''}`} id={item.id}
            onClick={()=>handleClick(item,'RIGHT')}
            >
              {item.title}
            </div>
          ))}
        </div>


      </div>
      
    </div>
  )
}

export default App
