import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function UserList( { users, remove}) {

    // const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    const edit = async (user) => {
        navigate(`/users/${user._id}`)
    }

    const add = () => {
        navigate(`/users`)
    }

    return(
        <div>
            <div>
                <button onClick={add}>Add</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => (
                        <tr key={user._id}>    
                            <th>{user.firstname}</th>
                            <th>{user.lastname}</th>
                            <th>{user.email}</th>
                            <th>{user.age}</th>
                            <th>
                                <button onClick={()=> edit(user)}>Edit</button>
                                <button onClick={()=> remove(user._id)}>Delete</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
       </div>
    )
}