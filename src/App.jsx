import { useEffect, useState } from "react";
import Navbar from "./Component/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showFinish,setShowFinshed] = useState(true);
 
 
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
   
    if (todoString) {
      const storedTodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(storedTodos);
    }
  }, []);

  
  const togglefinish =(e) =>{
    setShowFinshed(!showFinish);
  }


  const handleAdd = () => {
    if (editingId) {
      setTodos(
        todos.map((item) => (item.id === editingId ? { ...item, todo } : item))
      );
      setEditingId(null);
    } else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }
    setTodo("");
  };

  const handleEdit = (id) => {
    const itemToEdit = todos.find((item) => item.id === id);
    setTodo(itemToEdit.todo);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container-lg md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh] md:w-[35%]">
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="font-bold text-center text-2xl ">iTask - Manage your todos in One Place</h2>
          <h2 className="text-lg font-bold">Add Todo</h2>
         <div className="flex">
         <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-[80%] rounded-full px-5 py-1 "
          />
          <button
            onClick={handleAdd} disabled={todo.length<=3}
            className="bg-violet-800 hover:bg-violet-950 mx-2 text-white font-bold text-sm rounded-full p-4 py-2" 
          >
            {editingId ? "Update" : "Save"}
          </button>
         </div>
        </div>
        <input onChange={togglefinish} type="checkbox" checked={showFinish} /> Show Finished
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-lg font-bold">Your Todo-list</h2>
        <div className="todos">
          {todos.length === 0 && <div>No Todos to display</div>}
         
          {todos.map((item) => (
         
         (showFinish || !item.isCompleted)&&<div key={item.id} className="todo flex  my-3 justify-between">
              <div className="flex gap-5">
                <input
                  name={item.id}
                  onChange={handleCheckBox}
                  type="checkbox"
                  checked={item.isCompleted}
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>
              <div className="buttons flex h-full">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-violet-800 hover:bg-violet-950 text-white font-bold text-sm rounded-md p-3 py-1"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-violet-800 hover:bg-violet-950 text-white font-bold text-sm rounded-md p-3 py-1 ml-2"
                >
                 <MdDeleteSweep />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
