import React, {useContext, useState, useEffect} from "react";
import classes from "./Home.module.css";
import {Link} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import Notes from "../Notes/Notes";
import NoteEditor from "../NoteEditor/NoteEditor";
import 'react-toastify/dist/ReactToastify.css';
import { notesContext } from "../../context/context";
import {collection, addDoc, serverTimestamp} from "firebase/firestore";
import { db } from "../../firebase_config";


const Home = () => {

    const [loginStatus, setLoginStatus, , , fetchNotes, , loginEmail, setLoginEmail, showNoteEditor,] = useContext(notesContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [noteEdited, setNoteEdited] = useState({});
    
    useEffect(() => {
        let x = localStorage.getItem("user");
        // console.log("local storage value: ", x);
        if (x) {
            let found = JSON.parse(x);
            setLoginStatus(true);
            setLoginEmail(found["email"]);
            fetchNotes();
        }
        else
            console.log("Value not found");
    }, [loginStatus]);


    const createId = (length, chars) => {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }


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
                emailId: loginEmail,
                noteId: createId(20, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
            });

            fetchNotes();
            setTitle("");
            setDescription("");
        }
    }
    console.log("Login status at Home: ", loginStatus);

    return (
        <>
            <div className={classes.complete__page}>
                {
                    showNoteEditor ?
                    <NoteEditor noteEdited={noteEdited} setNoteEdited={setNoteEdited}/>
                    :
                    <div className={classes.main}>
                        <div className={classes.welcome_section}>
                            <span><h2>Welcome to QuickNotes</h2></span>
                            <span>Add and Save Notes</span>
                            <span>Use our Interactive Editor to make changes in realtime</span>
                            <span>Responsive Design, usable across devices of all sizes</span>
                            <span>Bookmark your Important Notes</span>
                            <span>Pick a Background Color for your notes</span>
                            <span style={{display: !loginStatus ? "block" : "none"}}>
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
                }
                    <Notes setNoteEdited={setNoteEdited} />
            </div>
            <ToastContainer />
        </>
    );
}

export default Home;