import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function WelcomePage() {

    const { user } = useContext(UserContext)
    
    return (
        <>
            <h1>Welcome {user?.firstname}</h1>
        </>
    )
}