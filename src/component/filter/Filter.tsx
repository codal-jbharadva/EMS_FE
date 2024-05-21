import { FC } from "react";
import "./index.scss"
import ContentWrapper from "../../commoncomponent/contentWrapper/contentWrapper";

type props = {
    name: string,
    placeholder: string
}

const Optionfilter = ({name, placeholder}:props)=>{
    return(
        <div className="filterInput">
            <label htmlFor="name"><p>{name}</p></label>
            <input type="text" placeholder={placeholder}/>
        </div>
    )
}

const Filter:FC = ()=>{
    return (
        <ContentWrapper>
            <div className="filterHeader">
                <div>
                    <Optionfilter name="Search Event" placeholder="VGEC Box"></Optionfilter>
                    <Optionfilter name="Place" placeholder="Rajkot"></Optionfilter>
                    <Optionfilter name="Time" placeholder="Any Date"></Optionfilter>
                </div>
            </div>
        </ContentWrapper>
    )
}

export default Filter;