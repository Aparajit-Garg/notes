import React, {useState} from "react";
import classes from "./Login.module.css";

const Login = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [signIn, setToggleSignIn] = useState(true);


    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const updateUsername = (event) => {
        setUserName(event.target.value);
    }
    return (
        // <div className={classes.header}>
        <>
            <div className={classes.main}>
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input type="text" placeholder="Enter username" onChange={updateUsername} value={userName} />
                    <label>Password</label>
                    {/* <input type="password" placeholder="Enter password" onKeyDown={(e) => setPassword(e.target.value)}></input> */}
                    <button type="submit"> {signIn ? "Sign In" : "Sign Up" }</button>
                </form>
                {/* <div className={classes.signUp}>
                    <p>Don't have an account?</p>
                    <button>Sign Up</button>
                </div>
                <p>( Demo credentials - user: demo@gmail.com | password: 123456 )</p> */}
            </div>
        </>
    );
}

export default Login;