import './Workercard.css';
import { AiTwotonePhone } from "react-icons/ai";

function Workercard ({data}){

   return(
      <div className='workercard-div'>
    <div className={`workercard-container ${data.Admin ? "workercard-admin" : ""}`}>
       <div className='workercard-fullname'><h4>{data.FullName.replace(/([A-Z])/g, ' $1').trim()}</h4></div>
       <div className='workercard-phone' ><h4>{data.Phone}</h4></div>
       <div className='linktocall'>
       <a href={`tel:${data.Phone}`}>
       <AiTwotonePhone/>
       </a>
       </div>
    </div>
       <hr />
      </div>
   )
}
export default Workercard;