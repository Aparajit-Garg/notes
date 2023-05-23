import React, {useState, useContext, useEffect} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import classes from "./NoteEditor.module.css";
import { notesContext } from '../../context/context';
import parse from 'html-react-parser';
import { useDebounce } from '../../utility';
import { updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase_config';


const NoteEditor = (props) => {
    const [, , , , , , , , , setShowNoteEditor] = useContext(notesContext);
    const [descriptionLocal, setDescriptionLocal] = useState("");
    const [noteId, setNoteId] = useState("");

    useEffect(() => {
        setDescriptionLocal(props.noteEdited.description);
        setNoteId(props.noteEdited.id);
    }, [noteId]);


    const updatedDebounce = useDebounce(descriptionLocal, 1500);
    
    useEffect(() => {
        if (updatedDebounce) {
            console.log("Came inside");
            updateDoc(doc(db, "notes", noteId), {
                description: descriptionLocal,
                lastUpdated: serverTimestamp()
            })
            .then(() => console.log("Note updated at server"))
            .catch((error) => alert("Problem updating note at firebase: ", error));
        }
    }, [updatedDebounce]);


    return (
        <div className={classes.editor}>
            <h2> QuickNotes Note Editor Section </h2>
            <span className={classes.react__quill_container}>
                <ReactQuill className={classes.react__quill} value={descriptionLocal || ''} onChange={(value) => setDescriptionLocal(value)} theme="snow"></ReactQuill>
            </span>
            <span className={classes.note__updating}>
                <span>
                    <h2>{props.noteEdited.title}</h2>
                    {/* <div>dangerouslySetInnerHTML={{ __html: descriptionLocal }}</div> */}
                    <p style={{wordWrap:"break-word"}}> {parse(`${descriptionLocal}`)} </p>
                </span>
                <button onClick={()=>setShowNoteEditor(false)}>Close Editor</button>
            </span>
        </div>
    )
}

export default NoteEditor;