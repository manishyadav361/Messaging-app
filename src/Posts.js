import React,{useState,useEffect} from "react";
import "./Posts.css";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import EmailIcon from "@material-ui/icons/Email";
import ImageIcon from "@material-ui/icons/Image";
import Post from "./Post";

import {auth,db} from "./Firebase";
import firebase from "firebase";
function Posts ({  chats , posts }) {
   const [message,setMessage] = useState("");
   const [image,setImage] = useState("");
   const[toggle,setToggle] = useState(true);
   const currentUser = auth?.currentUser;


   
   const addPost = (e) => {
        e.preventDefault();
        if(message !== ""){
           db.collection("posts").add({
                 email:currentUser?.email,
                 uid:currentUser?.uid,
                 avatar:currentUser?.photoURL,
                 name:currentUser.displayName,
                 text:message,
                 image:image,
                 likes:0,
                 timestamp:firebase.firestore.FieldValue.serverTimestamp()
           })
        setMessage("");
        setImage("");
      }
   }
   return(
     <div className="Posts">
        <div className={toggle?"up post":"down post"}>
           <div className="message">
              <EmailIcon className="icon"/>
           <input className="mess-ipt" onChange={e => setMessage(e.target.value)}  value={message} type="text" placeholder="Enter message..."/>
           </div>
           <div className="post-image">
              <ImageIcon className="icon"/>
            <input type="text" onChange={e => setImage(e.target.value)} value={image} placeholder="Enter image url..." />
            </div>
            <button type="submit" onClick={addPost} className="post-btn login-btn">Post</button>  
            {!toggle  && <KeyboardArrowDownIcon className="arrow-down"  onClick={() => {setToggle(true)}} />}
            {toggle && <KeyboardArrowUpIcon className="arrow-up" onClick={() => {setToggle(false)}}/>}
       </div>
       <div className="post-collection">
       {
           posts?.map(post => (
               <Post name={post?.name} uid={post.uid} avatar={post.avatar} image={post.image} text={post.text} time={post.timestamp} likes={post.likes} /> 
           ))
       }
         </div>
     </div>
   )
}
export default Posts;