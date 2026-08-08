import axios from "axios";
import { use } from "react";

const API = "http://localhost:5001/api/users";

export const getUser = () => axios.get(API);

export const getUserById = (id) => axios.get(`${API}/${id}`)

export const addUser = (user) => axios.post(API, user);

export const updateUser =(id, user) => axios.put(`${API}/${id}`, user)

export const deleteUser = (id) => axios.delete(`${API}/${id}`)