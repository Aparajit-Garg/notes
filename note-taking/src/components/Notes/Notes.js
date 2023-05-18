import React, {useContext, useEffect, useState} from 'react';
import classes from './Notes.module.css';
import { notesContext } from '../../context/context';
import TurnedIn from "@mui/icons-material/TurnedIn";
import TurnedInNot from "@mui/icons-material/TurnedInNot";
import { db } from '../../firebase_config';


const Notes = () => {
    const [loginStatus, setLoginStatus, notesFetched,,fetchNotes,] = useContext(notesContext);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchNotes();
        console.log("Notes fetched: ", notesFetched);
        // console.log(info);
    }, [loginStatus]);
    return (
        <div className={classes.top__level}>
            {loginStatus ? 
            <div className={classes.login__true}>
                <span>My Notes</span>
                <span>Pick a background color for notes</span>
                <input type="color" list="presetColors" />
                <div className={classes.notes__fetched}>
                    {notesFetched?.map((note) => {
                        console.log("Single note: ", note);
                        let key = Object.keys(note);
                        let value = Object.values(note);
                        console.log("Key=> ", key);
                        console.log("Value=> ", value);
                        console.log(value[0].title);
                        return (
                            <div className={classes.single__note} key={note.id}>
                                <span>
                                    <h2>{value[0].title}</h2>
                                    <TurnedInNot />
                                </span>
                                <span> {value[0].description}</span>
                                <span className={classes.noteEdit__options}>
                                    <button>
                                        Open Editor
                                    </button>
                                    <button>
                                        Delete this note
                                    </button>
                                </span>
                                <span> Last Updated at: {value[0].lastUpdated.toDate()}</span>
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