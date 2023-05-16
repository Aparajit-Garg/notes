import { createContext, useState } from "react";
import { db } from "../firebase_config";
import { doc, collection, onSnapshot, addDoc } from "firebase/firestore";

export const notesContext = createContext();

const NotesProvider = (props) => {

    const [loginStatus, setLoginStatus] = useState(false);
    const [notesFetched, setNotesFetched] = useState([]);
    const collectionRef = collection(db, "notes");

    const fetchNotes = async () => {
        let noteList = [];
        db.collection("notes").where("emailId","==","demo@gmail.com").orderBy("updatedAt","desc").onSnapshot(snapshot=>{
            const notesdb=snapshot.docs.map(doc=>{return {...doc.data(),id:doc.id}})
           console.log(notesdb);
            // setNotes(notesdb);
            
        });
        console.log(noteList);
        // let notesData = [];
        // data.forEach(doc => {
        //     notesData.push(doc.data());
        // });

        // console.log("notes data: ", notesData);
        // setNotesFetched(notesData);
        // console.log(notesData);
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
            addNote
        ]}>
            {props.children}
        </notesContext.Provider>
    );
}

export default NotesProvider;