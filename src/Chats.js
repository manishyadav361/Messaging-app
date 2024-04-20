import React,{useEffect,useState} from "react";
import {Avatar} from "@material-ui/core";
import "./Chats.css";
import {auth,db} from "./Firebase";
import Profile from "./Profile";
import {useStateValue} from "./StateProvider";

function Chats({toggle, setToggle, email , uid , displayName , photo}){
  const[{},dispatch] = useStateValue();
  const[{user}] = useStateValue();
  const[active,setActive] = useState(false);
  useEffect(() => {
      auth.onAuthStateChanged(currentUser => {
          if(currentUser){
             currentUser.email === user?.email?setActive(true):setActive(false); 
            }
      })
  },[])

  db.collection('users').onSnapshot(snapshot => {
     snapshot.docs.map(doc => {
     var data = doc.data();
     if(data.email === email){
      
         if(data.active){
           console.log(data.active);
             setActive(true);
         }
         else{
           setActive(false);
         }
    
     }
    })
  })
  
  const navigate = () => {
      dispatch({
      type:"SET_USER",
      user:{
      email:email,
      photo:photo,
      displayName:displayName,
      uid:uid
      }
    })
    toggle?setToggle(false):setToggle(true);
  }
 
  return(
    <div className={toggle?"add Chats":"Chats"} onClick={navigate}>
             <Avatar src={photo} className="icon"/>
             <h2 className="chat-name">{displayName}</h2>
            <div className={active?"span":""}></div>
     </div>
    
    
  );
}
export default Chats;