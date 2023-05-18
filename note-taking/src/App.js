import classes from "./App.module.css";
import Home from "./components/Home/Home.js";
import NavBar from "./components/NavBar/NavBar.js";
import Login from "./components/Login/Login.js";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import NotesProvider from "./context/context.js";


function App() {
  return (
    <NotesProvider>
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} exact />
                <Route path="/login" element={<Login />} exact />
            </Routes>   
        </Router>
    </NotesProvider>
  );
}

export default App;
