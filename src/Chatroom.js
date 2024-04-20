import React,{useEffect,useState} from "react";
import Header from "./Header";
import "./Chatroom.css";
import "./styles.css";
import {useHistory} from "react-router-dom";
import Chats from "./Chats";
import Messages from "./Messages";
import {auth,db} from "./Firebase";
import Posts from "./Posts";

function Chatroom ({ user,posts,chats}) {
   const history = useHistory();
   const[toggle,setToggle] = useState(false);
   
  useEffect(() => {auth.onAuthStateChanged(user => {
     if(!user){
       history.push("/login")
     }
  })
},[])

   
 return(
   <div className="Chatroom">
     <Header currentUser={user} />
     <div className="chat">
      <div className="chats">
      <h3>Chats</h3>
      {chats.map(chat => (
      
         <Chats key={chat?.uid} setToggle={setToggle} toggle={toggle} email={chat.email}  displayName={chat.displayName} photo={chat.photo} uid={chat.uid}/>
      ))}
      
      </div>
    <div className={toggle?"messages remove":"messages"}>
    <Messages toggle={toggle} setToggle={setToggle}/>
    </div>
    <div className="posts">
    <h3>Posts</h3>
       <Posts posts={posts} chats={chats}/>
      </div>
    </div>
   </div>
 )
}
export default Chatroom;