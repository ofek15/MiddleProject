import "./WorkerInbox.css";
import { useState, useEffect } from "react";
import ClosedMessage from "./ClosedMessage";
import ReadButton from "./ReadButton";
import 'animate.css';

const WorkerInbox = ({ mykey }) => {
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("Messages")) || []
  );
  const [sortedMessages, setSortedMessages] = useState(
    JSON.parse(localStorage.getItem("Messages")) || []
  );
  const [openCards, setOpenCards] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const loginName = localStorage.getItem("login");
  const name = loginName.replace(/([A-Z])/g, " $1");
  const ResetOpenCards = [];

  const sortMessages = (a, b) => {
    if (a.read === b.read) {
      return 0;
    }
    if (a.read) {
      return 1;
    }
    return -1;
  };

  let myMessages = messages.filter((obj) => {
    return obj.to == loginName;
  });

  //   function resetCards(){
  //       setOpenCards(myMessagesSorted.map(() => false));
  //   }
  useEffect(() => {
    // resetCards();
    // console.log(messages);
    const myMessagesSorted = myMessages.sort(sortMessages);
    setSortedMessages(myMessagesSorted);
    // console.log(openCards);
    // localStorage.setItem("Messages", JSON.stringify(sortedMessages))
  }, [messages]);

  function handleOnButtonClick(index) {
    !setOpenCards(!openCards[index]);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      date
    );
    return formattedDate.replace(",", " -");
  }
  function truncateString(str) {
    if (str.length <= 10) {
      return str;
    }
    return str.slice(0, 10) + "...";
  }
  function handleDeleteButton(element, i) {
    // console.log(element.date, "this is the element date");
    // console.log(element.to);
    const filteredMessages = sortedMessages.filter((object, index) => {
      return index !== i;
    });
    setSortedMessages(filteredMessages);
    localStorage.setItem("Messages", JSON.stringify(filteredMessages))
  }
  return (
    <div className="WorkerInbox-div">
        {sortedMessages.length>0 ? <h1 className="animate__animated animate__rollIn ManagerInboxHeader">{sortedMessages.length > 1 ? `Inbox: ${sortedMessages.length} Messages` : `Inbox: ${sortedMessages.length} Message`}</h1> :
         <h1 id="workerinbox-header-h1" className="animate__animated animate__rollIn ManagerInboxHeader">You Have No Messages</h1>}
        
      {sortedMessages.map((element, index) => {
        return (
          <div className="WorkerInbox-Container" key={index * 9}>
            <ClosedMessage
              key={index * 5}
              element={element}
              index={index}
              truncateString={truncateString}
              formatDate={formatDate}
            />
            <button
              onClick={() => handleDeleteButton(element, index)}
              className={"Message-is-unread"}
            >{`Delete`}</button>
          </div>
        );
      })}
    </div>
  );
};

export default WorkerInbox;
{
  /* <button key={index*8} onClick={() => setIsOpen(!isOpen)}>
            <div className='OpenMessage-div'>
                <h1>{`${element.sendman.replace(/([A-Z])/g, ' $1')}`}</h1>
                <h3>{`${truncateString(element.content)}`}</h3>
                <h2>{formatDate(element.date)}</h2>
            </div>
            <div className={`${isOpen ? "OpenCard" : "ClosedCard" }`}>
            <h1>{`${element.content}`}</h1>
            </div>
            </button> */
}

{
  /* <button key={index*11}>
            <div className='Message-div'>
                <h1>{`${element.sendman.replace(/([A-Z])/g, ' $1')}`}</h1>
                <h3>{`${truncateString(element.content)}`}</h3>
                <h2>{formatDate(element.date)}</h2>
            </div>
            </button> */
}
