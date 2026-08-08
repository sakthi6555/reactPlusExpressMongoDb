import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../services/userService";

export default function UserForm({saveUser, edituser}) {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge]= useState('');
    const [_id, setId]= useState('');
    const navigate = useNavigate();

    const { id } = useParams();

    const handleSubmit =(e) => {
        e.preventDefault();
        console.log("ee")
        saveUser({
            firstname, lastname, email, age, _id
        })
        setFirstname('');
        setLastname('');
        setEmail('');
        setAge('');
        navigate('/')
    }

    useEffect(() => {
        if(id) {
            loadUserById(id)
        }
    }, [id])

    const loadUserById = async (id) => {
        const {data} = await getUserById(id)
        setFirstname(data?.firstname ?? '');
        setLastname(data?.lastname ?? '');
        setEmail(data?.email ?? '');
        setAge(data?.age ?? '');
        setId(data?._id ?? '');

    }

    const back = () => {
        
        navigate('/')
    }

    return(
        <div className="user-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First name</label> <br/>
                    <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                </div>
                <div>
                    <label>Last name: </label> <br/>
                    <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                </div>
                <div>
                    <label>Email: </label> <br/>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Age: </label> <br/>
                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <button type="submit"> { id ? 'Update': 'Save'}</button>
                <button type="button" onClick={back}> Cancel</button>
            </form>
        </div>
    )
}