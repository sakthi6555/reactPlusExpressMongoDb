import { useEffect, useState } from 'react'
import viteLogo from './assets/vite.svg'
import './App.css'
import UserForm from './components/UserForm'
import UserList from './components/UserList'

import { getUser, addUser, updateUser, deleteUser } from './services/userService'
import { create } from 'axios';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  const [users, setUsers] = useState([]);
  const [edituser, setEdituser] = useState(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers =  async () => {
    const users = await getUser()
    console.log("users from API:", users);
    console.log("is array:", Array.isArray(users));

    setUsers(users.data)
  }

  const saveUser = async (user) => {
    if(user._id){
      await updateUser(user['_id'], user)
      setEdituser(null)
    } else {
      await addUser(user)
      setEdituser(null)
    }
      loadUsers()
  }

  // const edit = (user) => {
  //   console.log(user)
  //   setEdituser(user)
  // }

  const remove = async (id) => {
    console.log(id)
    await deleteUser(id)
    loadUsers()
  }

  return (
    <Router>
      <Routes>
        {/* <Route path='/users/:id' element={<UserForm saveUser={saveUser} edituser={edituser}></UserForm>}>
        </Route>
        <Route path='/users' element={<UserForm saveUser={saveUser} edituser={edituser}></UserForm>}>
        </Route> */}


        <Route path='/users/:id' element={<UserForm saveUser={saveUser} ></UserForm>}>
        </Route>
        <Route path='/users' element={<UserForm saveUser={saveUser}></UserForm>}>
        </Route>
        <Route path='/' element={<UserList users = {users} remove = {remove}></UserList>}>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
