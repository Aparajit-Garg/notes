import { createContext, useState } from "react";
import { db } from "../firebase_config";
import { collection, getDocs, addDoc } from "firebase/firestore";

export const notesContext = createContext();

const NotesProvider = (props) => {

    const [loginStatus, setLoginStatus] = useState(false);
    const [notesFetch, setNotesFetch] = useState({});
    const collectionRef = collection(db, "notes");

    const fetchNotes = async () => {
        const data = await getDocs(collectionRef);
        console.log(data);
    }

    const addNote = async() => {
        await addDoc(collectionRef, {});
    }

    return (
        <notesContext.Provider value={[
            loginStatus,
            setLoginStatus,
            notesFetch,
            setNotesFetch,
            fetchNotes,
            addNote
        ]}>
            {props.children}
        </notesContext.Provider>
    );
}

export default NotesProvider;