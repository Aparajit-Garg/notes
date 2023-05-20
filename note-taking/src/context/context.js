import { createContext, useState } from "react";
import { db } from "../firebase_config";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export const notesContext = createContext();

const NotesProvider = (props) => {

    const [loginStatus, setLoginStatus] = useState(false);
    const [loginEmail, setLoginEmail] = useState("");
    const [notesFetched, setNotesFetched] = useState([]);
    const [showNoteEditor, setShowNoteEditor] = useState([false]);
    const [noteEditorValue, setNoteEditorValue] = useState("");
    const collectionRef = collection(db, "notes");

    const fetchNotes = async () => {
        const q = query(collection(db, "notes"), where("emailId", "==", loginEmail));
        let notesList = [];
        
        getDocs(q)
        .then(value => {
            value.forEach((doc) => {
                let valueReceived = {};
                valueReceived[doc.id] = doc.data();
                notesList.push(valueReceived);
            })
            setNotesFetched(notesList);
        })
    }

    const addNote = async() => {
        await addDoc(collectionRef, {});
    }

    return (
        <notesContext.Provider value={[
            loginStatus,
            setLoginStatus,
            notesFetched,
            setNotesFetched,
            fetchNotes,
            addNote,
            loginEmail,
            setLoginEmail,
            showNoteEditor,
            setShowNoteEditor,
            noteEditorValue,
            setNoteEditorValue
        ]}>
            {props.children}
        </notesContext.Provider>
    );
}

export default NotesProvider;