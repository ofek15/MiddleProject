import './inputCheckbox.css'
const InputCheckbox = (value, index) => {
    const loginname = localStorage.getItem("login")

    console.log(value);

  return (
    <>
        <td>
            <button>{`${value}`}</button>
        </td>


        {/* <td key={index}>
            <button type="checkbox" className={(checkCheckbox(dates[index], "morning") ? "selectedButton" : "unselectedButton")}
              onClick={() => {
                handleInputClick(dates[index], daysOfTheWeek[index], "morning")}} />
        </td> */}
    </>
  )
}

export default InputCheckbox

// index, checkCheckbox, dates, handleInputClick, daysOfTheWeek


// {dates.map((value, index) => {
//     return (<td key={index}><input type="checkbox" defaultChecked={checkCheckbox(dates[index], "morning")}
//     onClick={() => {
//       handleInputClick(dates[index], daysOfTheWeek[index], "morning")
//     }} /></td>)
//   })}


    // function isCheckSelected(date, hour) {
    //     const checkedshifts = JSON.parse(localStorage.getItem("allshifts"));
    //     const checkDate = date+hour+loginname;
    //     if (checkedshifts.some((obj) => { return obj.id == checkDate})){
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }
    //   }