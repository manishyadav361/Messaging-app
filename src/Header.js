import React ,{useState,useEffect}  from "react";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import TextsmsIcon  from "@material-ui/icons/Textsms";
import "./Header.css";
import {auth,db} from "./Firebase";
import {useHistory} from "react-router-dom";
import PowerSettingsNewIcon  from "@material-ui/icons/PowerSettingsNew";
import {Avatar} from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import {useStateValue} from "./StateProvider";

function Header({currentUser,nightmode,setNightmode}){
  const history = useHistory();
  const [search,setSearch] = useState([]);
  const[users,setUsers] = useState([]);
  const[user,setUser] = useState([]);
  const[modal,setModal] = useState(false);
  const[{},dispatch] = useStateValue();
  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
     setUsers(snapshot.docs.map(doc => doc.data()));
    })
  },[])

  const logout = () => {
     db.collection("users").doc(auth?.currentUser?.uid).update({
         active:false
     })
     .then(() => {
         auth.signOut()
     })
    .then(() => {
        dispatch({
           type:"SET_USER",
           user:null
        });
       history.push("/login");
    })
  }
  const searchUser = () => {
   users.map(user => {
      if(user?.email !== currentUser?.email && user?.email === search){
         setUser(user);
         setModal(true);
      }
   });
   setSearch("");
  }
  
  const profileHandler = () => {
    history.push("/profile");
  }
  const addUser = async() => {
   
    db.collection("users").doc(currentUser?.uid).collection("chats").doc(user?.uid).set({
       email:user?.email,
        displayName:user?.displayName,
        photo:user?.photoURL,
        uid:user?.uid
    })
    db.collection("users").doc(user?.uid).collection("chats").doc(currentUser.uid).set({
       email:currentUser?.email,
       photo:currentUser?.photoURL,
       displayName:currentUser?.displayName,
       uid:currentUser?.uid

    }).then(() => {
        setModal(false);
    })
    .catch(error => alert(error.message))

  }
  return(
  <div className="Header">
      
          <MenuIcon className="navbar icon"/>
          <div className="logo" onClick={e => history.goBack()}>
             <TextsmsIcon className="icon" />
             <h3>Messsaging</h3>
          </div>
       <div className={modal?"users show-modal":"users hide-modal"}>
         <div className="user-card">      
       <Avatar src={user?.photoURL} />
               <h3>{user?.displayName}</h3>
  <button onClick={addUser} className="login-btn">Add</button> 
  </div> 
  </div>
          <div className="nav3">
          <div className="search">
             <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>
             <SearchIcon className="icon" onClick={searchUser}/>
          </div>
             <PersonIcon className="person icon" onClick={profileHandler}/>
             <PowerSettingsNewIcon onClick={logout} className="icon power"/>
             <button onClick={logout} className="login-btn header-btn">Logout</button>
             <Brightness4Icon className="icon nightmode" />
       </div>
  </div>
  );
}
export default Header;