import React, { useState } from "react";
import classes from "./NavBar.module.css";
import {Link} from "react-router-dom"; 
import { notesContext } from "../../context/context";


const NavBar = () => {
    const [loginStatus, setLoginStatus] = useState(notesContext);
    return (
        <div className={classes.main}>
            <div className={classes.title}>
                <Link style={{textDecoration:"none"}} to="/">
                    <h1>QuickNotes</h1>
                </Link>
            </div>
            <div className={classes.navigation}>
                <Link style={{textDecoration:"none"}}to="/">
                    <span>Home</span>
                </Link>
                <Link style={{textDecoration:"none"}} to="/login">
                    {/* <span>{loginStatus ? "Log Out" : "Sign In"}</span> */}
                    <span>Sign In</span>
                </Link>
            </div>
            
        </div>
    );
}

export default NavBar;