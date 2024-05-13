import { FC } from "react"
import "./index.scss"
import ContentWrapper from "../../commoncomponent/contentWrapper/contentWrapper";
import FilterButton from "../buttons/filterbuttons/Button";
import Card from "../../commoncomponent/cardComponent/card";
const arr:[] = [1,2,3,4,5,6];
const Upcoming:FC = ()=>{
    return(
        <ContentWrapper>
            <div className="top">
                <div className="header">
                    Upcoming Events
                </div>
                <div className="btns">
                    <FilterButton name="Weekdays"/>
                    <FilterButton name="Event Type"/>
                    <FilterButton name="Any Category"/>
                </div>
            </div>
            
            <div className="cards">
                {arr.map(()=>{
                    return <Card/>
                })}
            </div>
            <div className="btndiv">
                <button className="morebtn"><p>Load More</p></button>
            </div>
        </ContentWrapper>
    )
}

export default Upcoming;