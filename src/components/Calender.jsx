import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import './calender.css'


const Calender = () => {
    function getCurrentSundayDate() {
        var currentDate = new Date();
        var currentDayOfWeek = currentDate.getDay();
        var daysSinceSunday = currentDayOfWeek === 0 ? 0 : currentDayOfWeek;
      
        var currentSundayDate = new Date();
        currentSundayDate.setDate(currentDate.getDate() - daysSinceSunday);
      
        var formattedDate = currentSundayDate.toISOString().split('T')[0];
        return formattedDate;
      }
  return (
    <div>
        
        <button onClick={getCurrentSundayDate}>hi</button>
        <DayPilotCalendar viewType="Week" startDate={getCurrentSundayDate}/>
    </div>
  )
  }

export default Calender