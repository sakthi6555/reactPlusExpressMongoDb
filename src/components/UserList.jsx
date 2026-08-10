import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';

export default function UserList( { users, remove}) {

    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const edit = async (user) => {
        navigate(`/users/${user._id}`)
    }

    const add = () => {
        navigate(`/users`)
    }

    return(
        <div>
            <Box sx={{display: "flex", justifyContent: "flex-end", m: 2}}>
                <Button variant="contained" onClick={add} startIcon={<AddIcon/>}>Add</Button>
            </Box>
            <Box sx={{m: 2}}>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                    )?.map(user => (
                        <TableRow key={user._id}>    
                            <TableCell>{user.firstname}</TableCell>
                            <TableCell>{user.lastname}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.age}</TableCell>
                            <TableCell>{ user.gender ? user.gender?.charAt(0).toUpperCase() + user.gender?.slice(1): ''}</TableCell>
                            <TableCell>
                                <IconButton
                                    color="primary"
                                    onClick={() => edit(user)}
                                    aria-label="edit"
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    color="error"
                                    onClick={() => remove(user._id)}
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                 <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={users.length}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                        />
                    </TableRow>
                </TableFooter>
                </Table>
            </TableContainer>
            </Box>
       </div>
    )
}