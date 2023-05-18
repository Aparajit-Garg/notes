import React, {useContext, useState} from "react";
import classes from "./Home.module.css";
import {Link} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import Notes from "../Notes/Notes";
import 'react-toastify/dist/ReactToastify.css';
import { notesContext } from "../../context/context";
import {collection, addDoc, serverTimestamp} from "firebase/firestore";
import { db } from "../../firebase_config";


const Home = () => {

    const [loginStatus, setLoginStatus, , , fetchNotes, , loginEmail, ] = useContext(notesContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const submitHandler = async (event) => {
        event.preventDefault();
        if (!loginStatus)
            toast.warning("Please login first");
        else {
            const response = await addDoc(collection(db, "notes"), {
                title: title,
                description: description,
                createdAt: serverTimestamp(),
                lastUpdated: serverTimestamp(),
                bookmarked: false,
                emailId: loginEmail
            });
            console.log("Status of adding new doc: ", response);
            fetchNotes();
            setTitle("");
            setDescription("");
        }
    }
    console.log("Login status at Home: ", loginStatus);

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
                            <input className={classes.title} type="text" placeholder="Add Title" disabled={!loginStatus} onChange={(e) => 
                            setTitle(e.target.value)} value={title}></input>
                            <input disabled={!loginStatus} className={classes.description} type="text" placeholder="Write something" value={description}
                            onChange={(e) => setDescription(e.target.value)}></input>
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