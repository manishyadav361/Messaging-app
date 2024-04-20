import React ,{useState} from "react";
import  "./Post.css";
import {auth,db} from "./Firebase";
import {Avatar} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleRoundedIcon from "@material-ui/icons/ChatBubbleRounded";
function Post({ name , likes , image , uid , avatar , text , time}){
   const[like,setLike] = useState(false);
   const addLike = () => {
    like?setLike(false):setLike(true);
    db.collection('posts').where("time", "==" , "time").update({
         likes:likes +1
    })
   }
    return(
     <div className="Post">
         <div className="post-head">
             <Avatar src={avatar?avatar:""} />
             <p className="post-name">{name} </p>
         </div>
         <div className="post-container">
            <h4>{text}</h4>
            {image && <img src={image} alt=""/> }
         </div>
         <div className="feedback">
             <FavoriteIcon className={like?"red like":"white like"} onClick={addLike}/><span>{likes} likes</span>
             <ChatBubbleRoundedIcon className="comment" />
         </div>
     </div> 
   );
}
export default Post;