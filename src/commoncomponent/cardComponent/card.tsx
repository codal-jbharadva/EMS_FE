import React, { FC, useEffect, useState } from "react";
import "./index.scss";
import moment from "moment";
import Img from "../lazyLoadImage/LazyLoadImage";
import { CardProps } from "../../types";
import { useNavigate } from "react-router-dom";

const Card: FC<{ data: CardProps | null}> = ({ data }) => {
    const navigate = useNavigate()
    console.log(data);
    const [dateTime, setDateTime] = useState<{ month: string, date: number }>({
        month: "Apr",
        date: 6,
    });

    useEffect(() => {
        if (data?.start_date) {
            const momentDate = moment(data.start_date);
            const month: string = momentDate.format("MMM");
            const date: number = momentDate.date();
            const datetime = { month, date };
            setDateTime(datetime);
        }
    }, [data]);

    // if (loading) {
        // return (
        //     <div className="skeleton-card-header">
        //         <div className="skeleton skeleton-card-image"></div>
        //         <div className="skeleton-card-content">
        //             <div className="skeleton-date">
        //                 <div className="skeleton skeleton-month"></div>
        //                 <div className="skeleton skeleton-date-number"></div>
        //             </div>
        //             <div className="skeleton-content">
        //                 <div className="skeleton skeleton-header"></div>
        //                 <div className="skeleton skeleton-text"></div>
        //             </div>
        //         </div>
        //     </div>
        // );
    // }

    return (
        <div className="card-header" onClick={() => navigate(`/details/${data?.id}`)}>
            <div className="card-image">
                <Img src={data?.header_img} alt="header image" />
            </div>
            <div className="card-content">
                <div className="date">
                    <div className="month">{dateTime?.month}</div>
                    <div className="date-number">{dateTime?.date}</div>
                </div>
                <div className="content">
                    <div className="header">{data?.name}</div>
                    <div className="text">{data?.tagline}</div>
                </div>
            </div>
        </div>
    );
};

export default Card;
