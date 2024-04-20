import React,{useState} from "react";
import {Avatar } from "@material-ui/core";
import "./Profile.css";

function Profile ({user}){

   const [username,setUsername] = useState(user?.displayName);
   
   return(
   <div className="Profile">
   <div className="info" >
    <Avatar src={user.photoURL} className="avatar"/><span>active</span>
   <div className="name">
       <h3>Username</h3>
       <input type="text" value={username} />
    </div>
    <div className="image">
     <h3>ImageURL</h3>
     <input  type="text"  value={user?.photoURL} />
    </div>
    <div className="buttons">
    <button className="signup-btn">Edit</button>
    <button className="update login-btn">Update</button>
 </div> 
    </div>
   </div>
  );
}
export default Profile;