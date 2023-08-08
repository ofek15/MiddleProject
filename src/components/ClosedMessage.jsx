
import './WorkerInbox.css'
import {useState, useEffect} from "react";
const ClosedMessage = ({element, index, truncateString, formatDate}) => {
    const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("Messages")) || []);
    // let isReadStatus = messages.filter((obj) => (obj.date == element.date))
    // const newReadStatus = !isReadStatus[0].read;
    const [isOpen, setIsOpen] = useState(false);
    const [isRead, setIsRead] = useState();
    const [TheToggler, setTheToggler] = useState(false);

    function handleClick(){
        setIsOpen(!isOpen)
        console.log(isOpen);
    }
    function handleReadClicked(){
        setTheToggler(!TheToggler)
    }
    // function toggleReadStatus(targetDate) {
    //     const newarray = messages;
    //     return newarray.map(obj => {
    //       if (obj.date === targetDate) {
    //         return { ...obj, read: !obj.read };
    //       }
    //       return obj;
    //     });
    //   }
    // function toggleSetReadStatus(targetDate){
    //     const newarray = toggleReadStatus(targetDate);
    //     setMessages(newarray);
    //     setIsRead(!isRead)
    // }
    useEffect(() => {
        let newarray = messages;
        let ReadStatus;
        newarray = newarray.map(obj => {
          if (obj.date === element.date) {
            ReadStatus = obj.read;
            return { ...obj, read: !obj.read };
          }
          return obj;
        });
        setMessages(newarray)
        setIsRead(!ReadStatus)
        localStorage.setItem("Messages", JSON.stringify(newarray))
    }, [TheToggler])
    
  return (
    <div className='MessageBox'>
    <button className='MessageButton' key={index*8} onClick={() => handleClick()}>
        {isOpen ? 
        <div className='OpenMessage-div'>
        <div className='OpenMessage-header-div'>
            <h1 className='worker-inbox-name'>{`${element.sendman.replace(/([A-Z])/g, ' $1')}`}</h1>
            <h2 className='worker-inbox-date'>{formatDate(element.date)}</h2>
        </div>
        <div className='OpenMessage-content-div'>
            <p className='OpenMessage-paragraph'>{`${element.content}`}</p>
        </div>
    </div>
        :
        <div className='CloseMessage-div'>
        <h1 className='worker-inbox-name'>{`${element.sendman.replace(/([A-Z])/g, ' $1')}`}</h1>
        <h3 className='worker-inbox-paragraph'>{`${truncateString(element.content)}`}</h3>
        <h2 className='worker-inbox-date'>{formatDate(element.date)}</h2>
    </div>
    }
            
    </button>
    </div>
  )
}

export default ClosedMessage