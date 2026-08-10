import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../services/userService";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { userSchema } from "../schemas/userFormScheme";
import { useForm, Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import WelcomePage from "./WelcomePage";
import { UserContext } from "../context/UserContext";

export default function UserForm({saveUser, edituser}) {

    const navigate = useNavigate();
    const { id } = useParams();

    const { setUser } = useContext(UserContext);

    const {register, control, handleSubmit,  reset, formState: { errors }} = useForm({
        resolver: zodResolver(userSchema), 
        defaultValues: {
            firstname: '',
            lastname: '',
            age: '',
            email: '',
            gender: ''
        }
    })

    const onSubmit =(data) => {
        saveUser({
            ...data, ...(id && { _id : id })
        })
        reset()
        navigate('/')
    }

    useEffect(() => {
        if(id) {
            loadUserById(id)
        }
    }, [id])

    const loadUserById = async (id) => {
        const {data} = await getUserById(id)
        setUser(data);
        reset({
            firstname: data?.firstname ?? '',
            lastname: data?.lastname ?? '',
            email: data?.email ?? '',
            age: data?.age ?? '',
            gender: data?.gender ?? '',
        })
    }

    const back = () => {
        navigate('/')
    }

    return(
        <Box>
            <WelcomePage></WelcomePage>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, m: 2, maxWidth: 400 }}
            >
                <TextField
                    label="First name"
                    {...register("firstname")}
                    error= {!!errors.firstname}
                    helperText = {errors.firstname?.message}
                    fullWidth
                />
                <TextField
                    label="Last name"
                    {...register("lastname")}
                    error= {!!errors.lastname}
                    helperText = {errors.lastname?.message}
                    fullWidth
                />
                <TextField
                    label="Email"
                    {...register("email")}
                    error= {!!errors.email}
                    helperText = {errors.email?.message}
                    fullWidth
                />
                <TextField
                    label="Age"
                    {...register("age")}
                    error= {!!errors.age}
                    helperText = {errors.age?.message}
                    fullWidth
                />
                <FormControl variant="outlined" sx={{ minWidth: 120 }} error={!!errors.gender}>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Controller control={control} name="gender"
                    render={({field}) => {
                        return (<Select
                        {...field}
                        labelId="gender-label"
                        label="Age"
                        >
                        <MenuItem value='male'>Male</MenuItem>
                        <MenuItem value={'female'}>Female</MenuItem>
                        </Select>)
                    }}>
                    </Controller>
                    <FormHelperText>
                        {errors?.message?.gender}
                    </FormHelperText>
                </FormControl>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        {id ? 'Update' : 'Save'}
                    </Button>

                    <Button
                        type="button"
                        variant="outlined"
                        onClick={back}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}