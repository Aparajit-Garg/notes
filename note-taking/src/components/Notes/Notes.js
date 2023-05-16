import React, {useContext, useEffect, useState} from 'react';
import classes from './Notes.module.css';
import { notesContext } from '../../context/context';
import TurnedIn from "@mui/icons-material/TurnedIn";
import TurnedInNot from "@mui/icons-material/TurnedInNot";
import { db } from '../../firebase_config';


const Notes = () => {
    const [loginStatus, setLoginStatus, ,,fetchNotes,] = useContext(notesContext);
    const [info, setInfo] = useState([]);

    const Fetchdata = ()=>{
        db.collection("data").get().then((querySnapshot) => {
            
            // Loop through the data and store
            // it in array to display
            querySnapshot.forEach(element => {
                var data = element.data();
                console.log(data);
                setInfo(arr => [...arr , data]);
                 
            });
        })
    }


    useEffect(() => {
        fetchNotes();
        // console.log(info);
    }, []);
    return (
        <div className={classes.top__level}>
            {loginStatus ? 
            <div className={classes.login__true}>
                <span>My Notes</span>
                <span>Pick a background color for notes</span>
                <input type="color" list="presetColors" />
                <></>
                <span>

                </span>
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
            </div>}
        </div>
    );
}

export default Notes;