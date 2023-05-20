import React, {useState, useContext} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import classes from "./NoteEditor.module.css";
import { notesContext } from '../../context/context';


const NoteEditor = (props) => {
    const [, , , , , , , , , setShowNoteEditor] = useContext(notesContext);

    const checkingProps = () => {
        console.log(props);
    }

    return (
        <div className={classes.editor}>
            <h2> QuickNotes Note Editor Section </h2>
            <span className={classes.react__quill_container}>
                <ReactQuill className={classes.react__quill} theme="snow" />
            </span>
            <span className={classes.note__updating}>
                <span>
                    <h2>{props.noteEdited.title}</h2>
                    <p>{props.noteEdited.description}</p>
                </span>
                <button onClick={()=>setShowNoteEditor(false)}>Close Editor</button>
            </span>
        </div>
    )
}

export default NoteEditor;