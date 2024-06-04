import React, { useEffect, useState } from "react";
import "./index.scss";
import { apiRequest } from "../../utils/ApicallUtil";
import { CardProps } from "../../types";

import moment from "moment";
import Card from "../../commoncomponent/cardComponent/card";
import ContentWrapper from "../../commoncomponent/contentWrapper/contentWrapper";

const EventList: React.FC = () => {
    const [events, setEvents] = useState<CardProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiRequest("event/", "GET");
                console.log(response);
                setEvents(response.data.events);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const now = moment();

    const upcomingEvents = events.filter(event => moment(event.start_date).isAfter(now));
    const runningEvents = events.filter(event => moment(event.start_date).isBefore(now) && moment(event.end_date).isAfter(now));
    const pastEvents = events.filter(event => moment(event.end_date).isBefore(now));

    return (
        <div className="event-list">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ContentWrapper>
                    <h2>Running Events</h2>
                    <div className="event-grid">
                        {runningEvents.map(event => (
                            <Card key={event.id} data={event} />
                        ))}
                    </div>

                    <h2>Upcoming Events</h2>
                    <div className="event-grid">
                        {upcomingEvents.map(event => (
                            <Card key={event.id} data={event} />
                        ))}
                    </div>

                    <h2>Past Events</h2>
                    <div className="event-grid">
                        {pastEvents.map(event => (
                            <Card key={event.id} data={event} />
                        ))}
                    </div>
                </ContentWrapper>
            )}
        </div>
    );
};

export default EventList;
