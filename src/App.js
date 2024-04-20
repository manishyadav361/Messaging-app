import "./styles.css";
import React,{useEffect,useState} from "react";
import Login from  "./Login";
import Signup from "./Signup";
import Chatroom from "./Chatroom";
import {auth,db} from "./Firebase";
import {BrowserRouter as Router , Route , Switch } from "react-router-dom";
import Profile from "./Profile";
import Header from "./Header";
import Messages from "./Messages";
import Voice from "./Voice";


export default function App() {
  const[user,setUser] = useState([]);
  const[nightmode,setNightmode] = useState(false);
  const[chats,setChats] = useState([]);
  const[posts,setPosts] = useState([]);
  useEffect(() => {
   auth.onAuthStateChanged((user) => {
     if(user){
       setUser(user);
       console.log(auth);
     }
   
  })
 },[user]);  

 useEffect(() => {
     auth.onAuthStateChanged(user => {
        if(user){
           db.collection("users").doc(auth.currentUser?.uid).collection("chats").onSnapshot(snapshot => {
           setChats(snapshot.docs.map(doc => doc.data()))
     })
    }
    else{
       setChats([]);
    }
    })
 },[user])
useEffect(() => {
     db.collection('posts').orderBy("timestamp","desc").onSnapshot(snapshot => {
         setPosts(snapshot.docs.map(doc => doc.data()))
     })
},[])
     
 
  return (
  <Router> 
    <div className="App">
     <Voice />
     <Switch>
     <Route path="/login" exact > 
     <Login/>
     </Route>
     <Route path="/signup" exact>
     <Signup />
     </Route>
     <Route path="/" exact>
     <Chatroom user={user} chats={chats} posts={posts} setPosts={setPosts}/>
     </Route>
     <Route path="/profile" exact>
     <Header setNightmode={setNightmode} nightmode={nightmode} />
     <Profile user={user} />
     </Route>
     <Route path="/messages" exact >
        <Header />
        <Messages />
     </Route>
     </Switch>
    </div>
  </Router>
  );
}
