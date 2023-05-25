import React, {useContext, useEffect} from 'react';
import classes from './Notes.module.css';
import { notesContext } from '../../context/context';
import TurnedIn from "@mui/icons-material/TurnedIn";
import TurnedInNot from "@mui/icons-material/TurnedInNot";
import { db } from '../../firebase_config';
import { doc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { removeHTMLTags } from '../../utility';


const Notes = (props) => {
    const [loginStatus, , notesFetched, ,fetchNotes, , , , , setShowNoteEditor, noteEditorValue,] = useContext(notesContext);

    useEffect(() => {
        fetchNotes();
        console.log("Notes fetched: ", notesFetched);
    }, [loginStatus, noteEditorValue]);


    const deleteNote = (event, key) => {   
        if (window.confirm("Do you want to delete this note ..?")) {
            deleteDoc(doc(db, "notes", key))
            .then(()=> fetchNotes())
            .catch((error) => console.log(error));
        }
        else
            console.log("denied");
    }

    const openEditor = (e, key, value) => {
        setShowNoteEditor(true);
        props.setNoteEdited({
            title: value.title,
            description: value.description,
            id: key
        });
    }

    const timestampConverted = (value) => {
        const fireBaseTime = new Date(
            value.seconds * 1000 + value.nanoseconds / 1000000,
        );
        const date = fireBaseTime.toDateString();
        const atTime = fireBaseTime.toLocaleTimeString();

        return date + " " + atTime;
    }

    const handleBookmark = (noteId, bookmarkStatus) => {
        console.log("Bookmark handle");
        updateDoc(doc(db, "notes", noteId), {
            bookmarked: !bookmarkStatus,
            lastUpdated: serverTimestamp()
        })
        .then(() => {
            fetchNotes();
            console.log("Note updated at server");
        })
        .catch((error) => alert("Problem updating note at firebase: ", error));
    }

    return (
        <div className={classes.top__level}>
            {loginStatus ? 
            <div className={classes.login__true}>
                <span>My Notes</span>
                <span>Pick a background color for notes</span>
                <input type="color" list="presetColors" value="#FFFF00"
                    onChange={(e)=>document.documentElement.style.setProperty('--notes-background-color', e.target.value)} />
                    <datalist id="presetColors">
                        <option>#FFFF00</option>
                        <option>#00ff00</option>
                        <option>#FFC0CB</option>
                        <option>#00FFFF</option>
                    </datalist>
                    
                <div className={classes.notes__fetched}>
                    {notesFetched?.map((note) => {
                        console.log("Single note: ", note);
                        let keys = Object.keys(note);
                        let value = Object.values(note);
                        console.log("Key=> ", keys);
                        console.log("Value=> ", value);
                        console.log(value[0].title);
                        return (
                            <div className={classes.single__note} key={keys[0]}>
                                <span>
                                    <h2>{value[0].title}</h2>
                                    {
                                        value[0].bookmarked ?
                                        <span style={{cursor:"pointer"}} onClick={()=>handleBookmark(keys[0], value[0].bookmarked)}>
                                            <TurnedIn style={{cursor: "pointer"}}/>
                                        </span> 
                                        :
                                        <span style={{cursor:"pointer"}} onClick={()=>handleBookmark(keys[0], value[0].bookmarked)}>
                                            <TurnedInNot />
                                        </span>
                                    }
                                    
                                </span>
                                <span> {removeHTMLTags(value[0].description)}</span>
                                <span className={classes.noteEdit__options}>
                                    {/* <button onClick={(e) => openEditor(e, )}> */}
                                    <button onClick={(e) => openEditor(e, keys[0], value[0])}>
                                        Open Editor
                                    </button>
                                    <button disabled={value[0].bookmarked} style={value[0].bookmarked ? {opacity: 0.2} : null} onClick={(e)=>deleteNote(e, keys[0])}>
                                        Delete this note
                                    </button>
                                </span>
                                <span>
                                    <span> 
                                        <strong> Last Updated at: </strong>
                                    </span>
                                    <span>
                                        {console.log(value[0].lastUpdated.seconds)}
                                        {timestampConverted(value[0].lastUpdated)} 
                                    </span>
                                </span>
                            </div>
                        );
                    })}
                </div>
                
            </div>
            :
            <div className={classes.login__false}>
                <h2>Sample Notes</h2>
                <div className={classes.sample__notes}>
                    <div className={classes.notes__card}>
                        <span>
                            <span>Title 1</span>
                            <TurnedInNot />
                        </span>
                        <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos culpa quidem, illo corporis earum minima nihil quasi temporibus recusandae rerum?
                        </span>
                        <span className={classes.__buttons}>
                            <button>Open Editor</button>
                            <button>Delete this note</button>
                        </span>
                        <span>
                            <span>Last updated at Time : </span>
                            <strong>Sign in to explore</strong>
                        </span>
                    </div>
                    <div className={classes.notes__card}>
                        <span>
                            <span>Sign In to get started</span>
                            <TurnedInNot />
                        </span>
                        <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos culpa quidem, illo corporis earum minima nihil quasi temporibus recusandae rerum?
                        </span>
                        <span className={classes.__buttons}>
                            <button>Open Editor</button>
                            <button>Delete this note</button>
                        </span>
                        <span>
                            <span>Last updated at Time : </span>
                            <strong>Sign in to explore</strong>
                        </span>
                    </div>
                    <div className={classes.notes__card}>
                        <span>
                            <span>Title 3</span>
                            <TurnedInNot />
                        </span>
                        <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos culpa quidem, illo corporis earum minima nihil quasi temporibus recusandae rerum?
                        </span>
                        <span className={classes.__buttons}>
                            <button>Open Editor</button>
                            <button>Delete this note</button>
                        </span>
                        <span>
                            <span>Last updated at Time : </span>
                            <strong>Sign in to explore</strong>
                        </span>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

export default Notes;