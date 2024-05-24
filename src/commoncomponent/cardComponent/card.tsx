import { FC, useEffect, useState } from "react";
import "./index.scss";
import moment from "moment";
import Img from "../lazyLoadImage/LazyLoadImage";

import { CardProps } from "../../types";

const Card:FC<CardProps> = ({data})=>{
    const [dateTime, setDateTime] = useState<{month: string, date: number}>({
        month: "Apr",
        date: 6,
    });

    useEffect(()=>{
        const momentDate = moment(data?.time);
        const month:string = momentDate.format("MMM");
        const date:number = momentDate.date();
        const datetime = {month, date} 
        setDateTime(datetime);
    },[])

    const getGoogleDriveDirectLink = (url:string) => {
        const fileIdMatch = url?.match(/\/d\/(.*?)\//);
        return fileIdMatch ? `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}` : url;
    };

    const directImageUrl = getGoogleDriveDirectLink(data?.header_img);

    return(
        <div className="card-header">
            <div className="card-image">
                <Img src={directImageUrl}></Img>
            </div>
            <div className="card-content">
                <div className="date">
                    <div className="month">{dateTime?.month}</div>
                    <div className="date">{dateTime?.date}</div>
                </div>
                <div className="content">
                    <div className="header">
                    {data?.name}
                    </div>
                    <div className="text">
                    {data?.tagline}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Card;