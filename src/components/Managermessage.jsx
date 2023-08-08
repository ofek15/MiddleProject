import { useState, useEffect} from "react";
import data from './workers.json';
import './Managermessage.css'
function Managermessage ({nameofmanager}){

    const [demilistener, setDemilistener]=useState(0);

    const [workernamemarkarray, setWorkernamemarkarray] = useState ([]);
    const [workerinsearch, setWorkerinsearch] = useState();

    const arrayofworkers = data.workers;
    
    function extractFullNames(array) {
        return array.map((item) => item.FullName);
      }

    let fullnamearray = extractFullNames(arrayofworkers);
    const [updatefullnamearray, setUpdatefullnamearray]=useState(fullnamearray);

    function getnameintosendarray (newname){
        // console.log(newname, "element");
        let check = workernamemarkarray.some((item) => item === newname);
        // console.log(check, "check");
        if (check==false){
            setWorkernamemarkarray([...workernamemarkarray, newname]);
        }else{
            let updateWorkernamemarkarray = workernamemarkarray.filter((element)=> element!=newname);
            setWorkernamemarkarray(updateWorkernamemarkarray);
        }    
    }

    
    
    const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("Messages")) || []); 
    const [newmessage, Setnewmessage]=useState("");

    function sendMessage (newmessage1, workernamemarkarray){
        let today1 = new Date;
        // console.log(newmessage1, workernamemarkarray, "gmetkjbnr")
        let helpm = []
        for (let i = 0; i<workernamemarkarray.length; i++){
            const blockofnewmessage = {
                sendman: nameofmanager,
                isSendmanAdmin: true,
                date: today1,
                content: newmessage1,
                to: workernamemarkarray[i],
                read: false
            }
            helpm = [...helpm, blockofnewmessage]
            
            // console.log(blockofnewmessage, "blabla");
        }      
        setMessages([...helpm]);  
        setWorkernamemarkarray([]);
        setDemilistener(demilistener+1);

        const checkboxes = document.querySelectorAll('input[name="button1"]');
        checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
       
        alert("Message Has Been Sent");
    }

    useEffect(() =>{
        if (demilistener!=0){
            let lastmessages = JSON.parse(localStorage.getItem("Messages")) || [];
            // console.log(lastmessages, "last")
            // console.log(messages, "messages")
            let updateallmessages = [...messages, ...lastmessages];
            // console.log(updateallmessages, "sumofall");
            localStorage.setItem("Messages", JSON.stringify(updateallmessages));
        }
    }, [demilistener])

    function searchWorkerformessage (workername1){
        setWorkerinsearch(workername1);
        workername1=workername1.toLowerCase();
        setUpdatefullnamearray(fullnamearray.filter((element) => element.toLowerCase().includes(workername1)));
        // console.log(updatefullnamearray);
        
    }
    return(
        <div id="manager-write-message-container">
            <div id="message-box-andsend-button">
                <h1 id="send-amessage-header">Send a New Message</h1>
                <button className="sendButton" onClick={()=> sendMessage(newmessage, workernamemarkarray )}>Send</button>
            </div>
           <textarea id="textplace" onChange={(e)=>Setnewmessage(e.target.value)} placeholder="Send A Message To A Worker..."></textarea>
           <input className="searchbar-worker-text" type="text" placeholder="Search For A Worker" onChange={(e)=>searchWorkerformessage(e.target.value)}></input>
           <div id="manager-write-workers-container">
           {updatefullnamearray?.map((element, index) => {
            return(
                <div className="worker-checkbox-container" key={index*12}>
               <input className="worker-checkbox-input-checkbox" type="checkbox" name="button1" onClick={()=>getnameintosendarray(element)} ></input>
               <h3 className="worker-checkbox-header">{element}</h3>
               </div>
            )           
           })}
           </div>
        </div>
    )
}
export default Managermessage;