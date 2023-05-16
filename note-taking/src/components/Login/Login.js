import React, {useContext, useState} from "react";
import classes from "./Login.module.css";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase_config";
import {notesContext} from "../../context/context";
import {useNavigate} from "react-router-dom";


const Login = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [signIn, setToggleSignIn] = useState(false);
    const [loginStatus, setLoginStatus, ] = useContext(notesContext);
    const [requiredNotes, setRequiredNotes] = useState({});
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userName);
        console.log("password: ", password);
        console.log(signIn);
        if (signIn)
            loginUser();
        else
            createUser();

    }

    const createUser = () => {
        createUserWithEmailAndPassword(auth, userName, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            setLoginStatus(true);
            navigate("/");
            localStorage.setItem("user", user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
            setLoginStatus(false);
            // ..
        });
    }


    const loginUser = async () => {
        signInWithEmailAndPassword(auth, userName, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            setLoginStatus(true);
            navigate("/");
            localStorage.setItem("user", JSON.stringify(user));
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
            setLoginStatus(false);
        });
    }

    const logOutHandler = () => {
        console.log(typeof(loginStatus));
        setLoginStatus(false);
        console.log(loginStatus);
        navigate("/");
        localStorage.removeItem("user");
    }

    return (
        <div className={classes.header}>
            {loginStatus ?
                <div className={classes.logout__section}>
                    <p>You are now logged in !</p>
                    <span>
                        <button onClick={(e) => navigate("/")}> Go To Home </button>
                        <button onClick={logOutHandler}> Log Out </button>
                    </span>
                    
                </div>
                :
                <div className={classes.main}>
                    <form onSubmit={handleSubmit}>
                        <label>Username</label>
                        <input type="text" placeholder="Enter username" onChange={(e)=> setUserName(e.target.value)} value={userName} />
                        <label>Password</label>
                        <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}></input>
                        <button type="submit"> {signIn ? "Sign In" : "Sign Up"} </button>
                    </form>
                    <div className={classes.signUp}>
                        <p>Have an account ?</p>
                        <button onClick={()=> setToggleSignIn(!signIn)}>{signIn ? "Sign Up" : "Sign In"}</button>
                    </div>
                    <p className={classes.demo}>( Demo credentials - user: demo@gmail.com | password: 123456 )</p>
                </div>
            }
        </div>
    );
}

export default Login;