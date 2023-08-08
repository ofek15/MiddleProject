import './Manager.css';
import CalenderPage from './CalenderPage';
import Managermessage from './Managermessage';
import logoutpic from "../logoutpic.png";
import { Link } from 'react-router-dom';
import 'animate.css';
import {useEffect} from 'react';


    
    const date = new Date();
    const hour = date.getHours();
    let stringhour;
    if (hour >= 6 && hour < 12) {
    stringhour = "Morning";
    } else if (hour >= 12 && hour < 17) {
    stringhour = "Noon";
    } else if (hour >= 17 && hour < 21) {
    stringhour = "Evening";
    } else {
    stringhour = "Night";
    }

function Manager (){
    let loginname = localStorage.getItem("login")
    const firstName = loginname.split(/(?=[A-Z])/)[0];
    const nameofmanager = localStorage.getItem("login");
    // console.log(nameofmanager, "nameofmanager");
    return (
        <div>
        <div id="headline-manager-page">
            <div id='manager-logo-h1'>
                <img className='animate__animated animate__rollIn' id="logo-manager"src="https://cdn-icons-png.flaticon.com/512/5774/5774430.png" alt="manager-logo"></img>
                <h1 id="headline-tittle" className='animate__animated animate__fadeInDown'>Manager</h1>
            </div>
            <div id='h3-header-manager-nav'>
            <h3 className='animate__animated animate__fadeInUp' id="goodhour-h3">{`Good ${stringhour}, ${firstName}`}</h3>
            </div>
            <div id='logout-button-container'>
                <Link to={"../../"}>
                    <img id='logout-button-pic' src={logoutpic} alt="logout-icon" />
                </Link>
            </div>
        </div>
        <CalenderPage></CalenderPage>
        <Managermessage nameofmanager={nameofmanager}></Managermessage>
        </div>
    )  
}
export default Manager;