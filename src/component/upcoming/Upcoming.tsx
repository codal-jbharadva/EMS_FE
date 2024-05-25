import React, { FC, useEffect, useState } from "react";
import "./index.scss";
import ContentWrapper from "../../commoncomponent/contentWrapper/contentWrapper";
import FilterButton from "../buttons/filterbuttons/Button";
import Card from "../../commoncomponent/cardComponent/card";
import { apiRequest } from "../../utils/ApicallUtil";
import { useNavigate } from "react-router-dom";
import { CardProps } from "../../types";

const Upcoming: FC = () => {
  const [events, setEvents] = useState<CardProps[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(()=>{
    const getData = async ()=>{
      try{
        const response = await apiRequest("event/","GET")
        if(!response.success){
          console.log("error");
        }
        else{
          setEvents(response.data.events);
        }
      }
      catch(err){
        console.log(err);
      }
      finally{
        setDataLoading(false);
      }
    }
    getData();
  },[])

  return (
      <ContentWrapper>
        <div className="top">
          <div className="header">
            Upcoming Events
          </div>
          <div className="btns">
            <FilterButton name="Weekdays" />
            <FilterButton name="Event Type" />
            <FilterButton name="Any Category" />
          </div>
        </div>
  
        <div className="cards">
          {events.slice(0, 6).map((event) => (
            <div onClick={()=>navigate(`/details/${event.id}`)}>
              <Card key={event.id} data={event}/>
            </div>
          ))}
        </div>
        
        {events.length > 6 && (
          <div className="btndiv">
            <button className="morebtn">
              <p>Load More</p>
            </button>
          </div>
        )}
      </ContentWrapper>
    )
};

export default Upcoming;
