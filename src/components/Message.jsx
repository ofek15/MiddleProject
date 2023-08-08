import { useEffect, useState } from "react";
import './Message.css'
import 'animate.css';
function Message (keyofuser){
    const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("Messages")) || []);
    const [newmessage, Setnewmessage]=useState("");
    function sendMessage (newmessage1){
        let today1 = new Date;
        const blockofnewmessage = {
            sendman: keyofuser.loginname,
            isSendmanAdmin: false,
            date: today1,
            content: newmessage1,
            to: "OfekGitam",
            read: false
        }
        // console.log(blockofnewmessage);
        alert("Message Sent")
        setMessages([...messages, blockofnewmessage]);
    }
    useEffect(() =>{
        localStorage.setItem("Messages", JSON.stringify(messages));
    }, [messages])

    return(
        <div className="animate__animated animate__fadeInRight" id="worker-write-message-box">
           <h1 id="worker-write-header">Message box</h1>
           <textarea id="textplace" onChange={(e)=>Setnewmessage(e.target.value)} placeholder="Type Your Message To The Boss..."></textarea>
           <button id="worker-write-button" onClick={()=> sendMessage(newmessage)}>send the message</button>
        </div>
    )   
}
export default Message;