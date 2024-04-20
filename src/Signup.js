import React,{useState} from "react";
import "./Signup.css";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import ImageIcon from "@material-ui/icons/Image";
import {useHistory} from "react-router-dom";
import {auth} from "./Firebase";

function Signup() {
  const history = useHistory();
  const[username,setUsername] = useState("");
  const[image,setImage] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");

  const signupHandler = (e) => {
  
    e.preventDefault();
     auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
       authUser.user.updateProfile({
         displayName:username,
         photoURL:image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwMKPcXIZXJXxuZUMrfb2nQYkMj3D2ZnCqFuABa3IBIyZ8QQaEZfSqYGdR&s=10"
       })
      history.goBack();
    })
    .catch((error) => alert(error.message));
    setEmail("");
    setPassword("");
    setImage("");
    setUsername("");
  }
  return(
    <div className="Signup Login">
      <h3>SignUp</h3>
      <form>
      <div className="signup-username email">
         <PersonIcon className="icon"/>
         <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Enter username..." />
      </div>
      <div className="signup-image email">
        <ImageIcon className="icon"/>
        <input type="text" onChange={(e) => setImage(e.target.value)} value={image} placeholder="Enter image url..." />
      </div>
      <div className="email">
         <EmailIcon className="icon" />
         <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter email..." />
      </div>
      <div className="password">
         <LockIcon className="icon" />
         <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter password..." />
      </div>
      <button type="submit" className="login-btn" onClick={signupHandler}>SignUp</button>
    </form>
    </div>
  );
}
export default Signup;