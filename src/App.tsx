import { LogOut, Plus } from "lucide-react"
import "./App.css"
import { useState } from "react"
import AddStudent from "./components/AddStudent"
import { Students } from "./features/students/Students"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import LoginForm from "./components/Auth"
import { logout } from "./app/store"

const App = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await dispatch(logout());
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="w-full h-full flex items-center justify-center">
    <h1 className="text-2xl">Loading...</h1>
  </div>

  if (isLoggedIn) return (
    <div className="App">
      <div className="flex justify-around items-center w-full mt-12">
        <button onClick={handleLogout} className=" w-64 bottom-5 right-8 flex items-center justify-center rounded-xl self-end hover:bg-red-300 bg-red-500 px-3 py-1">
          <LogOut size={24} color="white" />
          <h4 className=" font-black m-2 text-zinc-50 text-xl">Logout</h4>
        </button>
        <h2 className="text-blue-500 font-black text-4xl">Admin Dashboard</h2>
        <button onClick={()=> setModalOpen(!modalOpen)} className=" w-64 bottom-5 right-8 flex items-center justify-center rounded-xl self-end hover:bg-blue-300 bg-blue-500 px-3 py-1">
          <Plus size={24} color="white" />
          <h4 className=" font-black m-2 text-zinc-50 text-xl">Add Student</h4>
        </button>
      </div>
      <div className=""></div>
      <Students />
      {modalOpen && <AddStudent modalOpen={modalOpen} setModalOpen={setModalOpen}  />}
    </div>
  );

  return <LoginForm />
}

export default App
