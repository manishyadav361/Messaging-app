import React,{useState} from "react";
import "./Login.css";
import {useHistory} from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import {auth,db} from "./Firebase";

function Login (){
  const history = useHistory();
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");

  const signupHandler  = (e) => {
   history.push("/signup");
  }
  const loginHandler = () => {
   auth.signInWithEmailAndPassword(email,password)
   .then((authUser) => {
     db.collection("users").doc(authUser.user.uid).set({
       email:authUser.user.email,
        uid:authUser.user.uid,
        displayName:authUser.user.displayName,
         photoURL:authUser.user.photoURL,
         status:"Heyy!I'm using messaging.",
         active:true
     })
     history.push("/");
console.log(authUser)
   }) 
   .catch(error => alert(error.message));
   setEmail("");
   setPassword("");
  }
  return(
    <div className="Login">
    <h3 className="head">Login</h3>
    <div className="email">
       <EmailIcon className="icon"/>
       <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter email.."/>
    </div>
    <div className="password">
       <LockIcon className="icon"/>
       <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter password.."/>
    </div>
    <div className="buttons">
    <button className="login-btn" onClick={loginHandler}> Login</button>
    <button className="signup-btn" onClick={signupHandler}>SignUp</button>
    </div>
    </div>
  );
}
export default Login;