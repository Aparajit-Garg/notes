import Home from "./components/Home/Home.js";
import NavBar from "./components/NavBar/NavBar.js";
import Login from "./components/Login/Login.js";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";


function App() {
  return (
    <Router>
        <NavBar />
        <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Login />} exact />
        </Routes>   
    </Router>
  );
}

export default App;
