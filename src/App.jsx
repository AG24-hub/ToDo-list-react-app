import { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import Navbar from './Components/Navbar'
import {v4 as  uuidv4} from 'uuid'
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString  && todoString !== "undefined"){
      try{
        let savedtodos = JSON.parse(localStorage.getItem("todos"))
        setTodos(savedtodos)
      }
      catch(e){
        setTodos([]);
      }
    }
  }, [])

  const handleCheck = (e)=> {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id ===id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  }

  const handleChange = (e)=> {
    setTodo(e.target.value)
  }

  const handleAdd = ()=> {
    let newTodos = [...todos, {id: uuidv4(), todo, isCompleted: false}]
    setTodos(newTodos)
    saveToLS(newTodos)
    setTodo("")
  }

  const handleEdit = (e, id)=> {
    let t = todos.filter(i=> i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=> {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleDelete = (e, id)=> {
    let newTodos = todos.filter(item=> {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const saveToLS = (todos)=> {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  return (
    <>
      <Navbar/>
      <div className="w-[90%]  max-w-4xl mx-auto space-y-5">
          <div className="addTodo my-5 p-2 rounded-xl gap-2 flex flex-col items-center bg-emerald-300  w-full">
            <h2 className='text-lg font-bold'>Add a Todo</h2>
            <div className="input flex gap-4">
              <input name="todo.id" onChange={handleChange} value={todo} placeholder='Add task here' type="text" className='flex-1 min-w-0 sm:w-80 p-2 rounded-md'/>
              <button onClick={handleAdd} className='bg-teal-600 hover:bg-teal-800 p-1 rounded-md font-bold text-sm'>Save</button>
            </div>
          </div>

          <div className="container my-5 rounded-xl p-2 flex flex-col items-center bg-emerald-300 min-h-[80vh]  w-full">
            <h1 className='text-xl font-bold'>Your ToDos</h1>

            <div className="todos w-full">
              {todos.length===0 && <div className='m-5'>No todos to display</div>}
              {todos.map(item => {
                return <div key={item.id} className="todo my-3 pl-4 flex items-center gap-5 items-center w-full">
                          <input onChange={handleCheck} type="checkbox" checked={item.isCompleted} name= {item.id} />
                          <div className="flex-1 flex justify-between gap-3">
                              <div className= {`break-words whitespace-normal ${item.isCompleted?"line-through":""}`}>{item.todo}</div>
                              <div className="buttons w-[20%] flex gap-2 h-6">
                                <button onClick={(e) => {handleEdit(e, item.id)}} className='bg-teal-600 hover:bg-teal-800 p-1 rounded-md font-bold font-xl'><FaEdit /></button>
                                <button onClick={(e) => {handleDelete(e, item.id)}} className='bg-teal-600 hover:bg-teal-800 p-1 rounded-md font-bold font-xl'><MdDelete /></button>
                              </div>
                          </div>
                      </div> 
              })}
            </div>
          </div>
      </div>

      
    </>
  )
}

export default App
