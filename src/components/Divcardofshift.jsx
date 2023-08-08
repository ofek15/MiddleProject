
import { useEffect, useState } from 'react';
import './Divcardofshift.css';
function Divcardofshift({element, key, shiftsincalander, setshiftsincalander}) {
    let obj=element;
    // const [arrayofshiftsformanager, setArrayofshiftsformanager] = useState(JSON.parse(localStorage.getItem("allshifts")))
    const [acceptedisclicked, setAcceptedIsClicked] = useState(false);
    const [realstarthour, setRealstarthour] = useState (null);
    const [realendthour, setRealendthour] = useState (null);
    const [objectStatus, setObjectStatus] = useState(obj.status);
    function formatDate(dateString) {
        const date = new Date(dateString);
        
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based, so we add 1
        const year = date.getFullYear();
      
        return `${day}.${month}.${year}`;
      }
      
      const originalDateString = obj.startDate;
      const formattedDateString = formatDate(originalDateString);

      function capitalizeFirstLetter(str) {
        return str.replace(/\b\w/g, function(match) {
          return match.toUpperCase();
        });
      }
      
      
    //   console.log(formattedDateString);  // Output: 30.1.2023
    return(
        <div className="cardofshift-container">
          <div className='cardofshift-infobuttons-container'>
          <div className='cardofshift-info-container'>
            <div className='object-parts'>{obj.title}</div>
            {objectStatus=="accept" ? <div className='object-parts'>{`${capitalizeFirstLetter(objectStatus)}ed`}</div> :
            <div className='object-parts'>{`${capitalizeFirstLetter(objectStatus)}`}</div>}
            
            <div className='object-parts'>{formattedDateString}</div>
            <div className='object-parts'>{capitalizeFirstLetter(obj.hour)}</div> 
          </div>
          <div className='cardofshift-buttons-container'>
            <div className='object-parts' ><button className='button-in'  onClick={() => setAcceptedIsClicked(!acceptedisclicked)}>Accept Shift</button></div> 
            <div className='object-parts' ><button className='button-in'  onClick={()=>takeOutDataInCalender(obj.id)}>Decline Shift</button></div> 
            {acceptedisclicked && <div className='cardofshift-times-container'>
            <div className='object-parts' ><input className='input-hour-shift' type="time" onChange={(e)=> setRealstarthour(e.target.value)} /></div>
            <div className='object-parts' ><input className='input-hour-shift-end' type="time" onChange={(e)=> setRealendthour(e.target.value)} /></div>
            <button className='submit-shift-button' onClick={()=>setDataInCalender(obj)}>Submit</button>
            </div>
          }
          </div>
          </div>
            
        </div>
    )
    
    function setDataInCalender(obj){
        const dateforset = new Date(obj.startDate);
        const day1set = dateforset.getDate();
        const month1set = dateforset.getMonth();
        const year1set = dateforset.getFullYear();

        let starthour=realstarthour;
        let endhour=realendthour;
        let startminutes = 0;
        let endminutes = 0;
        if(starthour==null||endhour==null){
          alert("You did not enter hours. Hours entered automatically")
          if(obj.hour=="morning"){
            starthour=9;
            endhour=13;
        }
        if(obj.hour=="lunch"){
            starthour=14;
            endhour=18;
        }
        if(obj.hour=="evening"){
            starthour=19;
            endhour=22;
        }
      }else{
        starthour=realstarthour.slice(0,2);
        endhour=realendthour.slice(0,2);
        // console.log(endhour);
        startminutes=realstarthour.slice(-2);
        endminutes=realendthour.slice(-2);

      }
        let newShiftinCalender ={
            startShiftHour: starthour,
            endShiftHour: endhour,
            startShiftMinutes: startminutes,
            endShiftMinutes: endminutes,
            day: obj.day,
            title: obj.title,
            startDate: new Date(year1set, month1set, day1set, starthour, startminutes),
            endDate: new Date(year1set, month1set, day1set, endhour, endminutes),
            id: obj.id,
            hour: obj.hour,
            status: "accept",
        }
        //check if newshift that u want to put in is already there
        
        if(shiftsincalander.some(element => element.id == newShiftinCalender.id)){
            alert("The Shift Is Already Accepted");
        }else{
            
        setshiftsincalander([...shiftsincalander, newShiftinCalender]);
         //now i need to push the aprroved object to local storage in the format and take out the same object with the status of selected
        const existingArray = JSON.parse(localStorage.getItem("allshifts")) || [];
        // console.log("existingarray", existingArray);
        for (let i = 0; i < existingArray.length; i++) {
            if (existingArray[i].id === newShiftinCalender.id) {
                existingArray[i]=newShiftinCalender;
                existingArray[i].status = "accept";
              break; // Stop the loop once the update is done
            }
          }
          localStorage.setItem("allshifts", JSON.stringify(existingArray));
        }
        setObjectStatus("accepted")

        }
    function takeOutDataInCalender(idofobj){
        if (shiftsincalander.some(element => element.id == idofobj)){
            //  console.log("should be delete");
             // now delete from array of shift in calander
               let updatearray = shiftsincalander.filter(element=>element.id!==idofobj)
               setshiftsincalander(updatearray);
             // now change in local storage the shift to selected instead of accept
             const existingArraybeforedeletelocal = JSON.parse(localStorage.getItem("allshifts")) || [];
             for (let i = 0; i < existingArraybeforedeletelocal.length; i++) {
                if (existingArraybeforedeletelocal[i].id === idofobj) {
                    existingArraybeforedeletelocal[i].status = "selected";
                    setObjectStatus("selected")
                  break; // Stop the loop once the update is done
                }
              }
              localStorage.setItem("allshifts", JSON.stringify(existingArraybeforedeletelocal));
        }else{
            alert("Shift Cannot Be Deleted, Accept It First.")
        }
    }
    
}
export default Divcardofshift;