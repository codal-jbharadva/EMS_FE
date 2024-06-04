import  { FC, useEffect, useState } from "react";
import "./index.scss";
import ContentWrapper from "../../commoncomponent/contentWrapper/contentWrapper";
import Card from "../../commoncomponent/cardComponent/card";
import { apiRequest } from "../../utils/ApicallUtil";
import { useNavigate } from "react-router-dom";
import { CardProps } from "../../types";
import Select from "react-select";

const Upcoming: FC = () => {
  const dateOptions = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(option => ({ value: option, label: option }));
  const eventOptions = ['Indoor', 'Outdoor', 'Sports', 'meetup', 'Social', 'Dinning'].map(option => ({ value: option, label: option }));

  const [events, setEvents] = useState<CardProps[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string[]>([]);
  const [selectedEventType, setSelectedEventType] = useState<string[]>([]);
  const [endIndex, setEndIndex] = useState<number>(6);

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        let url = `event/`;
        const response = await apiRequest(url, "GET");
        if (!response.success) {
          console.error("Error fetching events:", response.error);
        } else {
          let responseEvents = response.data.events;
          let filteredEvents = responseEvents.map((event : CardProps) => {
            const today = new Date();
            const eventDay = new Date(event.start_date);
            return eventDay > today ? event : undefined;
        }).filter((event : CardProps) => event !== undefined);

          if (selectedDay.length > 0) {
            filteredEvents = filteredEvents.filter((event: any) => {
              const eventDay = new Date(event.start_date).toLocaleDateString('en-US', { weekday: 'long' });
              return selectedDay.includes(eventDay);
            });
          }

          if (selectedEventType.length > 0) {
            filteredEvents = filteredEvents.filter((event: any) => {
              return selectedEventType.includes(event.type);
            });
          }
          setEvents(filteredEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, [selectedDay, selectedEventType]);


  const handleDayChange = (selectedOptions: any) => {
    setSelectedDay(selectedOptions.map((option: any) => option.value));
  };

  const handleEventTypeChange = (selectedOptions: any) => {
    setSelectedEventType(selectedOptions.map((option: any) => option.value));
  };
  const loadEvents=()=>{
    setEndIndex((prev)=> prev + 6);
  }
  dataLoading && (
    <div>Data Loading</div>
  )

  return (
    <ContentWrapper>
      <div className="top">
        <div className="header">Upcoming Events</div>
        <div className="btns">
          <div className="filter-container">
            <Select
              isMulti
              name="days"
              options={dateOptions}
              onChange={handleDayChange}
              className="multi-select"
              classNamePrefix="select"
              placeholder="Select Day(s)"
            />
          </div>
          <div className="filter-container">
            <Select
              isMulti
              name="eventTypes"
              options={eventOptions}
              onChange={handleEventTypeChange}
              className="multi-select"
              classNamePrefix="select"
              placeholder="Select Event Type(s)"
            />
          </div>
        </div>
      </div>
      {events.length === 0 ? (
        <div>
          No event Found
        </div>
      ):(
        <div className="cards">
        {events.slice(0, endIndex).map((event) => (
          <div key={event.id}>
            <Card data={event} />
          </div>
        ))}
      </div>
      )}
      

      {events.length > 6 && endIndex < events.length && (
        <div className="btndiv">
          <button className="morebtn" onClick={loadEvents}>
            <p>Load More</p>
          </button>
        </div>
      )}
    </ContentWrapper>
  );
};

export default Upcoming;
