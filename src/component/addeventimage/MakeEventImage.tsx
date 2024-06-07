import { FC } from "react"
import "./index.scss"

import addevent from "../../../public/images/addevent.png";
import { useNavigate } from "react-router-dom";

const MakeEventImage:FC= ()=>{
    const navigate = useNavigate()
        return(
        <div className="Createheader">
            <div></div>
            <img src={addevent} alt="" />
            <div className="rightside">
                <header>Make your own Event </header>
                <p> You can add your own event in Eventick. and we are here to help you and make your event reachable to everywhere  </p>
                <button onClick={()=>navigate('/addevent')}><p>Create Events</p></button>
            </div>
            <div></div>
        </div>
    )
}

export default MakeEventImage