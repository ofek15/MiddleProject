import './Loginpage.css';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import data from './workers.json';
import { useNavigate } from 'react-router-dom';
import PaymentForm from "./PaymentForm";
import 'animate.css';
function Loginpage() {
    // localStorage.setItem("login", "DemiName")
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(false);
    let arrayofworkers = data.workers;
    const {register, handleSubmit}=useForm();
    return(
      <div id="login-container">
        <div id="login-inner">
          <h1 id='login-tittle'>Log in</h1>
          <form onSubmit={handleSubmit((data)=>{checkUser(data)})}>
          <div className='username-login-container'> 
            <div className="login-div">
              <span className="user">Username</span>
              <input className='login-input' type='text' {...register("username")}></input>
            </div>
          </div>
          <div className='username-login-container'>
            <div className="login-div">
              <span className="user">Password</span>
              <input className="login-input" type='password' {...register("password")}></input>
            </div>
          </div>
          <div id="divofsubmit-btn"><button id="login-btn" type="submit">Sign In</button></div>
          </form>
          <div>
            <button onClick={() => setClicked(!clicked)} id='buymembership-button'>Buy Membership</button>
          </div>
        </div>
        {clicked &&
            <div id='credit-card-container' className='animate__animated animate__backInDown'>
              <PaymentForm/>
            </div> }
    </div>
    )



    
  function checkUser(objofinput){
    let admincheck = null
    let check=false;
    let namesaved = null;
    for (let i=0; i<arrayofworkers.length;i++){
       if (arrayofworkers[i].Username==objofinput.username&&arrayofworkers[i].Password==objofinput.password){
        check=true;
        namesaved=arrayofworkers[i].FullName;
        admincheck = arrayofworkers[i].Admin;
       }
    }

    if (check==true){
        if(admincheck==true){
          //lead to admin page
          
          navigate('Manager');
          localStorage.setItem("login", namesaved)
        }else{
          //lead to worker page
         
          navigate('Worker');
          localStorage.setItem("login", namesaved)
        }
    }else{
      alert("username / password is incorrect")
    }
    
  }
  }
  
  export default Loginpage
