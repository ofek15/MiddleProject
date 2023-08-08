import {useState, useEffect} from "react";
import './WorkerInbox.css'
const ReadButton = (element) => {
    const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("Messages")) || []);
    // const [sortedMessages, setSortedMessages] = useState(JSON.parse(localStorage.getItem("Messages")) || []);
    const loginName = localStorage.getItem("login");
    // const sortMessages = (a, b) => {
    //     if (a.read === b.read) {
    //       return 0;
    //     }
    //     if (a.read) {
    //       return 1;
    //     }
    //     return -1;
    //   };

    // const myMessages = messages.filter((obj) => {
    //     return obj.to==loginName
    //   })
    
    // const myMessagesSorted = myMessages.sort(sortMessages)


    function HandleDeleteClick(){
        console.log("nessages", messages);
        const filteredDeletedMessage = messages.filter((obj) => obj.date != element.element.date)
        console.log("nessagesafterfilter", filteredDeletedMessage);
        localStorage.setItem("Messages", JSON.stringify(filteredDeletedMessage))
    }
  return (
    <button onClick={() => HandleDeleteClick()} className={"Message-is-unread"}>{`Delete`}</button>
  )
}

export default ReadButton