import "./availability.css";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Message from "./Message";
import 'animate.css';


const Availability = () => {
  const [dates, setDates] = useState([]);
  const [updatedShifts, setUpdatedShifts] = useState(JSON.parse(localStorage.getItem("allshifts")) || []);
  const [Formatteddates, setFormattedDates] = useState([]);
  const [dateCounter, setDateCounter] = useState(0);
  const loginname = localStorage.getItem("login");
  //   const [workerShifts, setWorkerShifts] = useState([]);
  const [morningCheckBoxes, setMorningCheckBoxes] = useState([]);
  const [lunchCheckBoxes, setLunchCheckBoxes] = useState([]);
  const [eveningCheckBoxes, setEveningCheckBoxes] = useState([]);

  const [disableMorning, setDisableMorning] = useState([]);

  useEffect(() => {
    let currentDate = new Date();
    let currentDayOfWeek = currentDate.getDay();
    let daysSinceSunday = currentDayOfWeek === 0 ? 0 : currentDayOfWeek;
    let sundayDate = new Date();
    sundayDate.setDate(
      currentDate.getDate() - daysSinceSunday + 7 * dateCounter
    );
    function calculateWeekDates() {
      let weekDates = [];
      let FormattedweekDates = [];
      for (let i = 0; i < 7; i++) {
        let date = new Date(sundayDate);
        date.setDate(sundayDate.getDate() + i);

        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        let day = date.getDate().toString().padStart(2, "0");

        let formattedDate = day + "." + month + "." + year;
        let NewformattedDate = new Date (year, month, day)
        weekDates.push(formattedDate);
        FormattedweekDates.push(NewformattedDate)
      }
      setFormattedDates(FormattedweekDates);
      setDates(weekDates);
    }
    
    calculateWeekDates();
  }, [dateCounter]);

  useEffect(() =>{
    const morningArr = [];
    const lunchArr = [];
    const eveningArr = [];
    if(dates[0]!=undefined){
        for(let i=0; i<7; i++){
          morningArr.push(isCheckSelected(dates[i],"morning"))
          disableMorning[i]=isBefore(Formatteddates[i])
        }
        for(let i=0; i<7; i++){
          lunchArr.push(isCheckSelected(dates[i],"lunch"))
        }
        for (let i=0; i<7; i++){
          eveningArr.push(isCheckSelected(dates[i],"evening"))
        }
        
    }
    setMorningCheckBoxes([...morningArr])
    setLunchCheckBoxes([...lunchArr])
    setEveningCheckBoxes([...eveningArr])
}, [dates, dateCounter])


  function handleLeftClick() {
    setDateCounter((prev) => prev - 1);
  }
  function handleRightClick() {
    setDateCounter((prev) => prev + 1);
  }

  let allshifts;
  if (JSON.parse(localStorage.getItem("allshifts")) == undefined) {
    allshifts = [];
    localStorage.setItem("allshifts", JSON.stringify(allshifts));
  } else {
    allshifts = JSON.parse(localStorage.getItem("allshifts"));
  }

  function handleInputClick(date, day, hour) {
    let starthourindex = null;
    let endhourindex = null;
    if (hour === "morning") {
      starthourindex = 9;
      endhourindex = 13;
    } else if (hour === "lunch") {
      starthourindex = 14;
      endhourindex = 18;
    } else {
      starthourindex = 19;
      endhourindex = 22;
    }
    const shift = {
      title: loginname,
      startDate: new Date(
        date.slice(-4),


        parseInt((date.slice(3,5))-1),

        date.slice(0, 2),
        starthourindex
      ),
      endDate: new Date(
        date.slice(-4),


        parseInt((date.slice(3,5))-1),

        date.slice(0, 2),
        endhourindex
        // new Date(year, monthIndex, day, hours)
      ),
      id: date + hour + loginname,
      day: day,
      hour: hour,
      status: "selected",
    };


    if (
      allshifts.some((obj) => {
        return obj.id == shift.id

      })
    ) {
      allshifts = [...allshifts].filter(
        (object) => object.id != shift.id
      );
      setUpdatedShifts(allshifts)
      allshifts && localStorage.setItem("allshifts", JSON.stringify(allshifts));
    } else {
      allshifts.push(shift);
      setUpdatedShifts(allshifts)
      console.log(updatedShifts);
      localStorage.setItem("allshifts", JSON.stringify(allshifts));
    }
    
    
  }

  function HighlightCurrentDay(date) {
    let todaysdate = new Date();
    let year1 = todaysdate.getFullYear();
    let month1 = (todaysdate.getMonth() + 1).toString().padStart(2, "0");
    let day1 = todaysdate.getDate().toString().padStart(2, "0");

    let formattedDate1 = day1 + "." + month1 + "." + year1;

    if (date == formattedDate1) return true;
    else return false;
  }
  const checkedshifts = JSON.parse(localStorage.getItem("allshifts"));
  
  function isCheckSelected(date, hour) {
    const checkDate = date+hour+loginname;
    if (updatedShifts.some((obj) => { return obj.id == checkDate})){
        return true;
    }
    else{
        return false;
    }
  }
  function isCheckApproved(date, hour) {
    const checkDate = date+hour+loginname;
    for (let i=0; i<updatedShifts.length; i++){
      if (updatedShifts[i].id==checkDate){
        return updatedShifts[i].status=="accept";
      }
    }
    return false;
  }
  function isBefore(date) {
    return (new Date() > date)
  }
  const todaysdate = new Date();

  // function isCheckDisabled(date, hour) {
  //   console.log(date);
  //   const approved = isCheckApproved(date,hour);
  //   let smallerthan = false;
  //   const parts = date.split(".");
  //   const day = parseInt(parts[0], 10);
  //   const month = parseInt(parts[1], 10);
  //   const year = parseInt(parts[2], 10);
  //   const newdate = new Date(year, month-1, day)

  //   if (todaysdate>newdate) {
  //     smallerthan = true;
  //   }
  //   return (approved || smallerthan);
  // }

  // isCheckDisabled(dates[0], "morning")
  // {isCheckApproved(dates[index], "morning")}

  const daysOfTheWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const CappeddaysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



  return (
    <>
    <div id="availble-main-div">
      <div id="availble-buttons-div">
        <Button onClick={handleLeftClick} variant="contained">
          ←
        </Button>
        <Button onClick={handleRightClick} variant="contained">
          →
        </Button>
      </div>
      <table id="availble-table" className="animate__animated animate__fadeInUp">
        <tbody>
          <tr id="availble-table-header">
            <td className="table-head-tr">Day / Availble</td>
            {dates.map((date, index) =>{
              return (<td key={index} id={HighlightCurrentDay(date) ? "boldHighlightDate" : ""} className="table-head-tr">{`${CappeddaysOfTheWeek[index]}  ${date}`}</td>)
            })}
          </tr>
          <tr className="and3-table-header">
            <td className="highlited-td-table" >Morning</td>
            {dates.map((date, index) => {
              return (<td key={index}>
                <button disabled={isCheckApproved(dates[index], "morning")} onClick={() => {
                 handleInputClick(dates[index], `${daysOfTheWeek[index]}`, `morning`)}
                }
                className={`${isCheckSelected(dates[index], "morning") ? "selectedButton" : "unselectedButton"} ${isCheckApproved(dates[index], "morning") ? "accepted-shift-button" : ""}`}
                 >{isCheckSelected(dates[index], "morning") ? "✓" : "X"}</button>
              </td>)
            })}
          </tr>
          <tr className="and4-table-header">
            <td className="highlited-td-table">Lunch</td>
            {dates.map((date, index) => {
              return (<td key={index*2}>
                <button disabled={isCheckApproved(dates[index], "lunch")} onClick={() => handleInputClick(dates[index], `${daysOfTheWeek[index]}`, `lunch`)}

                className={`${isCheckSelected(dates[index], "lunch") ? "selectedButton" : "unselectedButton"} ${isCheckApproved(dates[index], "lunch") ? "accepted-shift-button" : ""}`}
                >{isCheckSelected(dates[index], "lunch") ? "✓" : "X"}</button>

              </td>)
            })}
          </tr>
          <tr className="and3-table-header">
            <td className="highlited-td-table">Evening</td>
            {dates.map((date, index) => {
              return (<td key={index*3}>
                <button disabled={isCheckApproved(dates[index], "evening")} onClick={() => handleInputClick(dates[index], `${daysOfTheWeek[index]}`, `evening`)}

                className={`${isCheckSelected(dates[index], "evening") ? "selectedButton" : "unselectedButton"} ${isCheckApproved(dates[index], "evening") ? "accepted-shift-button" : ""}`}
                >{isCheckSelected(dates[index], "evening") ? "✓" : "X"}</button>

              </td>)
            })}
          </tr>
        </tbody>
      </table>
      <div>
      </div>
    <Message loginname={loginname}></Message>
    </div>
    </>
  );
};

