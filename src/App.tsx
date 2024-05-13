import { Plus } from "lucide-react"
import "./App.css"
import { useState } from "react"
import AddStudent from "./components/AddStudent"
import { Students } from "./features/students/Students"

const App = () => {

  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <div className="App">
      <header className="App-header">
        <h2 className="text-blue-500 font-black text-4xl">Admin Dashboard</h2>
      </header>
      <div className=" absolute w-full py-4 items-end justify-end flex">
        <button onClick={()=> setModalOpen(!modalOpen)} className=" relative bottom-5 right-8 flex items-center justify-center rounded-xl self-end hover:bg-blue-300 bg-blue-500 px-3 py-1">
          <Plus size={24} color="white" />
          <h4 className=" font-black my-2 text-zinc-50 text-xl">Add Student</h4>
        </button>
      </div>
      <Students />
      {modalOpen && <AddStudent modalOpen={modalOpen} setModalOpen={setModalOpen}  />}
    </div>
  )
}

export default App
