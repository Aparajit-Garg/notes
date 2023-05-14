import React, {useState} from 'react';
import classes from './Notes.module.css';
import { notesContext } from '../../context/context';

const Notes = () => {
    const [loginStatus, setLoginStatus] = useState(notesContext);

    function test() {
        console.log("loginStatus: ", loginStatus);
    }
    return (
        <div className={classes.top__level}>
            {loginStatus ? 
            <div className={classes.login__true}>
                <h1>Here</h1>
            </div>
            :
            <div className={classes.login__false}>
                <span>Sample Notes</span>
                <div className={classes.sample__notes}>

                </div>
            </div>}
        </div>
    );
}

export default Notes;