export default Availability;


            {/* <td>
              <input className={(Formatteddates[0]>todaysDate) ? "checkbox-disabled" : ""} type="checkbox" defaultChecked ={checkboxes[0]}
                onClick={() => handleInputClick(dates[0], "sunday", "morning")}
              />
            </td>
            <td>
              <input type="checkbox" checked={checkCheckbox(dates[1], "morning")}
                onClick={() => {
                  handleInputClick(dates[1], "monday", "morning");
                }}
              />
            </td>
            
            <td>
              <input type="checkbox" defaultChecked ={checkboxes[2]}
                onClick={() => handleInputClick(dates[2], "tuesday", "morning")}
              />
            </td>
            <td>
              <input type="checkbox" defaultChecked ={checkboxes[3]}
                onClick={() =>
                  handleInputClick(dates[3], "wednesday", "morning")
                }
              />
            </td>
            <td>
              <input type="checkbox" defaultChecked ={checkboxes[4]}
                onClick={() =>
                  handleInputClick(dates[4], "thursday", "morning")
                }
              />
            </td>
            <td>
              <input type="checkbox" defaultChecked ={checkboxes[5]}
                onClick={() => handleInputClick(dates[5], "friday", "morning")}
              />
            </td>
            <td>
              <input className={(Formatteddates[6]>todaysDate) ? "checkbox-disabled" : ""}  type="checkbox" defaultChecked ={checkboxes[6]}
                onClick={() =>
                  handleInputClick(dates[6], "saturday", "morning")
                }
              />
            </td>
          </tr>
          <tr>
            <td>Lunch</td>
            <td>
              <input type="checkbox" defaultChecked ={checkboxes[7]}               onClick={() => handleInputClick(dates[0], "sunday", "lunch")}
              />
            </td>
            <td>
              <input type="checkbox" defaultChecked ={checkboxes[8]}               onClick={() => handleInputClick(dates[1], "monday", "lunch")}
              />
            </td>
            <td>
              <input type="checkbox" defaultChecked ={checkboxes[9]}               onClick={() => handleInputClick(dates[2], "tuesday", "lunch")}
              />
            </td>
            <td>
              <input type="checkbox" defaultChecked ={checkboxes[10]}               onClick={() => handleInputClick(dates[3], "wednesday", "lunch")}
              />
            </td>
            <td>
              <input type="checkbox" defaultChecked ={checkboxes[11]}               onClick={() => handleInputClick(dates[4], "thursday", "lunch")}
              />
            </td>
            <td>
              <input type="checkbox" defaultChecked ={checkboxes[12]}               onClick={() => handleInputClick(dates[5], "friday", "lunch")}
              />
            </td>
            <td>
              <input type="checkbox" defaultChecked ={checkboxes[13]}               onClick={() => handleInputClick(dates[6], "saturday", "lunch")}
              />
            </td>
          </tr>
          <tr>
            <td>Evening</td>
            <td>
              <input type="checkbox" defaultChecked ={checkboxes[14]}
                onClick={() => handleInputClick(dates[0], "sunday", "evening")}
              />
            </td>
            <td>
              <input type="checkbox" defaultChecked ={checkboxes[15]}
                onClick={() => handleInputClick(dates[1], "monday", "evening")}
              />
            </td>
            <td>
              <input type="checkbox" defaultChecked ={checkboxes[16]}
                onClick={() => handleInputClick(dates[2], "tuesday", "evening")}
              />
            </td>
            <td>
              <input type="checkbox" defaultChecked ={checkboxes[17]}
                onClick={() =>
                  handleInputClick(dates[3], "wednesday", "evening")
                }
              />
            </td>
            <td>
              <input type="checkbox" defaultChecked ={checkboxes[18]}
                onClick={() =>
                  handleInputClick(dates[4], "thursday", "evening")
                }
              />
            </td>
            <td>
              <input type="checkbox" defaultChecked ={checkboxes[19]}
                onClick={() => handleInputClick(dates[5], "friday", "evening")}
              />
            </td>
            <td>
              <input type="checkbox" defaultChecked ={checkboxes[20]}
                onClick={() =>
                  handleInputClick(dates[6], "saturday", "evening")
                }
              />
            </td>*/}
