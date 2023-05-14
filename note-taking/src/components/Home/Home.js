import React from "react";
import classes from "./Home.module.css";
import {Link} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import Notes from "../Notes/Notes";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    const submitHandler = (event) => {
        event.preventDefault();

        toast.warning("Please login first");
    }


    return (
        <>
            <div className={classes.complete__page}>
                <div className={classes.main}>
                    <div className={classes.welcome_section}>
                        <span><h2>Welcome to QuickNotes</h2></span>
                        <span>Add and Save Notes</span>
                        <span>Use our Interactive Editor to make changes in realtime</span>
                        <span>Responsive Design, usable across devices of all sizes</span>
                        <span>Bookmark your Important Notes</span>
                        <span>Pick a Background Color for your notes</span>
                        <span>
                            <Link to="/login" style={{textDecoration:'none', color:'black', fontWeight:'bold'}}>
                                Sign In to Get Started
                            </Link>
                        </span>
                    </div>

                    <div className={classes.note_add}>
                        <span>Create New Note</span>
                        <form onSubmit={submitHandler}>
                            <input className={classes.title} disabled type="text" placeholder="Add Title"></input>
                            <input disabled className={classes.description} type="text" placeholder="Write something"></input>
                            <button type="submit">Save Note</button>
                        </form>
                        
                    </div>            
                </div>
                    <Notes />
                </div>
            <ToastContainer />
        </>
    );
}

export default Home;