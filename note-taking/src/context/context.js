import { createContext, useState } from "react";
import { db } from "../firebase_config";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export const notesContext = createContext();

const NotesProvider = (props) => {

    const [loginStatus, setLoginStatus] = useState(false);
    const [loginEmail, setLoginEmail] = useState("");
    const [notesFetched, setNotesFetched] = useState([]);
    const collectionRef = collection(db, "notes");

    const fetchNotes = async () => {
        const q = query(collection(db, "notes"), where("emailId", "==", "demo@gmail.com"));
        let notesList = [];
        
        getDocs(q)
        .then(value => {
            value.forEach((doc) => {
                // console.log(doc.id, "=? ", doc.data());
                let valueReceived = {};
                valueReceived[doc.id] = doc.data();
                // let data = doc.data();
                notesList.push(valueReceived);
                console.log("HERE");
            })
            // console.log("Notes list: ", notesList);
            setNotesFetched(notesList);
            // console.log("Notes fetched: ", notesFetched);
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
            setLoginEmail
        ]}>
            {props.children}
        </notesContext.Provider>
    );
}

export default NotesProvider;