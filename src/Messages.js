import React ,{useState,useEffect} from "react";
import {useStateValue} from "./StateProvider";
import {Avatar} from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import VideocamIcon from "@material-ui/icons/Videocam";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SendIcon from "@material-ui/icons/Send";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {db,auth} from "./Firebase";
import firebase from "firebase";
import "./Messages.css";
import ReactScrollableFeed from "react-scrollable-feed";
function Messages ({ toggle,setToggle }){
   const[{user}] = useStateValue();
   const[input,setInput] = useState("");
   const[messages,setMessages] = useState([]);

   const currentUser = auth.currentUser;

   useEffect(async () => {
      setMessages([]);
    await db.collection("users").doc(currentUser?.uid).collection("Messages").doc(user?.uid).collection("message").orderBy("timestamp").onSnapshot((snapshot) => {
      snapshot.docs.map(doc => console.log(doc.data()))
        setMessages(snapshot.docs.map(doc => doc.data()));
     })
   },[user])


   const setChat = async () => {
      if(input !== ""){
        await db.collection("users").doc(currentUser?.uid).collection("Messages").doc(user?.uid).collection("message").add({
          text:input,
          email:currentUser.email,
          timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        await db.collection("users").doc(user?.uid).collection("Messages").doc(currentUser?.uid).collection("message").add({
           text:input,
           email:currentUser.email,
           timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");
      }
   
   }
   const route = () => {
        toggle?setToggle(false):setToggle(true);
        
   }
   return(
     <div className={toggle?"remove Messages":"add Messages"}>
     
        <h3 className="head">Messages</h3>
      
   <div className="user-head">
   <ArrowBackIcon onClick={route}/>
           {user && <Avatar className="chat-icon" src={user?.photo} />}
           <h3>{user?.displayName}</h3>
           <CallIcon className="icon"/>
           <VideocamIcon className="icon" />
           <MoreVertIcon className="icon" />
   </div> 
   <div className="user-messages">
        <ReactScrollableFeed>
        {user && messages.map(message => (
           <>
           {message.email === currentUser.email?
           <div className="sender">

   <p>{message.text}</p>
   <Avatar className="send-photo" src={currentUser?.photoURL} />
   </div>:
   <div className="reciever">
      <Avatar className="recieve-photo" src={user?.photo} />
       <p>{message.text}</p>
   </div>
}
   </>
))}
</ReactScrollableFeed>
        </div>
        <div className="input-container">
            <input type="text" onChange={(e) => setInput(e.target.value)} value={input} placeholder="Enter message..." className="input"/>
            <SendIcon className="icon" onClick={setChat}/>
        </div>
     </div>
   )
   }
export default Messages;